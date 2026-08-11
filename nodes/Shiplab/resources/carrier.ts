import type { INodeProperties } from 'n8n-workflow';

const showForCarrier = { resource: ['carrier'] };

export const carrierDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForCarrier,
		},
		options: [
			{
				name: 'Get Connection Config',
				value: 'getConnectionConfig',
				action: 'Get carrier connection config',
				description: 'List carriers and required connection fields',
				routing: {
					request: {
						method: 'GET',
						url: '/carrier_connection_config',
					},
				},
			},
		],
		default: 'getConnectionConfig',
	},
];
