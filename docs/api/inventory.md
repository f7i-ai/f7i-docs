---
sidebar_position: 9
---

# Inventory API

The Inventory API provides endpoints for managing parts inventory, tracking stock levels, adjustments, and generating inventory reports.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/inventory` | List all inventory records |
| GET | `/inventory/{partId}` | Get inventory for a specific part |
| PUT | `/inventory/{partId}` | Update inventory for a part |
| DELETE | `/inventory/{partId}` | Delete inventory record |
| GET | `/inventory/{partId}/history` | Get inventory history |
| POST | `/inventory/{partId}/adjustments` | Make inventory adjustment |
| GET | `/inventory/reports` | Get inventory reports |

## List Inventory

Retrieves inventory information for all parts.

**Endpoint:** `GET /inventory`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of inventory records to return
- `offset` (optional): Number of records to skip for pagination
- `search` (optional): Search term to filter parts
- `location` (optional): Filter by storage location
- `lowStock` (optional): Show only low stock items (true/false)
- `outOfStock` (optional): Show only out of stock items (true/false)
- `category` (optional): Filter by part category

**Response:**
```json
[
  {
    "partId": "part-001",
    "site": "main-facility", 
    "tenantId": "tenant-123",
    "quantity": 15,
    "minStockLevel": 5,
    "maxStockLevel": 50,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-10-10T14:30:00Z",
    "partDetails": {
      "partNumber": "SKF-6204",
      "name": "Ball Bearing 6204",
      "unit": "each",
      "cost": 75.50
    }
  }
]
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/inventory?lowStock=true" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Get Part Inventory

Retrieves inventory details for a specific part.

**Endpoint:** `GET /inventory/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**For specific part (with site parameter):**
```json
{
  "partId": "part-001",
  "site": "main-facility",
  "tenantId": "tenant-123",
  "quantity": 15,
  "minStockLevel": 5,
  "maxStockLevel": 50,
  "exists": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-10T14:30:00Z"
}
```

**For all sites (without site parameter):**
```json
{
  "part": {
    "partId": "part-001",
    "partNumber": "SKF-6204", 
    "name": "Ball Bearing 6204",
    "unit": "each",
    "cost": 75.50
  },
  "inventory": [
    {
      "partId": "part-001",
      "site": "main-facility",
      "tenantId": "tenant-123",
      "quantity": 15,
      "minStockLevel": 5,
      "maxStockLevel": 50,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-10-10T14:30:00Z"
    },
    {
      "partId": "part-001", 
      "site": "warehouse-2",
      "tenantId": "tenant-123",
      "quantity": 8,
      "minStockLevel": 3,
      "maxStockLevel": 25,
      "createdAt": "2024-02-01T10:30:00Z",
      "updatedAt": "2024-10-05T14:30:00Z"
    }
  ]
}
```

## Update Part Inventory

Updates inventory information for a specific part.

**Endpoint:** `PUT /inventory/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Request Body:**
```json
{
  "currentStock": 20,
  "minimumStock": 8,
  "maximumStock": 60,
  "reorderPoint": 12,
  "location": "A1-B3-C2",
  "unitCost": 78.00,
  "reason": "Physical count adjustment",
  "notes": "Updated after physical inventory count"
}
```

