# @shiplab-eng/n8n-nodes-shiplab

Community nodes for the [Shiplab](https://shiplab.com) customer API. Manage your profile, connector groups, connectors, and search invoices from n8n workflows.

API reference: [https://api.shiplab.com/llms.txt](https://api.shiplab.com/llms.txt)

## Installation

### From n8n (recommended)

1. Open your n8n instance (self-hosted).
2. Go to **Settings → Community Nodes → Install**.
3. Enter `@shiplab-eng/n8n-nodes-shiplab`.
4. Accept the community node risk notice and install.
5. Search for **Shiplab** in the node picker.

Verified install from the nodes panel (and n8n Cloud) is available after the package is approved in the [n8n Creator Portal](https://creators.n8n.io/nodes).

### Manual (self-hosted)

```bash
cd ~/.n8n/nodes
npm install @shiplab-eng/n8n-nodes-shiplab
```

Restart n8n afterward.

## Credentials

Create a **Shiplab API** credential in n8n before using any node.

1. In the Shiplab portal, open **Data Access** and copy your **API token** (starts with `v1-…`).
2. In n8n, open **Credentials → Add credential → Shiplab API**.
3. Fill in:

| Field | Value |
|-------|--------|
| **API Token** | Your customer token. Sent as the raw `Authorization` header (no `Bearer` prefix). |
| **Base URL** | `https://api.shiplab.com` for production. For a local API from Docker n8n, use `http://host.docker.internal:8000`. |

4. Click **Save**. Use **Test** if offered — it calls `GET /profile`.

## Nodes

Search for **Shiplab** (or aliases like ship, post, postal) in the node picker. One **Shiplab** node covers every resource; pick a resource then an operation (same pattern as MongoDB / GitHub):

| Resource | Operations | Description |
|----------|------------|-------------|
| **Profile** | Get, Update | Read or update the authenticated customer profile / billing fields. |
| **Connector Group** | Get Many, Get, Create, Update, Delete | Manage connector groups (companies). |
| **Connector** | Get Many, Get, Create, Update, Delete | Manage carrier connectors under a group. |
| **Carrier** | Get Connection Config | List carriers and the connection fields each one requires. |
| **Invoice** | Search, Get Customer Invoices | Find invoices by date range (optional group/connector filters). |

### Connector create / update

On **Create**, choosing a carrier loads required connection fields from `GET /carrier_connection_config` (Password and API Key are masked). **Update** uses an optional field collection so only the values you set are sent.

### Invoice search

- Filter by **Connector Group ID** or **Connector ID**.
- **Search** returns up to 1,000 invoices plus a next-page token — pass that token into the next request to continue.
- **Get Customer Invoices** returns every match without pagination.

## Example: invoice count per connector group

**Goal:** for last month, how many invoices did each connector group have?

1. Add **Shiplab → Connector Group → Get Many**.
2. Add **Shiplab → Invoice → Get Customer Invoices**.
   - Set **Start Date** / **End Date** (e.g. first and last day of last month).
   - Under **Filters**, set **Connector Group ID** to the ID from the previous node (`{{ $json.id }}` or equivalent).
3. Run once per group (or loop over groups) and count the returned invoices.

Ready-made workflow templates covering this and other reporting use cases live in the [`workflows/`](./workflows/) folder of the repository. Import them into n8n with **Import from File**.

## Compatibility

- Requires n8n with community nodes enabled.
- Targets the Shiplab customer API (`n8nNodesApiVersion: 1`).

## Support

Report issues at [github.com/shiplab-eng/n8n-nodes-shiplab/issues](https://github.com/shiplab-eng/n8n-nodes-shiplab/issues) or email support@shiplab.com.

## Contributing

Build instructions, local testing, and the release process are in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
