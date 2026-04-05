// ============================================================
// 站点基本信息
// ============================================================
export const SITE_TITLE = "Max's Blog";
export const SITE_DESCRIPTION = '目标是激励他人，感动他人，创造出值得付出时间的东西';
export const SITE_AUTHOR = 'Max Li';

// ============================================================
// 功能开关
// ============================================================
export const FEATURES = {
	comments: true,   // 是否启用评论（Giscus）
	rss: true,        // 是否启用 RSS
	toc: true,        // 是否启用文章目录
};

// ============================================================
// 社交链接（留空或删除则不显示）
// ============================================================
export const SOCIAL = {
	github: 'https://github.com/chenglun11',
	twitter: '',       // 例如 'https://x.com/yourname'
	email: 'mailto:lchnan7@outlook.com',         // 例如 'mailto:you@example.com'
	weibo: '',         // 例如 'https://weibo.com/u/youruid'
	bilibili: 'https://space.bilibili.com/83490710',      // 例如 'https://space.bilibili.com/youruid'
	zhihu: '',         // 例如 'https://www.zhihu.com/people/yourname'
};

// ============================================================
// 页脚配置
// ============================================================
export const FOOTER = {
	copyright: `© ${new Date().getFullYear()} Max's Blog`,
	tagline: '目标是激励他人，感动他人，创造出值得付出时间的东西',
	poweredBy: true,   // 显示 "使用 Astro 构建"
	icp: '苏ICP备2020053015号-2',           // 备案号，例如 '京ICP备XXXXXXXX号'
};

// ============================================================
// 评论配置（Giscus）
// 获取配置：https://giscus.app
// ============================================================
export const GISCUS = {
	repo: 'chenglun11/blog',
	repoId: 'R_kgDORf62LA',
	category: 'Announcements',
	categoryId: 'DIC_kwDORf62LM4C4EkP',
	lang: 'zh-CN',
};
