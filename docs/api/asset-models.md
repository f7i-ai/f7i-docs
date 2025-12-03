---
sidebar_position: 15
---

# Monitored Assets API

The Monitored Assets API provides endpoints for listing and managing assets that are being monitored by sensors in the Predict system. This serves as the asset registry for predictive maintenance, allowing you to navigate between assets, areas, and sensors.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/asset-models` | List all monitored assets |
| POST | `/asset-models` | Register a new monitored asset |
| GET | `/asset-models/{id}` | Get a specific asset |
| PUT | `/asset-models/{id}` | Update asset metadata |
| DELETE | `/asset-models/{id}` | Remove an asset |

## List Monitored Assets

Retrieves a list of monitored assets with optional filtering by company, site, area, or sensor.

**Endpoint:** `GET /asset-models`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `companyName` | string | Filter by company name |
| `siteName` | string | Filter by site name (use with `companyName`) |
| `assetName` | string | Filter by asset name |
| `areaName` | string | Filter by area name |
| `displayName` | string | Filter by display name |
| `sensorID` | string | Filter by sensor identifier |
| `limit` | integer | Maximum number of results to return (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "companyName": "Acme Corp",
      "siteName": "Main Plant",
      "areaName": "Production Line 1",
      "assetName": "Conveyor Drive Motor",
      "displayName": "Conv-01 Drive",
      "sensorID": "450fee8c3b5d",
      "sensorPosition": "Drive End",
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-10-01T12:00:00Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6Im1vZGVsLTEyMyJ9"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-models?companyName=Acme%20Corp&siteName=Main%20Plant" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Register Monitored Asset

Registers a new asset for monitoring.

**Endpoint:** `POST /asset-models`

**Authentication:** Required

**Request Body:**
```json
{
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "areaName": "Production Line 1",
  "assetName": "Conveyor Drive Motor",
  "displayName": "Conv-01 Drive",
  "sensorID": "450fee8c3b5d",
  "sensorPosition": "Drive End"
}
```

**Response:**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "areaName": "Production Line 1",
  "assetName": "Conveyor Drive Motor",
  "displayName": "Conv-01 Drive",
  "sensorID": "450fee8c3b5d",
  "sensorPosition": "Drive End",
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

**Example Request:**
```bash
curl -X POST "https://api.acme.f7i.ai/prod/asset-models" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Acme Corp",
    "siteName": "Main Plant",
    "areaName": "Production Line 1",
    "assetName": "Conveyor Drive Motor",
    "displayName": "Conv-01 Drive",
    "sensorID": "450fee8c3b5d"
  }'
```

## Get Monitored Asset

Retrieves a specific monitored asset by ID.

**Endpoint:** `GET /asset-models/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the asset |

**Response:**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "areaName": "Production Line 1",
  "assetName": "Conveyor Drive Motor",
  "displayName": "Conv-01 Drive",
  "sensorID": "450fee8c3b5d",
  "sensorPosition": "Drive End",
  "status": "active",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T12:00:00Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-models/a1b2c3d4-5678-90ab-cdef-1234567890ab" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Update Asset Metadata

Updates metadata for an existing monitored asset.

**Endpoint:** `PUT /asset-models/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the asset |

**Request Body:**
```json
{
  "displayName": "Conveyor 01 - Main Drive",
  "sensorPosition": "Drive End Bearing",
  "status": "active"
}
```

**Response:**
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "areaName": "Production Line 1",
  "assetName": "Conveyor Drive Motor",
  "displayName": "Conveyor 01 - Main Drive",
  "sensorID": "450fee8c3b5d",
  "sensorPosition": "Drive End Bearing",
  "status": "active",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-15T14:00:00Z"
}
```

**Example Request:**
```bash
curl -X PUT "https://api.acme.f7i.ai/prod/asset-models/a1b2c3d4-5678-90ab-cdef-1234567890ab" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Conveyor 01 - Main Drive",
    "sensorPosition": "Drive End Bearing"
  }'
```

## Remove Monitored Asset

Removes an asset from the monitoring registry.

**Endpoint:** `DELETE /asset-models/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the asset |

**Response:**
```json
{
  "message": "Item deleted successfully",
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab"
}
```

**Example Request:**
```bash
curl -X DELETE "https://api.acme.f7i.ai/prod/asset-models/a1b2c3d4-5678-90ab-cdef-1234567890ab" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Asset Hierarchy

Assets are organized in a hierarchy for easy navigation:

```
Company
└── Site
    └── Area
        └── Asset
            └── Sensor Position
```

Use the query parameters to filter at any level of the hierarchy.

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid asset data",
  "details": {
    "assetName": "Asset name is required"
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
