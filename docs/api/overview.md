---
sidebar_position: 1
---

# API Overview

The Factory AI API provides comprehensive REST interfaces for both the **Prevent** (maintenance management) and **Predict** (predictive maintenance) products.

## Base URL

All API requests are made to your tenant's API endpoint:
```
https://api.<your-subdomain>.f7i.ai/prod
```

For example:
- `https://api.acme.f7i.ai/prod` - Dedicated tenant
- `https://api.app.f7i.ai/prod` - Standard tenant

## Authentication

All API endpoints require authentication using an API key. You can generate API keys from **Settings > API Keys** in the application. Include your API key in the request headers:

```http
Authorization: Bearer YOUR_API_KEY
```

:::tip
When creating an API key, you can configure:
- **Permissions**: Read-only or Read/Write access
- **Expiry Date**: Optional expiration for temporary access (leave empty for production keys)

Your API key is only displayed once after creation - make sure to copy and store it securely.
:::

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

## Prevent Resources

The Prevent API provides endpoints for managing maintenance operations:

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

## Predict Resources

The Predict API provides endpoints for predictive analytics and sensor monitoring:

- **[Sensor Reports (Insights)](./sensor-reports.md)**: AI-generated anomaly analysis reports
- **[Monitored Assets](./asset-models.md)**: Registry of assets being monitored by sensors
- **[Sensor Data](./asset-charts.md)**: Time-series sensor readings (vibration, temperature, acceleration)
- **[Notifications](./notifications.md)**: Predictive alerts and notifications
- **[FFT Data](./fft-data.md)**: Frequency analysis data from sensors
- **[Feedback](./feedback.md)**: User feedback on predictions
- **[Metrics](./metrics.md)**: System and asset metrics
- **[External Events](./external-events.md)**: External event tracking
- **[Gateways](./gateways.md)**: IoT gateway management
- **[Asset Resources Chat](./asset-resources-chat.md)**: Asset-related chat resources

## Getting Started

1. **Generate API Key**: Navigate to **Settings > API Keys** in the application to create your API key
2. **Choose Your Resource**: Review the available endpoints for your use case
3. **Make Your First Request**: Start with a simple GET request to list resources
4. **Handle Responses**: Parse JSON responses and handle errors appropriately

## Examples

### Basic Request
```bash
curl -X GET "https://api.acme.f7i.ai/prod/assets" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Creating a Resource
```bash
curl -X POST "https://api.acme.f7i.ai/prod/assets" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pump A1",
    "type": "Centrifugal Pump",
    "location": "Building 1"
  }'
```
