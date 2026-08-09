#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';
import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = parseArgs(process.argv.slice(2));

if (!args.input) {
	console.error('用法: npm run import:wordpress -- <WordPress.xml> [--dry-run] [--force] [--skip-media] [--include-drafts]');
	process.exit(1);
}

const input = path.resolve(args.input);
const xml = await fs.readFile(input, 'utf8');
const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: '@_',
	parseTagValue: false,
	parseAttributeValue: false,
	trimValues: false,
	isArray: (_name, jPath) => [
		'rss.channel.item',
		'rss.channel.item.category',
		'rss.channel.item.wp:postmeta',
		'rss.channel.item.wp:comment',
	].includes(jPath),
});
const document = parser.parse(xml);
const channel = document?.rss?.channel;

if (!channel || !Array.isArray(channel.item)) {
	throw new Error('这不是有效的 WordPress WXR 导出文件，未找到 rss/channel/item。');
}

const siteUrl = cleanUrl(channel['wp:base_blog_url'] || channel.link || '');
const basePath = args.base ?? await readAstroBase();
const items = channel.item;
const attachments = new Map();
const attachmentItems = items.filter((item) => value(item['wp:post_type']) === 'attachment');

for (const item of attachmentItems) {
	const id = value(item['wp:post_id']);
	const url = value(item['wp:attachment_url']);
	if (id && url) attachments.set(id, url);
}

const internalLinks = buildInternalLinkMap(items, siteUrl, basePath);

const report = {
	source: path.basename(input),
	siteUrl,
	generatedAt: new Date().toISOString(),
	basePath,
	posts: { imported: 0, skipped: 0, draftsSkipped: 0 },
	pages: { imported: 0, skipped: 0, draftsSkipped: 0 },
	moments: { imported: 0, skipped: 0, draftsSkipped: 0 },
	media: { downloaded: 0, skipped: 0, failed: [] },
	comments: 0,
	redirects: 0,
	warnings: [],
};

const turndown = new TurndownService({
	headingStyle: 'atx',
	codeBlockStyle: 'fenced',
	bulletListMarker: '-',
});
turndown.use(gfm);
turndown.addRule('wordpressCaption', {
	filter: (node) => node.nodeName === 'FIGURE',
	replacement: (_content, node) => `\n\n${turndown.turndown(node.innerHTML)}\n\n`,
});

const importedComments = {};
const redirects = [];
const mediaUrls = new Set(attachmentItems.map((item) => value(item['wp:attachment_url'])).filter(Boolean));

