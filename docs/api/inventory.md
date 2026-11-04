---
sidebar_position: 10
---

# Inventory API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

The Inventory API tracks stock on hand. Stock is kept **per part, per site**: one inventory row for each part at each site, or at each bin location within a site. A part's record in the [Parts API](./parts.md) holds no quantity.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/inventory` | List inventory rows |
| GET | `/rcm/inventory/{partId}` | Get inventory for a part |
| PUT | `/rcm/inventory/{partId}` | Set stock for a part at a site |
| DELETE | `/rcm/inventory/{partId}` | Delete an inventory row |
| GET | `/rcm/inventory/{partId}/history` | Get the part's stock history |
| POST | `/rcm/inventory/{partId}/adjustments` | Add or remove a quantity |
| POST | `/rcm/inventory/{partId}/transfer` | Move stock between sites or locations |
| GET | `/rcm/inventory/reports` | Valuation and low-stock reports |
| GET | `/rcm/inventory/locations` | List bin locations |
| GET, PUT, DELETE | `/rcm/inventory/{partId}/location` | Read, set or clear a part's bin location |
| POST | `/rcm/inventory/bulk` | Set stock for many parts in one call |

## Setting an opening quantity

To load stock for a part you have just created, send one `PUT /rcm/inventory/{partId}` per site:

```bash
curl -X PUT "https://api-acme.f7i.ai/rcm/inventory/c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "site": "main-facility",
    "quantity": 15,
    "minStockLevel": 5,
    "maxStockLevel": 50,
    "reason": "Opening stock from legacy system"
  }'
```

`site` is required. `quantity` is the absolute count. The row is created if it does not exist yet. Use `POST /rcm/inventory/{partId}/adjustments` when you want to add or subtract instead.

## List Inventory

**Endpoint:** `GET /rcm/inventory`

**Authentication:** Required

**Query Parameters:**
- `site` (optional): rows at one site, including its bin locations
- `lowStock` (optional): `true` returns only rows at or below their `minStockLevel`

There is no `offset`, `limit`, `search`, `location`, `outOfStock` or `category` filter. Rows for the same part at several bin locations within a site are summed into one row per part and site.

**Response:** a JSON array.
```json
[
  {
    "inventoryId": "e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b",
    "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "site": "main-facility",
    "tenantId": "tenant-123",
    "quantity": 15,
    "minStockLevel": 5,
    "maxStockLevel": 50,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-10-10T14:30:00",
    "partDetails": {
      "partNumber": "SKF-6204",
      "name": "Ball Bearing 6204",
      "unit": "each",
      "cost": 75.5
    }
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/inventory?site=main-facility&lowStock=true" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Get Part Inventory

**Endpoint:** `GET /rcm/inventory/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Query Parameters:**
- `site` (optional): one site's row

**With `site`:** the row for that site. 404 if the part has no stock there.
```json
{
  "inventoryId": "e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b",
  "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
  "site": "main-facility",
  "tenantId": "tenant-123",
  "quantity": 15,
  "minStockLevel": 5,
  "maxStockLevel": 50,
  "exists": true,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-10-10T14:30:00"
}
```

**Without `site`:** the part and every one of its rows.
```json
{
  "part": {
    "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "partNumber": "SKF-6204",
    "name": "Ball Bearing 6204",
    "unit": "each",
    "cost": 75.5
  },
  "inventory": [
    {
      "inventoryId": "e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b",
      "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
      "site": "main-facility",
      "tenantId": "tenant-123",
      "quantity": 15,
      "minStockLevel": 5,
      "maxStockLevel": 50,
      "createdAt": "2024-01-15T10:30:00",
      "updatedAt": "2024-10-10T14:30:00"
    },
    {
      "inventoryId": "f6a7b8c9-d0e1-4f2a-9b3c-4d5e6f7a8b9c",
      "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
      "site": "warehouse-2",
      "tenantId": "tenant-123",
      "quantity": 8,
      "minStockLevel": 3,
      "maxStockLevel": 25,
      "createdAt": "2024-02-01T10:30:00",
      "updatedAt": "2024-10-05T14:30:00"
    }
  ]
}
```

## Set Part Inventory

Sets the stock row for a part at a site. This is how you set an opening quantity.

