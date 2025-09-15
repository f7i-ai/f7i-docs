---
sidebar_position: 12
---

# Documents API

The Documents API provides endpoints for managing document uploads, storage, and retrieval within the maintenance system.

## Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/documents` | Upload a new document |
| GET | `/documents/{documentId}` | Get document metadata |
| DELETE | `/documents/{documentId}` | Delete a document |
| GET | `/documents/{documentId}/download-url` | Get presigned download URL |

## Upload Document

Uploads a new document to the system.

**Endpoint:** `POST /documents`

**Authentication:** Required

**Content-Type:** `multipart/form-data` or `application/octet-stream`

**Request Parameters:**
- `file`: The document file to upload
- `title` (optional): Document title
- `description` (optional): Document description
- `category` (optional): Document category
- `tags` (optional): Comma-separated tags
- `assetId` (optional): Associated asset ID
- `workOrderId` (optional): Associated work order ID
- `isPublic` (optional): Make document publicly accessible (true/false)

**Supported File Types:**
- **Documents**: PDF, DOC, DOCX, TXT, RTF
- **Images**: JPG, JPEG, PNG, GIF, BMP, TIFF
- **Spreadsheets**: XLS, XLSX, CSV
- **Presentations**: PPT, PPTX
- **CAD Files**: DWG, DXF
- **Videos**: MP4, AVI, MOV, WMV
- **Archives**: ZIP, RAR, 7Z

**File Size Limits:**
- Maximum file size: 100MB
- Maximum total storage per customer: 10GB

**Example Request (Multipart):**
```bash
curl -X POST "https://your-api-domain.com/prod/documents" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@manual.pdf" \
  -F "title=Pump Maintenance Manual" \
  -F "description=Complete maintenance procedures for centrifugal pumps" \
  -F "category=Manuals" \
  -F "tags=pump,maintenance,manual" \
  -F "assetId=asset-123"
```

**Response:**
```json
{
  "id": "doc-001",
  "title": "Pump Maintenance Manual",
  "filename": "manual.pdf",
  "originalFilename": "pump_manual_v2.pdf",
  "description": "Complete maintenance procedures for centrifugal pumps",
  "category": "Manuals",
  "tags": ["pump", "maintenance", "manual"],
  "fileType": "application/pdf",
  "fileSize": 2457600,
  "fileSizeFormatted": "2.4 MB",
  "assetId": "asset-123",
  "assetName": "Pump A1",
  "workOrderId": null,
  "isPublic": false,
  "uploadedBy": "user-001",
  "uploadedByName": "John Smith",
  "uploadedAt": "2024-10-15T10:30:00Z",
  "lastAccessedAt": null,
  "downloadCount": 0,
  "checksum": "a1b2c3d4e5f6",
  "virusScanStatus": "clean",
  "url": "https://s3.amazonaws.com/bucket/documents/doc-001.pdf",
  "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumbnails/doc-001.jpg",
  "expiresAt": null,
  "metadata": {
    "pages": 45,
    "author": "Pump Corp",
    "createdDate": "2024-01-15T00:00:00Z"
  }
}
```

## Get Document Metadata

Retrieves metadata for a specific document.

**Endpoint:** `GET /documents/{documentId}`

**Authentication:** Required

**Path Parameters:**
- `documentId`: Unique identifier of the document

**Response:**
```json
{
  "id": "doc-001",
  "title": "Pump Maintenance Manual",
  "filename": "manual.pdf",
  "originalFilename": "pump_manual_v2.pdf",
  "description": "Complete maintenance procedures for centrifugal pumps",
  "category": "Manuals",
  "tags": ["pump", "maintenance", "manual"],
  "fileType": "application/pdf",
  "fileSize": 2457600,
  "fileSizeFormatted": "2.4 MB",
  "assetId": "asset-123",
  "assetName": "Pump A1",
  "workOrderId": null,
  "isPublic": false,
  "uploadedBy": "user-001",
  "uploadedByName": "John Smith",
  "uploadedAt": "2024-10-15T10:30:00Z",
  "lastAccessedAt": "2024-10-16T14:20:00Z",
  "downloadCount": 5,
  "checksum": "a1b2c3d4e5f6",
  "virusScanStatus": "clean",
  "url": "https://s3.amazonaws.com/bucket/documents/doc-001.pdf",
  "thumbnailUrl": "https://s3.amazonaws.com/bucket/thumbnails/doc-001.jpg",
  "expiresAt": null,
  "versions": [
    {
      "version": 1,
      "uploadedAt": "2024-10-15T10:30:00Z",
      "uploadedBy": "user-001",
      "fileSize": 2457600,
      "changes": "Initial upload"
    }
  ],
  "permissions": {
    "canRead": true,
    "canWrite": false,
    "canDelete": false,
    "canShare": true
  },
  "metadata": {
    "pages": 45,
    "author": "Pump Corp",
    "createdDate": "2024-01-15T00:00:00Z",
    "lastModified": "2024-10-01T00:00:00Z",
    "keywords": ["centrifugal", "pump", "maintenance"],
    "subject": "Maintenance Procedures"
  },
  "relatedDocuments": [
    {
      "id": "doc-002",
      "title": "Pump Installation Guide",
      "relationship": "related"
    }
  ]
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/documents/doc-001" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Delete Document

Deletes a document from the system.

**Endpoint:** `DELETE /documents/{documentId}`

**Authentication:** Required

**Path Parameters:**
- `documentId`: Unique identifier of the document

**Query Parameters:**
- `permanent` (optional): Permanently delete (true) or soft delete (false, default)

**Response:**
```json
{
  "message": "Document deleted successfully",
  "documentId": "doc-001",
  "deletedAt": "2024-10-15T16:30:00Z",
  "deletedBy": "user-001",
  "permanent": false
}
```

**Example Request:**
```bash
curl -X DELETE "https://your-api-domain.com/prod/documents/doc-001" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Get Download URL

