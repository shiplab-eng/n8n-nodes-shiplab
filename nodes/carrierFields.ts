import type { ILoadOptionsFunctions } from 'n8n-workflow';

export type CarrierConfigRow = {
	name: string;
	display_name?: string;
	collection_method?: string;
	connection_config?: {
		required_fields?: string[];
		defaults?: Record<string, string | null>;
	};
};

/** Order the portal shows the connection inputs in. */
const FIELD_ORDER = ['password', 'api_key', 'endpoint', 'remote_directory'];

const FIELD_LABELS: Record<string, string> = {
	username: 'Username',
	password: 'Password',
	api_key: 'API Key',
	endpoint: 'Endpoint',
	remote_directory: 'Remote Directory',
};

const SEPARATOR = '|';

export async function fetchCarrierConfigs(
	this: ILoadOptionsFunctions,
): Promise<CarrierConfigRow[]> {
	const credentials = await this.getCredentials('shiplabApi');
	const baseUrl = String(credentials.baseUrl ?? '').replace(/\/+$/, '');
	const rows = await this.helpers.httpRequestWithAuthentication.call(this, 'shiplabApi', {
		method: 'GET',
		url: `${baseUrl}/carrier_connection_config`,
		headers: {
			Accept: 'application/json',
		},
	});

	return Array.isArray(rows) ? (rows as CarrierConfigRow[]) : [];
}

/**
 * Which inputs the API accepts for a carrier, mirroring CredentialCreateForm:
 * username is validated for every carrier that isn't email-collected, and each
 * entry of connection_config.required_fields gets its own validator.
 */
export function connectionFieldIds(carrier: CarrierConfigRow): string[] {
	const required = carrier.connection_config?.required_fields ?? [];
	const ids = carrier.collection_method === 'email' ? [] : ['username'];

	for (const id of FIELD_ORDER) {
		if (required.includes(id)) ids.push(id);
	}
	for (const id of required) {
		if (!ids.includes(id)) ids.push(id);
	}

	return ids;
}

/**
 * The carrier dropdown stores "name|field|field|" so each connection input can
 * decide for itself whether to show, via displayOptions `includes`. n8n resolves
 * displayOptions against static values only, so the live schema has to travel
 * inside the value the user picks.
 */
export function encodeCarrierValue(carrier: CarrierConfigRow): string {
	return [carrier.name, ...connectionFieldIds(carrier), ''].join(SEPARATOR);
}

export function carrierFieldToken(id: string): string {
	return `${SEPARATOR}${id}${SEPARATOR}`;
}

export function requirementHint(carrier: CarrierConfigRow): string {
	const ids = connectionFieldIds(carrier);

	if (ids.length === 0) {
		return 'Email collection — no connection fields';
	}

	return `Needs: ${ids.map((id) => FIELD_LABELS[id] ?? id).join(', ')}`;
}
