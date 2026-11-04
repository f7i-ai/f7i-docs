---
sidebar_position: 3
---

# Components API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

The Components API manages the components of an asset: the pumps, motors, bearings and so on that PM procedures, failure modes and parts hang off. Components can be nested under a parent component, and templates let you stamp out a standard set.

Responses use `componentId` as the id, never `id`.

## How components link to other records

- A component belongs to an **asset** (`assetId`). A nested component also records its parent (`parentComponentId`) and the asset at the top of its tree (`rootAssetId`).
- **Parts** link to a component through the component's `partIds`. Set `partIds` on the component, or set `componentIds` on the [part](./parts.md); the API writes the link both ways.
- **Failure modes** link to a component through their own `componentId`. See [Failure Codes](./failure-codes.md).
- **PM procedures** belong to a component. See [PM Procedures](./pm-procedures.md).

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/components` | List components |
| POST | `/rcm/components` | Create a new component |
| GET | `/rcm/components/{componentId}` | Get a specific component |
| PUT | `/rcm/components/{componentId}` | Update a component |
| DELETE | `/rcm/components/{componentId}` | Delete a component |
| POST | `/rcm/components/bulk` | Bulk operations on components |
| GET | `/rcm/components/tree/{rootId}` | Get component tree |
| GET | `/rcm/components/{componentId}/children` | Get direct children |
| POST | `/rcm/components/{componentId}/children` | Add child component |
| GET | `/rcm/components/{componentId}/descendants` | Get all descendants |
| GET | `/rcm/components/{componentId}/ancestors` | Get all ancestors |
| PUT | `/rcm/components/{componentId}/move` | Move component in hierarchy |
| GET | `/rcm/components/{componentId}/parts` | List the parts linked to a component |
| POST | `/rcm/components/{componentId}/parts` | Link parts to a component (`{"partIds": [...]}`) |
| DELETE | `/rcm/components/{componentId}/parts/{partId}` | Unlink a part |

## Template Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/components/templates` | List component templates |
| POST | `/rcm/components/templates` | Create a template |
| GET | `/rcm/components/templates/{templateId}` | Get specific template |
| PUT | `/rcm/components/templates/{templateId}` | Update template |
| DELETE | `/rcm/components/templates/{templateId}` | Delete template |
| GET | `/rcm/components/templates/{templateId}/versions` | Get template versions |
| POST | `/rcm/components/templates/{templateId}/usage` | Track template usage |
| POST | `/rcm/components/templates/{templateId}/apply-hierarchical` | Apply template hierarchically |

## List Components

**Endpoint:** `GET /rcm/components`

**Authentication:** Required

**Query Parameters:**
- `assetId` (optional): only components on this asset
- `search` (optional): matches name or description
- `name` (optional): matches name
- `limit` (optional): default 50, at most 100
- `include` (optional): comma-separated extras. `partDetails` adds a `partDetails` list for each linked part; `failureCodes` adds the component's failure modes.

There is no `offset`, `type` or `parentId` filter. For the children of one component use `GET /rcm/components/{componentId}/children`.

**Response:** a JSON array of components.
```json
[
  {
    "componentId": "comp-123",
    "tenantId": "tenant-123",
    "name": "Motor Bearing",
    "description": "Main motor bearing assembly",
    "category": "Bearing",
    "cost": "120",
    "quantity": 1,
    "criticality": "High",
    "status": "active",
    "manufacturer": "SKF",
    "model": "6204",
    "serialNumber": "BRG-001",
    "installationDate": "2024-01-15T00:00:00Z",
    "assetId": "asset-456",
    "parentComponentId": "comp-789",
    "rootAssetId": "asset-456",
    "depth": 1,
    "childCount": 0,
    "hasChildren": false,
    "partIds": ["part-001"],
    "specifications": {
      "dimensions": { "length": "", "width": "", "height": "", "weight": "" },
      "customFields": {}
    },
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-10-01T14:45:00"
  }
]
```

## Create Component

**Endpoint:** `POST /rcm/components`

**Authentication:** Required

`name` is the only required field. `assetId` is checked against your tenant when sent; an unknown id is rejected with 400.

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | **Required.** 1 to 255 characters. |
| `assetId` | string | The asset the component belongs to. |
| `parentComponentId` | string | Nest under another component. Or use `POST /rcm/components/{componentId}/children`, which fills in `assetId`, `rootAssetId` and `depth` for you. |
| `description` | string | Up to 1,000 characters. |
| `category` | string | Up to 100 characters. |
| `status` | string | `active`, `inactive`, `maintenance` or `decommissioned`. Default `active`. |
| `criticality` | string | `Low`, `Medium`, `High` or `Critical`. Default `Medium`. |
| `cost` | string | Sent as a string. |
| `quantity` | integer | Default 1. |
| `manufacturer`, `model`, `serialNumber` | string | Up to 255 characters each. |
| `installationDate` | string | ISO 8601. |
| `partIds` | string[] | Parts that fit this component. |
| `specifications` | object | `{"dimensions": {...}, "customFields": {...}}`. Anything else goes in `customFields`. |
| `componentId` | string | Supply your own id instead of a generated one. |

