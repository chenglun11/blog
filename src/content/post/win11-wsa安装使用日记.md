---
title: "Win11-WSA安装使用日记"
description: "Powered by iPlaySoft.com ！注意：仅支持Win11，你可以至file.lchnan.cn/OneDrive/System下载更新；请确保VT-h已打开，不清楚请到BIOS中检查。 1、准备 首先下载WSA组件，Android ADB Tool，这里放出组合包，查看链接下载WSA.zip 2、安装 安装 Windows 虚拟化支持： 进"
pubDate: "2022-03-04T08:03:44.000Z"
updatedDate: "2024-01-04T06:36:34.000Z"
tags: ["Win11"]
categories: ["随记"]
wordpressId: 190
oldUrl: "https://blog.lchnan.cn/archives/190"
heroImageUrl: "/blog/wp-content/uploads/2022/03/image-2.png"
---
Powered by [iPlaySoft.com](http://iPlaySoft.com)

## ！注意：仅支持Win11，你可以至[file.lchnan.cn/OneDrive/System](http://file.lchnan.cn/OneDrive/System)下载更新；请确保VT-h已打开，不清楚请到BIOS中检查。

## 1、准备

首先下载WSA组件，Android ADB Tool，这里放出组合包，[查看链接](https://od.lchnan.cn/windows/Tools/)下载WSA.zip

## 2、安装

#### 安装 Windows 虚拟化支持：

进入设置 → 应用 → 可选功能 → 更多 Windows 功能，找到并勾选开启「**Hyper-V**」和「**虚拟机平台**」两个选项，安装完成后会提示重启系统。这一步是必须的，否则可能出现 Android 子系统无法启动、错误或闪退。

1、解压

2、打开依赖文件夹，依次安装

3、安装

a解压后你会得到一个名字很长的文件；(如日后更新，你下载到的文件命名/版本号可能有所不同)

b右键点击此文件，在菜单中选择「复制文件地址」

![](/blog/wp-content/uploads/2022/03/image.png)

c右键点击「Windows 开始菜单图标」，点击「Windows 终端 (管理员)」

![](/blog/wp-content/uploads/2022/03/image-1.png)

d在弹出来的 PowerShell 命令行界面中，输入以下命令：

```
# 安装命令如下：
Add-AppxPackage 鼠标点右键会自动粘贴安装包文件路径

# 看起来大概是这样的 (示例，请确保你的路径正确)：
Add-AppxPackage "D:\文件所在的路径\wsa.Msixbundle"

# 然后回车开始进行安装
```

## 3、WSA 安装 APK 方法：

1、安装ADB

2、打开WSA开发者人员模式

![](/blog/wp-content/uploads/2022/03/image-2.png)

3、记下上图设置项中显示出来的 WSA 的内部 IP 地址和端口号，如 `127.0.0.1:58526`

4、打开adb，输入

```
# 第 0 步：确保已正确将 adb 命令加入到系统的环境变量
# 执行下面的命令能看到 adb 版本号则表示 ok
# 如有错误，请检查环境变量是否配置正确
adb version

# 第 1 步：连接 WSA
adb connect 127.0.0.1:58526
# 其中 127.0.0.1:58526 是刚才在 WSA 设置项中看到的 IP

# 第 2 步：安装 APK
# 连接成功之后，就能用下面命令来安装 APK 了
adb install 你的APK文件完整路径
# 注意 .apk 的路径最好无中文且无空格，否则需要用英文双引号包裹。
# 你可在资源管理器上右键点击 apk 文件选「复制文件地址」获取完整路径
#下面是例子：
adb install d:\download\apk\weixin.apk

# 最后按下回车即可安装
# 安装完成后，在 Windows 开始菜单的“所有应用”里就能找到你安装的 Android 应用
```

## 4、快捷安装

1、编辑wsa安装.bat

![](/blog/wp-content/uploads/2022/03/image-3.png)

其中 `C:\文件夹路径\adb.exe` 需要替换成你本机的 adb 所在路径  
(如果你已配置好环境变量，也可以只用 `adb` 代替)

而 `127.0.0.1:58526` 则要替换成你在 WSA 设置页面中看到的 IP 地址。

2、保存退出

如何使用：将下载好的apk文件 拖动到wsa.bat上即可自动安装。

## 2023.5.1更新

发现个好东西

WSA 工具箱:[ms-windows-store://pdp/?productid=9PPSP2MKVTGT](ms-windows-store://pdp/?productid=9PPSP2MKVTGT)  

![](/blog/wp-content/uploads/2023/07/1688535534-image-1024x532.png)
