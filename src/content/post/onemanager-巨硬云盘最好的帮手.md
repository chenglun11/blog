---
title: "OneManager-巨硬云盘最好的帮手"
description: "众所周知，巨硬个人版在国内是一个服务器都不给（抠门），我也是被迫换成了世纪互联版的OneDrive。今天刷GayHub发现了个好东西，查看链接赶紧部署，把原本Bug百出的Cloudreve给换了…… 下载链接：查看链接 DEMO: https://od.lchnan.cnHow to Install:1.Start web service on your s"
pubDate: "2021-07-08T05:08:40.000Z"
updatedDate: "2024-01-04T06:36:50.000Z"
tags: ["巨硬"]
categories: ["服务器"]
wordpressId: 30
oldUrl: "https://blog.lchnan.cn/archives/30"
---
众所周知，巨硬个人版在国内是一个服务器都不给（抠门），我也是被迫换成了世纪互联版的OneDrive。今天刷GayHub发现了个好东西，[查看链接](https://github.com/qkqpttgf/OneManager-php)赶紧部署，把原本Bug百出的Cloudreve给换了……

**下载链接：[查看](https://github.com/qkqpttgf/OneManager-php/archive/refs/tags/v3.1.zip)链接**

DEMO: [https://od.lchnan.cn](http://od.lchnan.cn)  
How to Install:  
1.Start web service on your server (httpd or other), make sure you can visit it.  
启动web服务器，确保你能访问到。  
2.Make the rewrite works, the rule is in .htaccess file, make sure any query redirect to index.php.  
开启伪静态(重写)功能，规则在.htaccess文件中，ngnix从里面复制，我们的目的是不管访问什么都让index.php来处理。  
3.Upload code.  
上传好代码。  
4.Change the file .data/config.php can be read&write (666 is suggested).  
使web身份可读写代码中的.data/config.php文件，推荐chmod 666 .data/config.php。  
5.View the website in chrome or other.  
在浏览器中访问。

**下面是教程**

![](/blog/wp-content/uploads/2021/07/image-1024x280.png)

添加一个OneDrive盘

![](/blog/wp-content/uploads/2021/07/image-1.png)

根据你所需要的添加  
如果是个人版请选MS，世纪互联选CN

然后一步一步获取refresh\_token，文件建议在OneDrive网页上传。一定记得要回来刷新缓存！！！

主题我选用186大佬的 [renexmoe](https://github.com/186526/onemanager-theme-renexmoe)

![](/blog/wp-content/uploads/2021/07/image-2-1024x560.png)

![](/blog/wp-content/uploads/2021/07/image-3-1024x560.png)

# Functional files 功能性文件

### [](https://github.com/qkqpttgf/OneManager-php#faviconico)favicon.ico

put it in the showing home folder of FIRST disk (maybe not root of onedrive). 放在第一个盘的显示目录（不一定是onedrive根目录）。

### [](https://github.com/qkqpttgf/OneManager-php#indexhtml)index.html

show content of index.html as html. 将index.html以静态网页显示出来。

### [](https://github.com/qkqpttgf/OneManager-php#headmd-readmemd)head.md readme.md

it will showed at top or bottom as markdown. 以MD语法显示在顶部或底部。

### [](https://github.com/qkqpttgf/OneManager-php#headomf-footomf)head.omf foot.omf

it will showed at top or bottom as html (javascript works!). 以html显示在顶部或底部（可以跑js）。
