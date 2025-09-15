---
sidebar_position: 3
---

# Components API

The Components API provides endpoints for managing asset components, templates, and hierarchical structures within your maintenance system.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/components` | List all components |
| POST | `/components` | Create a new component |
| GET | `/components/{componentId}` | Get a specific component |
| PUT | `/components/{componentId}` | Update a component |
| DELETE | `/components/{componentId}` | Delete a component |
| POST | `/components/bulk` | Bulk operations on components |
| GET | `/components/tree/{rootId}` | Get component tree |
| GET | `/components/{componentId}/children` | Get direct children |
| POST | `/components/{componentId}/children` | Add child component |
| GET | `/components/{componentId}/descendants` | Get all descendants |
| GET | `/components/{componentId}/ancestors` | Get all ancestors |
| PUT | `/components/{componentId}/move` | Move component in hierarchy |

## Template Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/components/templates` | List component templates |
| POST | `/components/templates` | Create a template |
| GET | `/components/templates/{templateId}` | Get specific template |
| PUT | `/components/templates/{templateId}` | Update template |
| DELETE | `/components/templates/{templateId}` | Delete template |
| GET | `/components/templates/{templateId}/versions` | Get template versions |
| POST | `/components/templates/{templateId}/usage` | Track template usage |
| POST | `/components/templates/{templateId}/apply-hierarchical` | Apply template hierarchically |

## List Components

Retrieves a list of all components.

**Endpoint:** `GET /components`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Maximum number of components to return
- `offset` (optional): Number of components to skip for pagination
- `search` (optional): Search term to filter components
- `type` (optional): Filter by component type
- `assetId` (optional): Filter by parent asset
- `parentId` (optional): Filter by parent component

**Response:**
```json
[
  {
    "componentId": "comp-123",
    "tenantId": "tenant-123",
    "name": "Motor Bearing",
    "description": "Main motor bearing assembly",
    "assetId": "asset-456",
    "parentComponentId": "comp-789",
    "serialNumber": "BRG-001",
    "manufacturer": "SKF",
    "model": "6204",
    "installDate": "2024-01-15T00:00:00Z",
    "status": "operational",
    "criticality": "High",
    "maintenanceRequirements": "Monthly lubrication",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-10-01T14:45:00Z",
    "asset": {
      "assetId": "asset-456",
      "name": "Electric Motor B2",
      "site": "main-facility",
      "area": "production-floor"
    }
  }
]
```

## Create Component

Creates a new component.

