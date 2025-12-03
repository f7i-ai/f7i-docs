---
sidebar_position: 7
---

# Work Orders API

The Work Orders API provides comprehensive endpoints for managing maintenance work orders, including notes, media attachments, tasks, and parts management.

## Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/work-orders` | List all work orders |
| POST | `/work-orders` | Create a new work order |
| GET | `/work-orders/{workOrderId}` | Get a specific work order |
| PUT | `/work-orders/{workOrderId}` | Update a work order |
| DELETE | `/work-orders/{workOrderId}` | Delete a work order |

## Sub-Resource Endpoints

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/work-orders/{workOrderId}/notes` | List work order notes |
| POST | `/work-orders/{workOrderId}/notes` | Add a note |

### Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/work-orders/{workOrderId}/media` | List media files |
| POST | `/work-orders/{workOrderId}/media` | Upload media |
| POST | `/work-orders/{workOrderId}/media/presigned-url` | Get presigned upload URL |
| DELETE | `/work-orders/{workOrderId}/media/{mediaId}` | Delete media |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/work-orders/{workOrderId}/tasks` | List tasks |
| POST | `/work-orders/{workOrderId}/tasks` | Add a task |
| PUT | `/work-orders/{workOrderId}/tasks/{taskId}` | Update task |
| DELETE | `/work-orders/{workOrderId}/tasks/{taskId}` | Delete task |

### Parts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/work-orders/{workOrderId}/parts` | List required parts |
| POST | `/work-orders/{workOrderId}/parts` | Add a part |
| PUT | `/work-orders/{workOrderId}/parts/{partId}` | Update part |
| DELETE | `/work-orders/{workOrderId}/parts/{partId}` | Remove part |

## List Work Orders

Retrieves a list of all work orders.

**Endpoint:** `GET /work-orders`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of work orders to return
- `offset` (optional): Number of work orders to skip for pagination
- `search` (optional): Search term to filter work orders
- `status` (optional): Filter by work order status
- `priority` (optional): Filter by priority level
- `assetId` (optional): Filter by asset ID
- `assignedTo` (optional): Filter by assigned technician
- `createdAfter` (optional): Filter by creation date (ISO 8601)
- `createdBefore` (optional): Filter by creation date (ISO 8601)

**Response:**
```json
[
  {
    "workOrderId": "wo-001",
    "tenantId": "tenant-123",
    "title": "Pump A1 Bearing Replacement",
    "description": "Replace worn bearing in centrifugal pump A1",
    "assetId": "asset-123",
    "status": "in_progress",
    "priority": "high",
    "type": "corrective",
    "assignedTo": "tech-001",
    "requestedBy": "user-001",
    "createdDate": "2024-10-01T09:00:00Z",
    "scheduledDate": "2024-10-05T08:00:00Z",
    "startDate": "2024-10-05T08:15:00Z",
    "estimatedDuration": 4,
    "completionDate": null,
    "pmProcedureId": null,
    "failureCode": "fc-001",
    "site": "main-facility",
    "area": "production-floor",
    "createdAt": "2024-10-01T09:00:00Z",
    "updatedAt": "2024-10-05T10:30:00Z"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/work-orders?status=in_progress&priority=high" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Work Order

Creates a new work order.

**Endpoint:** `POST /work-orders`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Motor B2 Electrical Maintenance",
  "description": "Investigate electrical issues and perform necessary repairs",
  "assetId": "asset-456",
  "priority": "medium",
  "type": "corrective",
  "assignedTo": "tech-002",
  "requestedBy": "user-002",
  "scheduledDate": "2024-11-01T09:00:00Z",
  "estimatedDuration": 6,
  "failureCode": "fc-002",
  "tasks": [
    {
      "description": "Electrical safety lockout",
      "estimatedTime": 30,
      "order": 1
    },
    {
      "description": "Inspect electrical connections",
      "estimatedTime": 60,
      "order": 2
    }
  ],
  "requiredParts": [
    {
      "partId": "part-001",
      "quantity": 2
    }
  ],
  "safetyRequirements": ["ppe", "electrical_safety", "lockout_tagout"]
}
```

