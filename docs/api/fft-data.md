---
sidebar_position: 18
---

# FFT Data API

The FFT Data API provides endpoints for retrieving Fast Fourier Transform (FFT) frequency analysis data from vibration sensors. FFT data is essential for identifying specific frequency components that indicate mechanical issues such as imbalance, misalignment, or bearing defects.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fft-data` | List FFT data records |
| GET | `/fft-data/{id}` | Get specific FFT data |

## List FFT Data

Retrieves FFT data records with optional filtering.

**Endpoint:** `GET /fft-data`

**Authentication:** Required

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sensorId` | string | Filter by sensor identifier |
| `timestamp` | string | Filter by timestamp (ISO 8601) |
| `limit` | integer | Maximum number of results (default: 100) |

**Response:**
```json
{
  "items": [
    {
      "id": "fft-123",
      "sensorId": "sensor-456",
      "timestamp": "2024-10-15T14:30:00Z",
      "samplingRate": 25600,
      "resolution": 1.0,
      "frequencyRange": {
        "min": 0,
        "max": 12800
      },
      "spectrum": {
        "frequencies": [0, 1, 2, 3, 4, 5],
        "amplitudes": [0.01, 0.15, 0.08, 0.45, 0.12, 0.03]
      },
      "peaks": [
        {
          "frequency": 29.5,
          "amplitude": 2.34,
          "order": 1,
          "label": "1X RPM"
        },
        {
          "frequency": 59.0,
          "amplitude": 0.89,
          "order": 2,
          "label": "2X RPM"
        }
      ],
      "rpm": 1770,
      "createdAt": "2024-10-15T14:30:05Z",
      "updatedAt": "2024-10-15T14:30:05Z"
    }
  ],
  "count": 1,
  "nextToken": "eyJpZCI6ImZmdC0xMjMifQ=="
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/fft-data?sensorId=sensor-456&limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Get FFT Data

Retrieves a specific FFT data record by ID.

**Endpoint:** `GET /fft-data/{id}`

**Authentication:** Required

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the FFT data record |

**Response:**
```json
{
  "id": "fft-123",
  "sensorId": "sensor-456",
  "timestamp": "2024-10-15T14:30:00Z",
  "samplingRate": 25600,
  "resolution": 1.0,
  "frequencyRange": {
    "min": 0,
    "max": 12800
  },
  "spectrum": {
    "frequencies": [0, 1, 2, 3, 4, 5],
    "amplitudes": [0.01, 0.15, 0.08, 0.45, 0.12, 0.03]
  },
  "peaks": [
    {
      "frequency": 29.5,
      "amplitude": 2.34,
      "order": 1,
      "label": "1X RPM"
    },
    {
      "frequency": 59.0,
      "amplitude": 0.89,
      "order": 2,
      "label": "2X RPM"
    }
  ],
  "rpm": 1770,
  "createdAt": "2024-10-15T14:30:05Z",
  "updatedAt": "2024-10-15T14:30:05Z"
}
```

**Example Request:**
```bash
curl -X GET "https://api.acme.f7i.ai/prod/fft-data/fft-123" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

## Understanding FFT Data

### Spectrum Data

The `spectrum` object contains:
- `frequencies`: Array of frequency values in Hz
- `amplitudes`: Corresponding amplitude values (typically in mm/s or g)

### Peak Detection

The `peaks` array identifies significant frequency components:
- `frequency`: Peak frequency in Hz
- `amplitude`: Peak amplitude
- `order`: Harmonic order relative to running speed (1X, 2X, etc.)
- `label`: Human-readable description

### Common Frequency Signatures

| Order | Common Causes |
|-------|---------------|
| 1X | Imbalance, bent shaft |
| 2X | Misalignment, looseness |
| 3X-5X | Coupling issues |
| BPFO/BPFI | Bearing defects |
| Gear mesh | Gear tooth issues |

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "details": {
    "sensorId": "Sensor ID is required"
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
