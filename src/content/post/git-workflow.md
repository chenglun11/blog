---
title: 'Git 工作流：从混乱到优雅'
description: '分享我在团队协作中总结的 Git 最佳实践，包括分支管理、提交规范和冲突解决策略。'
pubDate: '2026-03-10'
heroImage: '../../assets/blog-placeholder-5.jpg'
tags: ['Git', '工具', '协作']
---

## 痛点：混乱的 Git 历史

你是否遇到过这些情况：

- 提交信息写的是 "fix bug"、"update"、"aaa"
- 分支命名随意，不知道哪个分支是干什么的
- 合并代码时冲突一大堆，不知道该保留哪个版本
- Git 历史像意大利面条一样混乱

这些问题在小项目中可能不明显，但在团队协作中会严重影响效率。

## 分支策略：简化的 Git Flow

我们团队采用的是简化版的 Git Flow：

```
main (生产环境)
  ↑
develop (开发环境)
  ↑
feature/* (功能分支)
hotfix/* (紧急修复)
```

**核心原则**：
- `main` 永远是可发布的稳定版本
- `develop` 是最新的开发代码
- 所有新功能从 `develop` 创建 `feature` 分支
- 紧急修复从 `main` 创建 `hotfix` 分支

### 分支命名规范

```bash
# 功能分支
feature/user-authentication
feature/payment-integration

# 修复分支
hotfix/login-error
hotfix/payment-timeout

# 发布分支
release/v1.2.0
```

清晰的命名让团队成员一眼就能看出分支的用途。

## 提交规范：Conventional Commits

采用约定式提交格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**常用类型**：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建工具、依赖更新等

**示例**：

```bash
feat(auth): 添加 OAuth 登录支持

- 集成 Google OAuth 2.0
- 添加用户信息同步逻辑
- 更新登录页面 UI

Closes #123
```

这样的提交信息清晰、可搜索，还能自动生成 changelog。

## 实用技巧

### 1. 交互式 rebase 整理提交

在合并到主分支前，整理你的提交历史：

```bash
git rebase -i HEAD~3
```

可以合并、重新排序、修改提交信息，让历史更清晰。

### 2. 使用 stash 临时保存工作

需要切换分支但当前工作未完成？

```bash
git stash save "临时保存：正在开发的登录功能"
# 切换分支做其他事
git stash pop  # 恢复工作
```

### 3. cherry-pick 精准移植提交

只想要某个分支的特定提交？

```bash
git cherry-pick <commit-hash>
```

### 4. 使用 .gitignore 模板

不同项目类型有不同的忽略规则，使用 [gitignore.io](https://gitignore.io) 生成模板。

## 冲突解决策略

遇到合并冲突时：

1. **不要慌**：冲突是正常的，说明有人在同一个地方做了修改
2. **理解双方的改动**：看清楚 `<<<<<<<`、`=======`、`>>>>>>>` 之间的内容
3. **沟通**：不确定时找对方确认，不要随意删除别人的代码
4. **测试**：解决冲突后一定要测试功能是否正常

**工具推荐**：
- VS Code 内置的合并工具
- GitKraken（可视化工具）
- `git mergetool` 配合 vimdiff

## 团队协作建议

### Code Review 流程

1. 创建 Pull Request 时写清楚改动内容
2. 自己先 review 一遍，检查是否有遗漏
3. 至少一个人 approve 才能合并
4. 合并后删除 feature 分支

### 保护主分支

在 GitHub/GitLab 设置分支保护规则：
- 禁止直接 push 到 `main` 和 `develop`
- 要求 PR 通过 CI 检查
- 要求至少一个 review approval

## 工具推荐

- **commitizen**：交互式生成规范的提交信息
- **husky**：Git hooks 工具，提交前自动检查
- **lint-staged**：只对暂存的文件运行 linter
- **conventional-changelog**：自动生成 changelog

配置示例：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "git add"]
  }
}
```

## 总结

好的 Git 工作流不是为了增加复杂度，而是为了让协作更顺畅。核心是：

- **清晰的分支策略**：让每个人知道该在哪里工作
- **规范的提交信息**：让历史可读、可追溯
- **自动化工具**：减少人为错误

从今天开始，试着在你的项目中应用这些实践，你会发现团队协作变得更加高效。
