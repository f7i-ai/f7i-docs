---
sidebar_position: 2
---

# Asset Registry

The Asset Registry is the central hub for managing all your equipment, machinery, and infrastructure assets. It provides a comprehensive database with hierarchical component structures, specifications, maintenance procedures, and complete asset lifecycle tracking.

## What is the Asset Registry?

The Asset Registry serves as the foundation of your CMMS, storing detailed information about every asset in your organization. It supports:

- **Hierarchical Asset Structure**: Organize assets with unlimited sub-components
- **Complete Asset Profiles**: Technical specifications, documentation, and history
- **Component Management**: Track individual parts and sub-assemblies
- **Maintenance Integration**: Link to work orders, procedures, and schedules
- **QR Code Generation**: Quick asset identification and mobile access

## Key Features

### Asset Management
- Create and manage asset records with detailed information
- Track asset status, criticality, and operational parameters
- Maintain asset hierarchy with parent-child relationships
- Store manufacturer information, model numbers, and serial numbers
- Generate QR codes for mobile asset identification

### Component Hierarchy
- Build detailed component structures for complex assets
- Track sub-components, parts, and assemblies
- Manage component specifications and technical details
- Link components to failure modes and maintenance procedures
- Support unlimited depth in component hierarchies

### Documentation Repository
- Store technical manuals, drawings, and specifications
- Upload photos, videos, and maintenance documentation
- Version control for document management
- Easy access to asset-related information
- Integration with maintenance procedures

### Maintenance Integration
- Link assets to preventive maintenance schedules
- Track maintenance history and work order connections
- Manage failure modes and corrective actions
- Create maintenance procedures and checklists
- Monitor asset performance and reliability

## Creating Assets

### Basic Asset Information

1. **Navigate to Asset Registry**
   - Go to **Registry** from the main navigation
   - Click **Create New Asset** or use the (+) button

2. **Asset Details**
   - **Asset Name**: Descriptive name for the equipment
   - **Manufacturer**: Equipment manufacturer
   - **Model**: Manufacturer's model number
   - **Serial Number**: Unique serial identifier
   - **Asset Tag**: Your organization's asset tag

3. **Location Information**
   - **Site**: Physical location or facility
   - **Area**: Specific area within the site
   - **Location**: Detailed location description
   - **Installation Date**: When the asset was installed

4. **Classification**
   - **Asset Type**: Category of equipment (Motor, Pump, etc.)
   - **Criticality**: Critical, High, Medium, Low
   - **Status**: Operational, Down, Maintenance, Retired

### Advanced Asset Configuration

#### Technical Specifications
- **Operating Parameters**: Voltage, pressure, temperature ranges
- **Capacity Information**: Flow rates, power ratings, capacities
- **Physical Dimensions**: Size, weight, mounting requirements
- **Environmental Conditions**: Operating environment specifications

#### Warranty and Service Information
- **Warranty Details**: Coverage period, terms, and conditions
- **Service Contracts**: Maintenance agreements and vendors
- **Spare Parts Information**: Recommended spare parts inventory
- **Vendor Contacts**: Supplier and service provider information

## Component Hierarchy Management

### Building Component Structures

The Asset Registry supports complex hierarchical structures to represent real-world equipment relationships:

```
Motor Assembly
├── Motor
│   ├── Stator
│   ├── Rotor
│   └── Bearings
│       ├── Drive End Bearing
│       └── Non-Drive End Bearing
├── Coupling
└── Base
    ├── Foundation Bolts
    └── Vibration Dampeners
```

### Adding Components

1. **Select Parent Asset**
   - Navigate to the asset detail page
   - Click **Components** tab

2. **Add New Component**
   - Click **Add Component**
   - Enter component details:
     - Name and description
     - Manufacturer and model
     - Serial number (if applicable)
     - Installation date

3. **Component Specifications**
   - Technical parameters
   - Operating conditions
   - Maintenance requirements
   - Failure modes

### Component Templates

Use component templates to standardize common equipment configurations:

- **Motor Templates**: Standard motor components and specifications
- **Pump Templates**: Typical pump assemblies and parts
- **Control Panel Templates**: Standard electrical configurations
- **Custom Templates**: Organization-specific equipment types

## Asset Documentation

### Photo Management

The Asset Registry includes comprehensive photo management capabilities for visual documentation of assets and components.

#### Asset Photo Features

**Visual Asset Documentation**
- **Multiple Photo Types**: Equipment photos, nameplate images, installation views
- **Component-Level Photos**: Detailed photos for individual asset components
- **Condition Tracking**: Before/after photos for maintenance and inspections
- **Mobile Integration**: Photo capture directly from mobile devices in the field

