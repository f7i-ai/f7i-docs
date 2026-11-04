---
sidebar_position: 9
---

# Parts API

**Service:** `rcm` (Prevent). All paths on this page start with `/rcm`, so the base is `https://api-<your-subdomain>.f7i.ai/rcm`.

The Parts API manages the parts catalogue: what a part is, what it costs, who supplies it and which components it fits. Stock on hand lives in the [Inventory API](./inventory.md), per site, not on the part.

Responses use `partId` as the id, never `id`.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/parts` | List parts |
| POST | `/rcm/parts` | Create a new part |
| GET | `/rcm/parts/{partId}` | Get a specific part |
| PUT | `/rcm/parts/{partId}` | Update a part |
| DELETE | `/rcm/parts/{partId}` | Delete a part |

## Photo Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rcm/parts/{partId}/photos` | List part photos |
| POST | `/rcm/parts/{partId}/photos/presigned-upload-url` | Get presigned upload URL |
| POST | `/rcm/parts/{partId}/photos` | Add photo metadata |
| DELETE | `/rcm/parts/{partId}/photos/{mediaId}` | Delete part photo |

## Part fields

These are the fields the API keeps on a part. Anything else you send is dropped.

| Field | Type | Notes |
|-------|------|-------|
| `partNumber` | string | **Required.** 1 to 100 characters. |
| `name` | string | **Required.** 1 to 255 characters. |
| `unit` | string | **Required.** Unit of measure, for example `each`, `kg`, `m`, `L`. Any non-empty string up to 50 characters. |
| `description` | string | Optional. Up to 1,000 characters. |
| `cost` | number | Optional. Unit cost. A numeric string is accepted and stored as a number. |
| `suppliers` | array | Optional. Each entry needs `name`, `partPrice`, `currency` (3 letters) and `leadTimeDays`; `vendorId`, `vendorSku`, `contactName`, `contactEmail`, `contactPhone`, `minimumOrderQuantity`, `isPreferred` and `notes` are optional. A single `supplier` object is **not** accepted. |
| `componentIds` | string[] | Optional. Components this part fits. The link is written both ways: each component's `partIds` gains this part. |
| `metadata` | object | Optional. Free-form data of your own. Put anything the API has no field for here. |
| `site` | string | Optional. A default site label. This is **not** stock; see [Setting stock on hand](#setting-stock-on-hand). |
| `requiresSerial` | boolean | Optional. Default `false`. |
| `warrantyTermMonths` | integer | Optional. 0 to 600. |
| `warrantyNotes` | string | Optional. Up to 500 characters. |

:::note Available from the next API release
`unitOfMeasure` is accepted as an alias for `unit`. Today a body with `unitOfMeasure` and no `unit` is rejected with 400.
:::

**Fields that are ignored.** The following are not part fields. On create they are dropped **without an error**, so the call succeeds and the values are gone: `manufacturer`, `manufacturerPartNumber`, `category`, `minimumStock`, `maximumStock`, `reorderPoint`, `isCritical`, `specifications`, `location`, `stockLevel`, `unitCost`, `currency`, `weight`, `dimensions`, `leadTime`, `supplier`. If you need to keep them, put them inside `metadata`:

```json
{
  "partNumber": "SKF-6204",
  "name": "Ball Bearing 6204",
  "unit": "each",
  "cost": 75.50,
  "metadata": {
    "manufacturer": "SKF",
    "manufacturerPartNumber": "6204-2RS1",
    "category": "Bearings",
    "minimumStock": 5,
    "reorderPoint": 8,
    "isCritical": true,
    "location": "A1-B2-C3"
  }
}
```

Stock levels (`minStockLevel`, `maxStockLevel`) are real fields, but on the **inventory** row for a site, not on the part. See the [Inventory API](./inventory.md).

## List Parts

**Endpoint:** `GET /rcm/parts`

**Authentication:** Required

**Query Parameters:**
- `search` (optional): matches against name and part number
- `name` (optional): matches against name
- `partNumber` (optional): matches against part number
- `componentId` (optional): parts linked to one component
- `site` (optional): parts that have an inventory row at this site
- `limit` (optional): 1 to 1000, default 200

There is no `offset`, `category`, `manufacturer`, `inStock` or `critical` filter.

**Response:** a JSON array of parts.
```json
[
  {
    "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
    "tenantId": "tenant-123",
    "partNumber": "SKF-6204",
    "name": "Ball Bearing 6204",
    "description": "Deep groove ball bearing, 20mm bore, 47mm OD",
    "unit": "each",
    "cost": 75.5,
    "requiresSerial": false,
    "warrantyTermMonths": null,
    "warrantyNotes": null,
    "componentIds": ["comp-001", "comp-002"],
    "componentDetails": [
      {
        "componentId": "comp-001",
        "name": "Motor Bearing Housing",
        "description": "Bearing housing for electric motor"
      }
    ],
    "suppliers": [],
    "metadata": { "manufacturer": "SKF" },
    "site": "",
    "photoMetadata": [],
    "createdBy": "user@example.com",
    "updatedBy": "user@example.com",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-10-01T14:45:00"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/parts?search=bearing&limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Part

**Endpoint:** `POST /rcm/parts`

**Authentication:** Required

`partNumber`, `name` and `unit` are required. See [Part fields](#part-fields) for the full list and what is ignored.

**Request Body:**
```json
{
  "partNumber": "FLUKE-175",
  "name": "Digital Multimeter",
  "description": "True RMS digital multimeter with temperature measurement",
  "unit": "each",
  "cost": 285.00,
  "componentIds": ["comp-789"],
  "suppliers": [
    {
      "vendorId": "vendor-002",
      "name": "Test Equipment Direct",
      "partPrice": 285.00,
      "currency": "AUD",
      "leadTimeDays": 14,
      "contactEmail": "orders@ted.example"
    }
  ],
  "metadata": {
    "manufacturer": "Fluke",
    "category": "Test Equipment",
    "minimumStock": 2
  }
}
```

**Response:** `200 OK` with the stored part. `partId`, `createdAt`, `updatedAt`, `createdBy` and `updatedBy` are filled in by the API.
```json
{
  "partId": "d4e5f6a7-b8c9-4d0e-9f1a-2b3c4d5e6f7a",
  "tenantId": "tenant-123",
  "partNumber": "FLUKE-175",
  "name": "Digital Multimeter",
  "description": "True RMS digital multimeter with temperature measurement",
  "unit": "each",
  "cost": 285.0,
  "requiresSerial": false,
  "warrantyTermMonths": null,
  "warrantyNotes": null,
  "componentIds": ["comp-789"],
  "componentDetails": [],
  "suppliers": [
    {
      "vendorId": "vendor-002",
      "name": "Test Equipment Direct",
      "partPrice": 285.0,
      "currency": "AUD",
      "leadTimeDays": 14,
      "contactEmail": "orders@ted.example",
      "isPreferred": false,
      "isActive": true,
      "createdAt": "2024-10-15T10:30:00",
      "updatedAt": "2024-10-15T10:30:00"
    }
  ],
  "metadata": {
    "manufacturer": "Fluke",
    "category": "Test Equipment",
    "minimumStock": 2
  },
  "site": "",
  "photoMetadata": [],
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "createdAt": "2024-10-15T10:30:00",
  "updatedAt": "2024-10-15T10:30:00"
}
```

**Validation errors** return 400 with `message` set to `Validation failed` and a `details` list naming each bad field (see [Error Responses](#error-responses)).

## Setting stock on hand

A part record holds no quantity. `stockLevel` on a part does nothing. Stock is kept per site in the [Inventory API](./inventory.md), one row per part and site (or per part, site and bin location).

To set an opening quantity after creating the part:

**Endpoint:** `PUT /rcm/inventory/{partId}`

```json
{
  "site": "main-facility",
  "quantity": 15,
  "minStockLevel": 5,
  "maxStockLevel": 50,
  "reason": "Opening stock from legacy system"
}
```

- `site` is required. `quantity` is the absolute count at that site. The row is created when it does not exist.
- `minStockLevel` and `maxStockLevel` are optional. At least one of `quantity`, `minStockLevel`, `maxStockLevel` must be sent.
- Add `locationName` to keep stock per bin within a site.
- Every change writes a history row (`type: "manual_set"`) you can read at `GET /rcm/inventory/{partId}/history`.

To add or remove a quantity rather than set it, use `POST /rcm/inventory/{partId}/adjustments` with `quantityChange`. Both calls are described on the [Inventory](./inventory.md) page.

## Get Part

**Endpoint:** `GET /rcm/parts/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Response:** the part in the same shape as the list, with `componentDetails` filled in for each linked component.
```json
{
  "partId": "c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f",
  "tenantId": "tenant-123",
  "partNumber": "SKF-6204",
  "name": "Ball Bearing 6204",
  "description": "Deep groove ball bearing, 20mm bore, 47mm OD",
  "unit": "each",
  "cost": 75.5,
  "requiresSerial": false,
  "warrantyTermMonths": 12,
  "warrantyNotes": "Manufacturer warranty",
  "componentIds": ["comp-001"],
  "componentDetails": [
    {
      "componentId": "comp-001",
      "name": "Motor Bearing Housing",
      "description": "Bearing housing for electric motor"
    }
  ],
  "suppliers": [
    {
      "vendorId": "vendor-001",
      "name": "Industrial Supply Co",
      "partPrice": 75.5,
      "currency": "AUD",
      "leadTimeDays": 7,
      "contactEmail": "orders@industrialsupply.example",
      "isPreferred": true,
      "isActive": true
    }
  ],
  "metadata": {
    "manufacturer": "SKF",
    "manufacturerPartNumber": "6204-2RS1"
  },
  "site": "",
  "photoMetadata": [],
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-10-01T14:45:00"
}
```

## Update Part

**Endpoint:** `PUT /rcm/parts/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

Send only the fields you want to change. Each field you send replaces the stored value outright. `partId`, `tenantId`, `createdAt`, `createdBy`, `updatedAt` and `updatedBy` in the body are ignored.

Stick to the fields in [Part fields](#part-fields). The update call does not reject unknown keys, but the app does not read them. Use `metadata` for anything extra.

Changing `componentIds` updates the links on both sides: components removed from the list lose this part from their `partIds`, and components added gain it.

**Request Body:**
```json
{
  "cost": 78.00,
  "componentIds": ["comp-001", "comp-003"],
  "metadata": {
    "manufacturer": "SKF",
    "manufacturerPartNumber": "6204-2RS1",
    "minimumStock": 6
  }
}
```

**Response:** `200 OK` with the whole part as now stored.

## Delete Part

**Endpoint:** `DELETE /rcm/parts/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Response:**
```json
{
  "message": "Part c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f deleted successfully"
}
```

## Units of Measure

`unit` is free text. These are the values the app offers:

- **each**
- **m** (metre)
- **kg**
- **L** (litre)
- **box**
- **roll**
- **set**
- **pair**

## Error Responses

Errors carry a `message` field. Validation errors add `details`.

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "details": [
    { "field": "unit", "message": "Field required", "code": "missing" },
    { "field": "description", "message": "String should have at most 1000 characters", "code": "string_too_long" }
  ]
}
```

:::note Available from the next API release
The `details` list above is new. Today a validation failure on this route answers 400 with a single `message` that quotes the validator, or in some cases a 502 from the gateway.
:::

### 404 Not Found
```json
{
  "message": "Part with ID part-999 not found"
}
```

## Part Photos

### List Part Photos

**Endpoint:** `GET /rcm/parts/{partId}/photos`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Response:** a JSON array of photo records.
```json
[
  {
    "mediaId": "photo-001",
    "s3Key": "parts/c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f/photo-001.jpg",
    "fileName": "bearing_6204_front.jpg",
    "fileType": "image/jpeg",
    "description": "Front view",
    "uploadedAt": "2024-10-15T09:30:00",
    "presignedUrl": "https://s3.amazonaws.com/bucket/parts/...?signature=..."
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api-acme.f7i.ai/rcm/parts/c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f/photos" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Get Presigned Upload URL

**Endpoint:** `POST /rcm/parts/{partId}/photos/presigned-upload-url`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Request Body:**
```json
{
  "fileName": "bearing_installation.jpg",
  "fileType": "image/jpeg"
}
```

`fileType` must be one of `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp`, `image/heic`, `image/heif`.

**Response:**
```json
{
  "presignedUrl": "https://s3.amazonaws.com/bucket/upload-url?signature=...",
  "mediaId": "photo-003",
  "s3Key": "parts/c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f/photo-003.jpg",
  "fileName": "bearing_installation.jpg",
  "fileType": "image/jpeg"
}
```

Upload the file with an HTTP PUT to `presignedUrl`, then record it with the call below.

### Add Photo Metadata

**Endpoint:** `POST /rcm/parts/{partId}/photos`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Request Body:**
```json
{
  "fileName": "bearing_installation.jpg",
  "fileType": "image/jpeg",
  "description": "Installation view of bearing in housing",
  "s3Key": "parts/c3d4e5f6-a7b8-4c9d-8e0f-1a2b3c4d5e6f/photo-003.jpg"
}
```

**Response:** the stored photo record with its `mediaId`.

### Delete Part Photo

**Endpoint:** `DELETE /rcm/parts/{partId}/photos/{mediaId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part
- `mediaId`: Unique identifier of the photo

**Response:**
```json
{
  "message": "Photo photo-003 deleted successfully"
}
```

## Photo Management Guidelines

### Supported File Formats
- **Images**: JPG, JPEG, PNG, GIF, WebP, HEIC, HEIF
