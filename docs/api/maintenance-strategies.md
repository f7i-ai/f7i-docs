---
sidebar_position: 5
---

# Maintenance Strategies API

The Maintenance Strategies API provides endpoints for managing different maintenance approaches and methodologies.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/strategies` | List all maintenance strategies |
| POST | `/strategies` | Create a new maintenance strategy |
| GET | `/strategies/{strategyId}` | Get a specific maintenance strategy |
| PUT | `/strategies/{strategyId}` | Update a maintenance strategy |
| DELETE | `/strategies/{strategyId}` | Delete a maintenance strategy |

## List Maintenance Strategies

Retrieves a list of all maintenance strategies.

**Endpoint:** `GET /strategies`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of strategies to return
- `offset` (optional): Number of strategies to skip for pagination
- `search` (optional): Search term to filter strategies
- `type` (optional): Filter by strategy type
- `criticality` (optional): Filter by criticality level

**Response:**
```json
{
  "strategies": [
    {
      "id": "strat-001",
      "name": "Preventive Maintenance Strategy",
      "type": "preventive",
      "description": "Time-based maintenance strategy for critical equipment",
      "criticality": "high",
      "frequency": "monthly",
      "duration": 4,
      "resources": [
        {
          "type": "technician",
          "count": 2,
          "skills": ["mechanical", "electrical"]
        }
      ],
      "procedures": ["pm-001", "pm-002"],
      "applicableAssetTypes": ["pump", "motor", "compressor"],
      "costs": {
        "labor": 500,
        "materials": 200,
        "downtime": 1000
      },
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-10-01T14:45:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/strategies?type=preventive" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Create Maintenance Strategy

Creates a new maintenance strategy.

**Endpoint:** `POST /strategies`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Condition-Based Monitoring Strategy",
  "type": "condition-based",
  "description": "Sensor-based monitoring strategy for rotating equipment",
  "criticality": "medium",
  "frequency": "continuous",
  "duration": 0.5,
  "triggerConditions": [
    {
      "parameter": "vibration",
      "threshold": 10,
      "unit": "mm/s",
      "operator": "greater_than"
    },
    {
      "parameter": "temperature",
      "threshold": 80,
      "unit": "celsius",
      "operator": "greater_than"
    }
  ],
  "resources": [
    {
      "type": "specialist",
      "count": 1,
      "skills": ["vibration_analysis", "thermography"]
    }
  ],
  "procedures": ["cbm-001"],
  "applicableAssetTypes": ["motor", "pump", "fan"],
  "costs": {
    "labor": 300,
    "materials": 100,
    "downtime": 200
  }
}
```

**Response:**
```json
{
  "id": "strat-002",
  "name": "Condition-Based Monitoring Strategy",
  "type": "condition-based",
  "description": "Sensor-based monitoring strategy for rotating equipment",
  "criticality": "medium",
  "frequency": "continuous",
  "duration": 0.5,
  "triggerConditions": [
    {
      "parameter": "vibration",
      "threshold": 10,
      "unit": "mm/s",
      "operator": "greater_than"
    },
    {
      "parameter": "temperature",
      "threshold": 80,
      "unit": "celsius",
      "operator": "greater_than"
    }
  ],
  "resources": [
    {
      "type": "specialist",
      "count": 1,
      "skills": ["vibration_analysis", "thermography"]
    }
  ],
  "procedures": ["cbm-001"],
  "applicableAssetTypes": ["motor", "pump", "fan"],
  "costs": {
    "labor": 300,
    "materials": 100,
    "downtime": 200
  },
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Get Maintenance Strategy

Retrieves details of a specific maintenance strategy.

**Endpoint:** `GET /strategies/{strategyId}`

**Authentication:** Required

**Path Parameters:**
- `strategyId`: Unique identifier of the maintenance strategy

**Response:**
```json
{
  "id": "strat-001",
  "name": "Preventive Maintenance Strategy",
  "type": "preventive",
  "description": "Time-based maintenance strategy for critical equipment",
  "criticality": "high",
  "frequency": "monthly",
  "duration": 4,
  "resources": [
    {
      "type": "technician",
      "count": 2,
      "skills": ["mechanical", "electrical"]
    }
  ],
  "procedures": ["pm-001", "pm-002"],
  "applicableAssetTypes": ["pump", "motor", "compressor"],
  "costs": {
    "labor": 500,
    "materials": 200,
    "downtime": 1000
  },
  "performance": {
    "mtbf": 720,
    "availability": 98.5,
    "costPerMonth": 700
  },
  "assignedAssets": ["asset-001", "asset-002"],
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T14:45:00Z"
}
```

## Update Maintenance Strategy

Updates an existing maintenance strategy.

**Endpoint:** `PUT /strategies/{strategyId}`

**Authentication:** Required

**Path Parameters:**
- `strategyId`: Unique identifier of the maintenance strategy

**Request Body:**
```json
{
  "frequency": "bi-weekly",
  "duration": 3,
  "costs": {
    "labor": 400,
    "materials": 150,
    "downtime": 800
  },
  "description": "Updated preventive maintenance strategy with reduced frequency"
}
```

**Response:**
```json
{
  "id": "strat-001",
  "name": "Preventive Maintenance Strategy",
  "type": "preventive",
  "description": "Updated preventive maintenance strategy with reduced frequency",
  "criticality": "high",
  "frequency": "bi-weekly",
  "duration": 3,
  "resources": [
    {
      "type": "technician",
      "count": 2,
      "skills": ["mechanical", "electrical"]
    }
  ],
  "procedures": ["pm-001", "pm-002"],
  "applicableAssetTypes": ["pump", "motor", "compressor"],
  "costs": {
    "labor": 400,
    "materials": 150,
    "downtime": 800
  },
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

## Delete Maintenance Strategy

Deletes a maintenance strategy from the system.

**Endpoint:** `DELETE /strategies/{strategyId}`

**Authentication:** Required

**Path Parameters:**
- `strategyId`: Unique identifier of the maintenance strategy

**Response:**
```json
{
  "message": "Maintenance strategy deleted successfully",
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

## Strategy Types

Common maintenance strategy types:

- **preventive**: Time-based maintenance
- **predictive**: Data-driven maintenance
- **condition-based**: Condition monitoring based
- **reactive**: Run-to-failure approach
- **reliability-centered**: Prevent methodology
- **risk-based**: Risk assessment driven
- **total-productive**: TPM approach

## Frequency Options

Maintenance frequency settings:

- **continuous**: Real-time monitoring
- **daily**: Every day
- **weekly**: Every week
- **bi-weekly**: Every two weeks
- **monthly**: Every month
- **quarterly**: Every three months
- **semi-annual**: Every six months
- **annual**: Every year
- **custom**: Custom interval

## Criticality Levels

Asset criticality levels:

- **low**: Non-critical equipment
- **medium**: Important but not critical
- **high**: Critical to operations
- **critical**: Safety or production critical

## Resource Types

Available resource types:

- **technician**: General maintenance technician
- **specialist**: Specialized technician
- **engineer**: Maintenance engineer
- **contractor**: External contractor
- **supervisor**: Maintenance supervisor

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid strategy data",
  "details": {
    "frequency": "Frequency must be a valid option",
    "duration": "Duration must be a positive number"
  }
}
```

### 404 Not Found
```json
{
  "error": "Maintenance strategy not found",
  "strategyId": "strat-001"
}
```

### 409 Conflict
```json
{
  "error": "Strategy name already exists",
  "name": "Preventive Maintenance Strategy"
}
```
