---
title: "WIN11-WSL安装笔记"
description: "安装 WSL | Microsoft Learn 微软对WSL的笔记已经非常清楚了，我写这篇文章也只针对小白或对微软安装笔记进行分流。 一、安装前检查 win+r 键入winver 必须运行 Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）或 Windows 11。 若未达到 请更新Windows 二、安装 非常简单，以管"
pubDate: "2022-11-03T07:16:21.000Z"
updatedDate: "2024-01-04T06:36:00.000Z"
tags: ["Win11"]
categories: ["服务器"]
wordpressId: 312
oldUrl: "https://blog.lchnan.cn/archives/312"
heroImageUrl: "/blog/wp-content/uploads/2022/11/image-2.png"
---
[安装 WSL | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/install) 微软对WSL的笔记已经非常清楚了，我写这篇文章也只针对小白或对微软安装笔记进行分流。

## 一、安装前检查

win+r 键入winver

> 必须运行 Windows 10 版本 2004 及更高版本（内部版本 19041 及更高版本）或 Windows 11。
> 
> 若未达到 请更新Windows

## 二、安装

非常简单，以管理员运行终端

![](/blog/wp-content/uploads/2022/11/image.png)

键入以下：

```
wsl -install
```

> 若出现：无法解析服务器的名称或地址
> 
> 请尝试修改DNS或科学上网。目前认定为Github资源服务器无法连接（GFW）

![](/blog/wp-content/uploads/2022/11/image-2.png)

完成

> 上述命令仅在完全未安装 WSL 时才有效，如果运行 `wsl --install` 并查看 WSL 帮助文本，请尝试运行 `wsl --list --online` 以查看可用发行版列表并运行 `wsl --install -d <DistroName>` 以安装发行版。 若要卸载 WSL，请参阅[卸载旧版 WSL](https://learn.microsoft.com/zh-cn/windows/wsl/troubleshooting#uninstall-legacy-version-of-wsl) 或[注销或卸载 Linux 发行版](https://learn.microsoft.com/zh-cn/windows/wsl/basic-commands#unregister-or-uninstall-a-linux-distribution)。

## 三、更改发行版

使用 wsl --install -d <下面的Name>

```
NAME               FRIENDLY NAME
 Ubuntu             Ubuntu
 Debian             Debian GNU/Linux
 kali-linux         Kali Linux Rolling
 SLES-12            SUSE Linux Enterprise Server v12
 SLES-15            SUSE Linux Enterprise Server v15
 Ubuntu-18.04       Ubuntu 18.04 LTS
 Ubuntu-20.04       Ubuntu 20.04 LTS
 OracleLinux_8_5    Oracle Linux 8.5
 OracleLinux_7_9    Oracle Linux 7.9
```

## 四、 将版本从 WSL 1 升级到 WSL 2

使用 `wsl --install` 命令安装的新 Linux 安装将默认设置为 WSL 2。

`wsl --set-version` 命令可用于从 WSL 2 降级到 WSL 1，或将以前安装的 Linux 发行版从 WSL 1 更新到 WSL 2。

要查看 Linux 发行版是设置为 WSL 1 还是 WSL 2，请使用命令 `wsl -l -v`。

要更改版本，请使用 `wsl --set-version <distro name> 2` 命令将 `<distro name>` 替换为要更新的 Linux 发行版的名称。 例如，`wsl --set-version Ubuntu-20.04 2` 会将 Ubuntu 20.04 发行版设置为使用 WSL 2。

## 五、问题排查（若有

[排查适用于 Linux 的 Windows 子系统问题 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/wsl/troubleshooting?source=recommendations)
