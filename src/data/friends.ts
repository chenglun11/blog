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
		name: '示例博客',
		url: 'https://example.com',
		avatar: 'https://via.placeholder.com/80',
		description: '一个示例友链',
	},
];
