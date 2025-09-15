---
sidebar_position: 8
---

# Parts API

The Parts API provides endpoints for managing spare parts and components in your maintenance system.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/parts` | List all parts |
| POST | `/parts` | Create a new part |
| GET | `/parts/{partId}` | Get a specific part |
| PUT | `/parts/{partId}` | Update a part |
| DELETE | `/parts/{partId}` | Delete a part |

## List Parts

Retrieves a list of all parts.

**Endpoint:** `GET /parts`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of parts to return
- `offset` (optional): Number of parts to skip for pagination
- `search` (optional): Search term to filter parts
- `category` (optional): Filter by part category
- `manufacturer` (optional): Filter by manufacturer
- `inStock` (optional): Filter by stock availability (true/false)
- `critical` (optional): Filter critical parts only (true/false)

**Response:**
```json
[
  {
    "partId": "part-001",
    "partNumber": "SKF-6204",
    "name": "Ball Bearing 6204",
    "description": "Deep groove ball bearing, 20mm bore, 47mm OD",
    "unit": "each",
    "cost": 75.50,
    "manufacturer": "SKF",
    "tenantId": "tenant-123",
    "site": "main-facility",
    "componentIds": ["comp-001", "comp-002"],
    "componentDetails": [
      {
        "componentId": "comp-001",
        "name": "Motor Bearing Housing",
        "description": "Bearing housing for electric motor"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-10-01T14:45:00Z"
  }
]
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/parts?category=Bearings&inStock=true" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Create Part

Creates a new part record.

**Endpoint:** `POST /parts`

**Authentication:** Required

**Request Body:**
```json
{
  "partNumber": "FLUKE-175",
  "name": "Digital Multimeter",
  "description": "True RMS digital multimeter with temperature measurement",
  "category": "Test Equipment",
  "manufacturer": "Fluke",
  "manufacturerPartNumber": "FLUKE-175",
  "unitOfMeasure": "each",
  "unitCost": 285.00,
  "currency": "USD",
  "weight": 0.6,
  "weightUnit": "kg",
  "dimensions": {
    "length": 185,
    "width": 95,
    "height": 50,
    "unit": "mm"
  },
  "specifications": {
    "accuracy": "±0.1%",
    "displayCounts": "6000",
    "trueRMS": true,
    "temperature": true
  },
  "supplier": {
    "id": "supplier-002",
    "name": "Test Equipment Direct",
    "partNumber": "TED-FLUKE175"
  },
  "minimumStock": 2,
  "maximumStock": 10,
  "reorderPoint": 3,
  "leadTime": 14,
  "isCritical": false,
  "location": "B2-C1-D2"
}
```

**Response:**
```json
{
  "partId": "part-002",
  "partNumber": "FLUKE-175",
  "name": "Digital Multimeter",
  "description": "True RMS digital multimeter with temperature measurement",
  "unit": "each",
  "cost": 285.00,
  "manufacturer": "Fluke",
  "tenantId": "tenant-123",
  "site": "main-facility",
  "componentIds": [],
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

## Get Part

Retrieves details of a specific part.

**Endpoint:** `GET /parts/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Response:**
```json
{
  "id": "part-001",
  "partNumber": "SKF-6204",
  "name": "Ball Bearing 6204",
  "description": "Deep groove ball bearing, 20mm bore, 47mm OD",
  "category": "Bearings",
  "manufacturer": "SKF",
  "manufacturerPartNumber": "6204-2RS1",
  "unitOfMeasure": "each",
  "unitCost": 75.50,
  "currency": "USD",
  "weight": 0.106,
  "weightUnit": "kg",
  "dimensions": {
    "length": 47,
    "width": 47,
    "height": 14,
    "unit": "mm"
  },
  "specifications": {
    "bore": "20mm",
    "outerDiameter": "47mm",
    "width": "14mm",
    "sealType": "2RS1"
  },
  "supplier": {
    "id": "supplier-001",
    "name": "Industrial Supply Co",
    "partNumber": "ISC-6204",
    "contact": {
      "email": "orders@industrialsupply.com",
      "phone": "+1-555-0123"
    }
  },
  "alternativeParts": [
    {
      "id": "part-003",
      "partNumber": "NSK-6204",
      "manufacturer": "NSK"
    }
  ],
  "compatibleAssets": [
    {
      "id": "asset-123",
      "name": "Pump A1",
      "type": "Centrifugal Pump"
    }
  ],
  "stockLevel": 15,
  "minimumStock": 5,
  "maximumStock": 50,
  "reorderPoint": 8,
  "leadTime": 7,
  "averageUsage": 2.5,
  "usageUnit": "per_month",
  "lastOrderDate": "2024-09-15T00:00:00Z",
  "lastOrderQuantity": 25,
  "isCritical": true,
  "isActive": true,
  "location": "A1-B2-C3",
  "qrCode": "QR123456789",
  "barcode": "123456789012",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T14:45:00Z"
}
```

## Update Part

Updates an existing part.

**Endpoint:** `PUT /parts/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Request Body:**
```json
{
  "unitCost": 78.00,
  "minimumStock": 6,
  "reorderPoint": 10,
  "location": "A1-B3-C1",
  "specifications": {
    "bore": "20mm",
    "outerDiameter": "47mm",
    "width": "14mm",
    "sealType": "2RS1",
    "grease": "Standard"
  }
}
```

**Response:**
```json
{
  "id": "part-001",
  "partNumber": "SKF-6204",
  "name": "Ball Bearing 6204",
  "description": "Deep groove ball bearing, 20mm bore, 47mm OD",
  "category": "Bearings",
  "manufacturer": "SKF",
  "manufacturerPartNumber": "6204-2RS1",
  "unitOfMeasure": "each",
  "unitCost": 78.00,
  "currency": "USD",
  "stockLevel": 15,
  "minimumStock": 6,
  "maximumStock": 50,
  "reorderPoint": 10,
  "leadTime": 7,
  "location": "A1-B3-C1",
  "specifications": {
    "bore": "20mm",
    "outerDiameter": "47mm",
    "width": "14mm",
    "sealType": "2RS1",
    "grease": "Standard"
  },
  "isCritical": true,
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

## Delete Part

Deletes a part from the system (soft delete - marks as inactive).

**Endpoint:** `DELETE /parts/{partId}`

**Authentication:** Required

**Path Parameters:**
- `partId`: Unique identifier of the part

**Response:**
```json
{
  "message": "Part deactivated successfully",
  "deactivatedAt": "2024-10-15T16:30:00Z"
}
```

## Part Categories

Common part categories include:

- **Bearings**: Ball bearings, roller bearings, thrust bearings
- **Seals**: O-rings, gaskets, mechanical seals
- **Filters**: Oil filters, air filters, hydraulic filters
- **Belts**: V-belts, timing belts, flat belts
- **Electrical**: Wires, connectors, circuit breakers
- **Fasteners**: Bolts, nuts, screws, washers
- **Lubricants**: Oils, greases, coolants
- **Tools**: Hand tools, measuring instruments
- **Safety**: PPE, safety devices, warning signs
- **Consumables**: Cleaning supplies, adhesives

## Units of Measure

Supported units of measure:

- **each**: Individual items
- **meter**: Length measurement
- **kilogram**: Weight measurement
- **liter**: Volume measurement
- **box**: Packaged quantities
- **roll**: Roll quantities
- **set**: Sets of items
- **pair**: Paired items

## Stock Status Indicators

- **In Stock**: Stock level above minimum
- **Low Stock**: Stock level at or below reorder point
- **Out of Stock**: Zero stock level
- **On Order**: Parts have been ordered
- **Excess Stock**: Stock level above maximum

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid part data",
  "details": {
    "partNumber": "Part number must be unique",
    "unitCost": "Unit cost must be a positive number"
  }
}
```

### 404 Not Found
```json
{
  "error": "Part not found",
  "partId": "part-001"
}
```

### 409 Conflict
```json
{
  "error": "Part number already exists",
  "partNumber": "SKF-6204"
}
```
