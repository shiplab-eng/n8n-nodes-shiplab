import type { Icon } from 'n8n-workflow';

/** Official Shiplab mark — file lives next to each node (reliable with Docker dist mount). */
export const shiplabIcon: Icon = {
	light: 'file:shiplab.png',
	dark: 'file:shiplab.dark.png',
};

export const requestDefaults = {
	baseURL: '={{$credentials.baseUrl}}' as const,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};

export const shiplabCredentials = [
	{
		name: 'shiplabApi',
		required: true,
	},
];
