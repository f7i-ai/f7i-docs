---
sidebar_position: 21
---

# External Events API

The External Events API provides endpoints for managing events from external sources that may impact asset performance or maintenance scheduling. This includes environmental events, operational changes, and third-party system integrations.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/external-events` | List all external events |
| POST | `/external-events` | Create a new external event |
| GET | `/external-events/{id}` | Get a specific external event |
| PUT | `/external-events/{id}` | Update an external event |
| DELETE | `/external-events/{id}` | Delete an external event |

## List External Events

Retrieves external events with optional filtering.

**Endpoint:** `GET /external-events`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `siteName` | string | Filter by site name |
| `areaName` | string | Filter by area name |
| `assetName` | string | Filter by asset name |
| `sensorId` | string | Filter by sensor identifier |
| `companyName` | string | Filter by company name |
| `timestamp` | string | Filter by timestamp (ISO 8601) |
| `limit` | integer | Maximum number of results (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "event-123",
      "siteName": "Main Plant",
      "areaName": "Production Floor",
      "assetName": "Pump A1",
      "sensorId": "sensor-456",
      "companyName": "Acme Corp",
      "timestamp": "2024-10-15T08:00:00Z",
      "eventType": "operational_change",
      "title": "Speed Increase",
      "description": "Motor speed increased from 1500 to 1800 RPM for production demand",
      "source": "SCADA",
      "severity": "info",
      "metadata": {
        "previousValue": 1500,
        "newValue": 1800,
        "unit": "RPM"
      },
      "createdAt": "2024-10-15T08:00:05Z",
      "updatedAt": "2024-10-15T08:00:05Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6ImV2ZW50LTEyMyJ9"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/external-events?siteName=Main%20Plant&areaName=Production%20Floor" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create External Event

Creates a new external event.

**Endpoint:** `POST /external-events`

**Authentication:** Required

**Request Body:**
```json
{
  "siteName": "Main Plant",
  "areaName": "Production Floor",
  "assetName": "Pump A1",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "timestamp": "2024-10-15T08:00:00Z",
  "eventType": "operational_change",
  "title": "Speed Increase",
  "description": "Motor speed increased from 1500 to 1800 RPM for production demand",
  "source": "SCADA",
  "severity": "info",
  "metadata": {
    "previousValue": 1500,
    "newValue": 1800,
    "unit": "RPM"
  }
}
```

**Response:**
```json
{
  "id": "event-456",
  "siteName": "Main Plant",
  "areaName": "Production Floor",
  "assetName": "Pump A1",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "timestamp": "2024-10-15T08:00:00Z",
  "eventType": "operational_change",
  "title": "Speed Increase",
  "description": "Motor speed increased from 1500 to 1800 RPM for production demand",
  "source": "SCADA",
  "severity": "info",
  "metadata": {
    "previousValue": 1500,
    "newValue": 1800,
    "unit": "RPM"
  },
  "createdAt": "2024-10-15T08:00:05Z",
  "updatedAt": "2024-10-15T08:00:05Z"
}
```

**Example Request:**
```bash
curl -X POST "https://api.acme.f7i.ai/prod/external-events" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "siteName": "Main Plant",
    "assetName": "Pump A1",
    "eventType": "operational_change",
    "title": "Speed Increase",
    "description": "Motor speed increased for production demand"
  }'
```

## Get External Event

Retrieves a specific external event by ID.

**Endpoint:** `GET /external-events/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the external event |

**Response:**
```json
{
  "id": "event-123",
  "siteName": "Main Plant",
  "areaName": "Production Floor",
  "assetName": "Pump A1",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "timestamp": "2024-10-15T08:00:00Z",
  "eventType": "operational_change",
  "title": "Speed Increase",
  "description": "Motor speed increased from 1500 to 1800 RPM for production demand",
  "source": "SCADA",
  "severity": "info",
  "metadata": {
    "previousValue": 1500,
    "newValue": 1800,
    "unit": "RPM"
  },
  "createdAt": "2024-10-15T08:00:05Z",
  "updatedAt": "2024-10-15T08:00:05Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/external-events/event-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Update External Event

Updates an existing external event.

**Endpoint:** `PUT /external-events/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the external event |

**Request Body:**
```json
{
  "severity": "warning",
  "description": "Motor speed increased from 1500 to 1800 RPM - monitoring for increased vibration",
  "metadata": {
    "previousValue": 1500,
    "newValue": 1800,
    "unit": "RPM",
    "monitoringRequired": true
  }
}
```

**Response:**
```json
{
  "id": "event-123",
  "siteName": "Main Plant",
  "areaName": "Production Floor",
  "assetName": "Pump A1",
  "sensorId": "sensor-456",
  "companyName": "Acme Corp",
  "timestamp": "2024-10-15T08:00:00Z",
  "eventType": "operational_change",
  "title": "Speed Increase",
  "description": "Motor speed increased from 1500 to 1800 RPM - monitoring for increased vibration",
  "source": "SCADA",
  "severity": "warning",
  "metadata": {
    "previousValue": 1500,
    "newValue": 1800,
    "unit": "RPM",
    "monitoringRequired": true
  },
  "createdAt": "2024-10-15T08:00:05Z",
  "updatedAt": "2024-10-15T10:00:00Z"
}
```

**Example Request:**
```bash
curl -X PUT "https://api.acme.f7i.ai/prod/external-events/event-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "severity": "warning",
    "description": "Motor speed increased - monitoring for increased vibration"
  }'
```

## Delete External Event

Deletes an external event.

**Endpoint:** `DELETE /external-events/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the external event |

**Response:**
```json
{
  "message": "Item deleted successfully",
  "id": "event-123"
}
```

**Example Request:**
```bash
curl -X DELETE "https://api.acme.f7i.ai/prod/external-events/event-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Event Types

| Type | Description |
|------|-------------|
| `operational_change` | Changes to operating parameters |
| `maintenance` | Maintenance activities performed |
| `environmental` | Environmental condition changes |
| `production` | Production schedule changes |
| `power` | Power supply events |
| `safety` | Safety-related events |
| `quality` | Quality control events |
| `integration` | Third-party system events |

## Event Sources

Common sources for external events:

- `SCADA`: Supervisory Control and Data Acquisition systems
- `ERP`: Enterprise Resource Planning systems
- `CMMS`: Computerized Maintenance Management Systems
- `MES`: Manufacturing Execution Systems
- `Weather`: Weather monitoring services
- `Manual`: Manually entered events
- `API`: External API integrations

## Severity Levels

- `info`: Informational event, no action required
- `warning`: Event may require attention
- `critical`: Event requires immediate attention

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid external event data",
  "details": {
    "eventType": "Event type is required",
    "title": "Title is required"
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

