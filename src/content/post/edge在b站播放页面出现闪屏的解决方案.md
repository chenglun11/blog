---
title: "Edge在B站播放页面出现闪屏的解决方案"
description: "测试成功设备： CPU AMD 6900HX GPU Nvidia 3060 Laptop 问题复现： 打开B站播放视频，滚轮滚动时有概率出现黑屏，闪屏等问题。 解决方案： 源方案由B站 视频 评论区中用户提出，具体如下所示。 测试： 删除此文件夹后，测试Edge125.0.2535.92 (正式版本) (64 位)，在此版本问题得到解决，但仍有小概率出现。"
pubDate: "2024-06-12T03:57:01.000Z"
updatedDate: "2024-06-12T03:57:07.000Z"
tags: ["edge","Win11"]
categories: ["学习笔记"]
wordpressId: 3928
oldUrl: "https://blog.lchnan.cn/archives/3928"
---
## **测试成功设备：**

CPU AMD 6900HX

GPU Nvidia 3060 Laptop

## **问题复现：**

打开B站播放视频，滚轮滚动时有概率出现黑屏，闪屏等问题。

## **解决方案：**

源方案由B站 [视频](https://www.bilibili.com/video/BV1hb421h7bg) 评论区中用户提出，具体如下所示。

![](/blog/wp-content/uploads/2024/06/cf1fedc191f473bc7a204a119b1ea0e5.webp)

## **测试：**

删除此文件夹后，测试Edge125.0.2535.92 (正式版本) (64 位)，在此版本问题得到解决，_**但仍有小概率出现**_。

## 注：

此文件夹为隐藏文件夹，若你未开启显示隐藏文件夹，可直接复制如下地址，**并修改其中的用户名称**。

```
C:\Users\用户名\AppData\Local\Microsoft\Edge\User Data\Default\Nurturing
```
