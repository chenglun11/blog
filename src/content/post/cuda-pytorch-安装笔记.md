---
title: "CUDA & Pytorch 安装笔记"
description: "每一次更换环境都要找一遍CUDA和pytorch的安装指南，且质量都参差不齐。在这一次安装时，我决定全程记录。Update Time：2025.10.27 一、确认CUDA版本 打开powershell，并使用 nvidia-smi检查cuda版本（注意pytorch与cuda会存在版本兼容问题，此步务必确认） 二、下载安装合适版本的CUDA Toolkit"
pubDate: "2025-10-27T16:31:02.000Z"
updatedDate: "2025-10-27T16:31:10.000Z"
tags: ["计算机基础"]
categories: ["学习笔记"]
wordpressId: 3968
oldUrl: "https://blog.lchnan.cn/archives/3968"
---
每一次更换环境都要找一遍CUDA和pytorch的安装指南，且质量都参差不齐。在这一次安装时，我决定全程记录。Update Time：2025.10.27

## 一、确认CUDA版本

1.  打开powershell，并使用 nvidia-smi检查cuda版本（注意pytorch与cuda会存在版本兼容问题，此步务必确认）

## 二、下载安装合适版本的CUDA Toolkit

本文档更新时版本为：13.0.2

> 1.  CUDA toolkit官网[https://developer.nvidia.com/cuda-downloads](https://developer.nvidia.com/cuda-downloads)
> 2.  CUDA toolkit历史版本库[CUDA Toolkit Archive | NVIDIA Developer](https://developer.nvidia.com/cuda-toolkit-archive)

cuda安装过程不再赘述，直接安装即可。

[https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html)cuda与tool对应版本与最低驱动版本

## 三、检查CUDA Toolkit

在powershell中使用 nvcc -V 检查版本。

![](/blog/wp-content/uploads/2025/10/屏幕截图-2025-10-27-235003.png)

若无，编辑系统环境变量：

1.  进入环境变量
2.  添加环境变量CUDA\_HONE，值为 C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v13.0（自行修改版本号）
3.  修改Path变量，追加 %CUDA\_HOME%\\bin

## 四、创建python venv

anaconda、uv等安装不在本文档内赘述，且本文档使用的为conda

```
conda create -n [name] python=3.12.0 matplotlib numpy pandas
# 安装python3.12.0，matplotlib，numpy，pandas常用的库
```

创建完成后：

```
conda activate [name]
# 请不要关闭powershell，下一步将安装pytorch
```

## 五、下载安装合适版本Pytorch

Pytorch 官网：[Get Started](https://pytorch.org/get-started/locally/#windows-prerequisites)

![](/blog/wp-content/uploads/2025/10/屏幕截图-2025-10-27-235356.png)

自行选择相应的版本（本文档为CUDA13.0），并在激活了的venv中输入命令并等待。

如果遇到安装失败，请更换为powershell管理员再次进行步骤五。

## 六、检查GPU是否可用

同样的powershell

```
1.python
2.import torch
3.torch.cuda.is_available()
```
