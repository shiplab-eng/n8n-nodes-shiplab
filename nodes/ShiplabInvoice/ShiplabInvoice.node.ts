import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { requestDefaults, shiplabCredentials, shiplabIcon } from '../shared';

export class ShiplabInvoice implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Shiplab Invoice',
		name: 'shiplabInvoice',
		icon: shiplabIcon,
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Search Shiplab invoices',
		defaults: { name: 'Shiplab Invoice' },
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
						name: 'Search',
						value: 'search',
						action: 'Search invoices',
						description: 'Search one page of matching invoices with signed download URLs',
						routing: {
							request: {
								method: 'POST',
								url: '/search_invoices',
							},
						},
					},
					{
						name: 'Get Customer Invoices',
						value: 'searchAll',
						action: 'Get customer invoices',
						description: 'Get all matching customer invoices without pagination',
						routing: {
							request: {
								method: 'POST',
								url: '/search_invoices_all',
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'YYYY-MM-DD',
				displayOptions: {
					show: {
						operation: ['search', 'searchAll'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'start_date',
					},
				},
				description: 'Inclusive start date (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'YYYY-MM-DD',
				displayOptions: {
					show: {
						operation: ['search', 'searchAll'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'end_date',
					},
				},
				description: 'Inclusive end date (YYYY-MM-DD)',
			},
			{
				displayName: 'Output Format',
				name: 'outputFormat',
				type: 'options',
				options: [
					{ name: 'JSON', value: 'json' },
					{ name: 'JSONL', value: 'jsonl' },
					{ name: 'CSV', value: 'csv' },
				],
				default: 'json',
				displayOptions: {
					show: {
						operation: ['search', 'searchAll'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'output_format',
					},
				},
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						operation: ['search', 'searchAll'],
					},
				},
				options: [
					{
						displayName: 'File Format',
						name: 'fileFormat',
						type: 'options',
						options: [
							{ name: 'FD2C', value: 'FD2C' },
							{ name: 'FD1C', value: 'FD1C' },
							{ name: 'U21C', value: 'U21C' },
							{ name: 'FXDC', value: 'FXDC' },
						],
						default: 'FD2C',
						routing: {
							send: {
								type: 'body',
								property: 'file_format',
							},
						},
					},
					{
						displayName: 'Connector Group ID',
						name: 'companyId',
						type: 'number',
						default: 0,
						routing: {
							send: {
								type: 'body',
								property: 'connector_group_id',
							},
						},
					},
					{
						displayName: 'Connector ID',
						name: 'credentialId',
						type: 'number',
						default: 0,
						routing: {
							send: {
								type: 'body',
								property: 'connector_id',
							},
						},
					},
				],
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
				default: 50,
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'limit',
					},
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Page Token',
				name: 'nextPageToken',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'next_page_token',
					},
				},
				description: 'Token returned by the previous page; leave empty for the first page',
			},
		],
	};
}
