---
sidebar_position: 1
---

# API Overview

The Prevent API provides a comprehensive REST interface for managing assets, maintenance procedures, work orders, inventory, and more.

## Base URL

All API requests are made to:
```
https://your-api-domain.com/prod
```

## Authentication

All API endpoints require authentication using a custom token authorizer. Include your authentication token in the request headers:

```http
Authorization: Bearer YOUR_TOKEN
```

## Request/Response Format

- **Content Type**: All requests should use `application/json`
- **Response Format**: All responses are in JSON format
- **HTTP Methods**: Standard REST methods (GET, POST, PUT, DELETE)

## CORS Support

The API supports Cross-Origin Resource Sharing (CORS) with the following configuration:
- **Allowed Origins**: All origins (`*`)
- **Allowed Methods**: All HTTP methods
- **Allowed Headers**: 
  - `Content-Type`
  - `X-Amz-Date`
  - `Authorization`
  - `X-Api-Key`
  - `X-Amz-Security-Token`
  - `X-Amz-User-Agent`
  - `Access-Control-Allow-Origin`
  - `Access-Control-Allow-Headers`
  - `Access-Control-Allow-Methods`

## Error Handling

The API uses standard HTTP status codes:

- **200**: Success
- **400**: Bad Request - Invalid request format or parameters
- **401**: Unauthorized - Authentication required or invalid
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource doesn't exist
- **500**: Internal Server Error

Error responses include a JSON object with error details:

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Rate Limiting

API requests are subject to rate limiting. If you exceed the rate limit, you'll receive a `429 Too Many Requests` response.

## Monitoring and Logging

The API includes:
- **CloudWatch Logging**: Error-level logging for all requests
- **Data Tracing**: Enabled for debugging and monitoring
- **Metrics**: Request metrics are collected and available in CloudWatch
- **X-Ray Tracing**: Distributed tracing for request analysis

## Available Resources

The API provides endpoints for managing the following resources:

- **[Assets](./assets.md)**: Physical assets and equipment
- **[Components](./components.md)**: Asset components and hierarchical structures
- **[Failure Codes](./failure-codes.md)**: Equipment failure classification
- **[Maintenance Strategies](./maintenance-strategies.md)**: Maintenance approaches and procedures
- **[PM Procedures](./pm-procedures.md)**: Preventive maintenance procedures
- **[Work Orders](./work-orders.md)**: Maintenance work orders and tasks
- **[Parts](./parts.md)**: Spare parts and components
- **[Inventory](./inventory.md)**: Parts inventory management
- **[Part Orders](./part-orders.md)**: Parts ordering and procurement
- **[Documents](./documents.md)**: Document management and storage
- **[Customer Settings](./customer-settings.md)**: Customer configuration settings
- **[Schedules](./schedules.md)**: Maintenance scheduling

## Getting Started

1. **Obtain Authentication Token**: Contact your system administrator for API access credentials
2. **Choose Your Resource**: Review the available endpoints for your use case
3. **Make Your First Request**: Start with a simple GET request to list resources
4. **Handle Responses**: Parse JSON responses and handle errors appropriately

## Examples

### Basic Request
```bash
curl -X GET "https://your-api-domain.com/prod/assets" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### Creating a Resource
```bash
curl -X POST "https://your-api-domain.com/prod/assets" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pump A1",
    "type": "Centrifugal Pump",
    "location": "Building 1"
  }'
```
