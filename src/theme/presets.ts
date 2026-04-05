export interface ThemeColors {
	ink: string;
	inkLight: string;
	stone: string;
	sand: string;
	sandDark: string;
	cream: string;
	accent: string;
	accentDark: string;
	accentLight: string;
	accentGlow: string;
	boxShadow: string;
	boxShadowLg: string;
	boxShadowHover: string;
}

export interface ThemePreset {
	light: ThemeColors;
	dark: ThemeColors;
}

const darkNeutrals = {
	ink: '234, 237, 240',
	inkLight: '190, 198, 208',
	stone: '148, 155, 164',
	sand: '35, 39, 44',
	sandDark: '45, 50, 56',
	cream: '22, 25, 29',
	boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 3px 10px rgba(0,0,0,0.15)',
	boxShadowLg: '0 4px 20px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.2)',
	boxShadowHover: '0 8px 30px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)',
};

const lightNeutrals = {
	ink: '28, 32, 36',
	inkLight: '55, 65, 81',
	stone: '120, 113, 108',
	sand: '245, 243, 240',
	sandDark: '235, 231, 226',
	cream: '252, 251, 249',
	boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 3px 10px rgba(0,0,0,0.03)',
	boxShadowLg: '0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
	boxShadowHover: '0 8px 30px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
};

export const presets: Record<string, ThemePreset> = {
	jade: {
		light: {
			...lightNeutrals,
			accent: '#2d8a72',
			accentDark: '#1e6b58',
			accentLight: '#3da88a',
			accentGlow: 'rgba(45, 138, 114, 0.08)',
		},
		dark: {
			...darkNeutrals,
			accent: '#3da88a',
			accentDark: '#2d8a72',
			accentLight: '#5bc4a6',
			accentGlow: 'rgba(61, 168, 138, 0.1)',
		},
	},
	blue: {
		light: {
			...lightNeutrals,
			accent: '#3b82f6',
			accentDark: '#2563eb',
			accentLight: '#60a5fa',
			accentGlow: 'rgba(59, 130, 246, 0.08)',
		},
		dark: {
			...darkNeutrals,
			accent: '#60a5fa',
			accentDark: '#3b82f6',
			accentLight: '#93bbfd',
			accentGlow: 'rgba(96, 165, 250, 0.1)',
		},
	},
	purple: {
		light: {
			...lightNeutrals,
			accent: '#8b5cf6',
			accentDark: '#7c3aed',
			accentLight: '#a78bfa',
			accentGlow: 'rgba(139, 92, 246, 0.08)',
		},
		dark: {
			...darkNeutrals,
			accent: '#a78bfa',
			accentDark: '#8b5cf6',
			accentLight: '#c4b5fd',
			accentGlow: 'rgba(167, 139, 250, 0.1)',
		},
	},
	orange: {
		light: {
			...lightNeutrals,
			accent: '#f59e0b',
			accentDark: '#d97706',
			accentLight: '#fbbf24',
			accentGlow: 'rgba(245, 158, 11, 0.08)',
		},
		dark: {
			...darkNeutrals,
			accent: '#fbbf24',
			accentDark: '#f59e0b',
			accentLight: '#fcd34d',
			accentGlow: 'rgba(251, 191, 36, 0.1)',
		},
	},
};
