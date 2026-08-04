import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { requestDefaults, shiplabCredentials, shiplabIcon } from '../shared';

export class ShiplabCarrier implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shiplab Carrier',
		name: 'shiplabCarrier',
		icon: shiplabIcon,
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'List Shiplab carriers and connection field requirements',
		defaults: { name: 'Shiplab Carrier' },
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
		],
	};
}
