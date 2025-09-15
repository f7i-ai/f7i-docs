---
sidebar_position: 6
---

# PM Procedures API

The PM Procedures API provides endpoints for managing Preventive Maintenance procedures and creating work orders from them.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pms` | List all PM procedures |
| POST | `/pms` | Create a new PM procedure |
| GET | `/pms/{pmId}` | Get a specific PM procedure |
| PUT | `/pms/{pmId}` | Update a PM procedure |
| DELETE | `/pms/{pmId}` | Delete a PM procedure |
| POST | `/pms/{pmId}/createworkorder` | Create work order from PM |

## List PM Procedures

Retrieves a list of all PM procedures.

**Endpoint:** `GET /pms`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of PM procedures to return
- `offset` (optional): Number of PM procedures to skip for pagination
- `search` (optional): Search term to filter PM procedures
- `assetId` (optional): Filter by asset ID
- `frequency` (optional): Filter by maintenance frequency
- `status` (optional): Filter by procedure status

**Response:**
```json
{
  "pmProcedures": [
    {
      "id": "pm-001",
      "name": "Monthly Pump Inspection",
      "description": "Monthly inspection and maintenance of centrifugal pumps",
      "assetId": "asset-123",
      "assetName": "Pump A1",
      "frequency": "monthly",
      "estimatedDuration": 2,
      "priority": "medium",
      "status": "active",
      "steps": [
        {
          "order": 1,
          "description": "Visual inspection of pump body",
          "estimatedTime": 15,
          "tools": ["flashlight", "inspection_mirror"]
        },
        {
          "order": 2,
          "description": "Check bearing lubrication",
          "estimatedTime": 30,
          "tools": ["grease_gun", "lubricant"]
        }
      ],
      "requiredSkills": ["mechanical", "lubrication"],
      "safetyRequirements": ["ppe", "lockout_tagout"],
      "parts": [
        {
          "partId": "part-001",
          "quantity": 1,
          "isOptional": true
        }
      ],
      "lastExecuted": "2024-09-15T00:00:00Z",
      "nextDue": "2024-11-15T00:00:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-10-01T14:45:00Z"
    }
  ],
  "pagination": {
    "total": 75,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/pms?frequency=monthly" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Create PM Procedure

Creates a new PM procedure.

**Endpoint:** `POST /pms`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Quarterly Motor Maintenance",
  "description": "Comprehensive quarterly maintenance for electric motors",
  "assetId": "asset-456",
  "frequency": "quarterly",
  "estimatedDuration": 4,
  "priority": "high",
  "steps": [
    {
      "order": 1,
      "description": "Power isolation and lockout",
      "estimatedTime": 15,
      "tools": ["lockout_kit"],
      "safetyNote": "Ensure complete electrical isolation"
    },
    {
      "order": 2,
      "description": "Visual inspection of motor housing",
      "estimatedTime": 20,
      "tools": ["flashlight", "inspection_mirror"]
    },
    {
      "order": 3,
      "description": "Check and replace air filter",
      "estimatedTime": 30,
      "tools": ["screwdriver", "replacement_filter"],
      "parts": [
        {
          "partId": "part-filter-001",
          "quantity": 1
        }
      ]
    }
  ],
  "requiredSkills": ["electrical", "mechanical"],
  "safetyRequirements": ["ppe", "electrical_safety", "lockout_tagout"],
  "parts": [
    {
      "partId": "part-filter-001",
      "quantity": 1,
      "isOptional": false
    },
    {
      "partId": "part-lubricant-001",
      "quantity": 1,
      "isOptional": true
    }
  ],
  "schedulingRules": {
    "preferredDay": "friday",
    "avoidWeekends": true,
    "leadTime": 7
  }
}
```

**Response:**
```json
{
  "id": "pm-002",
  "name": "Quarterly Motor Maintenance",
  "description": "Comprehensive quarterly maintenance for electric motors",
  "assetId": "asset-456",
  "assetName": "Motor B2",
  "frequency": "quarterly",
  "estimatedDuration": 4,
  "priority": "high",
  "status": "active",
  "steps": [
    {
      "order": 1,
      "description": "Power isolation and lockout",
      "estimatedTime": 15,
      "tools": ["lockout_kit"],
      "safetyNote": "Ensure complete electrical isolation"
    },
    {
      "order": 2,
      "description": "Visual inspection of motor housing",
      "estimatedTime": 20,
      "tools": ["flashlight", "inspection_mirror"]
    },
    {
      "order": 3,
      "description": "Check and replace air filter",
      "estimatedTime": 30,
      "tools": ["screwdriver", "replacement_filter"],
      "parts": [
        {
          "partId": "part-filter-001",
          "quantity": 1
        }
      ]
    }
  ],
  "requiredSkills": ["electrical", "mechanical"],
  "safetyRequirements": ["ppe", "electrical_safety", "lockout_tagout"],
  "parts": [
    {
      "partId": "part-filter-001",
      "quantity": 1,
      "isOptional": false
    },
    {
      "partId": "part-lubricant-001",
      "quantity": 1,
      "isOptional": true
    }
  ],
  "schedulingRules": {
    "preferredDay": "friday",
    "avoidWeekends": true,
    "leadTime": 7
  },
  "nextDue": "2025-01-15T00:00:00Z",
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

## Get PM Procedure

Retrieves details of a specific PM procedure.

**Endpoint:** `GET /pms/{pmId}`

**Authentication:** Required

**Path Parameters:**
- `pmId`: Unique identifier of the PM procedure

**Response:**
```json
{
  "id": "pm-001",
  "name": "Monthly Pump Inspection",
  "description": "Monthly inspection and maintenance of centrifugal pumps",
  "assetId": "asset-123",
  "assetName": "Pump A1",
  "frequency": "monthly",
  "estimatedDuration": 2,
  "priority": "medium",
  "status": "active",
  "steps": [
    {
      "order": 1,
      "description": "Visual inspection of pump body",
      "estimatedTime": 15,
      "tools": ["flashlight", "inspection_mirror"],
      "checkpoints": [
        "Check for leaks",
        "Inspect for corrosion",
        "Verify mounting bolts"
      ]
    }
  ],
  "requiredSkills": ["mechanical", "lubrication"],
  "safetyRequirements": ["ppe", "lockout_tagout"],
  "parts": [
    {
      "partId": "part-001",
      "partName": "Pump Seal",
      "quantity": 1,
      "isOptional": true
    }
  ],
  "history": [
    {
      "workOrderId": "wo-001",
      "executedDate": "2024-09-15T00:00:00Z",
      "duration": 2.5,
      "technician": "John Smith",
      "status": "completed"
    }
  ],
  "performance": {
    "averageDuration": 2.2,
    "completionRate": 95,
    "averageCost": 150
  },
  "lastExecuted": "2024-09-15T00:00:00Z",
  "nextDue": "2024-11-15T00:00:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T14:45:00Z"
}
```

## Update PM Procedure

Updates an existing PM procedure.

**Endpoint:** `PUT /pms/{pmId}`

**Authentication:** Required

**Path Parameters:**
- `pmId`: Unique identifier of the PM procedure

**Request Body:**
```json
{
  "estimatedDuration": 3,
  "priority": "high",
  "steps": [
    {
      "order": 1,
      "description": "Enhanced visual inspection of pump body",
      "estimatedTime": 20,
      "tools": ["flashlight", "inspection_mirror", "camera"]
    },
    {
      "order": 2,
      "description": "Check bearing lubrication and temperature",
      "estimatedTime": 30,
      "tools": ["grease_gun", "lubricant", "thermometer"]
    },
    {
      "order": 3,
      "description": "Vibration analysis",
      "estimatedTime": 45,
      "tools": ["vibration_analyzer"]
    }
  ]
}
```

## Delete PM Procedure

Deletes a PM procedure from the system.

**Endpoint:** `DELETE /pms/{pmId}`

**Authentication:** Required

**Path Parameters:**
- `pmId`: Unique identifier of the PM procedure

**Response:**
```json
{
  "message": "PM procedure deleted successfully",
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

## Create Work Order from PM

Creates a work order based on a PM procedure.

**Endpoint:** `POST /pms/{pmId}/createworkorder`

**Authentication:** Required

**Path Parameters:**
- `pmId`: Unique identifier of the PM procedure

**Request Body:**
```json
{
  "scheduledDate": "2024-11-15T09:00:00Z",
  "assignedTechnician": "tech-001",
  "priority": "medium",
  "notes": "Regular monthly maintenance - no issues reported",
  "customSteps": [
    {
      "order": 4,
      "description": "Additional inspection of new components",
      "estimatedTime": 15
    }
  ]
}
```

**Response:**
```json
{
  "workOrderId": "wo-003",
  "pmId": "pm-001",
  "assetId": "asset-123",
  "title": "Monthly Pump Inspection - Pump A1",
  "description": "Work order created from PM procedure: Monthly Pump Inspection",
  "scheduledDate": "2024-11-15T09:00:00Z",
  "assignedTechnician": "tech-001",
  "priority": "medium",
  "status": "scheduled",
  "estimatedDuration": 2,
  "steps": [
    {
      "order": 1,
      "description": "Visual inspection of pump body",
      "estimatedTime": 15,
      "status": "pending"
    },
    {
      "order": 2,
      "description": "Check bearing lubrication",
      "estimatedTime": 30,
      "status": "pending"
    },
    {
      "order": 4,
      "description": "Additional inspection of new components",
      "estimatedTime": 15,
      "status": "pending"
    }
  ],
  "requiredParts": [
    {
      "partId": "part-001",
      "quantity": 1,
      "status": "reserved"
    }
  ],
  "createdAt": "2024-10-15T10:30:00Z"
}
```

## PM Frequencies

Available maintenance frequencies:

- **daily**: Every day
- **weekly**: Every week
- **bi-weekly**: Every two weeks
- **monthly**: Every month
- **quarterly**: Every three months
- **semi-annual**: Every six months
- **annual**: Every year
- **custom**: Custom interval in days

## Priority Levels

PM procedure priority levels:

- **low**: Non-urgent maintenance
- **medium**: Standard priority
- **high**: Important maintenance
- **critical**: Emergency or safety-critical

## Status Values

PM procedure status values:

- **active**: Currently in use
- **inactive**: Temporarily disabled
- **draft**: Being developed
- **archived**: No longer used

## Safety Requirements

Common safety requirements:

- **ppe**: Personal Protective Equipment
- **lockout_tagout**: LOTO procedures
- **electrical_safety**: Electrical safety protocols
- **confined_space**: Confined space entry
- **hot_work**: Hot work permit required
- **chemical_safety**: Chemical handling protocols

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid PM procedure data",
  "details": {
    "frequency": "Frequency must be a valid option",
    "estimatedDuration": "Duration must be a positive number"
  }
}
```

### 404 Not Found
```json
{
  "error": "PM procedure not found",
  "pmId": "pm-001"
}
```

### 409 Conflict
```json
{
  "error": "Cannot create work order",
  "reason": "PM procedure already has a pending work order"
}
```
