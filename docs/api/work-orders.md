---
sidebar_position: 8
---

# Work Orders API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

The Work Orders API manages maintenance work orders, with notes, media, tasks and parts as sub-resources.

Every response uses the real stored field names. The id is `workOrderId` (never `id`). Timestamps are `createdAt` and `updatedAt` (there is no `createdDate`). A completed work order also carries `completedAt`.

## Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/work-orders` | List work orders |
| POST | `/rcm/work-orders` | Create a new work order |
| GET | `/rcm/work-orders/{workOrderId}` | Get a specific work order |
| PUT | `/rcm/work-orders/{workOrderId}` | Update a work order |
| DELETE | `/rcm/work-orders/{workOrderId}` | Delete a work order |

## Sub-Resource Endpoints

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/work-orders/{workOrderId}/notes` | List work order notes |
| POST | `/rcm/work-orders/{workOrderId}/notes` | Add a note |

### Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/work-orders/{workOrderId}/media` | List media files |
| POST | `/rcm/work-orders/{workOrderId}/media` | Upload media |
| POST | `/rcm/work-orders/{workOrderId}/media/presigned-url` | Get presigned upload URL |
| DELETE | `/rcm/work-orders/{workOrderId}/media/{mediaId}` | Delete media |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/work-orders/{workOrderId}/tasks` | List tasks |
| POST | `/rcm/work-orders/{workOrderId}/tasks` | Add a task |
| PUT | `/rcm/work-orders/{workOrderId}/tasks/{taskId}` | Update task |
| DELETE | `/rcm/work-orders/{workOrderId}/tasks/{taskId}` | Delete task |

### Parts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/work-orders/{workOrderId}/parts` | List required parts |
| POST | `/rcm/work-orders/{workOrderId}/parts` | Add a part |
| PUT | `/rcm/work-orders/{workOrderId}/parts/{partId}` | Update part |
| DELETE | `/rcm/work-orders/{workOrderId}/parts/{partId}` | Remove part |

## List Work Orders

**Endpoint:** `GET /rcm/work-orders`

**Authentication:** Required

**Who sees what.** The list is scoped by the `assignedTo` query parameter:

- No `assignedTo`: the **caller's** work orders (assigned to the API key's user), plus any unassigned work orders the caller raised. This is the view the app's Work Orders list shows by default.
- `assignedTo=all`: every work order in the tenant, newest first. Use this to read what an import created.
- `assignedTo=unassigned`: work orders nobody is assigned to.
- `assignedTo=<userId>`: work orders assigned to that user.

Work orders created with an API key are **unassigned** unless the body sets `assignedTo`. They do not appear in the default list for anyone. In the app they show up in the Work Orders list only when the viewer picks **All work orders**. To read them back through the API, send `assignedTo=all` or `assignedTo=unassigned`.

**Query Parameters:**
- `assignedTo` (optional): `all`, `unassigned`, a user id, or leave it out for the caller's own view
- `status` (optional): exact match on the stored status, for example `open` or `completed`
- `priority` (optional): exact match, for example `high`
- `type` (optional): exact match, for example `Corrective`
- `site` (optional): work orders at one site
- `assetId` (optional): work orders on one asset (returned in full, every status)
- `componentId` (optional): work orders on one component
- `limit` (optional): page size, at most 100. Only applies to `assignedTo=all`.
- `nextToken` (optional): the token from the previous page

With no `limit` or `nextToken` the response is a plain array. With either of them the response is `{"items": [...], "nextToken": "..."}`; `nextToken` is `null` on the last page. There is no `offset`, `search`, `createdAfter` or `createdBefore`.

