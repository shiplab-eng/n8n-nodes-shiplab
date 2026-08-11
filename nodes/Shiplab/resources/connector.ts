import type { INodeProperties } from 'n8n-workflow';
import { carrierFieldToken } from '../../carrierFields';

const showForConnector = { resource: ['connector'] };

/** Shows a connection input only for carriers whose schema lists that field. */
function showForField(fieldId: string) {
	return {
		show: {
			...showForConnector,
			operation: ['create'],
			carrier: [{ _cnd: { includes: carrierFieldToken(fieldId) } }],
		},
	};
}

export const connectorDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForConnector,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a connector',
				description: 'Create a carrier connector for a connector group',
				routing: {
					request: {
						method: 'POST',
						url: '/connector',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a connector',
				description: 'Delete a connector',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/connector/{{$parameter.connectorId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a connector',
				description: 'Get one connector by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/connector/{{$parameter.connectorId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many connectors',
				description: 'List many connectors for the authenticated customer',
				routing: {
					request: {
						method: 'GET',
						url: '/connectors',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a connector',
				description: 'Update connector fields (username and carrier cannot be changed)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/connector/{{$parameter.connectorId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Connector ID',
		name: 'connectorId',
		type: 'string',
		required: true,
		default: '',
		placeholder: '42',
		displayOptions: {
			show: {
				...showForConnector,
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Numeric connector ID',
	},
	{
		displayName: 'Connector Group ID',
		name: 'connectorGroupId',
		type: 'string',
		required: true,
		default: '',
		placeholder: '42',
		displayOptions: {
			show: {
				...showForConnector,
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'connector_group_id',
				value: '={{Number($value)}}',
			},
		},
		description: 'Connector group that will own this connector',
	},
	{
		displayName: 'Carrier Name or ID',
		name: 'carrier',
		type: 'options',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showForConnector,
				operation: ['create'],
			},
		},
		typeOptions: {
			loadOptionsMethod: 'getCarriers',
		},
		routing: {
			send: {
				type: 'body',
				property: 'carrier',
				value: '={{$value.split("|")[0]}}',
			},
		},
		description:
			'Picking a carrier reveals the connection fields that carrier needs. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		default: '',
		displayOptions: showForField('username'),
		routing: {
			send: {
				type: 'body',
				property: 'username',
			},
		},
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		default: '',
		displayOptions: showForField('password'),
		routing: {
			send: {
				type: 'body',
				property: 'password',
			},
		},
	},
	{
		displayName: 'API Key',
		name: 'apiKey',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		default: '',
		displayOptions: showForField('api_key'),
		routing: {
			send: {
				type: 'body',
				property: 'api_key',
			},
		},
	},
	{
		displayName: 'Endpoint',
		name: 'endpoint',
		type: 'string',
		default: '',
		displayOptions: showForField('endpoint'),
		routing: {
			send: {
				type: 'body',
				property: 'endpoint',
			},
		},
		description: 'Leave empty to use the default endpoint the carrier ships with, if it has one',
	},
	{
		displayName: 'Remote Directory',
		name: 'remoteDirectory',
		type: 'string',
		required: true,
		default: '',
		displayOptions: showForField('remote_directory'),
		routing: {
			send: {
				type: 'body',
				property: 'remote_directory',
			},
		},
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				...showForConnector,
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enabled',
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showForConnector,
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'API Key',
				name: 'apiKey',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'api_key',
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'enabled',
					},
				},
			},
			{
				displayName: 'Endpoint',
				name: 'endpoint',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'endpoint',
					},
				},
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'password',
					},
				},
			},
			{
				displayName: 'Remote Directory',
				name: 'remoteDirectory',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'remote_directory',
					},
				},
			},
		],
		description:
			'Only the fields you add are sent, and anything left out keeps its current value. Username and carrier cannot be changed.',
	},
];
