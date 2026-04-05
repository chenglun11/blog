// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
//
// Deployment notes:
// - GitHub Pages: uses the default static output (no adapter needed).
// - Vercel: auto-detected via vercel.json. For SSR, add @astrojs/vercel
//   and set output: 'server'. Static mode works out of the box.
export default defineConfig({
	site: 'https://chenglun11.github.io',
	base: '/blog/',
	integrations: [mdx(), sitemap()],
});
