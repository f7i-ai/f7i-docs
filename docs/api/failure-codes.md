---
sidebar_position: 4
---

# Failure Codes API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

A failure code is one row of the **Failure Modes (FMEA)** table on an asset's page in the app: what can fail, what happens when it does, why, and how severe, likely and detectable it is. The API resource name is `failurecodes`. Each row belongs to a component, and through the component to an asset.

Responses use `failureCodeId` as the id, never `id`.

:::info The path is `/rcm/failurecodes`
There is no `/rcm/failure-modes`, `/rcm/fmea` or `/rcm/failure-codes`. Those paths answer `403 Invalid key=value pair`, which is API Gateway saying the path does not exist, not a problem with your key. See the [overview](./overview.md#routes-that-answer-403-invalid-keyvalue-pair).
:::

## Loading failure modes for an asset

Failure modes hang off **components**, not directly off the asset. To load them:

1. List the asset's components with `GET /rcm/components?assetId={assetId}`. If the asset has none, create one with `POST /rcm/components` (see [Components](./components.md)).
2. Create each failure mode with `POST /rcm/failurecodes`, setting `componentId` to the component it applies to.
3. The rows then show in the asset's Failure Modes table in the app, grouped by component.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/failurecodes` | List failure codes |
| POST | `/rcm/failurecodes` | Create a failure code |
| GET | `/rcm/failurecodes/{failureCodeId}` | Get a specific failure code |
| PUT | `/rcm/failurecodes/{failureCodeId}` | Update a failure code |
| DELETE | `/rcm/failurecodes/{failureCodeId}` | Delete a failure code |

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `code` | string | **Required.** A short identifier, for example `BRG-01`. |
| `description` | string | **Required.** What the failure is. |
| `name` | string | Optional display name. |
| `failureMode` | string | How the component fails, for example `Bearing seizes`. |
| `failureEffect` | string | What happens when it does. |
| `failureCause` | string | Why it happens. |
| `severity` | string | 1 to 10, sent as a string, for example `"7"`. Default `"5"`. |
| `occurrence` | string | 1 to 10, sent as a string. Default `"5"`. |
| `detection` | string | 1 to 10, sent as a string. Default `"5"`. |
| `status` | string | Default `"Active"`. |
| `componentId` | string | The component this failure mode belongs to, and so its asset. Checked against your tenant; an unknown id is rejected with 400. |
| `metadata` | object | Free-form data of your own. |
| `customFields` | object | Free-form data of your own. |

**Scores.** `severity`, `occurrence` and `detection` are whole numbers from 1 to 10. Send them as strings (`"7"`); a bare number is accepted and stored as a string. Anything outside 1 to 10 is rejected with 400. The app's own form sends word scales (`very low` to `very high`); those are also accepted.

**RPN.** The risk priority number is `severity x occurrence x detection`. The API works it out from the stored scores and returns it as `rpn`. It is not a field you send; a value in the body is ignored.

There is no `category` field, no list fields for signs, causes or recommended actions, and no `isActive` flag. Put anything like that in `metadata`.

## List Failure Codes

**Endpoint:** `GET /rcm/failurecodes`

**Authentication:** Required

**Query Parameters:**
- `componentId` (optional): only the failure modes on this component

With no parameters, every failure code in your tenant is returned. There is no pagination, search, category or severity filter.

**Response:** a bare JSON array.
```json
[
  {
    "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
    "tenantId": "tenant-123",
    "code": "BRG-01",
    "name": "Bearing failure",
    "description": "Drive end bearing fails in service",
    "failureMode": "Bearing seizes",
    "failureEffect": "Motor trips on overload; line stops",
    "failureCause": "Lubrication starvation or contamination",
    "severity": "8",
    "occurrence": "4",
    "detection": "3",
    "rpn": 96,
    "status": "Active",
    "componentId": "comp-123",
    "metadata": {},
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-10-01T14:45:00"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/failurecodes?componentId=comp-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Failure Code

**Endpoint:** `POST /rcm/failurecodes`

**Authentication:** Required

`code` and `description` are required. Set `componentId` so the failure mode shows against its asset.

**Request Body:**
```json
{
  "code": "BRG-01",
  "name": "Bearing failure",
  "description": "Drive end bearing fails in service",
  "failureMode": "Bearing seizes",
  "failureEffect": "Motor trips on overload; line stops",
  "failureCause": "Lubrication starvation or contamination",
  "severity": "8",
  "occurrence": "4",
  "detection": "3",
  "status": "Active",
  "componentId": "comp-123",
  "metadata": {
    "category": "Mechanical",
    "recommendations": ["Replace bearing", "Check lubrication system"]
  }
}
```

**Response:** `200 OK` with the stored item. `failureCodeId`, `rpn`, `createdAt` and `updatedAt` are filled in by the API.
```json
{
  "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "tenantId": "tenant-123",
  "code": "BRG-01",
  "name": "Bearing failure",
  "description": "Drive end bearing fails in service",
  "failureMode": "Bearing seizes",
  "failureEffect": "Motor trips on overload; line stops",
  "failureCause": "Lubrication starvation or contamination",
  "severity": "8",
  "occurrence": "4",
  "detection": "3",
  "rpn": 96,
  "status": "Active",
  "componentId": "comp-123",
  "metadata": {
    "category": "Mechanical",
    "recommendations": ["Replace bearing", "Check lubrication system"]
  },
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Example Request:**
```bash
curl -X POST "https://api-acme.f7i.ai/rcm/failurecodes" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "BRG-01",
    "description": "Drive end bearing fails in service",
    "failureMode": "Bearing seizes",
    "failureEffect": "Motor trips on overload; line stops",
    "failureCause": "Lubrication starvation or contamination",
    "severity": "8",
    "occurrence": "4",
    "detection": "3",
    "componentId": "comp-123"
  }'
```

## Get Failure Code

**Endpoint:** `GET /rcm/failurecodes/{failureCodeId}`

**Authentication:** Required

**Path Parameters:**
- `failureCodeId`: Unique identifier of the failure code

**Response:** the stored item, plus `component` (the linked component's record) when `componentId` is set.
```json
{
  "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "tenantId": "tenant-123",
  "code": "BRG-01",
  "name": "Bearing failure",
  "description": "Drive end bearing fails in service",
  "failureMode": "Bearing seizes",
  "failureEffect": "Motor trips on overload; line stops",
  "failureCause": "Lubrication starvation or contamination",
  "severity": "8",
  "occurrence": "4",
  "detection": "3",
  "rpn": 96,
  "status": "Active",
  "componentId": "comp-123",
  "metadata": {},
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-10-01T14:45:00",
  "component": {
    "componentId": "comp-123",
    "name": "Drive end bearing",
    "assetId": "asset-456"
  }
}
```

## Update Failure Code

**Endpoint:** `PUT /rcm/failurecodes/{failureCodeId}`

**Authentication:** Required

**Path Parameters:**
- `failureCodeId`: Unique identifier of the failure code

Send only the fields you want to change. Fields you can change: `code`, `name`, `description`, `failureMode`, `failureEffect`, `failureCause`, `severity`, `occurrence`, `detection`, `status`, `componentId`, `metadata`, `customFields`. `rpn` is recomputed from the merged scores. An empty `code` is rejected with 400.

**Request Body:**
```json
{
  "description": "Drive end bearing fails in service; seen twice in 2024",
  "severity": "9",
  "detection": "2"
}
```

**Response:** `200 OK` with the whole item as now stored, including the new `rpn`.

## Delete Failure Code

**Endpoint:** `DELETE /rcm/failurecodes/{failureCodeId}`

**Authentication:** Required

**Path Parameters:**
- `failureCodeId`: Unique identifier of the failure code

The row is removed outright. There is no soft delete.

**Response:**
```json
{
  "message": "Failure code 9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b deleted successfully"
}
```

## Error Responses

Errors carry a single `message` field.

### 400 Bad Request
```json
{
  "message": "severity must be an integer from 1 to 10 (got '11')"
}
```
Other 400 messages: `Failure code is required`, `Failure code description is required`, `Component with ID comp-999 not found`.

### 404 Not Found
```json
{
  "message": "Failure code with ID fc-999 not found"
}
```
