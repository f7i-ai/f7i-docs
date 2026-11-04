---
sidebar_position: 7
---

# Job Plans API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

A job plan is a reusable, versioned description of a piece of work: the steps, the parts, tools, skills, crafts and permits it needs, and how long it takes. It lives in the Job Plan Library on its own, not tied to any asset. [PM procedures](./pm-procedures.md) link to a job plan with `jobPlanId`, and a work order can be raised straight from a job plan with `jobPlanId` on `POST /rcm/work-orders`.

Each job plan holds a list of **versions**. A version is never edited once published; to change the steps you publish a new version. One version is the **active** version, which is what procedures and work orders use unless they pin a specific version. When a work order is raised, the chosen version is copied onto it, so later versions do not change work already issued.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/job-plans` | List job plans (summaries) |
| POST | `/rcm/job-plans` | Create a job plan with version 1 |
| GET | `/rcm/job-plans/{jobPlanId}` | Get a job plan with every version |
| PUT | `/rcm/job-plans/{jobPlanId}` | Update title, description or category |
| DELETE | `/rcm/job-plans/{jobPlanId}` | Delete a job plan no procedure uses |
| POST | `/rcm/job-plans/{jobPlanId}/versions` | Publish a new version |
| POST | `/rcm/job-plans/{jobPlanId}/activate` | Make an existing version the active one |
| POST | `/rcm/job-plans/extract-from-pm` | Create a job plan from a PM procedure's own steps |

## The version payload

Every call that creates a version (`POST /rcm/job-plans` and `POST /rcm/job-plans/{jobPlanId}/versions`) takes these fields. All are optional; missing lists are stored empty.

| Field | Type | Notes |
|-------|------|-------|
| `steps` | object[] | In order. Each step: `description` (string), `estimatedMinutes` (integer), `safetyNotes` (string). Step images are attached from the app, not through this API. |
| `requiredTools` | string[] | |
| `requiredSkills` | string[] | |
| `requiredParts` | object[] | Each part: `partId`, `name`, `quantity` (defaults to 1). A part needs at least one of `partId` or `name`. |
| `permits` | string[] | For example `"Hot work"`. |
| `crafts` | object[] | Each craft: `name`, `estimatedHours`. |
| `estimatedDuration` | integer | Total minutes. Defaults to the sum of the steps' `estimatedMinutes`. |
| `changeNote` | string | Why this version exists. Version 1 defaults to `"Initial version"`. |

## List Job Plans

**Endpoint:** `GET /rcm/job-plans`

**Authentication:** Required

**Query Parameters:**
- `category` (optional): Only plans in this category
- `search` (optional): Case-insensitive match on title, description or category

**Response:** a JSON array of summaries. The `versions` list is left out to keep the response small; `activeVersionDetail` gives the headline numbers and `versionCount` says how many versions exist.
```json
[
  {
    "jobPlanId": "jp-001",
    "title": "Centrifugal pump monthly service",
    "description": "Inspection and lubrication of a centrifugal pump",
    "category": "rotating-equipment",
    "createdVia": "user",
    "source": null,
    "activeVersion": 2,
    "latestVersion": 2,
    "versionCount": 2,
    "activeVersionDetail": {
      "version": 2,
      "stepCount": 4,
      "estimatedDuration": 120
    },
    "createdAt": "2026-09-01T02:00:00+00:00",
    "updatedAt": "2026-10-01T02:00:00+00:00",
    "createdBy": "user-123",
    "createdByName": "Sam Technician"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/job-plans?category=rotating-equipment" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Job Plan

**Endpoint:** `POST /rcm/job-plans`

**Authentication:** Required

Creates the plan and publishes version 1 from the same body.

**Fields:**

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | **Required.** |
| `description` | string | |
| `category` | string | Any string. The app offers `general` (the default), `rotating-equipment`, `electrical`, `instrumentation`, `lubrication`, `inspection`, `structural` and `safety`. |
| the version payload | | `steps`, `requiredTools`, `requiredSkills`, `requiredParts`, `permits`, `crafts`, `estimatedDuration`, `changeNote` as above. |

**Request Body:**
```json
{
  "title": "Centrifugal pump monthly service",
  "description": "Inspection and lubrication of a centrifugal pump",
  "category": "rotating-equipment",
  "steps": [
    { "description": "Isolate and lock out the pump", "estimatedMinutes": 15, "safetyNotes": "Confirm zero energy before starting" },
    { "description": "Inspect the pump body and seals for leaks", "estimatedMinutes": 20 },
    { "description": "Check bearing lubrication", "estimatedMinutes": 30 }
  ],
  "requiredTools": ["torch", "grease gun"],
  "requiredSkills": ["mechanical"],
  "requiredParts": [
    { "partId": "part-001", "name": "Pump seal kit", "quantity": 1 }
  ],
  "permits": [],
  "crafts": [
    { "name": "Fitter", "estimatedHours": 1.5 }
  ]
}
```

**Response:** `200 OK` with the full job plan.
```json
{
  "jobPlanId": "jp-001",
  "title": "Centrifugal pump monthly service",
  "description": "Inspection and lubrication of a centrifugal pump",
  "category": "rotating-equipment",
  "createdVia": "user",
  "source": null,
  "activeVersion": 1,
  "latestVersion": 1,
  "versions": [
    {
      "version": 1,
      "steps": [
        { "description": "Isolate and lock out the pump", "estimatedMinutes": 15, "safetyNotes": "Confirm zero energy before starting", "images": [] },
        { "description": "Inspect the pump body and seals for leaks", "estimatedMinutes": 20, "safetyNotes": "", "images": [] },
        { "description": "Check bearing lubrication", "estimatedMinutes": 30, "safetyNotes": "", "images": [] }
      ],
      "requiredTools": ["torch", "grease gun"],
      "requiredSkills": ["mechanical"],
      "requiredParts": [ { "partId": "part-001", "name": "Pump seal kit", "quantity": 1 } ],
      "permits": [],
      "crafts": [ { "name": "Fitter", "estimatedHours": 1.5 } ],
      "estimatedDuration": 65,
      "changeNote": "Initial version",
      "createdAt": "2026-09-01T02:00:00+00:00",
      "createdBy": "user-123",
      "createdByName": "Sam Technician"
    }
  ],
  "createdAt": "2026-09-01T02:00:00+00:00",
  "updatedAt": "2026-09-01T02:00:00+00:00",
  "createdBy": "user-123",
  "createdByName": "Sam Technician"
}
```

**Example Request:**
```bash
curl -X POST "https://api-acme.f7i.ai/rcm/job-plans" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Centrifugal pump monthly service",
    "category": "rotating-equipment",
    "steps": [
      { "description": "Isolate and lock out the pump", "estimatedMinutes": 15 },
      { "description": "Inspect the pump body and seals for leaks", "estimatedMinutes": 20 },
      { "description": "Check bearing lubrication", "estimatedMinutes": 30 }
    ],
    "requiredTools": ["torch", "grease gun"],
    "requiredSkills": ["mechanical"]
  }'
```

## Get Job Plan

**Endpoint:** `GET /rcm/job-plans/{jobPlanId}`

**Authentication:** Required

**Response:** the full job plan, with every version, in the same shape as the create response.

## Update Job Plan

**Endpoint:** `PUT /rcm/job-plans/{jobPlanId}`

**Authentication:** Required

Changes `title`, `description` and `category` only. Steps and the other version fields cannot be changed here: publish a new version instead. Anything else in the body is ignored.

**Request Body:**
```json
{
  "title": "Centrifugal pump monthly service (rev B)",
  "category": "lubrication"
}
```

**Response:** `200 OK` with the full job plan.

## Publish a New Version

**Endpoint:** `POST /rcm/job-plans/{jobPlanId}/versions`

**Authentication:** Required

Takes the version payload plus:

| Field | Type | Notes |
|-------|------|-------|
| `activate` | boolean | Make the new version active. Defaults to `true`. Send `false` to publish a draft that procedures do not use yet. |

**Request Body:**
```json
{
  "steps": [
    { "description": "Isolate and lock out the pump", "estimatedMinutes": 15 },
    { "description": "Inspect the pump body and seals for leaks", "estimatedMinutes": 20 },
    { "description": "Check bearing lubrication and temperature", "estimatedMinutes": 30 },
    { "description": "Record vibration readings", "estimatedMinutes": 15 }
  ],
  "requiredTools": ["torch", "grease gun", "vibration meter"],
  "requiredSkills": ["mechanical"],
  "changeNote": "Added vibration readings",
  "activate": true
}
```

**Response:** `200 OK` with the full job plan. `latestVersion` is the new version number, and `activeVersion` matches it when `activate` was true.

## Activate a Version

**Endpoint:** `POST /rcm/job-plans/{jobPlanId}/activate`

**Authentication:** Required

Points the active version at one that already exists. Use it to roll back.

**Request Body:**
```json
{
  "version": 1
}
```

**Response:** `200 OK` with the full job plan. A version number that does not exist is rejected with 404.

## Delete Job Plan

**Endpoint:** `DELETE /rcm/job-plans/{jobPlanId}`

**Authentication:** Required

A job plan that any PM procedure still references cannot be deleted. Unlink it from each procedure first (`PUT /rcm/pms/{pmId}` with `"jobPlanId": null`). Work orders already raised keep their copy of the steps.

**Response:**
```json
{
  "message": "Job plan jp-001 deleted"
}
```

## Create a Job Plan from a PM Procedure

**Endpoint:** `POST /rcm/job-plans/extract-from-pm`

**Authentication:** Required

Copies a procedure's own `steps`, `requiredTools`, `requiredSkills`, `duration` and `type` into a new job plan. The procedure is left as it was; link it to the new plan with `PUT /rcm/pms/{pmId}` and `jobPlanId` if you want it to use the plan.

**Request Body:**
```json
{
  "pmId": "4d2c7a5e-8f1b-4c3a-9e6d-1a2b3c4d5e6f",
  "overrides": {
    "title": "Centrifugal pump monthly service",
    "category": "rotating-equipment"
  }
}
```

`overrides` is optional and may hold any create field.

**Response:** `200 OK` with the full new job plan.

## Error Responses

Errors carry a single `message` field.

### 400 Bad Request
```json
{
  "message": "title is required"
}
```

### 404 Not Found
```json
{
  "message": "Job plan jp-999 not found"
}
```

### 409 Conflict
```json
{
  "message": "Cannot delete: this job plan is referenced by one or more PM procedures"
}
```
