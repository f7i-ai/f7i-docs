---
sidebar_position: 2
---

# Assets API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

The Assets API provides endpoints for managing physical assets and equipment in your maintenance system.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/assets` | List all assets |
| POST | `/rcm/assets` | Create a new asset |
| GET | `/rcm/assets/{assetId}` | Get a specific asset |
| PUT | `/rcm/assets/{assetId}` | Update an asset |
| DELETE | `/rcm/assets/{assetId}` | Delete an asset |
| POST | `/rcm/assets/import` | Import assets from CSV |

## Photo Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/assets/{assetId}/photos` | List asset photos |
| POST | `/rcm/assets/{assetId}/photos/presigned-upload-url` | Get presigned upload URL |
| POST | `/rcm/assets/{assetId}/photos` | Add photo metadata |
| DELETE | `/rcm/assets/{assetId}/photos/{mediaId}` | Delete asset photo |

## List Assets

Retrieves a list of all assets.

**Endpoint:** `GET /rcm/assets`

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
curl -X GET "https://api-acme.f7i.ai/rcm/assets?limit=20&type=pump" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Asset

Creates a new asset.

**Endpoint:** `POST /rcm/assets`

**Authentication:** Required

`name`, `description`, `site` and `type` are required. The fields the API keeps are `name`, `description`, `location`, `category`, `manufacturer`, `model`, `area`, `site`, `serialNumber`, `type`, `installationDate` (`installDate` is accepted as an alias), `criticality` (`low`, `medium`, `high` or `critical`), `status` and `customFields`. Anything else is dropped; put it in `customFields`.

**Request Body:**
```json
{
  "name": "Pump A1",
  "description": "Main cooling water pump",
  "site": "main-facility",
  "area": "production-floor",
  "type": "Centrifugal Pump",
  "location": "Building 1",
  "serialNumber": "P001-2024",
  "manufacturer": "ACME Pumps",
  "model": "CP-500",
  "criticality": "high",
  "installationDate": "2024-01-15T00:00:00Z",
  "customFields": {
    "power": "5kW",
    "flow": "100 L/min",
    "pressure": "10 bar"
  }
}
```

**Response:** `200 OK` with the stored asset. The id is `assetId`, never `id`.
```json
{
  "assetId": "asset-123",
  "tenantId": "tenant-123",
  "name": "Pump A1",
  "description": "Main cooling water pump",
  "location": "Building 1",
  "category": "",
  "criticality": "high",
  "status": "active",
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
  "photoMetadata": [],
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Example Request:**
```bash
curl -X POST "https://api-acme.f7i.ai/rcm/assets" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pump A1",
    "description": "Main cooling water pump",
    "site": "main-facility",
    "type": "Centrifugal Pump",
    "location": "Building 1",
    "serialNumber": "P001-2024",
    "manufacturer": "ACME Pumps"
  }'
```

## Get Asset

Retrieves details of a specific asset.

**Endpoint:** `GET /rcm/assets/{assetId}`

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
curl -X GET "https://api-acme.f7i.ai/rcm/assets/asset-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Update Asset

Updates an existing asset.

**Endpoint:** `PUT /rcm/assets/{assetId}`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

Send only the fields you want to change. The same fields as [Create Asset](#create-asset) apply; anything else is ignored.

**Request Body:**
```json
{
  "name": "Pump A1 - Updated",
  "status": "maintenance",
  "description": "Main cooling water pump - recently serviced"
}
```

**Response:** `200 OK` with the whole asset as now stored.
```json
{
  "assetId": "asset-123",
  "tenantId": "tenant-123",
  "name": "Pump A1 - Updated",
  "description": "Main cooling water pump - recently serviced",
  "location": "Building 1",
  "category": "",
  "criticality": "high",
  "status": "maintenance",
  "manufacturer": "ACME Pumps",
  "model": "CP-500",
  "area": "production-floor",
  "site": "main-facility",
  "serialNumber": "P001-2024",
  "type": "Centrifugal Pump",
  "installationDate": "2024-01-15T00:00:00Z",
  "customFields": {},
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-10-15T16:20:00"
}
```

**Example Request:**
```bash
curl -X PUT "https://api-acme.f7i.ai/rcm/assets/asset-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "maintenance"
  }'
```

## Delete Asset

Deletes an asset from the system.

**Endpoint:** `DELETE /rcm/assets/{assetId}`

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
curl -X DELETE "https://api-acme.f7i.ai/rcm/assets/asset-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Import Assets from CSV

Imports multiple assets from a CSV file.

**Endpoint:** `POST /rcm/assets/import`

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
      "assetId": "asset-124",
      "name": "Pump A1",
      "type": "Centrifugal Pump"
    },
    {
      "assetId": "asset-125",
      "name": "Motor B2",
      "type": "Electric Motor"
    }
  ]
}
```