Generates a presigned URL for downloading a document.

**Endpoint:** `GET /documents/{documentId}/download-url`

**Authentication:** Required

**Path Parameters:**
- `documentId`: Unique identifier of the document

**Query Parameters:**
- `expiresIn` (optional): URL expiration time in seconds (default: 3600, max: 86400)
- `inline` (optional): Display inline in browser (true) or force download (false, default)

**Response:**
```json
{
  "downloadUrl": "https://s3.amazonaws.com/bucket/documents/doc-001.pdf?AWSAccessKeyId=...&Signature=...&Expires=...",
  "expiresAt": "2024-10-15T17:30:00Z",
  "expiresIn": 3600,
  "filename": "manual.pdf",
  "fileSize": 2457600,
  "contentType": "application/pdf"
}
```

**Example Request:**
```bash
curl -X GET "https://your-api-domain.com/prod/documents/doc-001/download-url?expiresIn=7200" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

## Document Categories

Common document categories include:

- **Manuals**: Equipment manuals and documentation
- **Procedures**: Maintenance procedures and instructions
- **Specifications**: Technical specifications and datasheets
- **Drawings**: CAD drawings and schematics
- **Certificates**: Compliance and certification documents
- **Photos**: Equipment photos and inspection images
- **Reports**: Maintenance and inspection reports
- **Warranties**: Warranty information and documents
- **Safety**: Safety data sheets and procedures
- **Training**: Training materials and guides

## File Processing

### Virus Scanning
All uploaded files are automatically scanned for viruses and malware:
- **clean**: File passed virus scan
- **infected**: File contains malware (rejected)
- **scanning**: Scan in progress
- **error**: Scan could not be completed

### Thumbnail Generation
Thumbnails are automatically generated for supported file types:
- **Images**: Resized versions for preview
- **PDFs**: First page thumbnail
- **Videos**: Frame capture thumbnail
- **Office Docs**: First page preview

### Metadata Extraction
File metadata is automatically extracted when possible:
- **PDF**: Title, author, page count, creation date
- **Images**: EXIF data, dimensions, camera info
- **Office Docs**: Author, title, page/slide count
- **Videos**: Duration, resolution, codec info

## Security Features

### Access Control
- **Role-based access**: Users can only access documents they have permissions for
- **Asset-based access**: Documents linked to assets inherit asset permissions
- **Public documents**: Can be accessed without authentication (if enabled)

### Encryption
- **At rest**: All documents encrypted using AES-256
- **In transit**: All transfers use TLS 1.2+
- **Key management**: AWS KMS for encryption key management

### Audit Trail
All document operations are logged:
- Upload, download, delete events
- User identification and timestamps
- IP address and user agent
- Permission changes

## Storage Limits

### Per Customer Limits
- **Total storage**: 10GB (expandable)
- **File count**: 10,000 files maximum
- **File size**: 100MB per file maximum

### Retention Policy
- **Active documents**: Retained indefinitely
- **Soft deleted**: Retained for 30 days
- **Hard deleted**: Immediately removed
- **Automatic cleanup**: Temp files cleaned after 24 hours

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid file upload",
  "details": {
    "fileType": "File type not supported",
    "fileSize": "File exceeds 100MB limit"
  }
}
```

### 404 Not Found
```json
{
  "error": "Document not found",
  "documentId": "doc-001"
}
```

### 409 Conflict
```json
{
  "error": "Storage limit exceeded",
  "currentUsage": "9.8 GB",
  "limit": "10 GB",
  "additionalRequired": "0.5 GB"
}
```

### 415 Unsupported Media Type
```json
{
  "error": "Unsupported file type",
  "fileType": "application/x-executable",
  "supportedTypes": ["application/pdf", "image/jpeg", "image/png", "..."]
}
```

### 413 Payload Too Large
```json
{
  "error": "File too large",
  "fileSize": "105 MB",
  "maxSize": "100 MB"
}
```
