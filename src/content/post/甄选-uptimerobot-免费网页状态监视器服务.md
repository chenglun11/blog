---
title: "甄选-UptimeRobot 免费网页状态监视器服务"
description: "每个网站管理者都应该拥有至少一个网页状态监控服务，没有一家服务器厂商能保证服务器 100% 正在运作，即便再牛的阿里云、腾讯云也不敢保障其稳定性达到100%，也只敢声明其稳定性达到99.975%等。 网站名称：Uptime Robot网站链接：UptimeRobot | Free Website Monitoring 下载链接：点此查看，感谢yb大佬给我们提"
pubDate: "2021-10-03T17:10:37.000Z"
updatedDate: "2024-01-04T06:36:46.000Z"
tags: []
categories: ["服务器"]
wordpressId: 77
oldUrl: "https://blog.lchnan.cn/archives/77"
heroImageUrl: "/blog/wp-content/uploads/2021/09/image.png"
---
每个网站管理者都应该拥有至少一个网页状态监控服务，没有一家服务器厂商能保证服务器 100% 正在运作，即便再牛的阿里云、腾讯云也不敢保障其稳定性达到100%，也只敢声明其稳定性达到99.975%等。

网站名称：**Uptime Robot**  
网站链接：[UptimeRobot | Free Website Monitoring](https://uptimerobot.com/)

下载链接：[点此查看](https://github.com/yb/uptime-status/releases/download/v1.5.1/uptime-status.zip)，感谢yb大佬给我们提供的服务

**首先**将status服务放到对应的服务器文件夹内

**一、配置uptimerobot**

进入 Uptime Robot 网站后，点选中心绿色的「Start Monitoring」或右上角「Sign Up」注册，注册时填写名字、Email 、密码。

_**/\*此处可能需要某不知名方式上网\*/**_

![](/blog/wp-content/uploads/2021/10/image-1024x571.png)

填写以下信息

完成后等待检测就可以看到在官网上有百分比了，进行下一步

**二、配置API接口**

![](/blog/wp-content/uploads/2021/10/image-1-1024x517.png)

得到一串Api Key，复制

**三、完成自定义配置**

修改 `config.js` 

![](/blog/wp-content/uploads/2021/10/image-2-1024x545.png)

可以按照自定义修改，完成后记得保存退出。

由于官网的Api老是出错，下一章我们来解决Api出错的问题!