**Request Body:**
```json
{
  "name": "Motor Bearing",
  "category": "Bearing",
  "assetId": "asset-456",
  "parentComponentId": "comp-789",
  "serialNumber": "BRG-001",
  "manufacturer": "SKF",
  "model": "6204",
  "installationDate": "2024-01-15T00:00:00Z",
  "status": "active",
  "criticality": "High",
  "partIds": ["part-001"],
  "specifications": {
    "customFields": {
      "bore": "20mm",
      "outerDiameter": "47mm",
      "width": "14mm"
    }
  }
}
```

**Response:** `200 OK` with the stored component. `componentId`, `createdAt` and `updatedAt` are filled in by the API.
```json
{
  "componentId": "comp-123",
  "tenantId": "tenant-123",
  "name": "Motor Bearing",
  "description": "",
  "category": "Bearing",
  "cost": "",
  "quantity": 1,
  "criticality": "High",
  "status": "active",
  "manufacturer": "SKF",
  "model": "6204",
  "serialNumber": "BRG-001",
  "installationDate": "2024-01-15T00:00:00Z",
  "assetId": "asset-456",
  "parentComponentId": "comp-789",
  "rootAssetId": null,
  "depth": 0,
  "childCount": 0,
  "hasChildren": false,
  "partIds": ["part-001"],
  "partDetails": [],
  "failureCodes": [],
  "isTemplate": false,
  "templateId": null,
  "templateCategory": "",
  "specifications": {
    "dimensions": { "length": "", "width": "", "height": "", "weight": "" },
    "customFields": {
      "bore": "20mm",
      "outerDiameter": "47mm",
      "width": "14mm"
    }
  },
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Validation errors** return 400 with `message` set to `Validation failed` and a `details` list naming each bad field (see [Error Responses](#error-responses)).

## Get Component

**Endpoint:** `GET /rcm/components/{componentId}`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Unique identifier of the component

**Response:** the component as stored, plus `asset` (the parent asset's record), `partDetails` for each id in `partIds`, and `failureCodes` (the failure modes linked to this component).
```json
{
  "componentId": "comp-123",
  "tenantId": "tenant-123",
  "name": "Motor Bearing",
  "category": "Bearing",
  "status": "active",
  "criticality": "High",
  "assetId": "asset-456",
  "parentComponentId": "comp-789",
  "partIds": ["part-001"],
  "partDetails": [
    { "partId": "part-001", "name": "Ball Bearing 6204", "partNumber": "SKF-6204", "unit": "each" }
  ],
  "failureCodes": [
    { "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b", "code": "BRG-01", "failureMode": "Bearing seizes" }
  ],
  "asset": { "assetId": "asset-456", "name": "Electric Motor B2", "site": "main-facility" },
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-10-01T14:45:00"
}
```

## Update Component

**Endpoint:** `PUT /rcm/components/{componentId}`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Unique identifier of the component

Send only the fields you want to change. Fields you can change: `name`, `description`, `category`, `cost`, `quantity`, `criticality`, `status`, `manufacturer`, `model`, `serialNumber`, `installationDate`, `specifications`, `partIds`, `parentComponentId`, `assetId`, `rootAssetId`, `depth`, `childCount`, `hasChildren`, `isTemplate`, `templateId`, `templateCategory`. Anything else in the body is ignored.

`status` and `criticality` are matched case-insensitively and stored in their canonical form. On update, `retired` is also accepted as a status.

**Request Body:**
```json
{
  "status": "maintenance",
  "partIds": ["part-001", "part-002"]
}
```

**Response:** `200 OK` with the whole component as now stored.

## Delete Component

**Endpoint:** `DELETE /rcm/components/{componentId}`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Unique identifier of the component

**Query Parameters:**
- `cascade` (optional): `true` also deletes the component's descendants and their PM procedures and strategies.

**Response:**
```json
{
  "message": "Component comp-123 deleted successfully"
}
```

## Bulk Operations

**Endpoint:** `POST /rcm/components/bulk`

**Authentication:** Required

`operation` is `move`, `copy` or `delete`. `move` and `copy` take a `targetParentId`. `includeChildren` (default `false`) applies the operation to each component's subtree too.

**Request Body:**
```json
{
  "operation": "move",
  "componentIds": ["comp-123", "comp-124", "comp-125"],
  "targetParentId": "comp-999",
  "includeChildren": true
}
```

**Response:** a JSON array with one result per component.
```json
[
  { "componentId": "comp-123", "status": "success" },
  { "componentId": "comp-124", "status": "success" },
  { "componentId": "comp-125", "status": "error", "message": "Component with ID comp-125 not found" }
]
```

## Component Tree

Gets the tree of components under a root component.

**Endpoint:** `GET /rcm/components/tree/{rootId}`

**Authentication:** Required

**Path Parameters:**
- `rootId`: ID of the root component for the tree

**Response:**
```json
{
  "componentId": "comp-root",
  "name": "Main Motor",
  "category": "Motor",
  "depth": 0,
  "children": [
    {
      "componentId": "comp-123",
      "name": "Motor Bearing",
      "category": "Bearing",
      "depth": 1,
      "children": [
        {
          "componentId": "comp-124",
          "name": "Bearing Seal",
          "category": "Seal",
          "depth": 2,
          "children": []
        }
      ]
    }
  ]
}
```

## Get Component Children

Gets the direct children of a component.

**Endpoint:** `GET /rcm/components/{componentId}/children`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Parent component ID

**Response:** a JSON array of components, in the same shape as the list.
```json
[
  {
    "componentId": "comp-124",
    "name": "Bearing Seal",
    "category": "Seal",
    "parentComponentId": "comp-123",
    "assetId": "asset-456",
    "depth": 2,
    "status": "active"
  }
]
```

## Add Child Component

Adds a child component under a parent. The child inherits the parent's `assetId` and `rootAssetId`, and `depth` is set to the parent's depth plus one.

**Endpoint:** `POST /rcm/components/{componentId}/children`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Parent component ID

**Request Body:** the same fields as [Create Component](#create-component).
```json
{
  "name": "New Seal",
  "category": "Seal",
  "serialNumber": "SEAL-002",
  "manufacturer": "Parker",
  "model": "PS-100"
}
```

**Response:** `200 OK` with the stored child component, including its `componentId`.

## Get Component Descendants

Gets every component below this one (children, grandchildren and so on).

**Endpoint:** `GET /rcm/components/{componentId}/descendants`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Component ID

**Response:** a JSON array of components.
```json
[
  { "componentId": "comp-124", "name": "Bearing Seal", "parentComponentId": "comp-123", "depth": 2 },
  { "componentId": "comp-125", "name": "Seal Ring", "parentComponentId": "comp-124", "depth": 3 }
]
```

## Get Component Ancestors

Gets every component above this one (parent, grandparent and so on).

**Endpoint:** `GET /rcm/components/{componentId}/ancestors`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Component ID

**Response:** a JSON array of components, nearest parent first.
```json
[
  { "componentId": "comp-123", "name": "Motor Bearing", "depth": 1 },
  { "componentId": "comp-root", "name": "Main Motor", "depth": 0 }
]
```

## Move Component

Moves a component under a different parent.

**Endpoint:** `PUT /rcm/components/{componentId}/move`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Component ID to move

**Request Body:**
```json
{
  "newParentId": "comp-999"
}
```

Send `"newParentId": null` to move the component to the top level of its asset. A move that would make a component its own ancestor is rejected with 400.

**Response:**
```json
{
  "message": "Component moved successfully",
  "component": { "componentId": "comp-123", "parentComponentId": "comp-999", "depth": 1 }
}
```

## Component Templates

### List Templates

**Endpoint:** `GET /rcm/components/templates`

**Response:** a JSON array of templates, each with a `templateId`, `baseTemplateId`, `version`, `name`, `category`, a root `component` and its `children`.

### Create Template

**Endpoint:** `POST /rcm/components/templates`

The template's root component takes its `name`, `description`, `category`, `specifications` and `metadata` from the top level of the body. `children` is the tree beneath it; each child can have its own `children`.

**Request Body:**
```json
{
  "name": "Standard Motor",
  "description": "Template for standard industrial motors",
  "category": "Motor",
  "children": [
    { "name": "Bearing A", "category": "Bearing", "children": [] },
    { "name": "Bearing B", "category": "Bearing", "children": [] }
  ]
}
```

**Response:** the stored template with its `templateId`, `baseTemplateId` and `version`.

### Apply Template Hierarchically

**Endpoint:** `POST /rcm/components/templates/{templateId}/apply-hierarchical`

The route exists on the gateway, but the handler behind it does not yet apply the template. Today the app applies templates itself by creating the components. If you need to stamp a template out through the API, create the components with `POST /rcm/components` and `POST /rcm/components/{componentId}/children`.

## Component Status Values

- `active`: in service (the default)
- `inactive`: not in service
- `maintenance`: undergoing maintenance
- `decommissioned`: no longer in use

There is no `operational`, `faulty`, `failed` or `replaced` status. Sending one is rejected with 400.

## Component Criticality Values

- `Low`
- `Medium` (the default)
- `High`
- `Critical`

## Error Responses

Errors carry a `message` field. Validation errors add `details`.

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "details": [
    { "field": "name", "message": "Field required", "code": "missing" },
    { "field": "status", "message": "Input should be 'active', 'inactive', 'maintenance' or 'decommissioned'", "code": "enum" }
  ]
}
```

:::note Available from the next API release
The `details` list above is new. Today a validation failure on this route can answer with a 502 from the gateway instead of a 400.
:::

Other 400 messages: `Asset with ID asset-999 not found`, `Invalid status 'operational'; must be one of: active, inactive, maintenance, decommissioned, retired` (on update).

### 404 Not Found
```json
{
  "message": "Component with ID comp-999 not found"
}
```