**Response:**
```json
{
  "partId": "part-001",
  "partNumber": "SKF-6204",
  "partName": "Ball Bearing 6204",
  "currentStock": 20,
  "availableStock": 17,
  "reservedStock": 3,
  "minimumStock": 8,
  "maximumStock": 60,
  "reorderPoint": 12,
  "unitCost": 78.00,
  "totalValue": 1560.00,
  "location": "A1-B3-C2",
  "stockStatus": "adequate",
  "adjustmentReason": "Physical count adjustment",
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

## Delete Inventory Record

Removes an inventory record (sets stock to zero).

**Endpoint:** `DELETE /inventory/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Response:**
```json
{
  "message": "Inventory record deleted successfully",
  "finalStock": 0,
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

## Get Inventory History

Retrieves the movement history for a specific part.

**Endpoint:** `GET /inventory/{partId}/history`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Query Parameters:**
- `limit` (optional): Maximum number of history records to return
- `offset` (optional): Number of records to skip for pagination
- `startDate` (optional): Filter movements after this date (ISO 8601)
- `endDate` (optional): Filter movements before this date (ISO 8601)
- `movementType` (optional): Filter by movement type

**Response:**
```json
{
  "partId": "part-001",
  "partNumber": "SKF-6204",
  "partName": "Ball Bearing 6204",
  "movements": [
    {
      "id": "movement-001",
      "type": "issue",
      "quantity": -2,
      "previousBalance": 17,
      "newBalance": 15,
      "unitCost": 75.50,
      "totalValue": -151.00,
      "reason": "Work Order WO-2024-001",
      "reference": "wo-001",
      "performedBy": "tech-001",
      "performedByName": "John Smith",
      "performedAt": "2024-10-10T14:30:00Z",
      "notes": "Used for pump bearing replacement"
    },
    {
      "id": "movement-002",
      "type": "receipt",
      "quantity": 25,
      "previousBalance": -8,
      "newBalance": 17,
      "unitCost": 75.50,
      "totalValue": 1887.50,
      "reason": "Purchase Order PO-2024-005",
      "reference": "po-005",
      "performedBy": "user-002",
      "performedByName": "Sarah Johnson",
      "performedAt": "2024-09-15T09:00:00Z",
      "notes": "Regular stock replenishment"
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

## Make Inventory Adjustment

Creates an inventory adjustment entry.

**Endpoint:** `POST /inventory/{partId}/adjustments`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Request Body:**
```json
{
  "adjustmentType": "count",
  "quantity": 3,
  "reason": "Physical inventory count variance",
  "notes": "Found 3 additional units during cycle count",
  "unitCost": 75.50,
  "location": "A1-B2-C3"
}
```

**Response:**
```json
{
  "adjustmentId": "adj-001",
  "partId": "part-001",
  "adjustmentType": "count",
  "quantity": 3,
  "previousBalance": 15,
  "newBalance": 18,
  "unitCost": 75.50,
  "totalValue": 226.50,
  "reason": "Physical inventory count variance",
  "notes": "Found 3 additional units during cycle count",
  "performedBy": "user-003",
  "performedAt": "2024-10-15T10:30:00Z",
  "approved": false,
  "approvedBy": null,
  "approvedAt": null
}
```

## Get Inventory Reports

Generates various inventory reports and analytics.

**Endpoint:** `GET /inventory/reports`

**Authentication:** Required

**Query Parameters:**
- `reportType` (required): Type of report (summary, movements, abc_analysis, turnover, aging)
- `startDate` (optional): Report start date (ISO 8601)
- `endDate` (optional): Report end date (ISO 8601)
- `category` (optional): Filter by part category
- `location` (optional): Filter by storage location

**Report Types:**

### Summary Report
```json
{
  "reportType": "summary",
  "generatedAt": "2024-10-15T10:30:00Z",
  "summary": {
    "totalParts": 500,
    "totalValue": 125000.00,
    "totalMovements": 1250,
    "averageTurnover": 2.1
  },
  "stockStatus": {
    "adequate": 450,
    "lowStock": 35,
    "outOfStock": 10,
    "excessStock": 5
  },
  "categoryBreakdown": [
    {
      "category": "Bearings",
      "partCount": 150,
      "totalValue": 45000.00,
      "percentage": 36.0
    }
  ]
}
```

### ABC Analysis Report
```json
{
  "reportType": "abc_analysis",
  "generatedAt": "2024-10-15T10:30:00Z",
  "analysis": {
    "classA": {
      "partCount": 100,
      "valuePercentage": 80.0,
      "totalValue": 100000.00
    },
    "classB": {
      "partCount": 200,
      "valuePercentage": 15.0,
      "totalValue": 18750.00
    },
    "classC": {
      "partCount": 200,
      "valuePercentage": 5.0,
      "totalValue": 6250.00
    }
  },
  "parts": [
    {
      "partId": "part-001",
      "partNumber": "SKF-6204",
      "class": "A",
      "annualUsageValue": 15000.00,
      "percentage": 12.0
    }
  ]
}
```

## Movement Types

Inventory movement types:

- **receipt**: Stock received from suppliers
- **issue**: Stock issued for work orders
- **adjustment**: Manual stock adjustments
- **transfer**: Stock transferred between locations
- **return**: Stock returned from work orders
- **cycle_count**: Cycle count adjustments
- **write_off**: Stock written off/damaged
- **reserve**: Stock reserved for future use
- **unreserve**: Stock reservation released

## Adjustment Types

Types of inventory adjustments:

- **count**: Physical count variance
- **damage**: Damaged goods write-off
- **loss**: Lost or stolen items
- **correction**: Data entry corrections
- **expiry**: Expired items removal
- **quality**: Quality-related adjustments

## Stock Status Values

- **adequate**: Stock level is sufficient
- **low**: Stock level below reorder point
- **critical**: Stock level below minimum
- **out**: Zero stock
- **excess**: Stock level above maximum

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid inventory data",
  "details": {
    "quantity": "Quantity must be a number",
    "adjustmentType": "Invalid adjustment type"
  }
}
```

### 404 Not Found
```json
{
  "error": "Inventory record not found",
  "partId": "part-001"
}
```

### 409 Conflict
```json
{
  "error": "Insufficient stock",
  "available": 5,
  "requested": 10
}
```