for (const item of items) {
	const type = value(item['wp:post_type']);
	if (type !== 'post' && type !== 'page' && type !== 'shuoshuo') continue;

	const status = value(item['wp:status']);
	const section = type === 'post' ? report.posts : type === 'page' ? report.pages : report.moments;
	if (status !== 'publish' && !(args.includeDrafts && status === 'draft')) {
		section.draftsSkipped++;
		continue;
	}

	const id = value(item['wp:post_id']);
	const rawSlug = value(item['wp:post_name']);
	const slug = safeSlug(rawSlug || value(item.title) || `${type}-${id}`);
	const contentFolder = type === 'post' ? 'post' : type === 'page' ? 'page' : 'moments';
	const outputDir = path.join(root, 'src/content', contentFolder);
	const output = path.join(outputDir, `${slug}.md`);
	const oldUrl = value(item.link) || (siteUrl && id ? `${siteUrl}/?p=${id}` : '');
	const comments = approvedComments(item);
	if (comments.length) {
		importedComments[id] = comments;
		report.comments += comments.length;
	}
	const destination = destinationFor(type, slug, basePath);
	if (status === 'publish') {
		for (const source of oldPaths(oldUrl, id, type)) {
			redirects.push({ source, destination, permanent: true });
		}
	}
	const exists = await fileExists(output);

	if (exists && !args.force) {
		section.skipped++;
		continue;
	}

	let html = value(item['content:encoded']);
	for (const url of extractMediaUrls(html)) mediaUrls.add(url);
	html = rewriteSiteMediaUrls(html, siteUrl, basePath);
	html = rewriteInternalLinks(html, internalLinks);
	html = html.replace(/\[friendlinks\s*\/?\]/gi, `<p><a href="${joinWebPath(basePath, 'links')}">查看已迁移的友情链接</a></p>`);
	const remainingShortcodes = html.match(/\[[a-z][a-z0-9_-]*(?:\s+[^\]]*)?\/?\]/gi) || [];
	if (remainingShortcodes.length) {
		report.warnings.push({ wordpressId: Number(id), shortcodes: [...new Set(remainingShortcodes)] });
	}
	const body = html.trim() ? turndown.turndown(html).trim() : '_此页面在 WordPress 导出中没有正文。_';
	const excerptHtml = value(item['excerpt:encoded']);
	const description = plainText(excerptHtml || html).slice(0, 180) || `${value(item.title)} 的历史文章`;
	const categories = taxonomy(item, 'category');
	const tags = taxonomy(item, 'post_tag');
	const meta = metadata(item);
	const featuredUrl = attachments.get(meta.get('_thumbnail_id'));
	const frontmatter = type === 'shuoshuo' ? {
		pubDate: normalizeDate(value(item['wp:post_date_gmt']) || value(item['wp:post_date'])),
		tags,
		wordpressId: Number(id),
		oldUrl,
		...(status === 'draft' ? { draft: true } : {}),
	} : {
		title: decodeEntities(value(item.title)) || `未命名 ${id}`,
		description,
		pubDate: normalizeDate(value(item['wp:post_date_gmt']) || value(item['wp:post_date'])),
		updatedDate: normalizeDate(value(item['wp:post_modified_gmt']) || value(item['wp:post_modified'])),
		tags,
		categories,
		wordpressId: Number(id),
		oldUrl,
		...(type === 'page' && slug === 'applyurl' ? { allowComments: true } : {}),
		...(featuredUrl ? { heroImageUrl: localMediaPath(featuredUrl) } : {}),
		...(status === 'draft' ? { draft: true } : {}),
	};

	if (!args.dryRun) {
		await fs.mkdir(outputDir, { recursive: true });
		await fs.writeFile(output, `${toYamlFrontmatter(frontmatter)}\n${body}\n`, 'utf8');
	}
	section.imported++;

}

if (!args.skipMedia) {
	await mapLimit([...mediaUrls], 6, downloadMedia);
}

report.redirects = dedupeRedirects(redirects).length;

if (!args.dryRun) {
	await fs.mkdir(path.join(root, 'src/data'), { recursive: true });
	await fs.writeFile(
		path.join(root, 'src/data/wordpress-comments.json'),
		`${JSON.stringify(importedComments, null, 2)}\n`,
		'utf8',
	);
	await writeRedirects(dedupeRedirects(redirects));
	await fs.mkdir(path.join(root, 'migration'), { recursive: true });
	await fs.writeFile(
		path.join(root, 'migration/wordpress-import-report.json'),
		`${JSON.stringify(report, null, 2)}\n`,
		'utf8',
	);
	// Rewriting many content files can leave Astro's incremental content cache with
	// duplicate entries. It is generated state and will be rebuilt on the next run.
	await fs.rm(path.join(root, '.astro/data-store.json'), { force: true });
}

console.log(JSON.stringify(report, null, 2));

function parseArgs(argv) {
	const parsed = { force: false, dryRun: false, skipMedia: false, includeDrafts: false };
	for (let i = 0; i < argv.length; i++) {
		const token = argv[i];
		if (token === '--force') parsed.force = true;
		else if (token === '--dry-run') parsed.dryRun = true;
		else if (token === '--skip-media') parsed.skipMedia = true;
		else if (token === '--include-drafts') parsed.includeDrafts = true;
		else if (token === '--base') parsed.base = argv[++i];
		else if (!token.startsWith('-') && !parsed.input) parsed.input = token;
		else throw new Error(`未知参数: ${token}`);
	}
	return parsed;
}

function value(input) {
	if (input == null) return '';
	if (typeof input === 'object' && '#text' in input) return String(input['#text'] ?? '').trim();
	return String(input).trim();
}

function metadata(item) {
	return new Map((item['wp:postmeta'] || []).map((entry) => [value(entry['wp:meta_key']), value(entry['wp:meta_value'])]));
}

function taxonomy(item, domain) {
	return (item.category || [])
		.filter((entry) => entry?.['@_domain'] === domain)
		.map((entry) => decodeEntities(value(entry)))
		.filter(Boolean);
}

