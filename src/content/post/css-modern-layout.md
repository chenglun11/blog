---
title: 'CSS 现代布局：Grid 与 Flexbox 实战'
description: '通过实际案例对比 CSS Grid 和 Flexbox 的使用场景，掌握现代 CSS 布局的最佳实践。'
pubDate: '2026-03-14'
heroImage: '../../assets/blog-placeholder-4.jpg'
tags: ['CSS', '布局', '前端']
---

## 选择困难症：Grid 还是 Flexbox？

很多开发者在布局时会纠结：这个场景该用 Grid 还是 Flexbox？

**简单的判断标准**：
- **一维布局**（行或列）→ Flexbox
- **二维布局**（行和列）→ Grid
- **内容驱动**（大小由内容决定）→ Flexbox
- **布局驱动**（先定义网格结构）→ Grid

但实际项目中，两者经常配合使用。

## Flexbox 实战

### 案例 1：导航栏

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
```

```html
<nav class="nav">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li><a href="/">首页</a></li>
    <li><a href="/blog">博客</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>
```

### 案例 2：卡片列表（自适应）

```css
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.card {
  flex: 1 1 300px;  /* 最小宽度 300px，自动伸缩 */
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

这样的布局会自动适应容器宽度，不需要媒体查询。

### 案例 3：垂直居中

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

Flexbox 让垂直居中变得简单。

## Grid 实战

### 案例 1：经典的圣杯布局

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

Grid 的 `grid-template-areas` 让布局结构一目了然。

### 案例 2：响应式图片画廊

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
```

`auto-fit` 和 `minmax` 的组合实现了完美的响应式布局。

### 案例 3：复杂的杂志布局

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}

.feature {
  grid-column: 1 / 9;  /* 占 8 列 */
  grid-row: 1 / 3;     /* 占 2 行 */
}

.article-1 {
  grid-column: 9 / 13; /* 占 4 列 */
}

.article-2 {
  grid-column: 9 / 13;
}

.sidebar {
  grid-column: 1 / 5;
}

.content {
  grid-column: 5 / 13;
}
```

Grid 让复杂的不规则布局变得可控。

## 组合使用

实际项目中，Grid 和 Flexbox 经常嵌套使用：

```css
/* 外层用 Grid 定义整体结构 */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* 内层用 Flexbox 排列内容 */
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## 现代 CSS 技巧

### 1. 使用 gap 代替 margin

```css
/* ❌ 老方法 */
.list > * + * {
  margin-top: 1rem;
}

/* ✅ 新方法 */
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

### 2. aspect-ratio 保持比例

```css
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.avatar {
  aspect-ratio: 1;
  width: 48px;
  border-radius: 50%;
}
```

### 3. clamp() 实现流式排版

```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* 最小 1.5rem，理想 5vw，最大 3rem */
}

.container {
  width: clamp(320px, 90%, 1200px);
  margin: 0 auto;
}
```

### 4. 自定义属性实现主题

```css
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
}

.card {
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
}
```

## 常见布局模式

### 1. 等高卡片

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1;  /* 撑满剩余空间 */
}

.card-footer {
  margin-top: auto;  /* 推到底部 */
}
```

### 2. 粘性页脚

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
}
```

### 3. 侧边栏自适应

```css
.container {
  display: grid;
  grid-template-columns: minmax(200px, 250px) 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

## 调试技巧

### 1. 使用浏览器开发工具

Chrome DevTools 的 Grid 和 Flexbox 检查器非常强大：
- 可视化显示网格线
- 高亮显示 gap
- 显示对齐方式

### 2. 添加边框调试

```css
* {
  outline: 1px solid red;
}
```

快速查看元素的实际占用空间。

### 3. 使用 CSS Grid 生成器

- [CSS Grid Generator](https://cssgrid-generator.netlify.app/)
- [Flexbox Playground](https://flexbox.tech/)

可视化工具帮助理解布局。

## 性能考虑

Grid 和 Flexbox 的性能都很好，但要注意：

1. **避免深层嵌套**：过多的嵌套会影响渲染性能
2. **合理使用 auto**：`auto` 值需要计算，大量使用可能影响性能
3. **优先使用 transform**：动画时用 `transform` 而不是改变布局属性

## 总结

现代 CSS 布局的核心是：
- **Flexbox**：处理一维布局，内容驱动
- **Grid**：处理二维布局，布局驱动
- **组合使用**：发挥各自优势

掌握这两个工具，你可以优雅地实现几乎所有布局需求，不再需要 float 和 position 的各种 hack。

从今天开始，在新项目中尝试用 Grid 和 Flexbox 替代传统布局方式，你会发现 CSS 原来可以这么简单。
