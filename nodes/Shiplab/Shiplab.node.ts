import {
	NodeConnectionTypes,
	type ILoadOptionsFunctions,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { encodeCarrierValue, fetchCarrierConfigs, requirementHint } from '../carrierFields';
import { requestDefaults, shiplabCredentials, shiplabIcon } from '../shared';
import { carrierDescription } from './resources/carrier';
import { connectorDescription } from './resources/connector';
import { connectorGroupDescription } from './resources/connectorGroup';
import { invoiceDescription } from './resources/invoice';
import { profileDescription } from './resources/profile';

export class Shiplab implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shiplab',
		name: 'shiplab',
		icon: shiplabIcon,
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage Shiplab profiles, connector groups, connectors, carriers, and invoices',
		defaults: { name: 'Shiplab' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: shiplabCredentials,
		requestDefaults,
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Carrier',
						value: 'carrier',
					},
					{
						name: 'Connector',
						value: 'connector',
					},
					{
						name: 'Connector Group',
						value: 'connectorGroup',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Profile',
						value: 'profile',
					},
				],
				default: 'profile',
			},
			...carrierDescription,
			...connectorDescription,
			...connectorGroupDescription,
			...invoiceDescription,
			...profileDescription,
		],
	};

	methods = {
		loadOptions: {
			async getCarriers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const carriers = await fetchCarrierConfigs.call(this);

				return carriers
					.map((carrier) => ({
						name: `${carrier.display_name || carrier.name} (${carrier.name})`,
						value: encodeCarrierValue(carrier),
						description: requirementHint(carrier),
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
			},
		},
	};
}
