// ============================================================
// 友链配置
// 添加新友链只需在数组中追加一项即可
// ============================================================

export interface Friend {
	name: string;        // 站点名称
	url: string;         // 站点地址
	avatar: string;      // 头像 URL
	description: string; // 一句话描述
}

export const FRIENDS: Friend[] = [
	{
		name: "186526's Blog",
		url: 'https://blog.186526.xyz',
		avatar: 'https://i.186526.xyz/avatar',
		description: '啥都不会的屑、Arch Linux、吹水大师（群内 Arch 带师）',
	},
	{
		name: 'Pil0tXia - 浮笙事记',
		url: 'https://www.pil0txia.com',
		avatar: 'https://static.pil0txia.com/assets/03_3_600p.webp',
		description: '不会摄影的白帽子不是好机长！',
	},
	{
		name: 'Windsys Project',
		url: 'https://windsys.win',
		avatar: 'https://windsys.win/logo',
		description: '也许是最适合年轻人使用的第三方社区系统',
	},
	{
		name: 'Xunflash',
		url: 'https://xunflash.top',
		avatar: 'https://xunflash.top/icon.png',
		description: '咕咕咕',
	},
	{
		name: 'Yang’s Blog',
		url: 'https://klyang.com/',
		avatar: 'https://klyang.com/favicon.png',
		description: '努力学习',
	},
	{
		name: '关关&六六',
		url: 'https://www.gmcllp.cn/',
		avatar: 'https://www.gmcllp.cn/favicon.ico',
		description: '向世界分享我们的故事。',
	},
	{
		name: '小杨生活志',
		url: 'https://www.yanghuaxing.com',
		avatar: 'https://pic.yanghuaxing.com/zb_users/upload/2021/01/202101041609753285872440.jpeg',
		description: '我们都有属于自己的单车，一切都那么简单，生活大部分是平淡。',
	},
	{
		name: '清幽博客',
		url: 'https://www.7uun.com/',
		avatar: 'https://friends.7uun.com/ico.png',
		description: '专注优质网络资源分享的技术博客',
	},
	{
		name: '爱吃肉的猫',
		url: 'https://meuicat.com/',
		avatar: 'https://s1.ax1x.com/2023/05/26/p9qChjI.jpg',
		description: '有肉有猫有生活。',
	},
	{
		name: '红雨酱巨佬的博客',
		url: 'https://blog.skrshadow.cn/',
		avatar: 'https://q2.qlogo.cn/g?b=qq&nk=2937306076&s=100',
		description: '',
	},
	{
		name: '舰长胡椒',
		url: 'https://b.fffc.fun/',
		avatar: 'https://b.fffc.fun/assets/230x0w.webp',
		description: '来不及解释了，快上船',
	},
	{
		name: '魂笙',
		url: 'https://315520.xyz/',
		avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2298191256&s=640',
		description: '人生无根笙魂隐，飘如陌上物废魂',
	},
];
