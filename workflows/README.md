# Shiplab n8n use cases

Importable workflow templates that use the Shiplab custom nodes.

## How to import

1. Open http://localhost:5678
2. Menu → **Import from File**
3. Choose a JSON file from this folder
4. On every Shiplab node, select your **Shiplab account** credential
5. Click **Test workflow**

All count templates use the **previous calendar month**. Change **Prepare Last Month** if you want a different window.

---

## Invoice count per connector group

File: [`invoice-count-per-connector-group.json`](./invoice-count-per-connector-group.json)

**Question it answers:** how many invoices did each connector group have last month?

**Flow:**

1. Compute previous calendar month
2. Get all connector groups
3. Expand to one item per group
4. **Get Customer Invoices** filtered by Connector Group ID (`company_id`) — runs once per group
5. Count invoices (deduped across file formats)
6. Summarize totals

**Example output shape:**

```json
{
  "period": { "start_date": "2026-06-01", "end_date": "2026-06-30" },
  "connector_group_count": 3,
  "invoice_count": 42,
  "groups": [
    { "connector_group_id": 12, "connector_group_name": "Acme", "invoice_count": 30 },
    { "connector_group_id": 15, "connector_group_name": "Beta", "invoice_count": 12 }
  ]
}
```

---

## Invoice count by group and connector

File: [`invoice-count-by-group-and-connector.json`](./invoice-count-by-group-and-connector.json)

**Question it answers:** for last month, how many invoices per connector group **and** per connector?

**Flow:**

1. Compute previous calendar month
2. Get connector groups + connectors
3. Build a catalog (joins connectors → groups)
4. **Get Customer Invoices** once for the whole period
5. Aggregate counts by `company_id` and `credential_id`

Use this when you want both breakdowns without one API call per entity.

**Example output shape:**

```json
{
  "period": { "start_date": "2026-06-01", "end_date": "2026-06-30" },
  "connector_group_count": 3,
  "connector_count": 8,
  "invoice_count": 42,
  "groups": [
    { "connector_group_id": 12, "connector_group_name": "Acme", "connector_count": 4, "invoice_count": 30 }
  ],
  "connectors": [
    {
      "connector_id": 882,
      "username": "acct1",
      "carrier": "ups",
      "connector_group_name": "Acme",
      "invoice_count": 11
    }
  ]
}
```

---

## Invoice count per connector

File: [`invoice-count-per-connector.json`](./invoice-count-per-connector.json)

**Question it answers:** how many invoices did each connector have last month?

**Flow:**

1. Compute previous calendar month
2. Get all connectors
3. Expand to one item per connector
4. **Get Customer Invoices** filtered by Connector ID (`credential_id`) — runs once per connector
5. Count + summarize

**Example output shape:**

```json
{
  "period": { "start_date": "2026-06-01", "end_date": "2026-06-30" },
  "connector_count": 8,
  "invoice_count": 42,
  "connectors": [
    {
      "connector_id": 882,
      "username": "acct1",
      "carrier": "ups",
      "connector_group_id": 12,
      "invoice_count": 11
    }
  ]
}
```

---

## Weekly spend per connector

File: [`weekly-spend-per-connector.json`](./weekly-spend-per-connector.json)

**Question it answers:** how much did each connector get charged in the last 7 days?

**Flow:**

1. Compute the last 7 days (`start_date` / `end_date`)
2. Get profile (for preferred `invoice_format`)
3. Get all connector groups
4. Get all connectors
5. Join them into a connector catalog
6. Search all invoices in that week
7. Download each invoice’s extracted JSON via `signed_url`
8. Sum charge amounts
9. Return per-connector totals + grand total

**Example output shape:**

```json
{
  "period": { "start_date": "2026-07-24", "end_date": "2026-07-30" },
  "invoice_count": 12,
  "invoices_with_amount": 12,
  "grand_total_charged": 18432.55,
  "amount_fields_seen": ["Net Charges"],
  "connectors": [
    {
      "connector_id": 882,
      "username": "acct1",
      "carrier": "ups",
      "connector_group_name": "Acme",
      "invoice_count": 3,
      "total_charged": 4200.1,
      "invoices": []
    }
  ]
}
```

### Important: charge amounts

`Shiplab Invoice → Get Customer Invoices` returns invoice metadata and a download URL. It does **not** include the charged amount.

This workflow therefore downloads each extracted invoice JSON and looks for a charge field. It tries common names (`Net Charges`, `net_amount`, `Amount Due`, …).

If totals come back as `0` / `invoices_with_amount: 0`:

1. Open one invoice JSON from the **Download Invoice JSON** node
2. Find the real charge field name
3. In **Prepare Last 7 Days**, set `amount_field` to that exact name
4. Run again
