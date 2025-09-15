---
sidebar_position: 2
---

# Assets API

The Assets API provides endpoints for managing physical assets and equipment in your maintenance system.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assets` | List all assets |
| POST | `/assets` | Create a new asset |
| GET | `/assets/{assetId}` | Get a specific asset |
| PUT | `/assets/{assetId}` | Update an asset |
| DELETE | `/assets/{assetId}` | Delete an asset |
| POST | `/assets/import` | Import assets from CSV |

## List Assets

Retrieves a list of all assets.

**Endpoint:** `GET /assets`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of assets to return
- `offset` (optional): Number of assets to skip for pagination
- `search` (optional): Search term to filter assets
- `type` (optional): Filter by asset type
- `location` (optional): Filter by asset location

**Response (Hierarchical Structure):**
```json
{
  "items": [
    {
      "site": "main-facility",
      "areas": [
        {
          "name": "production-floor",
          "assets": [
            {
              "assetId": "asset-123",
              "name": "Pump A1", 
              "description": "Main cooling water pump",
              "location": "Building 1",
              "category": "Pumps",
              "criticality": "High",
              "status": "Active",
              "manufacturer": "ACME Pumps",
              "model": "CP-500",
              "area": "production-floor",
              "site": "main-facility",
              "serialNumber": "P001-2024",
              "type": "Centrifugal Pump",
              "installationDate": "2024-01-15T00:00:00Z",
              "tenantId": "tenant-123",
              "createdAt": "2024-01-15T10:30:00Z",
              "updatedAt": "2024-10-01T14:45:00Z"
            }
          ],
          "nextToken": null
        }
      ],
      "nextToken": null
    }
  ],
  "nextToken": null
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/assets?limit=20&type=pump" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Create Asset

Creates a new asset.

**Endpoint:** `POST /assets`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Pump A1",
  "type": "Centrifugal Pump",
  "location": "Building 1",
  "serialNumber": "P001-2024",
  "manufacturer": "ACME Pumps",
  "model": "CP-500",
  "installDate": "2024-01-15T00:00:00Z",
  "description": "Main cooling water pump",
  "specifications": {
    "power": "5kW",
    "flow": "100 L/min",
    "pressure": "10 bar"
  }
}
```

**Response:**
```json
{
  "id": "asset-123",
  "name": "Pump A1",
  "type": "Centrifugal Pump",
  "location": "Building 1",
  "status": "operational",
  "serialNumber": "P001-2024",
  "manufacturer": "ACME Pumps",
  "model": "CP-500",
  "installDate": "2024-01-15T00:00:00Z",
  "description": "Main cooling water pump",
  "specifications": {
    "power": "5kW",
    "flow": "100 L/min",
    "pressure": "10 bar"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/prod/assets" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pump A1",
    "type": "Centrifugal Pump",
    "location": "Building 1",
    "serialNumber": "P001-2024",
    "manufacturer": "ACME Pumps"
  }'
```

## Get Asset

Retrieves details of a specific asset.

**Endpoint:** `GET /assets/{assetId}`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Response:**
```json
{
  "assetId": "asset-123",
  "tenantId": "tenant-123",
  "name": "Pump A1",
  "description": "Main cooling water pump",
  "location": "Building 1",
  "category": "Pumps",
  "criticality": "High",
  "status": "Active",
  "manufacturer": "ACME Pumps",
  "model": "CP-500",
  "area": "production-floor",
  "site": "main-facility",
  "serialNumber": "P001-2024",
  "type": "Centrifugal Pump",
  "installationDate": "2024-01-15T00:00:00Z",
  "customFields": {
    "power": "5kW",
    "flow": "100 L/min",
    "pressure": "10 bar"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T14:45:00Z"
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/assets/asset-123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Update Asset

Updates an existing asset.

**Endpoint:** `PUT /assets/{assetId}`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Request Body:**
```json
{
  "name": "Pump A1 - Updated",
  "status": "maintenance",
  "lastMaintenanceDate": "2024-10-15T00:00:00Z",
  "nextMaintenanceDate": "2024-12-15T00:00:00Z",
  "description": "Main cooling water pump - recently serviced"
}
```

**Response:**
```json
{
  "id": "asset-123",
  "name": "Pump A1 - Updated",
  "type": "Centrifugal Pump",
  "location": "Building 1",
  "status": "maintenance",
  "serialNumber": "P001-2024",
  "manufacturer": "ACME Pumps",
  "model": "CP-500",
  "installDate": "2024-01-15T00:00:00Z",
  "lastMaintenanceDate": "2024-10-15T00:00:00Z",
  "nextMaintenanceDate": "2024-12-15T00:00:00Z",
  "description": "Main cooling water pump - recently serviced",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

**Example Request:**
```bash
curl -X PUT "https://your-api-domain.com/prod/assets/asset-123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "maintenance",
    "lastMaintenanceDate": "2024-10-15T00:00:00Z"
  }'
```

## Delete Asset

Deletes an asset from the system.

**Endpoint:** `DELETE /assets/{assetId}`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Response:**
```json
{
  "message": "Asset deleted successfully",
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

**Example Request:**
```bash
curl -X DELETE "https://your-api-domain.com/prod/assets/asset-123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Import Assets from CSV

Imports multiple assets from a CSV file.

**Endpoint:** `POST /assets/import`

**Authentication:** Required

**Request Body:** CSV file with asset data

**CSV Format:**
```csv
name,type,location,serialNumber,manufacturer,model,installDate
Pump A1,Centrifugal Pump,Building 1,P001-2024,ACME Pumps,CP-500,2024-01-15
Motor B2,Electric Motor,Building 2,M002-2024,PowerCorp,EM-750,2024-02-01
```

**Response:**
```json
{
  "imported": 2,
  "failed": 0,
  "errors": [],
  "assets": [
    {
      "id": "asset-124",
      "name": "Pump A1",
      "type": "Centrifugal Pump"
    },
    {
      "id": "asset-125",
      "name": "Motor B2",
      "type": "Electric Motor"
    }
  ]
}
```

**Example Request:**
```bash
curl -X POST "https://your-api-domain.com/prod/assets/import" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: text/csv" \
  --data-binary @assets.csv
```

## Asset Status Values

Assets can have the following status values:

- `operational`: Asset is functioning normally
- `maintenance`: Asset is undergoing maintenance
- `offline`: Asset is not operational
- `decommissioned`: Asset is no longer in use
- `pending`: Asset is awaiting installation or activation

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid asset data",
  "details": {
    "name": "Asset name is required",
    "type": "Asset type must be specified"
  }
}
```

### 404 Not Found
```json
{
  "error": "Asset not found",
  "assetId": "asset-123"
}
```

### 409 Conflict
```json
{
  "error": "Asset with this serial number already exists",
  "serialNumber": "P001-2024"
}
```
