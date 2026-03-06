# 我的 Astro 博客

基于 Astro 构建的现代化静态博客，支持 GitHub Pages 和 Vercel 部署。

🌐 **在线访问**: https://chenglun11.github.io/blog/

## ✨ 特性

- ✅ 极简设计，专注内容
- ✅ 100/100 Lighthouse 性能评分
- ✅ SEO 友好（canonical URLs + OpenGraph）
- ✅ 自动生成 Sitemap
- ✅ RSS Feed 支持
- ✅ Markdown & MDX 支持
- ✅ 自动部署到 GitHub Pages
- ✅ 支持 Vercel 一键部署

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/chenglun11/blog.git
cd blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:4321 查看博客。

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（localhost:4321） |
| `npm run build` | 构建生产版本到 `./dist/` |
| `npm run preview` | 本地预览构建结果 |

## 📝 如何添加新文章

1. 在 `src/content/blog/` 目录下创建新的 `.md` 文件
2. 添加 frontmatter 元数据：

```markdown
---
title: '文章标题'
description: '文章简介'
pubDate: 'Mar 06 2026'
heroImage: '/blog/placeholder-hero.jpg'
---

这里是文章正文...
```

3. 保存文件，开发服务器会自动刷新

### Frontmatter 字段说明

- `title`: 文章标题（必填）
- `description`: 文章简介（必填）
- `pubDate`: 发布日期（必填）
- `heroImage`: 封面图片路径（可选）
- `updatedDate`: 更新日期（可选）

## 🎨 自定义配置

### 修改站点信息

编辑 `src/consts.ts`:

```typescript
export const SITE_TITLE = '你的博客标题';
export const SITE_DESCRIPTION = '你的博客描述';
```

### 修改部署 URL

编辑 `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/your-repo-name',
  // ...
});
```

## 🚢 部署方式

### 方式一：GitHub Pages（自动部署）

本仓库已配置 GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建并部署
3. 访问 https://chenglun11.github.io/blog/

工作流配置文件：`.github/workflows/deploy.yml`

### 方式二：Vercel（一键部署）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chenglun11/blog)

或手动部署：

1. 访问 [Vercel](https://vercel.com)
2. 导入 GitHub 仓库
3. Vercel 自动检测 Astro 框架
4. 点击 Deploy

Vercel 会自动识别 `vercel.json` 配置。

## 📁 项目结构

```
├── public/              # 静态资源（图片、字体等）
├── src/
│   ├── components/      # Astro 组件
│   ├── content/
│   │   └── blog/        # 博客文章（Markdown）
│   ├── layouts/         # 页面布局
│   ├── pages/           # 路由页面
│   ├── styles/          # 全局样式
│   └── consts.ts        # 站点配置
├── .github/
│   └── workflows/       # GitHub Actions 配置
├── astro.config.mjs     # Astro 配置
├── package.json
└── vercel.json          # Vercel 配置
```

## 🔧 技术栈

- [Astro](https://astro.build) - 静态站点生成器
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [MDX](https://mdxjs.com/) - Markdown 增强

## 📚 了解更多

- [Astro 文档](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [Content Collections 指南](https://docs.astro.build/en/guides/content-collections/)

## 📄 许可

基于 [Bear Blog](https://github.com/HermanMartinus/bearblog/) 主题构建。
