---
sidebar_position: 4
---

# Failure Codes API

The Failure Codes API provides endpoints for managing equipment failure classification and categorization.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/failurecodes` | List all failure codes |
| POST | `/failurecodes` | Create a new failure code |
| GET | `/failurecodes/{failureCodeId}` | Get a specific failure code |
| PUT | `/failurecodes/{failureCodeId}` | Update a failure code |
| DELETE | `/failurecodes/{failureCodeId}` | Delete a failure code |

## List Failure Codes

Retrieves a list of all failure codes.

**Endpoint:** `GET /failurecodes`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of failure codes to return
- `offset` (optional): Number of failure codes to skip for pagination
- `search` (optional): Search term to filter failure codes
- `category` (optional): Filter by failure category
- `severity` (optional): Filter by severity level

**Response:**
```json
{
  "failureCodes": [
    {
      "id": "fc-001",
      "code": "MECH-001",
      "name": "Bearing Failure",
      "description": "Mechanical bearing failure due to wear or contamination",
      "category": "Mechanical",
      "severity": "high",
      "symptoms": [
        "Unusual noise",
        "Vibration",
        "Heat generation"
      ],
      "causes": [
        "Lubrication failure",
        "Contamination",
        "Overloading"
      ],
      "recommendations": [
        "Replace bearing",
        "Check lubrication system",
        "Inspect for contamination sources"
      ],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-10-01T14:45:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/failurecodes?category=Mechanical" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Create Failure Code

Creates a new failure code.

**Endpoint:** `POST /failurecodes`

**Authentication:** Required

**Request Body:**
```json
{
  "code": "ELEC-001",
  "name": "Motor Overheating",
  "description": "Electric motor overheating due to electrical issues",
  "category": "Electrical",
  "severity": "medium",
  "symptoms": [
    "High temperature",
    "Reduced performance",
    "Circuit breaker trips"
  ],
  "causes": [
    "Overloading",
    "Poor ventilation",
    "Electrical fault"
  ],
  "recommendations": [
    "Check electrical connections",
    "Verify load requirements",
    "Inspect cooling system"
  ]
}
```

**Response:**
```json
{
  "id": "fc-002",
  "code": "ELEC-001",
  "name": "Motor Overheating",
  "description": "Electric motor overheating due to electrical issues",
  "category": "Electrical",
  "severity": "medium",
  "symptoms": [
    "High temperature",
    "Reduced performance",
    "Circuit breaker trips"
  ],
  "causes": [
    "Overloading",
    "Poor ventilation",
    "Electrical fault"
  ],
  "recommendations": [
    "Check electrical connections",
    "Verify load requirements",
    "Inspect cooling system"
  ],
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Get Failure Code

Retrieves details of a specific failure code.

**Endpoint:** `GET /failurecodes/{failureCodeId}`

**Authentication:** Required

**Path Parameters:**
- `failureCodeId`: Unique identifier of the failure code

**Response:**
```json
{
  "id": "fc-001",
  "code": "MECH-001",
  "name": "Bearing Failure",
  "description": "Mechanical bearing failure due to wear or contamination",
  "category": "Mechanical",
  "severity": "high",
  "symptoms": [
    "Unusual noise",
    "Vibration",
    "Heat generation"
  ],
  "causes": [
    "Lubrication failure",
    "Contamination",
    "Overloading"
  ],
  "recommendations": [
    "Replace bearing",
    "Check lubrication system",
    "Inspect for contamination sources"
  ],
  "relatedCodes": ["fc-003", "fc-005"],
  "usageCount": 15,
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T14:45:00Z"
}
```

## Update Failure Code

Updates an existing failure code.

**Endpoint:** `PUT /failurecodes/{failureCodeId}`

**Authentication:** Required

**Path Parameters:**
- `failureCodeId`: Unique identifier of the failure code

**Request Body:**
```json
{
  "description": "Updated description with more detail",
  "severity": "critical",
  "recommendations": [
    "Immediate replacement required",
    "Check lubrication system",
    "Inspect for contamination sources",
    "Review maintenance schedule"
  ]
}
```

**Response:**
```json
{
  "id": "fc-001",
  "code": "MECH-001",
  "name": "Bearing Failure",
  "description": "Updated description with more detail",
  "category": "Mechanical",
  "severity": "critical",
  "symptoms": [
    "Unusual noise",
    "Vibration",
    "Heat generation"
  ],
  "causes": [
    "Lubrication failure",
    "Contamination",
    "Overloading"
  ],
  "recommendations": [
    "Immediate replacement required",
    "Check lubrication system",
    "Inspect for contamination sources",
    "Review maintenance schedule"
  ],
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

## Delete Failure Code

Deletes a failure code from the system (soft delete - marks as inactive).

**Endpoint:** `DELETE /failurecodes/{failureCodeId}`

**Authentication:** Required

**Path Parameters:**
- `failureCodeId`: Unique identifier of the failure code

**Response:**
```json
{
  "message": "Failure code deactivated successfully",
  "deactivatedAt": "2024-10-15T16:30:00Z"
}
```

## Failure Categories

Common failure categories include:

- **Mechanical**: Physical component failures
- **Electrical**: Electrical system failures
- **Hydraulic**: Hydraulic system failures
- **Pneumatic**: Pneumatic system failures
- **Thermal**: Temperature-related failures
- **Corrosion**: Corrosion and chemical damage
- **Wear**: Normal wear and tear
- **Fatigue**: Material fatigue failures
- **Human Error**: Operator-induced failures
- **Environmental**: Environmental factor failures

## Severity Levels

Failure severity levels:

- **low**: Minor issue, doesn't affect operation
- **medium**: Affects performance but operational
- **high**: Significant impact on operation
- **critical**: Immediate attention required, safety concern

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid failure code data",
  "details": {
    "code": "Failure code must be unique",
    "severity": "Severity must be one of: low, medium, high, critical"
  }
}
```

### 404 Not Found
```json
{
  "error": "Failure code not found",
  "failureCodeId": "fc-001"
}
```

### 409 Conflict
```json
{
  "error": "Failure code with this code already exists",
  "code": "MECH-001"
}
```
