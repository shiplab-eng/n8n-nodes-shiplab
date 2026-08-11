import type { INodeProperties } from 'n8n-workflow';

const showForProfile = { resource: ['profile'] };

export const profileDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showForProfile,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get profile',
				description: 'Get the authenticated customer profile',
				routing: {
					request: {
						method: 'GET',
						url: '/profile',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update profile',
				description: 'Update billing fields on the authenticated customer profile',
				routing: {
					request: {
						method: 'PUT',
						url: '/profile',
					},
				},
			},
		],
		default: 'get',
	},
	{
		displayName: 'Billing Fields',
		name: 'billingFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showForProfile,
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Billing Address 1',
				name: 'billingAddress1',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_address_1',
					},
				},
			},
			{
				displayName: 'Billing Address 2',
				name: 'billingAddress2',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_address_2',
					},
				},
			},
			{
				displayName: 'Billing Address City',
				name: 'billingAddressCity',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_address_city',
					},
				},
			},
			{
				displayName: 'Billing Address Country',
				name: 'billingAddressCountry',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_address_country',
					},
				},
			},
			{
				displayName: 'Billing Address State',
				name: 'billingAddressState',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_address_state',
					},
				},
			},
			{
				displayName: 'Billing Address Zip',
				name: 'billingAddressZip',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_address_zip',
					},
				},
			},
			{
				displayName: 'Billing Contact Name',
				name: 'billingContactName',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'billing_contact_name',
					},
				},
			},
			{
				displayName: 'Billing Email Address',
				name: 'billingEmailAddress',
				type: 'string',
				default: '',
				placeholder: 'billing@example.com',
				routing: {
					send: {
						type: 'body',
						property: 'billing_email_address',
					},
				},
			},
		],
		description: 'Billing fields to update (same as portal Profile). Only included fields are sent.',
	},
];
