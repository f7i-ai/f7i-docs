---
sidebar_position: 22
---

# Gateways API

The Gateways API provides endpoints for retrieving information about IoT gateways that collect and transmit sensor data from monitored assets. Gateways serve as the communication bridge between sensors and the cloud platform.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/gateways` | List all gateways |
| GET | `/gateways/{id}` | Get a specific gateway |

## List Gateways

Retrieves a list of gateways with optional filtering.

**Endpoint:** `GET /gateways`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `companyName` | string | Filter by company name |
| `siteName` | string | Filter by site name |
| `gatewayId` | string | Filter by gateway identifier |
| `limit` | integer | Maximum number of results (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "gw-123",
      "gatewayId": "GW-PLANT-001",
      "companyName": "Acme Corp",
      "siteName": "Main Plant",
      "name": "Production Floor Gateway",
      "location": "Building A, Room 101",
      "status": "online",
      "firmwareVersion": "2.4.1",
      "lastSeen": "2024-10-15T14:30:00Z",
      "ipAddress": "192.168.1.100",
      "connectedSensors": 12,
      "configuration": {
        "reportingInterval": 60,
        "dataRetention": 24,
        "timezone": "America/New_York"
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-10-15T14:30:00Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6Imd3LTEyMyJ9"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/gateways?companyName=Acme%20Corp&siteName=Main%20Plant" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Get Gateway

Retrieves a specific gateway by ID.

**Endpoint:** `GET /gateways/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the gateway |

**Response:**
```json
{
  "id": "gw-123",
  "gatewayId": "GW-PLANT-001",
  "companyName": "Acme Corp",
  "siteName": "Main Plant",
  "name": "Production Floor Gateway",
  "location": "Building A, Room 101",
  "status": "online",
  "firmwareVersion": "2.4.1",
  "lastSeen": "2024-10-15T14:30:00Z",
  "ipAddress": "192.168.1.100",
  "macAddress": "AA:BB:CC:DD:EE:FF",
  "connectedSensors": 12,
  "sensors": [
    {
      "sensorId": "sensor-001",
      "name": "Pump A1 Vibration",
      "status": "active"
    },
    {
      "sensorId": "sensor-002",
      "name": "Motor B2 Temperature",
      "status": "active"
    }
  ],
  "configuration": {
    "reportingInterval": 60,
    "dataRetention": 24,
    "timezone": "America/New_York"
  },
  "networkInfo": {
    "signalStrength": -45,
    "connectionType": "ethernet"
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-10-15T14:30:00Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/gateways/gw-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Gateway Status Values

| Status | Description |
|--------|-------------|
| `online` | Gateway is connected and transmitting data |
| `offline` | Gateway is not responding |
| `pending` | Gateway is registered but not yet connected |
| `maintenance` | Gateway is undergoing maintenance |
| `error` | Gateway is experiencing issues |

## Configuration Options

| Field | Type | Description |
|-------|------|-------------|
| `reportingInterval` | integer | Data reporting interval in seconds |
| `dataRetention` | integer | Local data retention period in hours |
| `timezone` | string | Gateway timezone (IANA format) |

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": {
    "gatewayId": "Invalid gateway ID format"
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