**Example Request:**
```bash
curl -X POST "https://api-acme.f7i.ai/rcm/assets/import" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: text/csv" \
  --data-binary @assets.csv
```

## Asset Status Values

`status` is free text. It is stored lower-cased, and defaults to `active`. The app offers:

- `active`: in service
- `maintenance`: undergoing maintenance
- `inactive`: not in service
- `decommissioned`: no longer in use

## Error Responses

Errors carry a single `message` field.

### 400 Bad Request
```json
{
  "message": "Missing required fields: site, type"
}
```
Other 400 messages: `Missing required fields: name, description`, `Invalid criticality 'urgent'; must be one of: low, medium, high, critical`, `status must be a non-empty string`.

### 404 Not Found
```json
{
  "message": "Asset with ID asset-999 not found"
}
```

## Asset Photos

Asset photos work the same way as [part photos](./parts.md#part-photos): ask for a presigned URL, upload the file to it, then record the photo.

### List Asset Photos

**Endpoint:** `GET /rcm/assets/{assetId}/photos`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Response:** a JSON array of photo records.
```json
[
  {
    "mediaId": "photo-001",
    "s3Key": "assets/asset-123/photo-001.jpg",
    "fileName": "pump_a1_front_view.jpg",
    "fileType": "image/jpeg",
    "description": "Front view of Pump A1 showing control panel",
    "uploadedAt": "2024-10-15T09:30:00Z",
    "presignedUrl": "https://s3.amazonaws.com/bucket/assets/...?signature=..."
  },
  {
    "mediaId": "photo-002",
    "s3Key": "assets/asset-123/photo-002.jpg",
    "fileName": "pump_a1_nameplate.jpg",
    "fileType": "image/jpeg",
    "description": "Asset nameplate with serial and model numbers",
    "uploadedAt": "2024-10-15T10:15:00Z",
    "presignedUrl": "https://s3.amazonaws.com/bucket/assets/...?signature=..."
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/assets/asset-123/photos" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Get Presigned Upload URL

**Endpoint:** `POST /rcm/assets/{assetId}/photos/presigned-upload-url`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Request Body:**
```json
{
  "fileName": "motor_inspection.jpg",
  "fileType": "image/jpeg"
}
```

**Response:**
```json
{
  "presignedUrl": "https://s3.amazonaws.com/bucket/upload-url?signature=...",
  "mediaId": "photo-003",
  "s3Key": "assets/asset-123/photo-003.jpg",
  "fileName": "motor_inspection.jpg",
  "fileType": "image/jpeg"
}
```

Upload the file with an HTTP PUT to `presignedUrl`, then record it with the call below.

**Example Request:**
```bash
curl -X POST "https://api-acme.f7i.ai/rcm/assets/asset-123/photos/presigned-upload-url" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "fileName": "motor_inspection.jpg",
    "fileType": "image/jpeg"
  }'
```

### Add Photo Metadata

Records the photo after the file has been uploaded.

**Endpoint:** `POST /rcm/assets/{assetId}/photos`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Request Body:**
```json
{
  "fileName": "motor_inspection.jpg",
  "fileType": "image/jpeg",
  "description": "Annual inspection showing motor condition",
  "s3Key": "assets/asset-123/photo-003.jpg"
}
```

**Response:** the stored photo record with its `mediaId`.
```json
{
  "mediaId": "photo-003",
  "s3Key": "assets/asset-123/photo-003.jpg",
  "fileName": "motor_inspection.jpg",
  "fileType": "image/jpeg",
  "description": "Annual inspection showing motor condition",
  "uploadedAt": "2024-10-15T11:20:00Z",
  "presignedUrl": "https://s3.amazonaws.com/bucket/assets/...?signature=..."
}
```

### Delete Asset Photo

**Endpoint:** `DELETE /rcm/assets/{assetId}/photos/{mediaId}`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset
- `mediaId`: Unique identifier of the photo

**Response:**
```json
{
  "message": "Photo photo-003 deleted successfully"
}
```

## Asset Photo Management Guidelines

### Supported File Formats
- **Images**: JPG, JPEG, PNG, GIF, WebP, HEIC, HEIF

### What to photograph
- **Nameplates**: the asset's identification and specification plates
- **General views**: the whole asset from more than one angle
- **Condition**: wear, damage and anything an inspection found

### Error Responses

#### 400 Bad Request
```json
{
  "message": "Missing fileName or fileType"
}
```

#### 404 Not Found
```json
{
  "message": "Asset with ID asset-999 not found"
}
```
