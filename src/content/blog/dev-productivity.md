---
title: '开发者效率指南：我的工具箱'
description: '分享我日常开发中使用的工具和工作流，帮助你提升编码效率。'
pubDate: '2026-03-05'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

## 编辑器与终端

### VS Code 必备扩展

经过多年的筛选，以下是我觉得真正不可或缺的扩展：

- **GitLens**：让 Git 历史可视化，快速了解每一行代码的来龙去脉
- **Error Lens**：把错误和警告直接显示在代码行内，不用再盯着问题面板
- **Prettier**：统一代码格式，消除团队中的格式争论

### 终端工具

现代终端工具可以显著提升命令行体验：

```bash
# 用 eza 替代 ls，更美观的文件列表
eza --icons --git -la

# 用 zoxide 替代 cd，智能跳转目录
z blog  # 自动跳转到最常访问的包含 "blog" 的目录

# 用 ripgrep 替代 grep，速度快几个数量级
rg "TODO" --type ts
```

## Git 工作流

### 提交信息规范

好的提交信息是项目可维护性的基础。我使用 Conventional Commits 规范：

```
feat: 添加文章搜索功能
fix: 修复移动端导航栏显示异常
docs: 更新部署文档
refactor: 重构文章列表组件
```

### 有用的 Git 别名

```bash
# ~/.gitconfig
[alias]
  lg = log --oneline --graph --decorate -20
  co = checkout
  st = status -sb
  unstage = reset HEAD --
```

## 自动化

### 脚本化重复任务

任何需要手动执行超过三次的操作，都值得写成脚本。例如，一个简单的新文章创建脚本：

```bash
#!/bin/bash
TITLE=$1
SLUG=$(echo "$TITLE" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
DATE=$(date +%Y-%m-%d)

cat > "src/content/blog/${SLUG}.md" << EOF
---
title: '${TITLE}'
description: ''
pubDate: '${DATE}'
---

在这里开始写作...
EOF

echo "已创建: src/content/blog/${SLUG}.md"
```

## 最后的建议

工具终究只是工具，最重要的是养成好的习惯。定期回顾自己的工作流，找到瓶颈，然后用合适的工具去解决它。不要为了用工具而用工具，简单和高效往往是一体的。
