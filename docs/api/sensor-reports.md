---
sidebar_position: 14
---

# Sensor Reports API (Insights)

The Sensor Reports API provides endpoints for retrieving Insights - AI-generated analysis reports that identify anomalies and provide recommendations based on sensor data patterns.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sensor-reports` | List all sensor reports |
| GET | `/sensor-reports/{id}` | Get a specific sensor report |

## List Sensor Reports

Retrieves a list of sensor reports (insights) with optional filtering.

**Endpoint:** `GET /sensor-reports`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sensorID` | string | Filter by sensor identifier |
| `sortDirection` | string | Sort order: `ASC` (oldest first) or `DESC` (newest first, default) |
| `limit` | integer | Maximum number of results to return (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "c91f8bd2-8c86-4aec-a260-ced23053cdb6",
      "sensorID": "450fee8c3b5d",
      "sensorPosition": "Drive",
      "areaName": "Production Line 5",
      "companyName": "Acme Corp",
      "timestamp": "2024-10-02T01:01:40.905Z",
      "reportDate": "2024-10-02T01:01:40.905Z",
      "humanEvaluation": "NONE",
      "report": "{\"observations\": [...], \"potentialCauses\": [...], \"recommendations\": [...]}",
      "createdAt": "2024-10-02T01:01:40.905Z",
      "updatedAt": "2024-10-02T01:01:40.905Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6InJlcG9ydC0xMjMifQ=="
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/sensor-reports?sensorID=450fee8c3b5d&limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Report Structure

The `report` field contains a JSON string with the AI-generated analysis:

```json
{
  "observations": [
    "The vibration chart shows a significant increase in vibration levels from mid-September onwards, with readings consistently above 8 mm/s.",
    "The temperature chart displays frequent fluctuations throughout the monitored period, with occasional sharp drops.",
    "The vibration pattern shows some cyclical behavior, with periodic drops to very low levels."
  ],
  "potentialCauses": [
    {
      "description": "Bearing wear or damage in the conveyor drive",
      "probability": 45
    },
    {
      "description": "Misalignment of conveyor components or drive shaft",
      "probability": 30
    },
    {
      "description": "Loose mounting or structural issues",
      "probability": 15
    },
    {
      "description": "False positive due to changes in operational load",
      "probability": 10
    }
  ],
  "recommendations": [
    "Conduct a detailed physical inspection of the conveyor drive bearings, looking for signs of wear, damage, or inadequate lubrication.",
    "Perform an alignment check on the conveyor components, particularly the drive shaft and rollers.",
    "Inspect and tighten all mounting bolts and structural components of the conveyor."
  ]
}
```

## Get Sensor Report

Retrieves a specific sensor report by ID.

**Endpoint:** `GET /sensor-reports/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the sensor report |

**Response:**
```json
{
  "id": "c91f8bd2-8c86-4aec-a260-ced23053cdb6",
  "sensorID": "450fee8c3b5d",
  "sensorPosition": "Drive",
  "areaName": "Production Line 5",
  "companyName": "Acme Corp",
  "timestamp": "2024-10-02T01:01:40.905Z",
  "reportDate": "2024-10-02T01:01:40.905Z",
  "humanEvaluation": "NONE",
  "report": "{\"observations\": [\"The vibration chart shows a significant increase...\"], \"potentialCauses\": [{\"description\": \"Bearing wear or damage\", \"probability\": 45}], \"recommendations\": [\"Conduct a detailed physical inspection...\"]}",
  "createdAt": "2024-10-02T01:01:40.905Z",
  "updatedAt": "2024-10-02T01:01:40.905Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/sensor-reports/c91f8bd2-8c86-4aec-a260-ced23053cdb6" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Human Evaluation Values

The `humanEvaluation` field tracks user feedback on the insight accuracy:

| Value | Description |
|-------|-------------|
| `NONE` | No evaluation provided yet |
| `ACCURATE` | The insight correctly identified the issue |
| `PARTIALLY_ACCURATE` | The insight was related but not exact |
| `INACCURATE` | The insight was incorrect (false positive) |

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": {
    "sensorID": "Sensor ID is required"
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
