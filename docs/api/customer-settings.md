---
sidebar_position: 11
---

# Customer Settings API

The Customer Settings API provides endpoints for managing customer-specific configuration settings and preferences.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/customer-settings` | Get customer settings |
| POST | `/customer-settings` | Create customer settings |
| PUT | `/customer-settings` | Update customer settings |
| DELETE | `/customer-settings` | Delete customer settings |

## Get Customer Settings

Retrieves the customer settings and configuration.

**Endpoint:** `GET /customer-settings`

**Authentication:** Required

**Query Parameters:**
- `category` (optional): Filter settings by category (general, notifications, maintenance, security)
- `includeDefaults` (optional): Include default values for unset settings (true/false)

**Response:**
```json
{
  "customerId": "customer-001",
  "customerName": "Acme Manufacturing Inc.",
  "settings": {
    "general": {
      "timezone": "America/New_York",
      "dateFormat": "MM/DD/YYYY",
      "timeFormat": "12h",
      "currency": "USD",
      "language": "en-US",
      "companyLogo": "https://s3.amazonaws.com/bucket/logo.png",
      "theme": "light"
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": false,
      "pushEnabled": true,
      "workOrderNotifications": {
        "created": true,
        "assigned": true,
        "completed": true,
        "overdue": true
      },
      "inventoryNotifications": {
        "lowStock": true,
        "outOfStock": true,
        "reorderPoint": true
      },
      "maintenanceNotifications": {
        "scheduled": true,
        "overdue": true,
        "completed": false
      },
      "systemNotifications": {
        "downtime": true,
        "updates": false,
        "security": true
      }
    },
    "maintenance": {
      "autoSchedulePM": true,
      "leadTimeBuffer": 7,
      "workOrderAutoAssignment": false,
      "requireApprovalThreshold": 1000.00,
      "defaultPriority": "medium",
      "allowTechnicianNotes": true,
      "requireCompletionPhotos": false,
      "autoCloseCompletedWO": true,
      "pmSchedulingWindow": 3
    },
    "inventory": {
      "autoReorder": false,
      "reorderApprovalRequired": true,
      "allowNegativeStock": false,
      "trackSerialNumbers": true,
      "requireReceiptVerification": true,
      "defaultLeadTime": 14,
      "costingMethod": "FIFO"
    },
    "security": {
      "sessionTimeout": 480,
      "requireMFA": false,
      "passwordPolicy": {
        "minLength": 12,
        "requireUppercase": true,
        "requireLowercase": true,
        "requireNumbers": true,
        "requireSpecialChars": true,
        "maxAge": 90
      },
      "ipWhitelist": ["192.168.1.0/24", "10.0.0.0/8"],
      "auditLogging": true
    },
    "integrations": {
      "erpSystem": {
        "enabled": true,
        "type": "SAP",
        "endpoint": "https://erp.acme.com/api",
        "syncFrequency": "hourly"
      },
      "cmmsSystem": {
        "enabled": false,
        "type": null,
        "endpoint": null
      },
      "iotPlatform": {
        "enabled": true,
        "type": "AWS_IoT",
        "endpoint": "https://iot.amazonaws.com"
      }
    }
  },
  "lastUpdated": "2024-10-01T14:30:00Z",
  "updatedBy": "user-001"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/customer-settings?category=notifications" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Create Customer Settings

Creates initial customer settings configuration.

**Endpoint:** `POST /customer-settings`

**Authentication:** Required

**Request Body:**
```json
{
  "customerId": "customer-002",
  "customerName": "TechCorp Industries",
  "settings": {
    "general": {
      "timezone": "America/Los_Angeles",
      "dateFormat": "DD/MM/YYYY",
      "timeFormat": "24h",
      "currency": "USD",
      "language": "en-US"
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": true,
      "pushEnabled": true,
      "workOrderNotifications": {
        "created": true,
        "assigned": true,
        "completed": true,
        "overdue": true
      }
    },
    "maintenance": {
      "autoSchedulePM": true,
      "leadTimeBuffer": 5,
      "requireApprovalThreshold": 500.00,
      "defaultPriority": "high"
    }
  }
}
```

**Response:**
```json
{
  "customerId": "customer-002",
  "customerName": "TechCorp Industries",
  "settings": {
    "general": {
      "timezone": "America/Los_Angeles",
      "dateFormat": "DD/MM/YYYY",
      "timeFormat": "24h",
      "currency": "USD",
      "language": "en-US",
      "theme": "light"
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": true,
      "pushEnabled": true,
      "workOrderNotifications": {
        "created": true,
        "assigned": true,
        "completed": true,
        "overdue": true
      },
      "inventoryNotifications": {
        "lowStock": true,
        "outOfStock": true,
        "reorderPoint": true
      }
    },
    "maintenance": {
      "autoSchedulePM": true,
      "leadTimeBuffer": 5,
      "workOrderAutoAssignment": false,
      "requireApprovalThreshold": 500.00,
      "defaultPriority": "high",
      "allowTechnicianNotes": true,
      "requireCompletionPhotos": false,
      "autoCloseCompletedWO": true,
      "pmSchedulingWindow": 3
    }
  },
  "createdAt": "2024-10-15T10:30:00Z",
  "lastUpdated": "2024-10-15T10:30:00Z",
  "updatedBy": "user-003"
}
```

## Update Customer Settings

Updates existing customer settings.

**Endpoint:** `PUT /customer-settings`

**Authentication:** Required

**Request Body:**
```json
{
  "settings": {
    "general": {
      "timezone": "America/Chicago",
      "theme": "dark"
    },
    "notifications": {
      "smsEnabled": false,
      "maintenanceNotifications": {
        "scheduled": false,
        "overdue": true,
        "completed": true
      }
    },
    "maintenance": {
      "requireApprovalThreshold": 2000.00,
      "requireCompletionPhotos": true,
      "pmSchedulingWindow": 5
    },
    "security": {
      "sessionTimeout": 240,
      "requireMFA": true
    }
  }
}
```

**Response:**
```json
{
  "customerId": "customer-001",
  "customerName": "Acme Manufacturing Inc.",
  "settings": {
    "general": {
      "timezone": "America/Chicago",
      "dateFormat": "MM/DD/YYYY",
      "timeFormat": "12h",
      "currency": "USD",
      "language": "en-US",
      "companyLogo": "https://s3.amazonaws.com/bucket/logo.png",
      "theme": "dark"
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": false,
      "pushEnabled": true,
      "workOrderNotifications": {
        "created": true,
        "assigned": true,
        "completed": true,
        "overdue": true
      },
      "maintenanceNotifications": {
        "scheduled": false,
        "overdue": true,
        "completed": true
      }
    },
    "maintenance": {
      "autoSchedulePM": true,
      "leadTimeBuffer": 7,
      "workOrderAutoAssignment": false,
      "requireApprovalThreshold": 2000.00,
      "defaultPriority": "medium",
      "allowTechnicianNotes": true,
      "requireCompletionPhotos": true,
      "autoCloseCompletedWO": true,
      "pmSchedulingWindow": 5
    },
    "security": {
      "sessionTimeout": 240,
      "requireMFA": true,
      "passwordPolicy": {
        "minLength": 12,
        "requireUppercase": true,
        "requireLowercase": true,
        "requireNumbers": true,
        "requireSpecialChars": true,
        "maxAge": 90
      },
      "auditLogging": true
    }
  },
  "lastUpdated": "2024-10-15T16:20:00Z",
  "updatedBy": "user-001"
}
```

## Delete Customer Settings

Resets customer settings to defaults.

**Endpoint:** `DELETE /customer-settings`

**Authentication:** Required

**Query Parameters:**
- `category` (optional): Reset only specific category (general, notifications, maintenance, security)
- `confirm` (required): Must be "true" to confirm deletion

**Response:**
```json
{
  "message": "Customer settings reset to defaults",
  "resetCategories": ["general", "notifications", "maintenance", "security"],
  "resetAt": "2024-10-15T16:30:00Z",
  "resetBy": "user-001"
}
```

## Setting Categories

### General Settings
- **timezone**: Customer timezone (IANA timezone)
- **dateFormat**: Date display format
- **timeFormat**: 12h or 24h time format
- **currency**: Currency code (ISO 4217)
- **language**: Language/locale code
- **companyLogo**: URL to company logo
- **theme**: UI theme (light/dark)

### Notification Settings
- **emailEnabled**: Enable email notifications
- **smsEnabled**: Enable SMS notifications
- **pushEnabled**: Enable push notifications
- **workOrderNotifications**: Work order event notifications
- **inventoryNotifications**: Inventory-related notifications
- **maintenanceNotifications**: Maintenance-related notifications
- **systemNotifications**: System-level notifications

### Maintenance Settings
- **autoSchedulePM**: Automatically schedule PM procedures
- **leadTimeBuffer**: Days before PM due date to schedule
- **workOrderAutoAssignment**: Auto-assign work orders to technicians
- **requireApprovalThreshold**: Dollar amount requiring approval
- **defaultPriority**: Default work order priority
- **allowTechnicianNotes**: Allow technicians to add notes
- **requireCompletionPhotos**: Require photos for completion
- **autoCloseCompletedWO**: Auto-close completed work orders
- **pmSchedulingWindow**: Days window for PM scheduling

### Inventory Settings
- **autoReorder**: Automatically create reorders
- **reorderApprovalRequired**: Require approval for reorders
- **allowNegativeStock**: Allow negative stock levels
- **trackSerialNumbers**: Track part serial numbers
- **requireReceiptVerification**: Require receipt verification
- **defaultLeadTime**: Default supplier lead time
- **costingMethod**: Inventory costing method (FIFO/LIFO/Average)

### Security Settings
- **sessionTimeout**: Session timeout in minutes
- **requireMFA**: Require multi-factor authentication
- **passwordPolicy**: Password complexity requirements
- **ipWhitelist**: Allowed IP addresses/ranges
- **auditLogging**: Enable audit logging

### Integration Settings
- **erpSystem**: ERP system integration configuration
- **cmmsSystem**: CMMS system integration
- **iotPlatform**: IoT platform integration

## Default Values

When settings are not explicitly configured, the system uses these defaults:

```json
{
  "general": {
    "timezone": "UTC",
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "12h",
    "currency": "USD",
    "language": "en-US",
    "theme": "light"
  },
  "notifications": {
    "emailEnabled": true,
    "smsEnabled": false,
    "pushEnabled": true
  },
  "maintenance": {
    "autoSchedulePM": false,
    "leadTimeBuffer": 7,
    "requireApprovalThreshold": 1000.00,
    "defaultPriority": "medium"
  },
  "security": {
    "sessionTimeout": 480,
    "requireMFA": false
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid settings data",
  "details": {
    "timezone": "Invalid timezone format",
    "currency": "Unsupported currency code"
  }
}
```

### 404 Not Found
```json
{
  "error": "Customer settings not found",
  "customerId": "customer-001"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions",
  "reason": "User cannot modify security settings"
}
```