**Endpoint:** `POST /components`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Motor Bearing",
  "type": "Bearing",
  "assetId": "asset-456",
  "parentId": "comp-789",
  "serialNumber": "BRG-001",
  "manufacturer": "SKF",
  "model": "6204",
  "installDate": "2024-01-15T00:00:00Z",
  "specifications": {
    "bore": "20mm",
    "outerDiameter": "47mm",
    "width": "14mm"
  },
  "maintenanceInterval": "quarterly",
  "criticality": "high"
}
```

**Response:**
```json
{
  "id": "comp-123",
  "name": "Motor Bearing",
  "type": "Bearing",
  "assetId": "asset-456",
  "parentId": "comp-789",
  "level": 2,
  "serialNumber": "BRG-001",
  "manufacturer": "SKF",
  "model": "6204",
  "installDate": "2024-01-15T00:00:00Z",
  "status": "operational",
  "specifications": {
    "bore": "20mm",
    "outerDiameter": "47mm",
    "width": "14mm"
  },
  "maintenanceInterval": "quarterly",
  "criticality": "high",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Get Component

Retrieves details of a specific component.

**Endpoint:** `GET /components/{componentId}`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Unique identifier of the component

**Response:**
```json
{
  "id": "comp-123",
  "name": "Motor Bearing",
  "type": "Bearing",
  "assetId": "asset-456",
  "parentId": "comp-789",
  "level": 2,
  "serialNumber": "BRG-001",
  "manufacturer": "SKF",
  "model": "6204",
  "installDate": "2024-01-15T00:00:00Z",
  "status": "operational",
  "specifications": {
    "bore": "20mm",
    "outerDiameter": "47mm",
    "width": "14mm"
  },
  "maintenanceInterval": "quarterly",
  "criticality": "high",
  "children": ["comp-124", "comp-125"],
  "workOrders": ["wo-003", "wo-004"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-10-01T14:45:00Z"
}
```

## Update Component

Updates an existing component.

**Endpoint:** `PUT /components/{componentId}`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Unique identifier of the component

**Request Body:**
```json
{
  "status": "maintenance",
  "lastMaintenanceDate": "2024-10-15T00:00:00Z",
  "nextMaintenanceDate": "2024-12-15T00:00:00Z",
  "notes": "Bearing replaced during scheduled maintenance"
}
```

## Delete Component

Deletes a component from the system.

**Endpoint:** `DELETE /components/{componentId}`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Unique identifier of the component

**Response:**
```json
{
  "message": "Component deleted successfully",
  "deletedAt": "2024-10-15T16:30:00Z"
}
```

## Bulk Operations

Performs bulk operations on multiple components.

**Endpoint:** `POST /components/bulk`

**Authentication:** Required

**Request Body:**
```json
{
  "operation": "update",
  "componentIds": ["comp-123", "comp-124", "comp-125"],
  "data": {
    "status": "maintenance",
    "maintenanceDate": "2024-10-15T00:00:00Z"
  }
}
```

**Response:**
```json
{
  "processed": 3,
  "failed": 0,
  "results": [
    {
      "id": "comp-123",
      "status": "success"
    },
    {
      "id": "comp-124",
      "status": "success"
    },
    {
      "id": "comp-125",
      "status": "success"
    }
  ]
}
```

## Component Tree

Gets a hierarchical tree view of components starting from a root component.

**Endpoint:** `GET /components/tree/{rootId}`

**Authentication:** Required

**Path Parameters:**
- `rootId`: ID of the root component for the tree

**Response:**
```json
{
  "id": "comp-root",
  "name": "Main Motor",
  "type": "Motor",
  "level": 0,
  "children": [
    {
      "id": "comp-123",
      "name": "Motor Bearing",
      "type": "Bearing",
      "level": 1,
      "children": [
        {
          "id": "comp-124",
          "name": "Bearing Seal",
          "type": "Seal",
          "level": 2,
          "children": []
        }
      ]
    }
  ]
}
```

## Get Component Children

Gets the direct children of a component.

**Endpoint:** `GET /components/{componentId}/children`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Parent component ID

**Response:**
```json
{
  "children": [
    {
      "id": "comp-124",
      "name": "Bearing Seal",
      "type": "Seal",
      "parentId": "comp-123",
      "level": 2,
      "status": "operational"
    }
  ]
}
```

## Add Child Component

Adds a child component to a parent component.

**Endpoint:** `POST /components/{componentId}/children`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Parent component ID

**Request Body:**
```json
{
  "name": "New Seal",
  "type": "Seal",
  "serialNumber": "SEAL-002",
  "manufacturer": "Parker",
  "model": "PS-100"
}
```

## Get Component Descendants

Gets all descendant components (children, grandchildren, etc.).

**Endpoint:** `GET /components/{componentId}/descendants`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Component ID

**Response:**
```json
{
  "descendants": [
    {
      "id": "comp-124",
      "name": "Bearing Seal",
      "type": "Seal",
      "level": 2,
      "path": ["comp-123", "comp-124"]
    },
    {
      "id": "comp-125",
      "name": "Seal Ring",
      "type": "Ring",
      "level": 3,
      "path": ["comp-123", "comp-124", "comp-125"]
    }
  ]
}
```

## Get Component Ancestors

Gets all ancestor components (parent, grandparent, etc.).

**Endpoint:** `GET /components/{componentId}/ancestors`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Component ID

**Response:**
```json
{
  "ancestors": [
    {
      "id": "comp-root",
      "name": "Main Motor",
      "type": "Motor",
      "level": 0
    },
    {
      "id": "comp-123",
      "name": "Motor Bearing",
      "type": "Bearing",
      "level": 1
    }
  ]
}
```

## Move Component

Moves a component to a different parent in the hierarchy.

**Endpoint:** `PUT /components/{componentId}/move`

**Authentication:** Required

**Path Parameters:**
- `componentId`: Component ID to move

**Request Body:**
```json
{
  "newParentId": "comp-999",
  "position": 1
}
```

## Component Templates

### List Templates

**Endpoint:** `GET /components/templates`

**Response:**
```json
{
  "templates": [
    {
      "id": "template-123",
      "name": "Standard Motor Template",
      "type": "Motor",
      "version": "1.2",
      "components": [
        {
          "name": "Bearing A",
          "type": "Bearing",
          "specifications": {
            "bore": "20mm"
          }
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Template

**Endpoint:** `POST /components/templates`

**Request Body:**
```json
{
  "name": "Standard Motor Template",
  "type": "Motor",
  "description": "Template for standard industrial motors",
  "components": [
    {
      "name": "Bearing A",
      "type": "Bearing",
      "specifications": {
        "bore": "20mm",
        "outerDiameter": "47mm"
      },
      "maintenanceInterval": "quarterly"
    },
    {
      "name": "Bearing B",
      "type": "Bearing",
      "specifications": {
        "bore": "25mm",
        "outerDiameter": "52mm"
      },
      "maintenanceInterval": "quarterly"
    }
  ]
}
```

### Apply Template Hierarchically

Applies a template to create a hierarchical component structure.

**Endpoint:** `POST /components/templates/{templateId}/apply-hierarchical`

**Path Parameters:**
- `templateId`: Template ID to apply

**Request Body:**
```json
{
  "assetId": "asset-456",
  "parentId": "comp-root",
  "customizations": {
    "serialNumberPrefix": "MTR-2024-"
  }
}
```

## Component Status Values

Components can have the following status values:

- `operational`: Component is functioning normally
- `maintenance`: Component is undergoing maintenance
- `faulty`: Component has issues but is still operational
- `failed`: Component has failed and needs replacement
- `replaced`: Component has been replaced
- `decommissioned`: Component is no longer in use

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid component data",
  "details": {
    "name": "Component name is required",
    "type": "Component type must be specified"
  }
}
```

### 404 Not Found
```json
{
  "error": "Component not found",
  "componentId": "comp-123"
}
```

### 409 Conflict
```json
{
  "error": "Circular reference detected",
  "details": "Cannot set component as its own parent"
}
```