function approvedComments(item) {
	return (item['wp:comment'] || [])
		.filter((comment) => value(comment['wp:comment_approved']) === '1')
		.map((comment) => ({
			id: Number(value(comment['wp:comment_id'])),
			parentId: Number(value(comment['wp:comment_parent'])) || null,
			author: value(comment['wp:comment_author']) || '访客',
			authorUrl: safeHttpUrl(value(comment['wp:comment_author_url'])),
			date: normalizeDate(value(comment['wp:comment_date_gmt']) || value(comment['wp:comment_date'])),
			content: sanitizeHtml(value(comment['wp:comment_content']), {
				allowedTags: ['p', 'br', 'a', 'strong', 'em', 'code', 'pre', 'blockquote', 'ul', 'ol', 'li'],
				allowedAttributes: { a: ['href', 'title', 'rel'] },
				transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'nofollow ugc' }) },
			}),
		}));
}

function normalizeDate(date) {
	if (!date || date.startsWith('0000-00-00')) return new Date(0).toISOString();
	const normalized = date.includes('T') ? date : `${date.replace(' ', 'T')}Z`;
	const parsed = new Date(normalized);
	return Number.isNaN(parsed.valueOf()) ? new Date(0).toISOString() : parsed.toISOString();
}

function safeSlug(input) {
	let decoded = input;
	try { decoded = decodeURIComponent(input); } catch {}
	return decoded
		.normalize('NFKC')
		.trim()
		.replace(/[\\/:*?"<>|#%]/g, '-')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '') || 'untitled';
}

function decodeEntities(input) {
	return String(input || '')
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
		.replace(/&nbsp;/gi, ' ')
		.replace(/&amp;/gi, '&')
		.replace(/&lt;/gi, '<')
		.replace(/&gt;/gi, '>')
		.replace(/&quot;/gi, '"')
		.replace(/&#0?39;/gi, "'");
}

function plainText(html) {
	return decodeEntities(sanitizeHtml(String(html || ''), { allowedTags: [], allowedAttributes: {} }))
		.replace(/\s+/g, ' ')
		.trim();
}

function extractMediaUrls(html) {
	const urls = new Set();
	const pattern = /(?:src|href)=["']([^"']+\/wp-content\/uploads\/[^"'?#]+(?:\?[^"']*)?)["']/gi;
	for (const match of String(html || '').matchAll(pattern)) urls.add(decodeEntities(match[1]));
	return urls;
}

function rewriteSiteMediaUrls(html, origin, webBase) {
	const localBase = joinWebPath(webBase, 'wp-content/uploads');
	let rewritten = String(html || '');
	if (origin) rewritten = rewritten.replaceAll(`${origin}/wp-content/uploads/`, localBase);
	return rewritten.replace(/(["'(=])\/wp-content\/uploads\//g, `$1${localBase}`);
}

function localMediaPath(url) {
	try {
		const parsed = new URL(url);
		return parsed.pathname.startsWith('/wp-content/uploads/')
			? `${joinWebPath(basePath, 'wp-content/uploads')}${parsed.pathname.slice('/wp-content/uploads/'.length)}`
			: url;
	} catch {
		return url;
	}
}

async function downloadMedia(url) {
	let parsed;
	try { parsed = new URL(url, siteUrl || undefined); } catch {
		report.media.failed.push({ url, error: '无效 URL' });
		return;
	}
	const marker = '/wp-content/uploads/';
	const index = parsed.pathname.indexOf(marker);
	if (index < 0) return;
	const relative = decodeURIComponent(parsed.pathname.slice(index + 1));
	const output = path.join(root, 'public', relative);
	const uploadsRoot = path.resolve(root, 'public/wp-content/uploads');
	if (!path.resolve(output).startsWith(`${uploadsRoot}${path.sep}`)) {
		report.media.failed.push({ url: parsed.href, error: '媒体路径越界' });
		return;
	}
	if (await fileExists(output)) {
		report.media.skipped++;
		return;
	}
	if (args.dryRun) {
		report.media.downloaded++;
		return;
	}
	try {
		const response = await fetch(parsed, { redirect: 'follow', signal: AbortSignal.timeout(15_000) });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		await fs.mkdir(path.dirname(output), { recursive: true });
		await fs.writeFile(output, new Uint8Array(await response.arrayBuffer()));
		report.media.downloaded++;
	} catch (error) {
		report.media.failed.push({ url: parsed.href, error: error.message });
	}
}

function toYamlFrontmatter(data) {
	const lines = ['---'];
	for (const [key, val] of Object.entries(data)) {
		if (Array.isArray(val)) lines.push(`${key}: ${JSON.stringify(val)}`);
		else if (typeof val === 'string') lines.push(`${key}: ${JSON.stringify(val)}`);
		else lines.push(`${key}: ${String(val)}`);
	}
	lines.push('---');
	return lines.join('\n');
}

function cleanUrl(url) {
	return String(url || '').replace(/\/$/, '');
}

function safeHttpUrl(url) {
	try {
		const parsed = new URL(url);
		return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
	} catch { return ''; }
}

function oldPaths(oldUrl, id, type) {
	const paths = new Set();
	try { paths.add(new URL(oldUrl).pathname.replace(/\/$/, '') || '/'); } catch {}
	if (id) {
		paths.add(`/archives/${id}`);
		if (type === 'post') paths.add(`/archives/${id}`);
	}
	return [...paths].filter((source) => source && !source.includes('?'));
}

function dedupeRedirects(entries) {
	return [...new Map(entries.map((entry) => [entry.source, entry])).values()];
}

function destinationFor(type, slug, webBase) {
	if (type === 'shuoshuo') return `${joinWebPath(webBase, 'moments')}#${encodeURIComponent(slug)}`;
	if (type === 'page' && slug === 'friends') return joinWebPath(webBase, 'links');
	return joinWebPath(webBase, type === 'post' ? 'post' : '', slug);
}

function buildInternalLinkMap(allItems, origin, webBase) {
	const links = new Map();
	for (const item of allItems) {
		const type = value(item['wp:post_type']);
		if (!['post', 'page', 'shuoshuo'].includes(type) || value(item['wp:status']) !== 'publish') continue;
		const id = value(item['wp:post_id']);
		const slug = safeSlug(value(item['wp:post_name']) || value(item.title) || `${type}-${id}`);
		const destination = destinationFor(type, slug, webBase);
		const candidates = [value(item.link), `${origin}/?p=${id}`, `${origin}/?page_id=${id}`];
		for (const link of candidates) {
			if (link) links.set(cleanUrl(decodeEntities(link)), destination);
		}
	}
	return links;
}

function rewriteInternalLinks(html, links) {
	return String(html || '').replace(/href=(["'])(https?:\/\/[^"']+)\1/gi, (match, quote, href) => {
		const destination = links.get(cleanUrl(decodeEntities(href)));
		return destination ? `href=${quote}${destination}${quote}` : match;
	});
}

function joinWebPath(...parts) {
	const joined = parts.filter(Boolean).join('/').replace(/\/+/g, '/');
	return `/${joined.replace(/^\/+|\/+$/g, '')}/`;
}

async function writeRedirects(entries) {
	const vercelPath = path.join(root, 'vercel.json');
	let config = {};
	try { config = JSON.parse(await fs.readFile(vercelPath, 'utf8')); } catch {}
	config.redirects = entries;
	await fs.writeFile(vercelPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');

	const netlify = entries.map(({ source, destination }) => `${source} ${destination} 301`).join('\n');
	await fs.writeFile(path.join(root, 'public/_redirects'), `${netlify}\n`, 'utf8');
}

async function readAstroBase() {
	try {
		const config = await fs.readFile(path.join(root, 'astro.config.mjs'), 'utf8');
		const match = config.match(/\bbase\s*:\s*['"]([^'"]+)['"]/);
		return match ? match[1].replace(/^\/+|\/+$/g, '') : '';
	} catch { return ''; }
}

async function fileExists(file) {
	try { await fs.access(file); return true; } catch { return false; }
}

async function mapLimit(values, concurrency, worker) {
	let cursor = 0;
	const runners = Array.from({ length: Math.min(concurrency, values.length) }, async () => {
		while (cursor < values.length) {
			const index = cursor++;
			await worker(values[index]);
		}
	});
	await Promise.all(runners);
}
