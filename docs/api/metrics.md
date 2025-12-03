---
sidebar_position: 20
---

# Metrics API

The Metrics API provides endpoints for retrieving high-level dashboard metrics, including ROI calculations, asset counts, and system health indicators.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/metrics` | List all metrics |
| GET | `/metrics/{id}` | Get specific metrics |

## List Metrics

Retrieves metrics records with optional filtering.

**Endpoint:** `GET /metrics`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `companyName` | string | Filter by company name |
| `siteName` | string | Filter by site name |
| `limit` | integer | Maximum number of results (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "a826a2f8-ceee-45ac-9ebd-4522c4202027",
      "companyName": "Acme Corp",
      "siteName": "Main Plant",
      "numAssets": 103,
      "saving": "442500",
      "roi": "9.59",
      "hardwareCost": "30000",
      "softwareCost": "300",
      "contractStartDate": "2024-01-01T00:00:00.000000Z",
      "inactiveSensorsCount": 1,
      "inactiveSensorsDetails": "[{\"assetName\":\"Conveyor A\",\"sensorId\":\"5f5ad067804c\"}]",
      "inactiveVibrationThreshold": "0.095",
      "createdAt": "2024-04-12T01:08:53.008Z",
      "updatedAt": "2025-12-02T23:00:44.391Z"
    }
  ],
  "count": 1
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/metrics?companyName=Acme%20Corp&siteName=Main%20Plant" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Get Metrics

Retrieves a specific metrics record by ID.

**Endpoint:** `GET /metrics/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the metrics record |

**Response:**
```json
{
  "id": "a826a2f8-ceee-45ac-9ebd-4522c4202027",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "numAssets": 103,
  "saving": "442500",
  "roi": "9.59",
  "hardwareCost": "30000",
  "softwareCost": "300",
  "contractStartDate": "2024-01-01T00:00:00.000000Z",
  "inactiveSensorsCount": 1,
  "inactiveSensorsDetails": "[{\"assetName\":\"Conveyor A\",\"sensorId\":\"5f5ad067804c\"}]",
  "inactiveVibrationThreshold": "0.095",
  "createdAt": "2024-04-12T01:08:53.008Z",
  "updatedAt": "2025-12-02T23:00:44.391Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/metrics/a826a2f8-ceee-45ac-9ebd-4522c4202027" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Response Fields

### ROI & Cost Metrics

| Field | Type | Description |
|-------|------|-------------|
| `saving` | string | Total estimated savings in dollars |
| `roi` | string | Return on investment multiplier |
| `hardwareCost` | string | Total hardware investment in dollars |
| `softwareCost` | string | Monthly software cost in dollars |
| `contractStartDate` | string | Contract start date (ISO 8601) |

### Asset Metrics

| Field | Type | Description |
|-------|------|-------------|
| `numAssets` | integer | Total number of monitored assets |
| `inactiveSensorsCount` | integer | Number of sensors with no recent activity |
| `inactiveSensorsDetails` | string | JSON array of inactive sensor details |
| `inactiveVibrationThreshold` | string | Vibration threshold for inactive classification (mm/s) |

### Inactive Sensors Details

The `inactiveSensorsDetails` field contains a JSON string with details about sensors that haven't reported data recently:

```json
[
  {
    "assetName": "Conveyor A",
    "sensorId": "5f5ad067804c"
  }
]
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": {
    "companyName": "Company name is required"
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
