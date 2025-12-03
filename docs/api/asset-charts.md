---
sidebar_position: 16
---

# Sensor Data API

The Sensor Data API provides endpoints for retrieving time-series sensor readings from monitored assets. This is the primary endpoint for accessing vibration, temperature, and acceleration data for charting and analysis.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/asset-charts` | List sensor readings |
| GET | `/asset-charts/{id}` | Get specific reading |

## List Sensor Readings

Retrieves sensor readings with optional filtering. Best used with time range queries for efficient data retrieval.

**Endpoint:** `GET /asset-charts`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sensorId` | string | Filter by sensor identifier (recommended) |
| `assetName` | string | Filter by asset name |
| `positionName` | string | Filter by sensor position name |
| `timestamp` | string | Filter by exact timestamp (ISO 8601) |
| `timestampStart` | string | Start of time range (ISO 8601) |
| `timestampEnd` | string | End of time range (ISO 8601) |
| `sortDirection` | string | Sort order: `ASC` or `DESC` |
| `limit` | integer | Maximum number of results (default: 100) |
| `nextToken` | string | Pagination token for next page of results |

**Response:**
```json
{
  "items": [
    {
      "id": "678813f1-198d-4b12-aad3-cd636f9b1127",
      "sensorId": "945ade0a75dd",
      "gatewayId": "fea7c5bb4ca7",
      "assetName": "Bulk Hot Water Pump",
      "positionName": "Pump 2 blue",
      "siteName": "Huntingwood",
      "projectName": "Acme Corp",
      "timestamp": "2025-12-02T22:19:27.289000Z",
      "sequenceNo": 15587,
      "temperature": 49.654,
      "vibration": 0.8035,
      "velocity": "{\"band10To1000Hz\": {\"totalVibration\": {\"absMax\": 1.7588, \"rms\": 0.8035}, \"xAxis\": {\"rms\": 0.5239}, \"yAxis\": {\"rms\": 0.4116}, \"zAxis\": {\"rms\": 0.4491}}}",
      "acceleration": "{\"band0To6000Hz\": {\"xAxis\": {\"rms\": 7.2449}, \"yAxis\": {\"rms\": 0.7856}, \"zAxis\": {\"rms\": 8.0401}}, \"band10To1000Hz\": {\"totalVibration\": {\"rms\": 0.7526}, \"xAxis\": {\"rms\": 0.503}, \"yAxis\": {\"rms\": 0.3712}, \"zAxis\": {\"rms\": 0.4191}}}",
      "models": "{\"temperatureML\": {\"persistentClassificationOutput\": \"ALARM\"}, \"vibrationISO\": {\"isoClass\": \"CLASS1\", \"persistentClassificationOutput\": \"HEALTHY\"}, \"vibrationML\": {\"persistentClassificationOutput\": \"HEALTHY\"}}",
      "createdAt": "2025-12-02T22:25:54.073107+00:00",
      "updatedAt": "2025-12-02T22:25:54.073107+00:00"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6ImNoYXJ0LTEyMyIsInRpbWVzdGFtcCI6IjIwMjQtMTAtMTVUMTQ6MzA6MDBaIn0="
}
```

**Example Request - Time Range Query (Recommended):**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-charts?sensorId=945ade0a75dd&limit=100&sortDirection=DESC&timestampStart=2025-10-01T00:00:00.000Z&timestampEnd=2025-12-02T23:59:59.999Z" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

**Example Request - Filter by Asset:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-charts?assetName=Bulk%20Hot%20Water%20Pump&sortDirection=DESC&limit=100" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Response Fields

### Core Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the reading |
| `sensorId` | string | Sensor MAC address |
| `gatewayId` | string | Gateway that transmitted the data |
| `assetName` | string | Name of the monitored asset |
| `positionName` | string | Sensor mounting position |
| `siteName` | string | Site location |
| `projectName` | string | Company/project name |
| `timestamp` | string | When the reading was taken (ISO 8601) |
| `sequenceNo` | integer | Sequence number for ordering |

### Sensor Readings

| Field | Type | Description |
|-------|------|-------------|
| `temperature` | number | Temperature in °C |
| `vibration` | number | Overall vibration RMS (mm/s) |
| `velocity` | string | JSON with velocity data by frequency band and axis |
| `acceleration` | string | JSON with acceleration data by frequency band and axis |

### Model Classifications

The `models` field contains JSON with classification outputs from different analysis models:

```json
{
  "temperatureML": {
    "persistentClassificationOutput": "ALARM",
    "previousPersistentClassificationOutput": "ALARM",
    "pointwiseClassificationOutput": "ALARM"
  },
  "vibrationISO": {
    "isoClass": "CLASS1",
    "persistentClassificationOutput": "HEALTHY",
    "pointwiseClassificationOutput": "HEALTHY"
  },
  "vibrationML": {
    "persistentClassificationOutput": "HEALTHY",
    "pointwiseClassificationOutput": "HEALTHY"
  }
}
```

**Classification Values:**
- `HEALTHY` - Normal operating condition
- `ALARM` - Abnormal condition detected
- `WARNING` - Elevated readings, monitoring recommended

**ISO Classes (for vibrationISO):**
- `CLASS1` - Small machines
- `CLASS2` - Medium machines
- `CLASS3` - Large machines on rigid foundations
- `CLASS4` - Large machines on soft foundations

## Velocity Data Structure

The `velocity` field contains detailed vibration velocity measurements:

```json
{
  "band10To1000Hz": {
    "totalVibration": {
      "absMax": 1.7588,
      "absMin": 0.0,
      "crestFactor": 2189.0082,
      "rms": 0.8035
    },
    "xAxis": { "rms": 0.5239 },
    "yAxis": { "rms": 0.4116 },
    "zAxis": { "rms": 0.4491 }
  }
}
```

## Acceleration Data Structure

The `acceleration` field contains acceleration measurements across frequency bands:

```json
{
  "band0To6000Hz": {
    "xAxis": { "rms": 7.2449 },
    "yAxis": { "rms": 0.7856 },
    "zAxis": { "rms": 8.0401 }
  },
  "band10To1000Hz": {
    "totalVibration": {
      "absMax": 2.2058,
      "absMin": 0.0,
      "crestFactor": 2.9308,
      "rms": 0.7526
    },
    "xAxis": { "rms": 0.503 },
    "yAxis": { "rms": 0.3712 },
    "zAxis": { "rms": 0.4191 }
  }
}
```

## Get Sensor Reading

Retrieves a specific sensor reading by ID.

**Endpoint:** `GET /asset-charts/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the reading |

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-charts/678813f1-198d-4b12-aad3-cd636f9b1127" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Pagination

When retrieving large datasets, use pagination to efficiently fetch results:

1. Make an initial request with your filters and desired `limit`
2. If the response includes a `nextToken`, use it in subsequent requests
3. Continue until no `nextToken` is returned

**Example Paginated Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-charts?sensorId=945ade0a75dd&limit=1000&sortDirection=DESC&timestampStart=2025-10-01T00:00:00Z&timestampEnd=2025-12-02T23:59:59Z&nextToken=eyJpZCI6ImNoYXJ0LTEyMyJ9" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

:::tip
For best performance, always use `sensorId` with `timestampStart` and `timestampEnd` parameters when querying sensor data.
:::

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": {
    "timestamp": "Timestamp must be in ISO 8601 format"
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
