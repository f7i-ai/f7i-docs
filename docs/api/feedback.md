---
sidebar_position: 19
---

# Feedback API

The Feedback API provides endpoints for managing user feedback on predictions and notifications. Feedback data is used to improve model accuracy and track the real-world outcomes of predictive alerts.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/feedback` | List all feedback |
| POST | `/feedback` | Create new feedback |
| GET | `/feedback/{id}` | Get specific feedback |
| PUT | `/feedback/{id}` | Update feedback |
| DELETE | `/feedback/{id}` | Delete feedback |

## List Feedback

Retrieves feedback records with optional filtering.

**Endpoint:** `GET /feedback`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sensorId` | string | Filter by sensor identifier |
| `failureMode` | string | Filter by failure mode |
| `companyName` | string | Filter by company name |
| `siteName` | string | Filter by site name |
| `timestamp` | string | Filter by timestamp (ISO 8601) |
| `limit` | integer | Maximum number of results (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "feedback-123",
      "sensorId": "sensor-456",
      "companyName": "Acme Corp",
      "siteName": "Main Plant",
      "notificationId": "notif-789",
      "timestamp": "2024-10-16T09:00:00Z",
      "rating": "accurate",
      "failureMode": "bearing_wear",
      "failureCause": "lubrication_failure",
      "actionTaken": "Replaced bearing and improved lubrication schedule",
      "outcome": "resolved",
      "comments": "Inner race bearing wear confirmed during inspection",
      "createdAt": "2024-10-16T09:00:00Z",
      "updatedAt": "2024-10-16T09:00:00Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6ImZlZWRiYWNrLTEyMyJ9"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/feedback?failureMode=bearing_wear&limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Feedback

Creates a new feedback record.

**Endpoint:** `POST /feedback`

**Authentication:** Required

**Request Body:**
```json
{
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "notificationId": "notif-789",
  "timestamp": "2024-10-16T09:00:00Z",
  "rating": "accurate",
  "failureMode": "bearing_wear",
  "failureCause": "lubrication_failure",
  "actionTaken": "Replaced bearing and improved lubrication schedule",
  "outcome": "resolved",
  "comments": "Inner race bearing wear confirmed during inspection",
  "severity": "moderate",
  "downtime": {
    "hours": 4,
    "cost": 12000
  }
}
```

**Response:**
```json
{
  "id": "feedback-456",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "notificationId": "notif-789",
  "timestamp": "2024-10-16T09:00:00Z",
  "rating": "accurate",
  "failureMode": "bearing_wear",
  "failureCause": "lubrication_failure",
  "actionTaken": "Replaced bearing and improved lubrication schedule",
  "outcome": "resolved",
  "comments": "Inner race bearing wear confirmed during inspection",
  "severity": "moderate",
  "downtime": {
    "hours": 4,
    "cost": 12000
  },
  "createdAt": "2024-10-16T09:00:00Z",
  "updatedAt": "2024-10-16T09:00:00Z"
}
```

**Example Request:**
```bash
curl -X POST "https://api.acme.f7i.ai/prod/feedback" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sensorId": "sensor-456",
    "notificationId": "notif-789",
    "rating": "accurate",
    "failureMode": "bearing_wear",
    "actionTaken": "Replaced bearing"
  }'
```

## Get Feedback

Retrieves a specific feedback record by ID.

**Endpoint:** `GET /feedback/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the feedback record |

**Response:**
```json
{
  "id": "feedback-123",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "notificationId": "notif-789",
  "timestamp": "2024-10-16T09:00:00Z",
  "rating": "accurate",
  "failureMode": "bearing_wear",
  "failureCause": "lubrication_failure",
  "actionTaken": "Replaced bearing and improved lubrication schedule",
  "outcome": "resolved",
  "comments": "Inner race bearing wear confirmed during inspection",
  "severity": "moderate",
  "downtime": {
    "hours": 4,
    "cost": 12000
  },
  "createdAt": "2024-10-16T09:00:00Z",
  "updatedAt": "2024-10-16T09:00:00Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/feedback/feedback-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Update Feedback

Updates an existing feedback record.

**Endpoint:** `PUT /feedback/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the feedback record |

**Request Body:**
```json
{
  "outcome": "resolved",
  "actionTaken": "Replaced bearing and realigned motor",
  "downtime": {
    "hours": 6,
    "cost": 15000
  },
  "comments": "Additional misalignment found during repair"
}
```

**Response:**
```json
{
  "id": "feedback-123",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "notificationId": "notif-789",
  "timestamp": "2024-10-16T09:00:00Z",
  "rating": "accurate",
  "failureMode": "bearing_wear",
  "failureCause": "lubrication_failure",
  "actionTaken": "Replaced bearing and realigned motor",
  "outcome": "resolved",
  "comments": "Additional misalignment found during repair",
  "severity": "moderate",
  "downtime": {
    "hours": 6,
    "cost": 15000
  },
  "createdAt": "2024-10-16T09:00:00Z",
  "updatedAt": "2024-10-16T14:00:00Z"
}
```

**Example Request:**
```bash
curl -X PUT "https://api.acme.f7i.ai/prod/feedback/feedback-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "outcome": "resolved",
    "actionTaken": "Replaced bearing and realigned motor"
  }'
```

## Delete Feedback

Deletes a feedback record.

**Endpoint:** `DELETE /feedback/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the feedback record |

**Response:**
```json
{
  "message": "Item deleted successfully",
  "id": "feedback-123"
}
```

**Example Request:**
```bash
curl -X DELETE "https://api.acme.f7i.ai/prod/feedback/feedback-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Rating Values

Feedback ratings indicate prediction accuracy:

- `accurate`: Prediction correctly identified the issue
- `partially_accurate`: Prediction was related but not exact
- `false_positive`: Alert was triggered but no issue existed
- `missed`: Issue occurred but was not predicted

## Common Failure Modes

| Failure Mode | Description |
|--------------|-------------|
| `bearing_wear` | Bearing degradation or damage |
| `imbalance` | Rotating component imbalance |
| `misalignment` | Shaft or coupling misalignment |
| `looseness` | Mechanical looseness |
| `lubrication` | Lubrication issues |
| `electrical` | Motor electrical faults |
| `cavitation` | Pump cavitation |
| `gear_damage` | Gear tooth wear or damage |
| `belt_issues` | Belt wear, tension, or alignment |
| `other` | Other failure modes |

## Outcome Values

- `resolved`: Issue was fixed
- `monitoring`: Under continued observation
- `scheduled`: Repair scheduled for future
- `no_action`: No action required
- `escalated`: Escalated to higher priority

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid feedback data",
  "details": {
    "rating": "Rating must be one of: accurate, partially_accurate, false_positive, missed"
  }
}
```

### 404 Not Found
```json
{
  "error": "Item not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error: [error details]"
}
```

