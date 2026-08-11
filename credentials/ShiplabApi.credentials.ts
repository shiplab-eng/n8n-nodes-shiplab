import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * Shiplab customer API auth.
 * API tokens must be sent as the raw Authorization value (no "Bearer " prefix).
 */
export class ShiplabApi implements ICredentialType {
	name = 'shiplabApi';

	displayName = 'Shiplab API';

	icon: Icon = {
		light: 'file:shiplab.png',
		dark: 'file:shiplab.dark.png',
	};

	documentationUrl = 'https://api.shiplab.com/llms.txt';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Customer API token (v1-…). Sent as Authorization without a Bearer prefix.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.shiplab.com',
			required: true,
			description: 'API root. Use http://host.docker.internal:8000 when calling a local API from Docker.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{ $credentials.baseUrl.endsWith("/") ? $credentials.baseUrl.slice(0, -1) : $credentials.baseUrl }}',
			url: '/profile',
			method: 'GET',
		},
	};
}