**Response:**
```json
{
  "id": "wo-002",
  "workOrderNumber": "WO-2024-002",
  "title": "Motor B2 Electrical Maintenance",
  "description": "Investigate electrical issues and perform necessary repairs",
  "assetId": "asset-456",
  "assetName": "Motor B2",
  "status": "open",
  "priority": "medium",
  "type": "corrective",
  "assignedTo": "tech-002",
  "assignedTechnician": "Jane Doe",
  "requestedBy": "user-002",
  "createdDate": "2024-10-15T10:30:00Z",
  "scheduledDate": "2024-11-01T09:00:00Z",
  "estimatedDuration": 6,
  "tasks": [
    {
      "id": "task-001",
      "description": "Electrical safety lockout",
      "estimatedTime": 30,
      "order": 1,
      "status": "pending"
    },
    {
      "id": "task-002",
      "description": "Inspect electrical connections",
      "estimatedTime": 60,
      "order": 2,
      "status": "pending"
    }
  ],
  "requiredParts": [
    {
      "partId": "part-001",
      "partName": "Electrical Connector",
      "quantity": 2,
      "status": "requested"
    }
  ],
  "safetyRequirements": ["ppe", "electrical_safety", "lockout_tagout"],
  "progress": 0,
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

## Get Work Order

Retrieves details of a specific work order.

**Endpoint:** `GET /work-orders/{workOrderId}`

**Authentication:** Required

**Path Parameters:**
- `workOrderId`: Unique identifier of the work order

**Response:**
```json
{
  "id": "wo-001",
  "workOrderNumber": "WO-2024-001",
  "title": "Pump A1 Bearing Replacement",
  "description": "Replace worn bearing in centrifugal pump A1",
  "assetId": "asset-123",
  "assetName": "Pump A1",
  "status": "in_progress",
  "priority": "high",
  "type": "corrective",
  "assignedTo": "tech-001",
  "assignedTechnician": "John Smith",
  "requestedBy": "user-001",
  "requestedByName": "Mike Johnson",
  "createdDate": "2024-10-01T09:00:00Z",
  "scheduledDate": "2024-10-05T08:00:00Z",
  "startDate": "2024-10-05T08:15:00Z",
  "estimatedDuration": 4,
  "actualDuration": 2.5,
  "failureCode": "fc-001",
  "safetyRequirements": ["ppe", "lockout_tagout"],
  "tasks": [
    {
      "id": "task-001",
      "description": "Safety lockout and isolation",
      "estimatedTime": 30,
      "actualTime": 25,
      "order": 1,
      "status": "completed",
      "completedBy": "tech-001",
      "completedAt": "2024-10-05T08:40:00Z"
    }
  ],
  "parts": [
    {
      "id": "part-001",
      "partName": "Bearing SKF 6204",
      "quantity": 1,
      "unitCost": 75,
      "totalCost": 75,
      "status": "used"
    }
  ],
  "notes": [
    {
      "id": "note-001",
      "text": "Bearing was severely worn, likely due to inadequate lubrication",
      "author": "tech-001",
      "authorName": "John Smith",
      "createdAt": "2024-10-05T09:30:00Z"
    }
  ],
  "media": [
    {
      "id": "media-001",
      "filename": "worn_bearing.jpg",
      "type": "image",
      "size": 245760,
      "uploadedBy": "tech-001",
      "uploadedAt": "2024-10-05T09:45:00Z",
      "url": "https://s3.amazonaws.com/bucket/media-001.jpg"
    }
  ],
  "costs": {
    "labor": 300,
    "materials": 150,
    "overhead": 50,
    "total": 500
  },
  "progress": 60,
  "createdAt": "2024-10-01T09:00:00Z",
  "updatedAt": "2024-10-05T10:30:00Z"
}
```

## Update Work Order

Updates an existing work order.

**Endpoint:** `PUT /work-orders/{workOrderId}`

**Authentication:** Required

**Path Parameters:**
- `workOrderId`: Unique identifier of the work order

**Request Body:**
```json
{
  "status": "completed",
  "completionDate": "2024-10-05T12:30:00Z",
  "actualDuration": 4.5,
  "progress": 100,
  "notes": "Work completed successfully. Equipment tested and operational."
}
```

## Delete Work Order

Deletes a work order from the system.

**Endpoint:** `DELETE /work-orders/{workOrderId}`

**Authentication:** Required

**Path Parameters:**
- `workOrderId`: Unique identifier of the work order

**Response:**
```json
{
  "message": "Work order deleted successfully",
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

## Work Order Notes

### List Notes

**Endpoint:** `GET /work-orders/{workOrderId}/notes`

**Response:**
```json
{
  "notes": [
    {
      "id": "note-001",
      "text": "Initial assessment complete. Bearing replacement required.",
      "author": "tech-001",
      "authorName": "John Smith",
      "createdAt": "2024-10-05T09:00:00Z"
    }
  ]
}
```

### Add Note

**Endpoint:** `POST /work-orders/{workOrderId}/notes`

**Request Body:**
```json
{
  "text": "Bearing replacement completed successfully. System tested and operational."
}
```

## Work Order Media

The work order media system follows the same pattern as the unified photo management system used for parts and assets, providing consistent photo management capabilities across all entity types.

### Photo Management Consistency

Work order media endpoints use the same underlying photo management infrastructure as parts and assets

### List Media

**Endpoint:** `GET /work-orders/{workOrderId}/media`

**Response:**
```json
{
  "media": [
    {
      "id": "media-001",
      "filename": "before_repair.jpg",
      "type": "image",
      "size": 245760,
      "uploadedBy": "tech-001",
      "uploadedAt": "2024-10-05T09:00:00Z",
      "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumb_media-001.jpg",
      "url": "https://s3.amazonaws.com/bucket/media-001.jpg"
    }
  ]
}
```

### Get Presigned Upload URL

**Endpoint:** `POST /work-orders/{workOrderId}/media/presigned-url`

**Request Body:**
```json
{
  "filename": "repair_photo.jpg",
  "contentType": "image/jpeg",
  "size": 1048576
}
```

**Response:**
```json
{
  "uploadUrl": "https://s3.amazonaws.com/bucket/upload-url",
  "mediaId": "media-002",
  "expiresAt": "2024-10-05T10:00:00Z"
}
```

### Upload Media

**Endpoint:** `POST /work-orders/{workOrderId}/media`

**Request:** Multipart form data with file

**Response:**
```json
{
  "id": "media-002",
  "filename": "repair_complete.jpg",
  "type": "image",
  "size": 512000,
  "url": "https://s3.amazonaws.com/bucket/media-002.jpg"
}
```

## Work Order Tasks

### List Tasks

**Endpoint:** `GET /work-orders/{workOrderId}/tasks`

### Add Task

**Endpoint:** `POST /work-orders/{workOrderId}/tasks`

**Request Body:**
```json
{
  "description": "Final system test and verification",
  "estimatedTime": 45,
  "order": 5,
  "assignedTo": "tech-001"
}
```

### Update Task

**Endpoint:** `PUT /work-orders/{workOrderId}/tasks/{taskId}`

**Request Body:**
```json
{
  "status": "completed",
  "actualTime": 40,
  "notes": "System test passed. All parameters within normal range."
}
```

## Work Order Parts

### List Parts

**Endpoint:** `GET /work-orders/{workOrderId}/parts`

### Add Part

**Endpoint:** `POST /work-orders/{workOrderId}/parts`

**Request Body:**
```json
{
  "partId": "part-003",
  "quantity": 1,
  "unitCost": 25.50
}
```

### Update Part

**Endpoint:** `PUT /work-orders/{workOrderId}/parts/{partId}`

**Request Body:**
```json
{
  "quantity": 2,
  "status": "used",
  "actualCost": 51.00
}
```

## Work Order Status Values

- **open**: Work order created but not started
- **assigned**: Assigned to technician
- **in_progress**: Work in progress
- **on_hold**: Temporarily suspended
- **completed**: Work completed successfully
- **cancelled**: Work order cancelled
- **closed**: Completed and verified

## Priority Levels

- **low**: Non-urgent work
- **medium**: Standard priority
- **high**: Important work
- **critical**: Emergency work

## Work Order Types

- **preventive**: Scheduled preventive maintenance
- **corrective**: Repair work
- **emergency**: Emergency response
- **inspection**: Inspection work
- **calibration**: Equipment calibration
- **modification**: Equipment modification

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid work order data",
  "details": {
    "scheduledDate": "Scheduled date cannot be in the past",
    "assignedTo": "Assigned technician must exist"
  }
}
```

### 404 Not Found
```json
{
  "error": "Work order not found",
  "workOrderId": "wo-001"
}
```

### 409 Conflict
```json
{
  "error": "Cannot delete work order",
  "reason": "Work order is in progress"
}
```

## Related Photo Management Documentation

For detailed information about the photo management system that work order media is built upon, see:

- **[Parts Photo API](./parts.md#part-photos)**: Detailed photo management endpoints for parts
- **[Assets Photo API](./assets.md#asset-photos)**: Asset photo management and organization

