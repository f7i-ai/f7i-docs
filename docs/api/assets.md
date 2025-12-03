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

## Photo Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assets/{assetId}/photos` | List asset photos |
| POST | `/assets/{assetId}/photos/presigned-url` | Get presigned upload URL |
| POST | `/assets/{assetId}/photos` | Add photo metadata |
| DELETE | `/assets/{assetId}/photos/{mediaId}` | Delete asset photo |

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
curl -X GET "https://api.acme.f7i.ai/prod/assets?limit=20&type=pump" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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
curl -X POST "https://api.acme.f7i.ai/prod/assets" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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
curl -X GET "https://api.acme.f7i.ai/prod/assets/asset-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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
curl -X PUT "https://api.acme.f7i.ai/prod/assets/asset-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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
curl -X DELETE "https://api.acme.f7i.ai/prod/assets/asset-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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
curl -X POST "https://api.acme.f7i.ai/prod/assets/import" \
  -H "Authorization: Bearer YOUR_API_KEY" \
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

## Asset Photos

### List Asset Photos

Retrieves a list of all photos associated with a specific asset.

**Endpoint:** `GET /assets/{assetId}/photos`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Response:**
```json
{
  "photos": [
    {
      "id": "photo-001",
      "filename": "pump_a1_front_view.jpg",
      "type": "image",
      "size": 345600,
      "uploadedBy": "user-001",
      "uploadedAt": "2024-10-15T09:30:00Z",
      "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumbs/photo-001.jpg",
      "url": "https://s3.amazonaws.com/bucket/photos/photo-001.jpg",
      "description": "Front view of Pump A1 showing control panel"
    },
    {
      "id": "photo-002",
      "filename": "pump_a1_nameplate.jpg",
      "type": "image",
      "size": 287340,
      "uploadedBy": "user-002",
      "uploadedAt": "2024-10-15T10:15:00Z",
      "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumbs/photo-002.jpg",
      "url": "https://s3.amazonaws.com/bucket/photos/photo-002.jpg",
      "description": "Asset nameplate with serial and model numbers"
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/assets/asset-123/photos" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Get Presigned Upload URL

Generates a presigned URL for uploading a photo directly.

**Endpoint:** `POST /assets/{assetId}/photos/presigned-url`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Request Body:**
```json
{
  "filename": "motor_inspection.jpg",
  "contentType": "image/jpeg",
  "size": 2048576
}
```

**Response:**
```json
{
  "uploadUrl": "https://s3.amazonaws.com/bucket/upload-url?signature=...",
  "mediaId": "photo-003",
  "fields": {
    "key": "assets/asset-123/photos/photo-003.jpg",
    "AWSAccessKeyId": "AKIAI...",
    "policy": "eyJ...",
    "signature": "..."
  },
  "expiresAt": "2024-10-15T10:00:00Z"
}
```

**Example Request:**
```bash
curl -X POST "https://api.acme.f7i.ai/prod/assets/asset-123/photos/presigned-url" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "motor_inspection.jpg",
    "contentType": "image/jpeg",
    "size": 2048576
  }'
```

### Add Photo Metadata

Adds photo metadata after successful upload.

**Endpoint:** `POST /assets/{assetId}/photos`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset

**Request Body:**
```json
{
  "mediaId": "photo-003",
  "filename": "motor_inspection.jpg",
  "type": "image",
  "size": 2048576,
  "description": "Annual inspection showing motor condition"
}
```

**Response:**
```json
{
  "id": "photo-003",
  "filename": "motor_inspection.jpg",
  "type": "image",
  "size": 2048576,
  "description": "Annual inspection showing motor condition",
  "uploadedBy": "user-001",
  "uploadedAt": "2024-10-15T11:20:00Z",
  "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumbs/photo-003.jpg",
  "url": "https://s3.amazonaws.com/bucket/photos/photo-003.jpg"
}
```

**Example Request:**
```bash
curl -X POST "https://api.acme.f7i.ai/prod/assets/asset-123/photos" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "mediaId": "photo-003",
    "filename": "motor_inspection.jpg",
    "type": "image",
    "size": 2048576,
    "description": "Annual inspection showing motor condition"
  }'
```

### Delete Asset Photo

Removes a photo from an asset and deletes it.

**Endpoint:** `DELETE /assets/{assetId}/photos/{mediaId}`

**Authentication:** Required

**Path Parameters:**
- `assetId`: Unique identifier of the asset
- `mediaId`: Unique identifier of the photo

**Response:**
```json
{
  "message": "Photo deleted successfully",
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

**Example Request:**
```bash
curl -X DELETE "https://api.acme.f7i.ai/prod/assets/asset-123/photos/photo-003" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Asset Photo Management Guidelines

### Photo Organization and Hierarchy

Asset photos are organized within the hierarchical asset structure, supporting both individual assets and component-level documentation:

#### Asset-Level Photos
- **General Views**: Overall equipment photos from different angles
- **Nameplate Photos**: Asset identification and specification plates
- **Installation Photos**: Equipment in operational environment
- **Condition Photos**: Current state and wear indicators

### Integration with Asset Registry
- **Asset Hierarchy Integration**: Photos linked to specific assets and components
- **Maintenance History**: Photos associated with work orders and maintenance events
- **QR Code Access**: Mobile access to asset photos via QR code scanning
- **Documentation Repository**: Photos integrated with technical documentation

### Photo Categories for Assets

#### Documentation Photos
- **Technical Specifications**: Nameplate and specification photos
- **Installation Documentation**: As-built and installation photos
- **Schematic References**: Photos of electrical and mechanical schematics
- **Vendor Documentation**: Manufacturer documentation and manuals

#### Condition Assessment Photos
- **Baseline Condition**: Initial installation condition photos
- **Inspection Photos**: Regular condition assessment documentation
- **Wear Monitoring**: Progressive wear and deterioration tracking
- **Damage Documentation**: Incident and damage assessment photos

#### Maintenance Documentation
- **Procedure Photos**: Step-by-step maintenance documentation
- **Access Points**: Service access and maintenance position photos
- **Tool Requirements**: Required tools and equipment photos
- **Safety Documentation**: Safety procedures and PPE requirements

### Asset Photo Best Practices

#### Photo Quality Standards
- **High Resolution**: Minimum 1920x1080 for technical documentation
- **Proper Lighting**: Well-lit photos for clear detail visibility
- **Multiple Angles**: Comprehensive coverage from different perspectives
- **Consistent Framing**: Standardized photo composition for comparison

#### Documentation Standards
- **Descriptive Filenames**: Clear, descriptive file naming conventions
- **Detailed Descriptions**: Comprehensive photo descriptions and context
- **Date Stamping**: Timestamp information for historical tracking
- **Photographer Identification**: User tracking for accountability

#### Mobile Photography Guidelines
- **Field Documentation**: Optimize for mobile device capture
- **Offline Capability**: Support for offline photo capture and sync
- **QR Code Integration**: Quick asset identification and photo association
- **GPS Tagging**: Location information for field documentation

### Error Responses

#### 400 Bad Request
```json
{
  "error": "Invalid asset photo data",
  "details": {
    "contentType": "File must be a valid image format",
    "size": "File size must not exceed 10MB",
    "filename": "Filename must be provided"
  }
}
```

#### 404 Not Found
```json
{
  "error": "Asset not found",
  "assetId": "asset-123"
}
```

#### 403 Forbidden
```json
{
  "error": "Insufficient permissions",
  "message": "User does not have permission to manage photos for this asset"
}
```

#### 413 Payload Too Large
```json
{
  "error": "File too large",
  "maxSize": "25MB",
  "receivedSize": "27MB"
}
```
