---
sidebar_position: 6
---

# PM Procedures API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

A PM procedure is a piece of preventive maintenance that is done on one component of an asset, on a set frequency. It records what the work is, how often it is due, and the skills, tools and safety precautions it needs.

The steps a technician follows can live in two places:

- **On the procedure itself**, in the `steps` field. This is the original model.
- **In a [job plan](./job-plans.md)**, linked by `jobPlanId`. A job plan is a reusable, versioned step list from the Job Plan Library. When a work order is raised from the procedure, the job plan's steps become the work order's tasks and its tools, skills, parts, permits and crafts fill in the work order. One job plan can serve many procedures.

## How the pieces fit together

```
Asset
 └── Component                  POST /rcm/components
      └── PM procedure          POST /rcm/pms   (componentId, optional jobPlanId)
           └── Work order       POST /rcm/work-orders   (pmProcedureId)
                └── Tasks       GET  /rcm/work-orders/{workOrderId}/tasks
```

- A procedure belongs to a **component**, not directly to an asset. The procedure's `assetId` is copied from the component.
- A procedure can point at a **maintenance strategy** (`strategyId`) and a **job plan** (`jobPlanId`).
- Work orders are raised with the [Work Orders API](./work-orders.md#create-a-work-order-from-a-pm-procedure). There is no separate "create work order" call on the procedure.
- `frequency` is recorded on the procedure. The API does not generate work orders on a timer; your integration (or a person in the app) raises each work order.

## Create a PM procedure for an asset, step by step

1. **Find the component.** List the asset's components with `GET /rcm/components?assetId={assetId}`. If the asset has none yet, create one with `POST /rcm/components` (see [Components](./components.md)). Keep the `componentId`.
2. **Decide where the steps live.** Either put them in the procedure's `steps` field, or create a job plan with `POST /rcm/job-plans` (see [Job Plans](./job-plans.md)) and keep its `jobPlanId`. You can do both: the procedure's own `steps` are the fallback if the job plan is ever deleted.
3. **Create the procedure** with `POST /rcm/pms` (below).
4. **Raise work orders** with `POST /rcm/work-orders`, passing `pmProcedureId`.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/pms` | List PM procedures |
| POST | `/rcm/pms` | Create a PM procedure |
| GET | `/rcm/pms/{pmId}` | Get a PM procedure with its related records |
| PUT | `/rcm/pms/{pmId}` | Update a PM procedure |
| DELETE | `/rcm/pms/{pmId}` | Delete a PM procedure |

## List PM Procedures

**Endpoint:** `GET /rcm/pms`

**Authentication:** Required

**Query Parameters** (at most one is applied, in this order of precedence):
- `strategyId` (optional): Only procedures on this maintenance strategy
- `componentId` (optional): Only procedures on this component
- `assetId` (optional): Only procedures on this asset

With no parameters, every procedure in your tenant is returned. There is no paging, search or status filter.

**Response:** a JSON array of procedures.
```json
[
  {
    "pmId": "4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f",
    "componentId": "comp-123",
    "assetId": "asset-456",
    "code": "PP-001",
    "name": "Monthly pump inspection",
    "title": "Monthly inspection of centrifugal pump",
    "description": "Visual and lubrication check of the pump and its drive",
    "type": "preventive",
    "frequency": "monthly",
    "duration": "2h",
    "requiredSkills": ["mechanical"],
    "requiredTools": ["torch", "grease gun"],
    "steps": [
      "Isolate and lock out the pump",
      "Inspect the pump body and seals for leaks",
      "Check bearing lubrication"
    ],
    "safetyPrecautions": ["LOTO", "PPE"],
    "strategyId": "strat-789",
    "jobPlanId": "jp-001",
    "createdAt": "2026-10-01T10:30:00",
    "updatedAt": "2026-10-01T10:30:00"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/pms?assetId=asset-456" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create PM Procedure

**Endpoint:** `POST /rcm/pms`

**Authentication:** Required

**Required fields.** Every one of these must be present and non-empty. An empty string or empty array counts as missing.

| Field | Type | Notes |
|-------|------|-------|
| `componentId` | string | The component the procedure is done on. Must exist in your tenant. The procedure's `assetId` is taken from it. |
| `code` | string | A short identifier, for example `PP-001`. |
| `name` | string | Short name shown in lists. |
| `title` | string | Longer title shown on the procedure. |
| `description` | string | What the procedure covers. |
| `type` | string | The app offers `preventive`, `corrective`, `predictive` and `condition-based`. |
| `frequency` | string | The app offers `daily`, `weekly`, `monthly`, `quarterly`, `annually` and `as-needed`. Stored as given. |
| `duration` | string | Estimated time, for example `"2h"` or `"90m"`. The app reads a bare number as hours. |
| `requiredSkills` | string[] | At least one skill. |
| `requiredTools` | string[] | At least one tool. |
| `steps` | string[] | The steps in order, one string per step. If the procedure uses a job plan, the job plan's steps are used for work orders and these are the fallback. |
| `safetyPrecautions` | string[] | At least one precaution. |

**Optional fields:**

| Field | Type | Notes |
|-------|------|-------|
| `jobPlanId` | string | A job plan from the [Job Plan Library](./job-plans.md). Must exist, or the request is rejected with 400. |
| `jobPlanVersion` | integer | Pin the procedure to one version of the job plan. Leave it out to follow the job plan's active version. |
| `strategyId` | string | A maintenance strategy. Must exist, or the request is rejected with 400. |
| `metadata` | object | Free-form data of your own. |

**Request Body:**
```json
{
  "componentId": "comp-123",
  "code": "PP-001",
  "name": "Monthly pump inspection",
  "title": "Monthly inspection of centrifugal pump",
  "description": "Visual and lubrication check of the pump and its drive",
  "type": "preventive",
  "frequency": "monthly",
  "duration": "2h",
  "requiredSkills": ["mechanical"],
  "requiredTools": ["torch", "grease gun"],
  "steps": [
    "Isolate and lock out the pump",
    "Inspect the pump body and seals for leaks",
    "Check bearing lubrication"
  ],
  "safetyPrecautions": ["LOTO", "PPE"],
  "jobPlanId": "jp-001"
}
```

**Response:** `200 OK` with the stored procedure. `pmId`, `assetId`, `createdAt` and `updatedAt` are filled in by the API.
```json
{
  "pmId": "4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f",
  "componentId": "comp-123",
  "assetId": "asset-456",
  "code": "PP-001",
  "name": "Monthly pump inspection",
  "title": "Monthly inspection of centrifugal pump",
  "description": "Visual and lubrication check of the pump and its drive",
  "type": "preventive",
  "frequency": "monthly",
  "duration": "2h",
  "requiredSkills": ["mechanical"],
  "requiredTools": ["torch", "grease gun"],
  "steps": [
    "Isolate and lock out the pump",
    "Inspect the pump body and seals for leaks",
    "Check bearing lubrication"
  ],
  "safetyPrecautions": ["LOTO", "PPE"],
  "jobPlanId": "jp-001",
  "createdAt": "2026-10-01T10:30:00",
  "updatedAt": "2026-10-01T10:30:00"
}
```

**Example Request:**
```bash
curl -X POST "https://api-acme.f7i.ai/rcm/pms" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "componentId": "comp-123",
    "code": "PP-001",
    "name": "Monthly pump inspection",
    "title": "Monthly inspection of centrifugal pump",
    "description": "Visual and lubrication check of the pump and its drive",
    "type": "preventive",
    "frequency": "monthly",
    "duration": "2h",
    "requiredSkills": ["mechanical"],
    "requiredTools": ["torch", "grease gun"],
    "steps": ["Isolate and lock out the pump", "Inspect the pump body and seals for leaks", "Check bearing lubrication"],
    "safetyPrecautions": ["LOTO", "PPE"],
    "jobPlanId": "jp-001"
  }'
```

## Get PM Procedure

**Endpoint:** `GET /rcm/pms/{pmId}`

**Authentication:** Required

**Path Parameters:**
- `pmId`: The procedure's id

**Response:** the procedure, plus the related records where they exist: `strategy`, `component` and `asset`. The linked job plan is not embedded; fetch it with `GET /rcm/job-plans/{jobPlanId}`.
```json
{
  "pmId": "4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f",
  "componentId": "comp-123",
  "assetId": "asset-456",
  "code": "PP-001",
  "name": "Monthly pump inspection",
  "title": "Monthly inspection of centrifugal pump",
  "description": "Visual and lubrication check of the pump and its drive",
  "type": "preventive",
  "frequency": "monthly",
  "duration": "2h",
  "requiredSkills": ["mechanical"],
  "requiredTools": ["torch", "grease gun"],
  "steps": ["Isolate and lock out the pump", "Inspect the pump body and seals for leaks", "Check bearing lubrication"],
  "safetyPrecautions": ["LOTO", "PPE"],
  "strategyId": "strat-789",
  "jobPlanId": "jp-001",
  "createdAt": "2026-10-01T10:30:00",
  "updatedAt": "2026-10-01T10:30:00",
  "strategy": { "strategyId": "strat-789", "name": "Time-based PM", "frequency": "1m" },
  "component": { "componentId": "comp-123", "name": "Pump", "assetId": "asset-456" },
  "asset": { "assetId": "asset-456", "name": "Pump A1", "site": "Main plant" }
}
```

## Update PM Procedure

**Endpoint:** `PUT /rcm/pms/{pmId}`

**Authentication:** Required

**Path Parameters:**
- `pmId`: The procedure's id

Send only the fields you want to change. Each field you send replaces the stored value outright, so to change one step send the whole `steps` array. `pmId`, `tenantId` and `createdAt` in the body are ignored.

`componentId`, `assetId`, `strategyId` and `jobPlanId` are checked against your tenant when present; an unknown id is rejected with 400. To unlink a job plan, send `"jobPlanId": null`.

**Request Body:**
```json
{
  "frequency": "quarterly",
  "duration": "3h",
  "steps": [
    "Isolate and lock out the pump",
    "Inspect the pump body and seals for leaks",
    "Check bearing lubrication and temperature",
    "Record vibration readings"
  ],
  "jobPlanId": "jp-002"
}
```

**Response:** `200 OK` with the whole procedure as now stored.

## Delete PM Procedure

**Endpoint:** `DELETE /rcm/pms/{pmId}`

**Authentication:** Required

**Path Parameters:**
- `pmId`: The procedure's id

Deleting a procedure does not delete its job plan or any work orders already raised from it.

**Response:**
```json
{
  "message": "PM procedure 4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f deleted successfully"
}
```

## Raise a work order from a PM procedure

Use the Work Orders API. Pass the procedure's id as `pmProcedureId`:

```bash
curl -X POST "https://api-acme.f7i.ai/rcm/work-orders" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Monthly pump inspection - Pump A1",
    "assetId": "asset-456",
    "type": "preventive",
    "priority": "medium",
    "pmProcedureId": "4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f"
  }'
```

What happens:

- The work order records `pmProcedureId` and the procedure's `strategyId`.
- If the procedure has a `jobPlanId`, the job plan's active version (or the version pinned by `jobPlanVersion`) is copied onto the work order: each step becomes a task row (`GET /rcm/work-orders/{workOrderId}/tasks`), and `requiredTools`, `requiredSkills`, `parts`, `permits` and `crafts` are filled in unless your request body sets them. The copy is a snapshot, so later edits to the job plan do not change open work orders.
- If the procedure has no job plan, the work order has no task rows. The procedure's own `steps`, tools and skills stay on the procedure for the technician to read.

See [Create a work order from a PM procedure](./work-orders.md#create-a-work-order-from-a-pm-procedure) for the full request shape.

## Error Responses

Errors carry a single `message` field.

### 400 Bad Request
```json
{
  "message": "Missing required fields: componentId, safetyPrecautions"
}
```
Other 400 messages: `Component with ID comp-999 not found`, `Job plan with ID jp-999 not found`, `Strategy with ID strat-999 not found`, `Asset with ID asset-999 not found`, `jobPlanVersion must be an integer`.

### 404 Not Found
```json
{
  "message": "PM procedure with ID pm-999 not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```
