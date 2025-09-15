---
sidebar_position: 10
---

# Part Orders API

The Part Orders API provides endpoints for managing parts procurement, tracking order status, and handling purchase orders.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/part-orders` | List all part orders |
| POST | `/part-orders` | Create a new part order |
| GET | `/part-orders/{orderId}` | Get a specific part order |
| PUT | `/part-orders/{orderId}` | Update a part order |
| PUT | `/part-orders/{orderId}/status` | Update order status |

## List Part Orders

Retrieves a list of all part orders.

**Endpoint:** `GET /part-orders`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of orders to return
- `offset` (optional): Number of orders to skip for pagination
- `search` (optional): Search term to filter orders
- `status` (optional): Filter by order status
- `supplier` (optional): Filter by supplier ID
- `urgent` (optional): Filter urgent orders only (true/false)
- `createdAfter` (optional): Filter orders created after date (ISO 8601)
- `createdBefore` (optional): Filter orders created before date (ISO 8601)

**Response:**
```json
{
  "partOrders": [
    {
      "id": "po-001",
      "orderNumber": "PO-2024-001",
      "status": "pending",
      "priority": "normal",
      "supplierId": "supplier-001",
      "supplierName": "Industrial Supply Co",
      "requestedBy": "user-001",
      "requestedByName": "Mike Johnson",
      "approvedBy": "user-002",
      "approvedByName": "Sarah Wilson",
      "orderDate": "2024-10-01T09:00:00Z",
      "requestedDeliveryDate": "2024-10-08T00:00:00Z",
      "expectedDeliveryDate": "2024-10-08T00:00:00Z",
      "actualDeliveryDate": null,
      "items": [
        {
          "partId": "part-001",
          "partNumber": "SKF-6204",
          "partName": "Ball Bearing 6204",
          "quantity": 25,
          "unitCost": 75.50,
          "totalCost": 1887.50
        }
      ],
      "totals": {
        "subtotal": 1887.50,
        "tax": 151.00,
        "shipping": 25.00,
        "total": 2063.50
      },
      "currency": "USD",
      "shippingAddress": {
        "name": "Factory AI Warehouse",
        "address1": "123 Industrial Way",
        "city": "Manufacturing City",
        "state": "CA",
        "postalCode": "90210",
        "country": "USA"
      },
      "trackingNumber": null,
      "notes": "Urgent order for pump maintenance",
      "createdAt": "2024-10-01T09:00:00Z",
      "updatedAt": "2024-10-01T14:30:00Z"
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
curl -X GET "https://your-api-domain.com/prod/part-orders?status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Create Part Order

Creates a new part order.

**Endpoint:** `POST /part-orders`

**Authentication:** Required

**Request Body:**
```json
{
  "supplierId": "supplier-002",
  "priority": "urgent",
  "requestedDeliveryDate": "2024-10-20T00:00:00Z",
  "items": [
    {
      "partId": "part-002",
      "quantity": 5,
      "unitCost": 285.00,
      "notes": "Digital multimeters for maintenance team"
    },
    {
      "partId": "part-003",
      "quantity": 10,
      "unitCost": 12.50,
      "notes": "Replacement filters"
    }
  ],
  "shippingAddress": {
    "name": "Factory AI Warehouse",
    "address1": "123 Industrial Way",
    "city": "Manufacturing City",
    "state": "CA",
    "postalCode": "90210",
    "country": "USA"
  },
  "notes": "Urgent order for scheduled maintenance",
  "requiresApproval": true,
  "justification": "Required for critical equipment maintenance scheduled next week"
}
```

**Response:**
```json
{
  "id": "po-002",
  "orderNumber": "PO-2024-002",
  "status": "draft",
  "priority": "urgent",
  "supplierId": "supplier-002",
  "supplierName": "Test Equipment Direct",
  "requestedBy": "user-003",
  "requestedByName": "Tom Anderson",
  "approvedBy": null,
  "approvedByName": null,
  "orderDate": "2024-10-15T10:30:00Z",
  "requestedDeliveryDate": "2024-10-20T00:00:00Z",
  "expectedDeliveryDate": null,
  "items": [
    {
      "partId": "part-002",
      "partNumber": "FLUKE-175",
      "partName": "Digital Multimeter",
      "quantity": 5,
      "unitCost": 285.00,
      "totalCost": 1425.00,
      "notes": "Digital multimeters for maintenance team"
    },
    {
      "partId": "part-003",
      "partNumber": "FILTER-001",
      "partName": "Air Filter",
      "quantity": 10,
      "unitCost": 12.50,
      "totalCost": 125.00,
      "notes": "Replacement filters"
    }
  ],
  "totals": {
    "subtotal": 1550.00,
    "tax": 124.00,
    "shipping": 15.00,
    "total": 1689.00
  },
  "currency": "USD",
  "shippingAddress": {
    "name": "Factory AI Warehouse",
    "address1": "123 Industrial Way",
    "city": "Manufacturing City",
    "state": "CA",
    "postalCode": "90210",
    "country": "USA"
  },
  "notes": "Urgent order for scheduled maintenance",
  "requiresApproval": true,
  "justification": "Required for critical equipment maintenance scheduled next week",
  "approvalRequired": true,
  "createdAt": "2024-10-15T10:30:00Z",
  "updatedAt": "2024-10-15T10:30:00Z"
}
```

## Get Part Order

Retrieves details of a specific part order.

**Endpoint:** `GET /part-orders/{orderId}`

**Authentication:** Required

**Path Parameters:**
- `orderId`: Unique identifier of the part order

**Response:**
```json
{
  "id": "po-001",
  "orderNumber": "PO-2024-001",
  "status": "received",
  "priority": "normal",
  "supplierId": "supplier-001",
  "supplierName": "Industrial Supply Co",
  "supplierContact": {
    "email": "orders@industrialsupply.com",
    "phone": "+1-555-0123",
    "contactPerson": "Bob Smith"
  },
  "requestedBy": "user-001",
  "requestedByName": "Mike Johnson",
  "approvedBy": "user-002",
  "approvedByName": "Sarah Wilson",
  "orderDate": "2024-10-01T09:00:00Z",
  "approvedDate": "2024-10-01T14:00:00Z",
  "sentDate": "2024-10-01T15:00:00Z",
  "requestedDeliveryDate": "2024-10-08T00:00:00Z",
  "expectedDeliveryDate": "2024-10-08T00:00:00Z",
  "actualDeliveryDate": "2024-10-07T14:30:00Z",
  "items": [
    {
      "partId": "part-001",
      "partNumber": "SKF-6204",
      "partName": "Ball Bearing 6204",
      "quantity": 25,
      "receivedQuantity": 25,
      "unitCost": 75.50,
      "totalCost": 1887.50,
      "status": "received"
    }
  ],
  "totals": {
    "subtotal": 1887.50,
    "tax": 151.00,
    "shipping": 25.00,
    "total": 2063.50
  },
  "currency": "USD",
  "paymentTerms": "Net 30",
  "shippingMethod": "Standard Ground",
  "shippingAddress": {
    "name": "Factory AI Warehouse",
    "address1": "123 Industrial Way",
    "city": "Manufacturing City",
    "state": "CA",
    "postalCode": "90210",
    "country": "USA"
  },
  "trackingNumber": "1Z999AA1234567890",
  "invoiceNumber": "INV-2024-001",
  "notes": "Urgent order for pump maintenance",
  "statusHistory": [
    {
      "status": "draft",
      "changedBy": "user-001",
      "changedAt": "2024-10-01T09:00:00Z",
      "notes": "Order created"
    },
    {
      "status": "pending_approval",
      "changedBy": "user-001",
      "changedAt": "2024-10-01T09:30:00Z",
      "notes": "Submitted for approval"
    },
    {
      "status": "approved",
      "changedBy": "user-002",
      "changedAt": "2024-10-01T14:00:00Z",
      "notes": "Approved by manager"
    },
    {
      "status": "sent",
      "changedBy": "system",
      "changedAt": "2024-10-01T15:00:00Z",
      "notes": "Order sent to supplier"
    },
    {
      "status": "received",
      "changedBy": "user-004",
      "changedAt": "2024-10-07T14:30:00Z",
      "notes": "Order received and verified"
    }
  ],
  "attachments": [
    {
      "id": "attachment-001",
      "filename": "purchase_order.pdf",
      "type": "application/pdf",
      "size": 245760,
      "uploadedBy": "user-001",
      "uploadedAt": "2024-10-01T15:00:00Z"
    }
  ],
  "createdAt": "2024-10-01T09:00:00Z",
  "updatedAt": "2024-10-07T14:30:00Z"
}
```

## Update Part Order

Updates an existing part order.

**Endpoint:** `PUT /part-orders/{orderId}`

**Authentication:** Required

**Path Parameters:**
- `orderId`: Unique identifier of the part order

**Request Body:**
```json
{
  "priority": "high",
  "requestedDeliveryDate": "2024-10-18T00:00:00Z",
  "notes": "Updated delivery date due to urgent maintenance requirement",
  "items": [
    {
      "partId": "part-002",
      "quantity": 8,
      "unitCost": 280.00,
      "notes": "Increased quantity and updated price"
    }
  ]
}
```

**Response:**
```json
{
  "id": "po-002",
  "orderNumber": "PO-2024-002",
  "status": "draft",
  "priority": "high",
  "requestedDeliveryDate": "2024-10-18T00:00:00Z",
  "notes": "Updated delivery date due to urgent maintenance requirement",
  "items": [
    {
      "partId": "part-002",
      "partNumber": "FLUKE-175",
      "partName": "Digital Multimeter",
      "quantity": 8,
      "unitCost": 280.00,
      "totalCost": 2240.00,
      "notes": "Increased quantity and updated price"
    }
  ],
  "totals": {
    "subtotal": 2365.00,
    "tax": 189.20,
    "shipping": 20.00,
    "total": 2574.20
  },
  "updatedAt": "2024-10-15T16:20:00Z"
}
```

## Update Order Status

Updates the status of a part order.

**Endpoint:** `PUT /part-orders/{orderId}/status`

**Authentication:** Required

**Path Parameters:**
- `orderId`: Unique identifier of the part order

**Request Body:**
```json
{
  "status": "approved",
  "notes": "Approved for urgent maintenance requirement",
  "approvedBy": "user-002"
}
```

**Response:**
```json
{
  "id": "po-002",
  "orderNumber": "PO-2024-002",
  "status": "approved",
  "approvedBy": "user-002",
  "approvedByName": "Sarah Wilson",
  "approvedDate": "2024-10-15T16:30:00Z",
  "statusHistory": [
    {
      "status": "draft",
      "changedBy": "user-003",
      "changedAt": "2024-10-15T10:30:00Z",
      "notes": "Order created"
    },
    {
      "status": "approved",
      "changedBy": "user-002",
      "changedAt": "2024-10-15T16:30:00Z",
      "notes": "Approved for urgent maintenance requirement"
    }
  ],
  "updatedAt": "2024-10-15T16:30:00Z"
}
```

## Order Status Values

Part orders progress through these status values:

- **draft**: Order being created/edited
- **pending_approval**: Awaiting approval
- **approved**: Approved and ready to send
- **sent**: Sent to supplier
- **acknowledged**: Acknowledged by supplier
- **in_progress**: Being prepared by supplier
- **shipped**: Shipped by supplier
- **partially_received**: Some items received
- **received**: All items received
- **completed**: Order completed and closed
- **cancelled**: Order cancelled
- **rejected**: Order rejected (approval or supplier)

## Priority Levels

Order priority levels:

- **low**: Non-urgent orders
- **normal**: Standard priority
- **high**: Important orders
- **urgent**: Emergency orders
- **critical**: Critical/safety orders

## Payment Terms

Common payment terms:

- **Net 15**: Payment due in 15 days
- **Net 30**: Payment due in 30 days
- **Net 60**: Payment due in 60 days
- **COD**: Cash on delivery
- **Prepaid**: Payment in advance
- **2/10 Net 30**: 2% discount if paid in 10 days, otherwise Net 30

## Shipping Methods

Available shipping methods:

- **Standard Ground**: 5-7 business days
- **Express**: 2-3 business days
- **Overnight**: Next business day
- **Same Day**: Same day delivery
- **Freight**: Large/heavy items
- **Pickup**: Customer pickup

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid order data",
  "details": {
    "requestedDeliveryDate": "Delivery date cannot be in the past",
    "items": "At least one item is required"
  }
}
```

### 404 Not Found
```json
{
  "error": "Part order not found",
  "orderId": "po-001"
}
```

### 409 Conflict
```json
{
  "error": "Cannot update order",
  "reason": "Order has already been sent to supplier"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions",
  "reason": "User cannot approve orders above $1000"
}
```
