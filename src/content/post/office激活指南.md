---
title: "Office激活指南"
description: "Author: LCHNAN 特别鸣谢：Office Tool Plus 官方网站 - 一键部署 Office (landian.vip) 系统要求 操作系统 Windows 10 或者更高。 Windows Server 2016 或者更高。 体系结构：x86, x64 或 ARM64。 Office Tool Plus 不支持其它操作系统，例如 macO"
pubDate: "2023-12-22T10:03:27.000Z"
updatedDate: "2024-01-04T06:35:52.000Z"
tags: ["Win11"]
categories: ["学习笔记"]
wordpressId: 1234
oldUrl: "https://blog.lchnan.cn/archives/1234"
---
> Author: LCHNAN
> 
> 特别鸣谢：[Office Tool Plus 官方网站 - 一键部署 Office (landian.vip)](https://otp.landian.vip/zh-cn/)

## 系统要求

### 操作系统

-   Windows 10 或者更高。
-   Windows Server 2016 或者更高。
-   体系结构：x86, x64 或 ARM64。

> Office Tool Plus 不支持其它操作系统，例如 macOS 或者 Linux。

### 硬件要求

屏幕分辨率: 1024 x 768 或者更高。

## 下载软件

注：本站提供分流链接，也可至Office Tools Plus官方网站下载，[点此](%5B%E4%B8%8B%E8%BD%BD%20%7C%20Office%20Tool%20Plus%20%E5%AE%98%E6%96%B9%E7%BD%91%E7%AB%99%20\(landian.vip\)%5D\(https://otp.landian.vip/zh-cn/download.html\))

x64 - v10.4.5.0 [点此链接](%5BOffice_Tool_with_runtime_v10.4.5.0_x64.zip%20%7C%20LCHNAN%20GROUP%20PAN%5D\(https://file.lchnan.cn/OneDrive/EXE/Office/Office_Tool_with_runtime_v10.4.5.0_x64.zip\))

x86 - v10.4.5.0 [点此链接](%5BOffice_Tool_with_runtime_v10.4.5.0_x86.zip%20%7C%20LCHNAN%20GROUP%20PAN%5D\(https://file.lchnan.cn/OneDrive/EXE/Office/Office_Tool_with_runtime_v10.4.5.0_x86.zip\))

## 写在前面

安装开始前，请知晓以下事情：

1.  使用 Office Tool Plus 安装的 Office 是官方原版，非破解、非精简。
2.  教程没提到的产品就不要随便安装，别问，问就是不推荐。
3.  教程没提到的设置就不要随便乱动，别问，不懂就不要动。
4.  建议勾选下载后再部署，能避免因为网络不佳而卡住不动。
5.  安装 Office 出现问题时，请根据提供的错误信息排查问题；更详细的错误信息可以在 【工具箱】->【收集 Office 安装日志】获得。

Office 安装程序出现问题跟我们没有太大关系哈。举个例子，你叫了个外卖，但是送到后你觉得太难吃，这能怪骑手吗？这不能。做人要讲理，不能随便污蔑别人。

如果你有任何疑问，可前往 \[[疑难解答\] Office Tool Plus 入门教程](https://www.coolhub.top/archives/13) 查看相关问题解答。

**+** 安装开始前，请做好以下事情：

1.  卸载 WPS Office，两者共存容易出问题（没有问题当我没说）。
2.  卸载旧版本 Office，按照标准流程操作。请勿直接强制移除，有问题再强制。
3.  清除旧版本激活信息，看下面的截图来学习。
4.  清除 Office 设置，⌈工具箱⌋ - ⌈重置 Office 设置为默认设置⌋，可以选择所有选项进行删除。

## 安装

1.解压Office Tools Plus

2.打开Office Tools Plus.exe

3.**自动安装**

> 这里的命令只适用于 10.3.1.2 或者更高版本，低版本无法执行这些命令。
> 
> 如果你什么都不懂，或者，你只是想要个能用的 Office，那么使用一键安装代码是最合适的：  
> 按下 Ctrl + Shift + P 打开命令框，输入以下命令：

安装 Microsoft 365 企业应用版（Word, PowerPoint, Excel）：

```
deploy /add O365ProPlusRetail_zh-cn /O365ProPlusRetail.exclapps Access,Bing,Groove,Lync,OneDrive,OneNote,Outlook,Publisher,Teams /channel Current /dlfirst
```

安装 Microsoft 365 企业应用版（Word, PowerPoint, Excel）+ Visio 2016：

```
deploy /add "O365ProPlusRetail_zh-cn|VisioProRetail_zh-cn" /O365ProPlusRetail.exclapps Access,Bing,Groove,Lync,OneDrive,OneNote,Outlook,Publisher,Teams /VisioProRetail.exclapps Groove,OneDrive /channel Current /dlfirst
```

输入命令后请按回车（Enter）以执行命令，然后耐心等待安装完成。

## 激活

1.  清除激活信息如图所示
2.  **使用 Office Tool Plus 自动激活 Office**
3.  确保自己使用的是最新版的 Office Tool Plus，按下快捷键 Ctrl + Shift + P，打开命令框，按需复制下面的命令，粘贴后回车（Enter）以执行操作。

![](/blog/wp-content/uploads/2023/12/1901a59a833b6d992d54442e33dd2b92.webp)

如果你安装了 Microsoft 365，或者你只是单纯地在遵循教程的指示，请使用以下代码进行激活：

```
ospp /inslicid MondoVolume /sethst:kms.loli.beer /setprt:1688 /act
```

或者是把 KMS 主机换成 kms.03k.org:

```
ospp /inslicid MondoVolume /sethst:kms.03k.org /setprt:1688 /act
```

4.  激活成功
