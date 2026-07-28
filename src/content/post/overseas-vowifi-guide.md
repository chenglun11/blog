---
title: '海外 VoWiFi（Wi-Fi Calling）开启与排障指南'
description: '整理海外电话卡在 iPhone 和 Android 上启用 Wi-Fi Calling 的前置条件、地区网络配置、IMS 判断方法与常见故障。'
pubDate: '2026-05-02'
updatedDate: '2026-07-28'
tags: ['VoWiFi', 'Wi-Fi Calling', 'iPhone', 'Android', '网络']
---

> **来源说明**：本文根据 NodeSeek 用户 **iniwex** 发布的《[海外 VoWiFi（Wi-Fi Calling）开启指南：iPhone、Android、代理规则](https://www.nodeseek.com/post-711032-1)》整理、改写，仅作个人备份与查阅。原文发布于 2026 年 5 月 2 日，相关经验及权利归原作者所有。运营商策略、系统行为和网络环境可能随时变化，实际操作请以运营商最新说明为准。

VoWiFi（Wi-Fi Calling）能让手机在蜂窝信号较弱甚至无服务时，通过 Wi-Fi 继续使用运营商原生电话与短信。不过，设置页面里出现并打开开关，并不等于已经连接成功。真正的成功标志是手机完成 **IMS 注册**。

## 先判断是否真的成功

| 设备 | 判断方式 |
| --- | --- |
| iPhone | 状态栏出现 Wi-Fi Calling；“关于本机”中的 IMS 状态显示 Voice、SMS 或 Voice & SMS |
| Android | 状态栏出现 Wi-Fi Calling / WLAN Call，或 SIM 状态中的移动网络类型变成 IWLAN |
| 通用验证 | 保持飞行模式并连接 Wi-Fi，实际测试原生电话和短信 |

如果用途主要是接收验证码，必须单独测试短信接收。能打电话，不代表 SMS over IMS 也已经注册。

## 开始前的检查清单

先确认以下条件，否则后面的网络配置可能都是无用功：

- 号码与当前套餐支持 Wi-Fi Calling；
- 号码已激活、未欠费或停机；
- 运营商后台不需要额外开通，或已经在 App / 官网完成开通；
- 美国卡已设置 E911 地址；
- 香港卡的套餐包含语音分钟，纯流量套餐通常无法正常使用 VoWiFi。

## 不同地区卡的重点

### 美国卡：首次配置留意 E911

美国卡首次启用 Wi-Fi Calling 时，通常需要用美国 IP 打开并保存 E911 地址。配置完成后，许多运营商允许漫游 VoWiFi，日常注册不一定每次都需要美国 IP。

换手机、重置网络或重装系统后，如果无法注册，可以先检查 E911 是否仍然有效，再切回美国出口重新配置。

### 英国及欧洲卡：优先使用运营商本国 IP

不要照搬美国卡的漫游经验。英国和不少欧洲运营商对跨境 VoWiFi 的支持有限，建议让网络出口与运营商所在国家一致，例如英国卡使用英国 IP、德国卡使用德国 IP。

### 德国 Vodafone：检查 ePDG DNS

德国 Vodafone 除了需要德国出口，还可能遇到 ePDG 域名无法解析的问题：

```text
epdg.epc.mnc002.mcc262.pub.3gppnetwork.org
```

必要时可以将其映射到下面任意一个地址，建议一次只选一个，连接不稳定时再更换：

```text
139.7.117.168
139.7.117.169
139.7.117.170
```

例如：

```text
139.7.117.168 epdg.epc.mnc002.mcc262.pub.3gppnetwork.org
```

## iPhone 设置重点

iPhone 除了系统定位，还会通过 Apple 服务判断地区。可以让下面的域名走当前运营商所在地区的代理节点：

```text
gspe1-ssl.ls.apple.com
```

例如英国卡走英国节点、香港卡走香港节点、德国卡走德国节点。部分新版 iOS 的地区识别可能还受到设备定位信息影响，仅修改代理未必足够。

查看 IMS 状态的路径通常是：

> 设置 → 通用 → 关于本机 → 点按“运营商”字段，切换到 IMS 状态

- `Voice & SMS`：语音和短信均已注册；
- `Voice`：语音已注册，短信仍需实测；
- `SMS`：短信已注册，语音未必可用；
- 空白或 `Not Registered`：尚未完成注册。

## Android 设置重点

Android 的常见问题是系统隐藏 Wi-Fi Calling 开关。可以尝试使用 **Pixel IMS + Shizuku** 显示或保持 IMS / VoWiFi 设置，但这只能处理开关，不保证注册一定成功。

最终仍应检查：

> 设置 → 关于本机 → SIM 卡状态 → 移动网络类型

显示 `IWLAN` 通常代表 VoWiFi 已连接。部分机型也可以拨打 `*#*#4636#*#*` 查看 IMS Registration，但不同品牌和 ROM 的支持情况不一致。

## 推荐开启流程

1. 确认号码、套餐、E911 或语音分钟等基础条件。
2. 关闭定位，准备对应国家或地区的代理；iPhone 同时处理 Apple 地区检测域名。
3. 确保代理覆盖系统流量，而不只是浏览器流量，并检查 DNS、IPv6 和 UDP 是否泄漏。
4. 先在系统设置中打开 Wi-Fi Calling。Android 没有开关时，再考虑 Pixel IMS 与 Shizuku。
5. 实体 SIM 拔卡；eSIM 则先停用。随后打开飞行模式并重启手机，重启后继续保持飞行模式。
6. 手动打开 Wi-Fi，连接已配置代理的网络，确认出口地区正确。
7. 在保持飞行模式、Wi-Fi 和代理均正常的情况下插回 SIM 或启用 eSIM。
8. 等待 30 秒至 2 分钟，不要频繁切换节点、飞行模式或 Wi-Fi Calling 开关。
9. 检查 IMS / IWLAN 状态，并实际测试拨号、短信发送与短信接收。

VoWiFi 注册常使用 UDP 500 和 UDP 4500。代理软件中看到相关连接只能作为排障线索，并不能单独证明注册成功；完全看不到时，则应检查节点是否支持 UDP，以及系统流量有没有真正经过全局、TUN 或路由器代理。

## Surge 规则参考

下面的规则按目标 IP 所属地区，将 UDP 500 / 4500 交给相应节点。节点名称要按自己的 Surge 配置修改：

```ini
# Apple 地区检测
DOMAIN,gspe1-ssl.ls.apple.com,VoWiFi地区节点

# VoWiFi / ePDG
AND,((GEOIP,GB),(AND,((PROTOCOL,UDP),(OR,((DEST-PORT,500),(DEST-PORT,4500))))))),英国节点
AND,((GEOIP,DE),(AND,((PROTOCOL,UDP),(OR,((DEST-PORT,500),(DEST-PORT,4500))))))),德国节点
AND,((GEOIP,HK),(AND,((PROTOCOL,UDP),(OR,((DEST-PORT,500),(DEST-PORT,4500))))))),香港节点
AND,((GEOIP,US),(AND,((PROTOCOL,UDP),(OR,((DEST-PORT,500),(DEST-PORT,4500))))))),美国节点
AND,((GEOIP,CH),(AND,((PROTOCOL,UDP),(OR,((DEST-PORT,500),(DEST-PORT,4500))))))),瑞士节点
```

这只是基础模板。实际使用时还要结合运营商 ePDG 的解析结果，并确保 DNS 跟随代理、IPv6 不泄漏、节点支持 UDP。

## 香港 Android 的特殊情况

部分香港运营商配置会要求开启定位后，系统才允许打开 Wi-Fi Calling。使用可切换运营商配置的实体 eSIM 卡时，可以尝试：先切换到香港配置并打开定位，保存 Wi-Fi Calling 开关状态；再切到其他配置、关闭定位并准备好网络；最后切回香港配置等待 IMS 注册。

这个办法只是在尝试保留开关状态，无法解决套餐不含语音、账号无权限或网络无法注册等问题。香港卡仍需同时满足：套餐有语音分钟、号码支持 Wi-Fi Calling、网络出口合适，并最终显示 IWLAN 或 Wi-Fi Calling。

## 常见故障速查

| 现象 | 优先检查 |
| --- | --- |
| 没有 Wi-Fi Calling 开关 | 套餐支持情况、系统是否隐藏开关，Android 是否需要 Pixel IMS |
| 美国卡无法启用 | E911 是否配置，首次配置是否使用美国 IP |
| 英国 / 欧洲卡不注册 | 是否使用运营商所在国家的本地 IP |
| 德国 Vodafone 不注册 | ePDG 域名是否正确解析 |
| 香港卡无法使用 | 套餐是否包含语音分钟、号码是否支持 Wi-Fi Calling |
| 开关已打开但无反应 | IMS / IWLAN、代理地区、DNS、UDP 与系统流量路由 |
| 能通话但收不到短信 | SMS over IMS 可能未注册，需要单独测试短信 |

## 小结

VoWiFi 的核心不是“打开开关”，而是让手机在符合运营商要求的账号、地区与网络环境中完成 IMS 注册。最稳妥的排查顺序是：**先查套餐与账号，再查系统 IMS 状态，最后检查代理地区、DNS、IPv6 和 UDP 路由**。
