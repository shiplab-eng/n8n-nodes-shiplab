import type { Icon } from 'n8n-workflow';

/** Official Shiplab mark — file lives next to the node (reliable with Docker dist mount). */
export const shiplabIcon: Icon = {
	light: 'file:shiplab.png',
	dark: 'file:shiplab.dark.png',
};

/** Routing joins baseURL and each operation's path verbatim, so a base URL saved with a trailing slash would produce "//profile". */
export const baseUrlExpression =
	'={{ $credentials.baseUrl.endsWith("/") ? $credentials.baseUrl.slice(0, -1) : $credentials.baseUrl }}';

export const requestDefaults = {
	baseURL: baseUrlExpression,
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