**Endpoint:** `PUT /rcm/inventory/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part. Must exist (404 otherwise).

**Body:**

| Field | Type | Notes |
|-------|------|-------|
| `site` | string | **Required.** |
| `quantity` | number | The absolute quantity at the site. Required when the row does not exist yet. |
| `minStockLevel` | number | Optional. |
| `maxStockLevel` | number | Optional. |
| `locationName` | string | Optional. Keeps stock at one bin within the site. |
| `reason` | string | Optional. Recorded in the history row. Default `Manual set`. |
| `metadata` | object | Optional. Recorded in the history row. |

At least one of `quantity`, `minStockLevel`, `maxStockLevel` must be sent. Only the fields you send change. Numbers may be sent as numbers or numeric strings.

**Request Body:**
```json
{
  "site": "main-facility",
  "quantity": 20,
  "minStockLevel": 8,
  "maxStockLevel": 60,
  "reason": "Physical count"
}
```

**Response:** the row as now stored.
```json
{
  "inventoryId": "e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b",
  "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
  "site": "main-facility",
  "tenantId": "tenant-123",
  "quantity": 20,
  "minStockLevel": 8,
  "maxStockLevel": 60,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-10-15T16:20:00"
}
```

A quantity change writes a history row of type `manual_set`.

## Delete Inventory Row

**Endpoint:** `DELETE /rcm/inventory/{partId}`

**Authentication:** Required

The path value is tried as an `inventoryId` first. If it is a `partId`, add `?site=` (and `locationName` if the row is at a bin) to say which row.

**Response:**
```json
{
  "message": "Inventory record with ID e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b successfully deleted",
  "inventoryId": "e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b",
  "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
  "site": "main-facility"
}
```

## Get Inventory History

**Endpoint:** `GET /rcm/inventory/{partId}/history`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Query Parameters:**
- `site` (optional): one site's history

Every history row for the part, newest first. There is no pagination or date filter.

**Response:**
```json
{
  "part": {
    "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "partNumber": "SKF-6204",
    "name": "Ball Bearing 6204",
    "unit": "each"
  },
  "history": [
    {
      "historyId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
      "tenantId": "tenant-123",
      "site": "main-facility",
      "timestamp": "2024-10-10T14:30:00",
      "type": "work_order_usage",
      "quantity": -2,
      "previousQuantity": 17,
      "newQuantity": 15,
      "reason": "Used on work order 3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f",
      "createdBy": "john.smith@example.com"
    },
    {
      "historyId": "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
      "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
      "tenantId": "tenant-123",
      "site": "main-facility",
      "timestamp": "2024-09-15T09:00:00",
      "type": "manual_set",
      "quantity": 17,
      "previousQuantity": 0,
      "newQuantity": 17,
      "reason": "Opening stock from legacy system",
      "createdBy": "import@example.com"
    }
  ]
}
```

## Make Inventory Adjustment

Adds or removes a quantity. Use this for receipts, issues and count corrections. Use `PUT` when you want to set the absolute quantity instead.

**Endpoint:** `POST /rcm/inventory/{partId}/adjustments`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part. Must exist (404 otherwise).

**Body:**

| Field | Type | Notes |
|-------|------|-------|
| `site` | string | **Required.** |
| `quantityChange` | number | **Required.** Positive to add, negative to remove. Zero is rejected. |
| `reason` | string | Optional. Default `Inventory adjustment`. |
| `type` | string | Optional. Recorded on the history row. Default `manual`. |
| `allowNegative` | boolean | Optional. Default `false`: a change that would take stock below zero is rejected with 400. |
| `minStockLevel`, `maxStockLevel` | number | Optional. Set at the same time. |
| `locationName` | string | Optional. Adjust one bin within the site. The row is created if it does not exist. |
| `locationId` | string | Optional. The `inventoryId` of a bin row, instead of `locationName`. |

**Request Body:**
```json
{
  "site": "main-facility",
  "quantityChange": 3,
  "reason": "Cycle count variance",
  "type": "count"
}
```

**Response:**
```json
{
  "adjustment": {
    "historyId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "site": "main-facility",
    "tenantId": "tenant-123",
    "timestamp": "2024-10-15T10:30:00",
    "type": "count",
    "quantity": 3,
    "reason": "Cycle count variance",
    "previousQuantity": 15,
    "newQuantity": 18,
    "createdBy": "user@example.com"
  },
  "inventory": {
    "inventoryId": "e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b",
    "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "site": "main-facility",
    "tenantId": "tenant-123",
    "quantity": 18,
    "minStockLevel": 5,
    "maxStockLevel": 50,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-10-15T10:30:00"
  }
}
```

## Get Inventory Reports

**Endpoint:** `GET /rcm/inventory/reports`

**Authentication:** Required

**Query Parameters:**
- `type` (optional): `valuation` (the default) or `low_stock`
- `site` (optional): limit the report to one site

Any other `type` is rejected with 400.

## Error Responses

Errors carry a single `message` field.

### 400 Bad Request
```json
{
  "message": "Provide at least one of quantity, minStockLevel, maxStockLevel"
}
```
Other 400 messages: `Site is required`, `quantity must be a number, got 'ten'`, `Quantity change cannot be zero`, `Insufficient inventory. Current: 2, Requested change: -5`, `Cannot create inventory with negative quantity`.

### 404 Not Found
```json
{
  "message": "Part with ID part-999 not found"
}
```
Also `No inventory found for part {partId} at site {site}` on a read, and `No inventory for part {partId} at {site}; provide quantity to create it` when a PUT sends only stock levels for a row that does not exist.