**Photo Organization**
- **Hierarchical Structure**: Photos organized by asset and component hierarchy
- **Automatic Thumbnails**: Quick preview thumbnails for efficient browsing
- **Smart Categorization**: Organize photos by type, date, and purpose
- **Search and Filter**: Find photos quickly using tags and descriptions

#### Managing Asset Photos

**Photo Upload Process**
1. **Navigate to Asset**
   - Go to the specific asset record in the registry
   - Select the **Photos** tab from the asset details

2. **Upload Photos**
   - Click **Upload Photos** or use the (+) button
   - Select multiple image files (JPG, PNG, GIF, WebP)
   - Add descriptive titles and categories
   - Monitor upload progress and completion

3. **Photo Quality Standards**
   - **Maximum Size**: 10MB per image file
   - **Recommended Resolution**: 1920x1080 or higher for technical documentation
   - **Proper Lighting**: Ensure clear visibility of asset details
   - **Multiple Angles**: Capture comprehensive views of equipment

**Photo Categories for Assets**

*Documentation Photos*
- **Nameplate and Specifications**: Asset identification and technical data
- **Installation Views**: Equipment in operational environment
- **Schematic and Diagram Photos**: Technical drawings and control schematics
- **Manual and Documentation**: Manufacturer materials and procedures

*Condition Assessment Photos*
- **Baseline Condition**: Initial installation state for future comparison
- **Inspection Results**: Regular condition assessment documentation
- **Wear Patterns**: Progressive deterioration and maintenance needs
- **Damage Documentation**: Incident reports and repair requirements

*Maintenance Documentation*
- **Access Points**: Service locations and maintenance positions
- **Procedure Steps**: Visual maintenance procedure documentation
- **Tool Requirements**: Required tools and equipment for maintenance
- **Safety Documentation**: Safety procedures and PPE requirements

#### Mobile Photo Integration

**Field Photography**
- **QR Code Integration**: Scan asset QR codes to automatically associate photos
- **Offline Capability**: Capture photos without internet and sync later
- **GPS Tagging**: Automatic location data for field documentation
- **Voice Annotations**: Add voice descriptions that convert to text

**Real-time Documentation**
- **Immediate Upload**: Photos available instantly after capture
- **Live Sync**: Real-time synchronization across all devices
- **Quality Validation**: Automatic checks for photo quality and clarity
- **Batch Processing**: Efficient handling of multiple photos

#### Photo Integration Features

**Asset Hierarchy Integration**
- **Component Photos**: Photos linked to specific asset components
- **Parent-Child Relationships**: Navigate photos through asset hierarchy
- **Cross-Reference Capability**: Link photos across related assets
- **Version Control**: Track photo updates and historical changes

**Maintenance Integration**
- **Work Order Photos**: Link photos to specific maintenance activities
- **Procedure Documentation**: Visual guides for maintenance procedures
- **Progress Tracking**: Before, during, and after maintenance photos
- **Quality Assurance**: Photo-based verification of maintenance completion

**Search and Discovery**
- **Visual Search**: Find assets using photo-based identification
- **Tag-based Filtering**: Organize and filter photos by custom tags
- **Full-text Search**: Search photo descriptions and metadata
- **Advanced Filters**: Combine multiple criteria for precise results

### Document Management

Store and organize all asset-related documentation:

#### Document Types
- **Technical Manuals**: Operation and maintenance manuals
- **Drawings**: Mechanical drawings, electrical schematics
- **Specifications**: Technical specifications and data sheets
- **Procedures**: Maintenance and operation procedures
- **Photos**: Equipment photos and visual references
- **Videos**: Training and procedure videos

#### Document Organization
- **Version Control**: Track document revisions and updates
- **Categories**: Organize by document type and purpose
- **Search Function**: Find documents by name, type, or content
- **Access Control**: Manage who can view and edit documents

### QR Code Integration

Each asset automatically generates a QR code for mobile access:

- **Quick Identification**: Scan to instantly access asset information
- **Mobile Optimization**: View key details on mobile devices
- **Work Order Creation**: Create work orders directly from mobile
- **History Access**: View maintenance history in the field
- **Update Status**: Report issues and update asset status
- **Photo Access**: View and capture asset photos directly via QR code
- **Upload Photos**: Add new photos to assets from mobile devices
- **Photo Gallery**: Browse existing asset photos in mobile-optimized gallery

## Maintenance Procedures

### Procedure Management

Create and manage standardized maintenance procedures:

#### Procedure Types
- **Preventive Maintenance**: Scheduled maintenance tasks
- **Inspections**: Regular inspection checklists
- **Troubleshooting**: Diagnostic procedures
- **Repair Procedures**: Step-by-step repair instructions

#### Procedure Components
- **Step-by-Step Instructions**: Detailed task descriptions
- **Required Tools**: Tools and equipment needed
- **Safety Requirements**: Safety precautions and PPE
- **Time Estimates**: Expected duration for each task
- **Skills Required**: Technician qualifications needed

### Failure Mode Management

Track and manage potential failure modes for each asset:

#### Failure Mode Information
- **Failure Description**: What can go wrong
- **Causes**: Root causes of the failure
- **Effects**: Impact on operations and safety
- **Detection Methods**: How to identify the failure
- **Prevention**: Preventive maintenance tasks
- **Corrective Actions**: How to fix the problem

## Asset Performance Tracking

### Key Performance Indicators

Monitor asset performance with built-in metrics:

#### Reliability Metrics
- **Mean Time Between Failures (MTBF)**: Average operating time between failures
- **Mean Time To Repair (MTTR)**: Average time to complete repairs
- **Availability**: Percentage of time asset is operational
- **Overall Equipment Effectiveness (OEE)**: Combined availability, performance, and quality metric

#### Cost Tracking
- **Maintenance Costs**: Track all maintenance-related expenses
- **Parts Costs**: Monitor spare parts consumption
- **Labor Costs**: Track maintenance labor hours and costs
- **Total Cost of Ownership**: Complete lifecycle cost analysis

### Work Order Integration

The Asset Registry seamlessly integrates with work order management:

- **Automatic Work Order Creation**: Generate work orders from maintenance schedules
- **Asset Context**: Work orders include complete asset information
- **History Tracking**: Maintain complete maintenance history
- **Performance Impact**: Track how maintenance affects asset performance

## Search and Filtering

### Advanced Search Capabilities

Find assets quickly using multiple search criteria:

#### Search Options
- **Text Search**: Search by name, description, or asset tag
- **Location Filter**: Filter by site, area, or specific location
- **Type Filter**: Filter by asset type or category
- **Status Filter**: Show only operational, down, or maintenance assets
- **Criticality Filter**: Focus on critical or high-priority assets

#### Saved Searches
- **Custom Filters**: Save frequently used search criteria
- **Quick Access**: One-click access to common asset groups
- **Shared Searches**: Share useful searches with team members

## Mobile Access

### Mobile-Optimized Interface

Access asset information from any mobile device:

#### Mobile Features
- **QR Code Scanning**: Instant asset identification
- **Offline Access**: View key information without internet
- **Photo Capture**: Add photos directly to asset records
- **Status Updates**: Update asset status from the field
- **Work Order Creation**: Create maintenance requests on-site

## Reporting and Analytics

### Asset Reports

Generate comprehensive reports for asset management:

#### Standard Reports
- **Asset Inventory**: Complete list of all assets
- **Asset Performance**: Performance metrics and trends
- **Maintenance History**: Complete maintenance records
- **Cost Analysis**: Maintenance cost breakdowns
- **Compliance Reports**: Regulatory compliance tracking

#### Custom Reports
- **Flexible Filtering**: Create reports with custom criteria
- **Export Options**: Export to Excel, PDF, or CSV
- **Scheduled Reports**: Automatically generate and distribute reports
- **Dashboard Integration**: Key metrics on main dashboard

## Best Practices

### Asset Registry Setup

- **Start with Critical Assets**: Begin by cataloging your most important equipment
- **Standardize Naming**: Use consistent naming conventions
- **Complete Hierarchy**: Build complete component structures from the start
- **Regular Updates**: Keep asset information current and accurate
- **Document Everything**: Upload all relevant documentation and photos
- **Comprehensive Photos**: Capture multiple angles and detailed views of all assets
- **Photo Standards**: Maintain consistent photo quality and categorization
- **Mobile Documentation**: Use mobile devices for real-time photo capture and updates

### Data Quality

- **Accurate Information**: Ensure all data is correct and up-to-date
- **Consistent Data Entry**: Use standardized formats and terminology
- **Regular Audits**: Periodically review and verify asset information
- **User Training**: Train users on proper data entry procedures

### Integration Success

- **Link to Work Orders**: Connect all maintenance activities to assets
- **Connect to Inventory**: Link assets to required spare parts
- **Procedure Standardization**: Create standard procedures for common assets
- **Performance Monitoring**: Regularly review asset performance metrics

The Asset Registry forms the foundation of effective maintenance management, providing the detailed asset information needed to optimize maintenance strategies and improve equipment reliability.
