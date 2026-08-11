import type { INodeProperties } from 'n8n-workflow';

const showForConnectorGroup = { resource: ['connectorGroup'] };

export const connectorGroupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForConnectorGroup,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a connector group',
				description: 'Create a connector group',
				routing: {
					request: {
						method: 'POST',
						url: '/connector_group',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a connector group',
				description: 'Delete a connector group',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/connector_group/{{$parameter.connectorGroupId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a connector group',
				description: 'Get one connector group by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/connector_group/{{$parameter.connectorGroupId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many connector groups',
				description: 'List many connector groups for the authenticated customer',
				routing: {
					request: {
						method: 'GET',
						url: '/connector_groups',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a connector group',
				description: 'Update a connector group display name',
				routing: {
					request: {
						method: 'PUT',
						url: '=/connector_group/{{$parameter.connectorGroupId}}',
					},
				},
			},
		],
		default: 'getAll',
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
				...showForConnectorGroup,
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'Numeric connector group ID',
	},
	{
		displayName: 'Display Name',
		name: 'displayName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				...showForConnectorGroup,
				operation: ['create', 'update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'display_name',
			},
		},
		description: 'Human-readable name for the connector group',
	},
];
