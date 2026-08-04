import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { requestDefaults, shiplabCredentials, shiplabIcon } from '../shared';

export class ShiplabConnectorGroup implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shiplab Connector Group',
		name: 'shiplabConnectorGroup',
		icon: shiplabIcon,
		group: ['transform'],
		version: [1, 2, 3],
		subtitle: '={{$parameter["operation"]}}',
		description: 'Manage connector groups in Shiplab',
		defaults: { name: 'Shiplab Connector Group' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: shiplabCredentials,
		requestDefaults,
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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
								url: '=/connector_group/{{$parameter.companyId}}',
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
								url: '=/connector_group/{{$parameter.companyId}}',
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
								url: '=/connector_group/{{$parameter.companyId}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Connector Group ID',
				name: 'companyId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
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
		],
	};
}
