---
sidebar_position: 13
---

# Schedules API

The Schedules API provides endpoints for managing maintenance schedules and automated scheduling of preventive maintenance tasks.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/schedules` | List all schedules |
| POST | `/schedules` | Create a new schedule |
| GET | `/schedules/{scheduleId}` | Get a specific schedule |
| PUT | `/schedules/{scheduleId}` | Update a schedule |
| DELETE | `/schedules/{scheduleId}` | Delete a schedule |

## List Schedules

Retrieves a list of all maintenance schedules.

**Endpoint:** `GET /schedules`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of schedules to return
- `offset` (optional): Number of schedules to skip for pagination
- `search` (optional): Search term to filter schedules
- `assetId` (optional): Filter by asset ID
- `active` (optional): Filter by active status (true/false)
- `type` (optional): Filter by schedule type
- `nextDueBefore` (optional): Filter schedules due before date (ISO 8601)
- `nextDueAfter` (optional): Filter schedules due after date (ISO 8601)

**Response:**
```json
{
  "schedules": [
    {
      "id": "schedule-001",
      "name": "Monthly Pump Maintenance",
      "description": "Regular monthly maintenance for all centrifugal pumps",
      "type": "preventive",
      "isActive": true,
      "assetId": "asset-123",
      "assetName": "Pump A1",
      "pmProcedureId": "pm-001",
      "pmProcedureName": "Monthly Pump Inspection",
      "frequency": {
        "type": "monthly",
        "interval": 1,
        "dayOfMonth": 15,
        "time": "09:00"
      },
      "startDate": "2024-01-15T00:00:00Z",
      "endDate": null,
      "lastExecuted": "2024-09-15T09:00:00Z",
      "nextDue": "2024-11-15T09:00:00Z",
      "assignedTo": "tech-001",
      "assignedTechnician": "John Smith",
      "priority": "medium",
      "estimatedDuration": 2,
      "leadTime": 7,
      "autoCreate": true,
      "requiresApproval": false,
      "workOrderTemplate": {
        "title": "Monthly Pump Maintenance - {assetName}",
        "description": "Scheduled monthly maintenance",
        "priority": "medium"
      },
      "executionCount": 9,
      "createdAt": "2024-01-01T10:00:00Z",
      "updatedAt": "2024-10-01T14:30:00Z"
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
curl -X GET "https://api.acme.f7i.ai/prod/schedules?active=true&type=preventive" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Schedule

Creates a new maintenance schedule.

**Endpoint:** `POST /schedules`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Quarterly Motor Inspection",
  "description": "Comprehensive quarterly inspection for electric motors",
  "type": "preventive",
  "assetId": "asset-456",
  "pmProcedureId": "pm-002",
  "frequency": {
    "type": "quarterly",
    "interval": 1,
    "months": [1, 4, 7, 10],
    "dayOfMonth": 1,
    "time": "08:00"
  },
  "startDate": "2025-01-01T00:00:00Z",
  "endDate": "2027-12-31T23:59:59Z",
  "assignedTo": "tech-002",
  "priority": "high",
  "estimatedDuration": 4,
  "leadTime": 14,
  "autoCreate": true,
  "requiresApproval": true,
  "workOrderTemplate": {
    "title": "Quarterly Motor Inspection - {assetName}",
    "description": "Scheduled quarterly motor inspection and maintenance",
    "priority": "high",
    "safetyRequirements": ["ppe", "electrical_safety", "lockout_tagout"]
  },
  "notifications": {
    "advance": [7, 1],
    "overdue": [1, 3, 7],
    "recipients": ["tech-002", "supervisor-001"]
  }
}
```

**Response:**
```json
{
  "id": "schedule-002",
  "name": "Quarterly Motor Inspection",
  "description": "Comprehensive quarterly inspection for electric motors",
  "type": "preventive",
  "isActive": true,
  "assetId": "asset-456",
  "assetName": "Motor B2",
  "pmProcedureId": "pm-002",
  "pmProcedureName": "Quarterly Motor Maintenance",
  "frequency": {
    "type": "quarterly",
    "interval": 1,
    "months": [1, 4, 7, 10],
    "dayOfMonth": 1,
    "time": "08:00"
  },
  "startDate": "2025-01-01T00:00:00Z",
  "endDate": "2027-12-31T23:59:59Z",
  "lastExecuted": null,
  "nextDue": "2025-01-01T08:00:00Z",
  "assignedTo": "tech-002",
  "assignedTechnician": "Jane Doe",
  "priority": "high",
  "estimatedDuration": 4,
  "leadTime": 14,
  "autoCreate": true,
  "requiresApproval": true,
  "workOrderTemplate": {
    "title": "Quarterly Motor Inspection - {assetName}",
    "description": "Scheduled quarterly motor inspection and maintenance",
    "priority": "high",
    "safetyRequirements": ["ppe", "electrical_safety", "lockout_tagout"]
  },
  "notifications": {
    "advance": [7, 1],
    "overdue": [1, 3, 7],
    "recipients": ["tech-002", "supervisor-001"]
  },
  "executionCount": 0,
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

## Get Schedule

Retrieves details of a specific schedule.

**Endpoint:** `GET /schedules/{scheduleId}`

**Authentication:** Required

**Path Parameters:**
- `scheduleId`: Unique identifier of the schedule

**Response:**
```json
{
  "id": "schedule-001",
  "name": "Monthly Pump Maintenance",
  "description": "Regular monthly maintenance for all centrifugal pumps",
  "type": "preventive",
  "isActive": true,
  "assetId": "asset-123",
  "assetName": "Pump A1",
  "assetLocation": "Building 1 - Floor 2",
  "pmProcedureId": "pm-001",
  "pmProcedureName": "Monthly Pump Inspection",
  "frequency": {
    "type": "monthly",
    "interval": 1,
    "dayOfMonth": 15,
    "time": "09:00",
    "timezone": "America/New_York"
  },
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": null,
  "lastExecuted": "2024-09-15T09:00:00Z",
  "nextDue": "2024-11-15T09:00:00Z",
  "assignedTo": "tech-001",
  "assignedTechnician": "John Smith",
  "priority": "medium",
  "estimatedDuration": 2,
  "leadTime": 7,
  "autoCreate": true,
  "requiresApproval": false,
  "workOrderTemplate": {
    "title": "Monthly Pump Maintenance - {assetName}",
    "description": "Scheduled monthly maintenance for {assetName} located at {assetLocation}",
    "priority": "medium",
    "estimatedDuration": 2,
    "safetyRequirements": ["ppe", "lockout_tagout"]
  },
  "notifications": {
    "advance": [7, 1],
    "overdue": [1, 3],
    "recipients": ["tech-001", "supervisor-001"]
  },
  "executionHistory": [
    {
      "executionDate": "2024-09-15T09:00:00Z",
      "workOrderId": "wo-001",
      "status": "completed",
      "actualDuration": 2.5,
      "completedBy": "tech-001",
      "completedAt": "2024-09-15T11:30:00Z"
    },
    {
      "executionDate": "2024-08-15T09:00:00Z",
      "workOrderId": "wo-002",
      "status": "completed",
      "actualDuration": 2.0,
      "completedBy": "tech-001",
      "completedAt": "2024-08-15T11:00:00Z"
    }
  ],
  "performance": {
    "averageDuration": 2.2,
    "completionRate": 100,
    "onTimeRate": 95,
    "averageCost": 150
  },
  "executionCount": 9,
  "missedCount": 0,
  "createdBy": "user-001",
  "createdByName": "Mike Johnson",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-10-01T14:30:00Z"
}
```

## Update Schedule

Updates an existing schedule.

**Endpoint:** `PUT /schedules/{scheduleId}`

**Authentication:** Required

**Path Parameters:**
- `scheduleId`: Unique identifier of the schedule

**Request Body:**
```json
{
  "frequency": {
    "type": "monthly",
    "interval": 1,
    "dayOfMonth": 10,
    "time": "08:30"
  },
  "assignedTo": "tech-003",
  "priority": "high",
  "leadTime": 10,
  "workOrderTemplate": {
    "title": "Critical Pump Maintenance - {assetName}",
    "description": "Enhanced monthly maintenance with vibration analysis",
    "priority": "high",
    "estimatedDuration": 3
  },
  "notifications": {
    "advance": [14, 7, 1],
    "overdue": [1, 3, 7],
    "recipients": ["tech-003", "supervisor-001", "manager-001"]
  }
}
```

**Response:**
```json
{
  "id": "schedule-001",
  "name": "Monthly Pump Maintenance",
  "description": "Regular monthly maintenance for all centrifugal pumps",
  "type": "preventive",
  "isActive": true,
  "frequency": {
    "type": "monthly",
    "interval": 1,
    "dayOfMonth": 10,
    "time": "08:30",
    "timezone": "America/New_York"
  },
  "nextDue": "2024-11-10T08:30:00Z",
  "assignedTo": "tech-003",
  "assignedTechnician": "Sarah Wilson",
  "priority": "high",
  "leadTime": 10,
  "workOrderTemplate": {
    "title": "Critical Pump Maintenance - {assetName}",
    "description": "Enhanced monthly maintenance with vibration analysis",
    "priority": "high",
    "estimatedDuration": 3
  },
  "notifications": {
    "advance": [14, 7, 1],
    "overdue": [1, 3, 7],
    "recipients": ["tech-003", "supervisor-001", "manager-001"]
  },
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

## Delete Schedule

Deletes a schedule from the system.

**Endpoint:** `DELETE /schedules/{scheduleId}`

**Authentication:** Required

**Path Parameters:**
- `scheduleId`: Unique identifier of the schedule

**Query Parameters:**
- `cancelPending` (optional): Cancel pending work orders (true/false, default: false)

**Response:**
```json
{
  "message": "Schedule deleted successfully",
  "scheduleId": "schedule-001",
  "pendingWorkOrders": 1,
  "cancelledWorkOrders": 1,
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

## Schedule Types

Available schedule types:

- **preventive**: Preventive maintenance schedules
- **inspection**: Regular inspection schedules
- **calibration**: Equipment calibration schedules
- **lubrication**: Lubrication schedules
- **cleaning**: Cleaning and housekeeping schedules
- **testing**: Equipment testing schedules
- **condition_monitoring**: Condition-based monitoring schedules

## Frequency Types

### Daily
```json
{
  "type": "daily",
  "interval": 1,
  "time": "09:00",
  "weekdays": [1, 2, 3, 4, 5]
}
```

### Weekly
```json
{
  "type": "weekly",
  "interval": 2,
  "dayOfWeek": 1,
  "time": "10:00"
}
```

### Monthly
```json
{
  "type": "monthly",
  "interval": 1,
  "dayOfMonth": 15,
  "time": "08:00"
}
```

### Quarterly
```json
{
  "type": "quarterly",
  "interval": 1,
  "months": [1, 4, 7, 10],
  "dayOfMonth": 1,
  "time": "09:00"
}
```

### Annual
```json
{
  "type": "annual",
  "interval": 1,
  "month": 6,
  "dayOfMonth": 1,
  "time": "08:00"
}
```

### Custom
```json
{
  "type": "custom",
  "intervalDays": 90,
  "time": "09:00"
}
```

## Priority Levels

Schedule priority levels:

- **low**: Non-critical schedules
- **medium**: Standard priority
- **high**: Important schedules
- **critical**: Safety or production critical

## Work Order Template Variables

Available variables for work order templates:

- `{assetName}`: Asset name
- `{assetLocation}`: Asset location
- `{assetType}`: Asset type
- `{scheduleName}`: Schedule name
- `{dueDate}`: Due date
- `{pmProcedureName}`: PM procedure name
- `{assignedTechnician}`: Assigned technician name

## Notification Settings

### Advance Notifications
Send notifications before due date:
- Array of days before due date
- Example: `[7, 1]` sends notifications 7 days and 1 day before

### Overdue Notifications
Send notifications after due date:
- Array of days after due date
- Example: `[1, 3, 7]` sends notifications 1, 3, and 7 days after overdue

### Recipients
List of user IDs to receive notifications:
- Individual users
- Role-based recipients
- External email addresses

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid schedule data",
  "details": {
    "frequency": "Invalid frequency configuration",
    "startDate": "Start date cannot be in the past"
  }
}
```

### 404 Not Found
```json
{
  "error": "Schedule not found",
  "scheduleId": "schedule-001"
}
```

### 409 Conflict
```json
{
  "error": "Schedule conflict",
  "reason": "Asset already has overlapping maintenance schedule"
}
```
