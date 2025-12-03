---
sidebar_position: 23
---

# Asset Resources Chat API

The Asset Resources Chat API provides endpoints for retrieving chat resources associated with assets. This includes documentation, knowledge base entries, and contextual information used by AI-powered chat assistants to provide asset-specific support.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/asset-resources-chat` | List asset chat resources |
| GET | `/asset-resources-chat/{id}` | Get a specific chat resource |

## List Asset Resources Chat

Retrieves chat resources with optional filtering.

**Endpoint:** `GET /asset-resources-chat`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `assetName` | string | Filter by asset name |
| `areaName` | string | Filter by area name |
| `limit` | integer | Maximum number of results (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "resource-123",
      "assetName": "Pump A1",
      "areaName": "Production Floor",
      "resourceType": "manual",
      "title": "Pump A1 Operations Manual",
      "description": "Complete operations and maintenance manual for Pump A1",
      "content": "This manual covers the operation, maintenance, and troubleshooting procedures for the CP-500 centrifugal pump...",
      "tags": ["operations", "maintenance", "troubleshooting"],
      "metadata": {
        "manufacturer": "ACME Pumps",
        "model": "CP-500",
        "documentVersion": "3.2",
        "lastReviewed": "2024-06-01"
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-06-01T14:00:00Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6InJlc291cmNlLTEyMyJ9"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-resources-chat?assetName=Pump%20A1" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Get Asset Resource Chat

Retrieves a specific chat resource by ID.

**Endpoint:** `GET /asset-resources-chat/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the chat resource |

**Response:**
```json
{
  "id": "resource-123",
  "assetName": "Pump A1",
  "areaName": "Production Floor",
  "resourceType": "manual",
  "title": "Pump A1 Operations Manual",
  "description": "Complete operations and maintenance manual for Pump A1",
  "content": "This manual covers the operation, maintenance, and troubleshooting procedures for the CP-500 centrifugal pump...",
  "tags": ["operations", "maintenance", "troubleshooting"],
  "metadata": {
    "manufacturer": "ACME Pumps",
    "model": "CP-500",
    "documentVersion": "3.2",
    "lastReviewed": "2024-06-01"
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-06-01T14:00:00Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/asset-resources-chat/resource-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Resource Types

| Type | Description |
|------|-------------|
| `manual` | Equipment manuals and documentation |
| `troubleshooting` | Troubleshooting guides and procedures |
| `maintenance` | Maintenance procedures and checklists |
| `specification` | Technical specifications |
| `safety` | Safety procedures and guidelines |
| `training` | Training materials |
| `faq` | Frequently asked questions |
| `best_practice` | Best practices and recommendations |

## Content Format

The `content` field supports Markdown formatting for rich text:

- **Headers**: Use `#`, `##`, `###` for headings
- **Lists**: Use `-` or `1.` for bullet and numbered lists
- **Code**: Use backticks for inline code or triple backticks for code blocks
- **Links**: Use `[text](url)` format
- **Bold/Italic**: Use `**bold**` and `*italic*`

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": {
    "assetName": "Invalid asset name format"
  }
}
```

### 404 Not Found
```json
{
  "error": "Item not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error: [error details]"
}
```