**Response:**
```json
[
  {
    "workOrderId": "3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f",
    "tenantId": "tenant-123",
    "title": "Pump A1 Bearing Replacement",
    "description": "Replace worn bearing in centrifugal pump A1",
    "assetId": "asset-123",
    "assetName": "Pump A1",
    "site": "main-facility",
    "status": "in-progress",
    "priority": "high",
    "type": "Corrective",
    "assignedTo": "unassigned",
    "assignedName": "Unassigned",
    "createdBy": "user-001",
    "createdByName": "Mike Johnson",
    "dueDate": "2024-10-05T08:00:00Z",
    "scheduledStartTime": "2024-10-05T08:00:00Z",
    "estimatedDuration": 240,
    "requiredSkills": ["mechanical"],
    "requiredTools": [],
    "pmProcedureId": null,
    "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
    "metadata": {},
    "customFields": {},
    "createdAt": "2024-10-01T09:00:00",
    "updatedAt": "2024-10-05T10:30:00"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/work-orders?assignedTo=all&status=in-progress&limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Work Order

**Endpoint:** `POST /rcm/work-orders`

**Authentication:** Required

`title` is the only required field. `assetId`, `componentId`, `pmProcedureId` and `failureCodeId` are checked against your tenant when sent; an unknown id is rejected with 400.

**Fields:**

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Required. |
| `description` | string | |
| `assetId` | string | The asset. `site` is copied from the asset when you do not send it. |
| `assetIds` | string[] | Two or more ids create a grouped work order (one parent, one child per asset). |
| `componentId` | string | The component on the asset. |
| `site` | string | Defaults to the asset's site. |
| `type` | string | `Corrective`, `Preventive`, `Predictive` or `Emergency`. Default `Corrective`. |
| `priority` | string | `low`, `medium` or `high`. Default `Medium`. |
| `status` | string | See [status values](#work-order-status-values). Default `Open`. |
| `assignedTo` | string | The user id of the assignee. Leave it out for an unassigned work order (stored as `"unassigned"`). |
| `assignedName` | string | Display name for the assignee. |
| `dueDate` | string | ISO 8601. Must be in the future, unless you use an API key. |
| `scheduledStartTime` | string | ISO 8601. Must be in the future, unless you use an API key. A past time reserves no tools. |
| `estimatedDuration` | number | **Minutes.** `240` is four hours. |
| `requiredSkills` | string[] | |
| `requiredTools` | string[] | |
| `pmProcedureId` | string | See [below](#create-a-work-order-from-a-pm-procedure). |
| `jobPlanId`, `jobPlanVersion` | string, integer | Snapshot a [job plan](./job-plans.md) onto the work order. |
| `failureCodeId` | string | A [failure mode](./failure-codes.md) id. |
| `conditionFound` | string | `as_expected`, `early_wear`, `failure_imminent`, `already_failed` or `no_access`. |
| `createdAt` | string | ISO 8601. For imports: keeps the original raised date. Defaults to now. |
| `startedAt` | string | ISO 8601. API key only. For imports: when work began. MTTR is measured from this date. Needs a `status` of `in-progress`, `waiting-parts`, `completed` or `cancelled`, and may not be before `createdAt`. |
| `completedAt` | string | ISO 8601. For imports: the original completion date. Needs a completed `status` and may not be before `createdAt` or `startedAt`. With an API key, a PM's strategy takes its Last Performed and Next Due from this date. |
| `cancelledAt` | string | ISO 8601. API key only. For imports: the original cancellation date. Needs a cancelled `status` and may not be before `createdAt` or `startedAt`. |
| `metadata` | object | Free-form data of your own. |
| `customFields` | object | Free-form data of your own. |
| `autoKitParts` | boolean | Default `true`. When a `componentId` is given, the component's parts are added to the work order. Send `false` to skip that. |

**Loading completed PMs.** With an API key, a completed PM sent with `completedAt` moves its strategy's Last Performed and Next Due. Last Performed only ever moves forward, so the order of a load does not matter. Next Due is worked out from that date. If the latest completion you load is old, the strategy can show as overdue, and a Next Due set by hand can move earlier.

**Request Body:**
```json
{
  "title": "Motor B2 Electrical Maintenance",
  "description": "Investigate electrical issues and perform necessary repairs",
  "assetId": "asset-456",
  "componentId": "comp-789",
  "priority": "medium",
  "type": "Corrective",
  "status": "completed",
  "scheduledStartTime": "2024-11-01T09:00:00Z",
  "estimatedDuration": 360,
  "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "requiredSkills": ["electrical"],
  "createdAt": "2024-10-15T10:30:00Z",
  "completedAt": "2024-11-01T15:10:00Z",
  "metadata": {
    "legacyWorkOrderNumber": "WO-2024-002"
  }
}
```

**Response:** `200 OK` with the stored work order. `workOrderId`, `createdBy`, `createdByName`, `createdByEmail`, `createdAt` and `updatedAt` are filled in by the API. `assignedTo` is `"unassigned"` when nobody was assigned.
```json
{
  "workOrderId": "8c2d1e0f-3a4b-4c5d-9e6f-7a8b9c0d1e2f",
  "tenantId": "tenant-123",
  "title": "Motor B2 Electrical Maintenance",
  "description": "Investigate electrical issues and perform necessary repairs",
  "assetId": "asset-456",
  "componentId": "comp-789",
  "site": "main-facility",
  "type": "Corrective",
  "priority": "medium",
  "status": "completed",
  "assignedTo": "unassigned",
  "assignedName": "Unassigned",
  "assignedToCreatedAt": "unassigned#2024-10-15T10:30:00",
  "createdBy": "api-key-user",
  "createdByName": "",
  "createdByEmail": "",
  "dueDate": "",
  "scheduledStartTime": "2024-11-01T09:00:00Z",
  "estimatedDuration": 360,
  "requiredSkills": ["electrical"],
  "requiredTools": [],
  "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "metadata": {
    "legacyWorkOrderNumber": "WO-2024-002"
  },
  "customFields": {},
  "parentId": "8c2d1e0f-3a4b-4c5d-9e6f-7a8b9c0d1e2f",
  "rootId": "8c2d1e0f-3a4b-4c5d-9e6f-7a8b9c0d1e2f",
  "hierarchyLevel": 0,
  "createdAt": "2024-10-15T10:30:00Z",
  "completedAt": "2024-11-01T15:10:00Z",
  "updatedAt": "2024-11-04T02:14:09"
}
```

Tasks and parts are not created from the body. Add them afterwards with the [tasks](#work-order-tasks) and [parts](#work-order-parts) sub-resources, or let a PM procedure or job plan supply them.

## Create a Work Order from a PM Procedure

**Endpoint:** `POST /rcm/work-orders`

Pass the procedure's id as `pmProcedureId`. The procedure must exist in your tenant, or the request is rejected with 400.

**Request Body:**
```json
{
  "title": "Monthly pump inspection - Pump A1",
  "assetId": "asset-456",
  "type": "Preventive",
  "priority": "medium",
  "pmProcedureId": "4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f"
}
```

What the API fills in:

- `pmProcedureId` and the procedure's `strategyId` are recorded on the work order.
- If the procedure links to a [job plan](./job-plans.md), the plan's active version (or the version the procedure pins with `jobPlanVersion`) is copied onto the work order. Each step becomes a task row, readable at `GET /rcm/work-orders/{workOrderId}/tasks`, and `requiredTools`, `requiredSkills`, `parts`, `permits` and `crafts` are filled in unless your body sets them. The copy is a snapshot: later changes to the job plan do not alter this work order.
- A work order can also be raised straight from a job plan without a procedure: send `jobPlanId` (and optionally `jobPlanVersion`) instead of `pmProcedureId`.
- A procedure with no job plan gives the work order no task rows; its own `steps` stay on the procedure.

See [PM Procedures](./pm-procedures.md) for how procedures, components and job plans fit together.

## Get Work Order

**Endpoint:** `GET /rcm/work-orders/{workOrderId}`

**Authentication:** Required

**Path Parameters:**
- `workOrderId`: Unique identifier of the work order

**Response:** the stored work order plus related records where they exist: `asset`, `component`, `pmProcedure`, `media`, and `partsReadiness`. Tasks, notes and parts are not embedded; read them from their sub-resources.
```json
{
  "workOrderId": "3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f",
  "tenantId": "tenant-123",
  "title": "Pump A1 Bearing Replacement",
  "description": "Replace worn bearing in centrifugal pump A1",
  "assetId": "asset-123",
  "assetName": "Pump A1",
  "componentId": "comp-001",
  "componentName": "Drive end bearing",
  "site": "main-facility",
  "status": "completed",
  "priority": "high",
  "type": "Corrective",
  "assignedTo": "tech-001",
  "assignedName": "John Smith",
  "createdBy": "user-001",
  "createdByName": "Mike Johnson",
  "dueDate": "2024-10-05T08:00:00Z",
  "scheduledStartTime": "2024-10-05T08:00:00Z",
  "estimatedDuration": 240,
  "requiredSkills": ["mechanical"],
  "requiredTools": ["bearing puller"],
  "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "conditionFound": "early_wear",
  "metadata": {},
  "customFields": {},
  "startedAt": "2024-10-05T08:15:00",
  "completedAt": "2024-10-05T12:30:00",
  "createdAt": "2024-10-01T09:00:00",
  "updatedAt": "2024-10-05T12:30:00",
  "asset": { "assetId": "asset-123", "name": "Pump A1", "site": "main-facility" },
  "component": { "componentId": "comp-001", "name": "Drive end bearing" },
  "media": [
    {
      "mediaId": "media-001",
      "fileName": "worn_bearing.jpg",
      "fileType": "image/jpeg",
      "uploadedAt": "2024-10-05T09:45:00"
    }
  ],
  "partsReadiness": { "total": 1, "ready": 1, "shortage": 0, "hasParts": true, "allReady": true }
}
```

## Update Work Order

**Endpoint:** `PUT /rcm/work-orders/{workOrderId}`

**Authentication:** Required

**Path Parameters:**
- `workOrderId`: Unique identifier of the work order

Send only the fields you want to change. The server stamps the dates: `startedAt` on the first move to `in-progress`, `completedAt` on each move to `completed` (cleared if the work order is reopened), and `cancelledAt` on `cancelled`. `updatedAt` is always set by the server.

Corrective and Emergency work orders need a `failureCodeId`, or a `skipReason`, before they can be completed.

**Request Body:**
```json
{
  "status": "completed",
  "failureCodeId": "9b1e2f3a-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "conditionFound": "early_wear"
}
```

**Response:** `200 OK` with the whole work order as now stored.

:::note Available from the next API release
Today this call ignores `createdAt`, `startedAt`, `completedAt` and `cancelledAt`. To correct `createdAt` or `completedAt` before the release is out, delete the work order and create it again with its dates. `startedAt`, `cancelledAt` and past `dueDate` and `scheduledStartTime` values on create also arrive with the release.
:::

### How do I correct the dates on a work order?

With an API key, send any of `createdAt`, `startedAt`, `completedAt` and `cancelledAt`, as ISO 8601. Past dates are kept exactly as sent, and `updatedAt` still shows when you made the correction. A request made with a login token keeps ignoring all four, which is how the app saves.

| Field | Rule |
|-------|------|
| `createdAt` | May not be later than any other date the work order ends up with. |
| `startedAt` | The work order must end up `in-progress`, `waiting-parts`, `completed` or `cancelled`, so send `status` with it if it is not. May not be earlier than `createdAt`. |
| `completedAt` | The work order must end up `completed`, so send `status` with it if it is not completed yet. May not be earlier than `createdAt` or `startedAt`. |
| `cancelledAt` | The work order must end up `cancelled`, so send `status` with it if it is not cancelled yet. May not be earlier than `createdAt` or `startedAt`. |

A bad date gets a `400` and nothing is saved. A work order loaded without its dates has today as its `createdAt`, so a past `completedAt` sent alone gets that `400`. Send them together:

```json
{
  "createdAt": "2024-10-15T10:30:00Z",
  "startedAt": "2024-11-01T08:00:00Z",
  "completedAt": "2024-11-01T15:10:00Z"
}
```

- **Changing status.** A `startedAt`, `completedAt` or `cancelledAt` you send replaces the time of the call. A PM's strategy takes its Last Performed from `completedAt` too. It only ever moves forward.
- **Sending a row back.** `null`, or the value already stored, counts as not sent. If you read a work order and send it back, its dates stay put, and reopening it still clears `completedAt` and `cancelledAt`.
- **Grouped work orders.** On a group, `createdAt`, `startedAt` and `cancelledAt` change the group itself, not its child work orders. With `completeChildren`, `completedAt` also goes on the children that closes, and `startedAt` is refused. Dates are refused alongside `addAssetIds`.

`dueDate` and `scheduledStartTime` still have to be in the future on PUT, even with an API key. A value that is already stored can be sent back unchanged.

### How do I clear the assignee?

With an API key, send `assignedTo` as `"unassigned"`, `""` or `null`. What happens depends on the rest of the request:

| The request | What happens |
|-------------|--------------|
| Only `assignedTo`, on a work order someone is assigned to | The assignee is cleared. An active work order goes back to `open` and loses its `scheduledStartTime`, and its tool reservations are cancelled. |
| `assignedTo` and other fields, on a work order someone is assigned to | The assignee is cleared and the other fields save. If you do not send `status`, an active work order goes back to `open`. If you do not send `scheduledStartTime`, it is cleared. |
| Any of these, on a work order nobody is assigned to | Nothing to clear. The other fields save and the status stays as it is. This is the case when you read an unassigned work order, edit it and send it back. |

A request made with a login token always takes the first row and ignores other fields, which is how the app's clear assignee action works.

## Delete Work Order

**Endpoint:** `DELETE /rcm/work-orders/{workOrderId}`

**Authentication:** Required

**Path Parameters:**
- `workOrderId`: Unique identifier of the work order

**Response:**
```json
{
  "message": "Work order 3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f deleted successfully"
}
```

## Work Order Notes

### List Notes

**Endpoint:** `GET /rcm/work-orders/{workOrderId}/notes`

**Response:** a JSON array of notes.
```json
[
  {
    "noteId": "f1e2d3c4-b5a6-4978-8a9b-0c1d2e3f4a5b",
    "workOrderId": "3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f",
    "tenantId": "tenant-123",
    "content": "Initial assessment complete. Bearing replacement required.",
    "author": "john.smith@example.com",
    "createdAt": "2024-10-05T09:00:00",
    "updatedAt": "2024-10-05T09:00:00"
  }
]
```

### Add Note

**Endpoint:** `POST /rcm/work-orders/{workOrderId}/notes`

The field is `content` (required). `@mentions` in the text notify the mentioned users.

**Request Body:**
```json
{
  "content": "Bearing replacement completed successfully. System tested and operational."
}
```

**Response:** the stored note with its `noteId`.

## Work Order Media

Work order media uses the same photo storage as parts and assets.

### List Media

**Endpoint:** `GET /rcm/work-orders/{workOrderId}/media`

**Response:** a JSON array of media records, each with `mediaId`, `fileName`, `fileType`, `description`, `s3Key`, `sizeBytes`, `createdAt` and a time-limited `presignedUrl` for download.

### Get Presigned Upload URL

**Endpoint:** `POST /rcm/work-orders/{workOrderId}/media/presigned-url`

**Request Body:**
```json
{
  "fileName": "repair_photo.jpg",
  "fileType": "image/jpeg"
}
```

**Response:**
```json
{
  "presignedUrl": "https://s3.amazonaws.com/bucket/upload-url",
  "s3Key": "work-orders/3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f/media-002.jpg",
  "mediaId": "media-002",
  "expiresIn": 3600
}
```

Upload the file with an HTTP PUT to `presignedUrl`, then record it with the call below.

### Upload Media

**Endpoint:** `POST /rcm/work-orders/{workOrderId}/media`

Records the media after the file has been uploaded to the presigned URL.

**Request Body:**
```json
{
  "fileName": "repair_photo.jpg",
  "type": "image/jpeg",
  "description": "Bearing housing after the repair",
  "s3Key": "work-orders/3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f/media-002.jpg"
}
```

**Response:** `{"message": "Media uploaded successfully", "media": {...}}` where `media` is the stored record with its `mediaId`.

## Work Order Tasks

### List Tasks

**Endpoint:** `GET /rcm/work-orders/{workOrderId}/tasks`

**Response:** a JSON array of tasks, each with `taskId`, `description`, `completed`, `index`, `estimatedMinutes`, `safetyNotes`, `completedAt` and `completedBy`.

### Add Task

**Endpoint:** `POST /rcm/work-orders/{workOrderId}/tasks`

**Request Body:**
```json
{
  "description": "Final system test and verification"
}
```

**Response:** the stored task with its `taskId`.

### Update Task

**Endpoint:** `PUT /rcm/work-orders/{workOrderId}/tasks/{taskId}`

Fields you can change: `completed` (boolean; stamps `completedAt` and `completedBy`), `description`, `index`.

**Request Body:**
```json
{
  "completed": true
}
```

## Work Order Parts

### List Parts

**Endpoint:** `GET /rcm/work-orders/{workOrderId}/parts`

**Response:** a JSON array. Each row carries `workOrderPartId`, `partId`, `estimatedQuantity`, `actualQuantity` (when set), `status`, `cost`, `partDetails` (`partNumber`, `name`, `unit`, `cost`) and, when the work order has a site, `inventoryDetails` and `sufficientStock`.

### Add Part

**Endpoint:** `POST /rcm/work-orders/{workOrderId}/parts`

`partId` and `estimatedQuantity` are required. The part must exist in your tenant (404 otherwise). A part can only be added to a work order once (409 otherwise).

**Request Body:**
```json
{
  "partId": "part-003",
  "estimatedQuantity": 1,
  "actualQuantity": 1,
  "status": "pending"
}
```

Optional fields: `actualQuantity`, `status` (default `pending`), `cost` (defaults to the part's cost), `metadata`.

:::note Available from the next API release
`quantity` is accepted as an alias for `estimatedQuantity`. Today a body with `quantity` and no `estimatedQuantity` is rejected with 400 `Estimated quantity is required`.
:::

**Response:** the stored row. Its id is `workOrderPartId`.
```json
{
  "workOrderPartId": "a7b8c9d0-e1f2-4a3b-8c4d-5e6f7a8b9c0d",
  "workOrderId": "3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f",
  "tenantId": "tenant-123",
  "partId": "part-003",
  "estimatedQuantity": 1,
  "actualQuantity": 1,
  "status": "pending",
  "cost": 25.5,
  "createdAt": "2024-10-15T10:30:00",
  "updatedAt": "2024-10-15T10:30:00",
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "inventoryDetails": { "quantity": 4, "minStockLevel": 2, "maxStockLevel": 10 },
  "sufficientStock": true,
  "partDetails": {
    "partNumber": "SKF-6204",
    "name": "Ball Bearing 6204",
    "unit": "each",
    "cost": 25.5
  }
}
```

### Update Part

**Endpoint:** `PUT /rcm/work-orders/{workOrderId}/parts/{partId}`

The path takes the **part's** id, not `workOrderPartId`.

**Request Body:**
```json
{
  "estimatedQuantity": 2,
  "actualQuantity": 2,
  "status": "completed"
}
```

Fields you can change: `estimatedQuantity`, `actualQuantity`, `cost`, `status`, `metadata`. Moving `status` to `completed` deducts the quantity from the site's inventory.

## Work Order Status Values

Send lower-case values. The list filter matches exactly what was stored.

- **open**: raised, not started
- **request**: raised as a request, awaiting approval
- **waiting-parts**: on hold until parts arrive
- **in-progress**: work has started (`startedAt` is stamped)
- **completed**: done (`completedAt` is stamped)
- **cancelled**: cancelled (`cancelledAt` is stamped)

## Priority Levels

- **low**
- **medium**
- **high**

## Work Order Types

Matched case-insensitively and stored as sent.

- **Corrective**: repair work
- **Preventive**: planned maintenance, usually from a PM procedure
- **Predictive**: raised from a condition monitoring alert
- **Emergency**: breakdown response

## Error Responses

Errors carry a single `message` field.

### 400 Bad Request
```json
{
  "message": "Asset with ID asset-999 not found"
}
```
Other 400 messages: `Work order title is required`, `PM procedure with ID pm-999 not found`, `Component with ID comp-999 not found`, `Failure code with ID fc-999 not found`, `Invalid limit parameter`, `Invalid pagination token`, `Estimated quantity is required` (parts).

### 404 Not Found
```json
{
  "message": "Work order with ID wo-999 not found"
}
```

### 409 Conflict
```json
{
  "message": "Part part-003 is already in work order 3f6c0d4e-7a2b-4c9d-8e1f-2a3b4c5d6e7f"
}
```

## Related Photo Management Documentation

- **[Parts Photo API](./parts.md#part-photos)**: photo endpoints for parts
- **[Assets Photo API](./assets.md#asset-photos)**: photo endpoints for assets
