---
sidebar_position: 3
---

# Purchasing & Procurement

The Purchasing module provides comprehensive purchase order management capabilities integrated with your CMMS workflow. Manage vendors, create multi-line purchase orders, track approvals, and seamlessly link purchases to assets and work orders.

## What is the Purchasing Module?

The Purchasing module streamlines the procurement process for maintenance operations, ensuring that the right parts arrive at the right time for your maintenance activities. It provides:

- **Complete Purchase Order Lifecycle**: From creation to receiving and closure
- **Vendor Management**: Maintain supplier relationships and performance tracking
- **Multi-line Item Support**: Complex purchase orders with different parts and services
- **Approval Workflows**: Multi-step approval processes with proper authorization
- **Asset Integration**: Link purchases directly to assets and work orders
- **Cost Tracking**: Monitor maintenance spending and budget performance

## Key Features

### Purchase Order Management
- Create and manage purchase orders with detailed line items
- Support for parts, services, and fees in a single PO
- Real-time total calculations with tax and discount support
- Status-based workflow with approval gates
- Multi-currency support for international vendors

### Vendor Management
- Comprehensive vendor database with contact information
- Vendor performance tracking and rating systems
- Payment terms and currency preferences
- Quick vendor creation during PO process
- Vendor-specific catalogs and pricing

### Work Order & Asset Linking
- Direct links between purchase orders and maintenance work
- Many-to-many relationships for complex scenarios
- Quick navigation between related items
- Bulk linking capabilities for efficiency
- Asset-specific procurement history

### Receiving Integration
- Streamlined receiving process with inventory updates
- Partial receiving support for large orders
- Serial number and warranty tracking during receiving
- Automatic inventory adjustments and location updates
- Quality control and inspection workflows

## Purchase Order Lifecycle

### 1. Draft Status
- **Initial Creation**: PO is created but not yet submitted
- **Edit Freely**: All fields can be modified
- **Add Line Items**: Build the complete order
- **Calculate Totals**: Real-time pricing calculations

### 2. Pending Approval
- **Submit for Review**: PO moves to approval queue
- **Awaiting Authorization**: Designated approvers review the order
- **Approval Comments**: Reviewers can add notes and feedback
- **Reject Option**: Send back to draft for modifications

### 3. Approved
- **Ready to Order**: PO has been authorized for purchase
- **Vendor Notification**: Vendor can be notified automatically
- **Generate Documents**: Create official PO documents
- **Lock Header**: Prevent unauthorized changes

### 4. Ordered
- **Sent to Vendor**: PO has been transmitted to supplier
- **Expected Delivery**: Track expected delivery dates
- **Follow-up Activities**: Monitor order status with vendor
- **Expedite Options**: Rush orders when needed

### 5. Receiving Process
- **Partial Received**: Some items have arrived
- **Full Received**: All items have been delivered
- **Quality Inspection**: Verify items meet specifications
- **Inventory Update**: Add received items to inventory

### 6. Closed
- **Complete**: All items received and verified
- **Payment Processing**: Ready for invoice matching
- **Historical Record**: Maintain complete purchase history
- **Performance Analysis**: Vendor and cost evaluation

## Creating Purchase Orders

### Basic Purchase Order Creation

1. **Navigate to Purchasing**
   - Go to **Purchasing** from the main navigation
   - Click **Create PO** or use the (+) button

2. **Vendor Selection**
   - Search existing vendors or create new
   - Select vendor contact and delivery information
   - Set payment terms and currency

3. **Purchase Order Header**
   - **PO Number**: Auto-generated or manual entry
   - **Description**: Purpose or project description
   - **Requested By**: Person requesting the purchase
   - **Expected Delivery**: When items are needed

4. **Delivery Information**
   - **Delivery Address**: Where items should be delivered
   - **Special Instructions**: Delivery requirements
   - **Contact Person**: Who will receive the delivery

### Adding Line Items

#### Line Item Types

**Parts**
- **Part Number**: Manufacturer or internal part number
- **Description**: Detailed part description
- **Quantity**: Number of units needed
- **Unit Price**: Cost per unit
- **Unit of Measure**: Each, box, foot, etc.

**Services**
- **Service Description**: Work to be performed
- **Duration**: Hours, days, or project-based
- **Rate**: Hourly rate or fixed price
- **Scope**: Detailed service requirements

**Fees**
- **Fee Type**: Shipping, handling, setup, etc.
- **Amount**: Fixed fee amount
- **Justification**: Reason for the fee

#### Line Item Details
- **Tax Settings**: Taxable/non-taxable status
- **Discount**: Item-specific discounts
- **Required Date**: When each item is needed
- **Notes**: Special instructions or requirements

### Advanced Purchase Order Features

#### Multi-Currency Support
- **Vendor Currency**: Use vendor's preferred currency
- **Exchange Rates**: Automatic or manual rate setting
- **Total Calculations**: Display in both currencies
- **Cost Tracking**: Report in organization's base currency

#### Asset and Work Order Linking
- **Asset Association**: Link line items to specific assets
- **Work Order Connection**: Associate with maintenance work
- **Project Tracking**: Group related purchases
- **Cost Allocation**: Charge to appropriate cost centers

## Vendor Management

### Vendor Information

#### Basic Vendor Details
- **Company Name**: Legal business name
- **Contact Information**: Primary contact person
- **Address**: Business and delivery addresses
- **Phone/Email**: Communication preferences
- **Website**: Company website and online catalog

#### Business Information
- **Tax ID**: Business tax identification
- **Payment Terms**: Net 30, Net 60, etc.
- **Preferred Currency**: Default currency for transactions
- **Credit Terms**: Credit limits and payment history
- **Certifications**: Quality certifications and compliance

### Vendor Performance Tracking

#### Performance Metrics
- **On-Time Delivery**: Percentage of orders delivered on schedule
- **Quality Rating**: Product quality assessment
- **Cost Competitiveness**: Price comparison with other vendors
- **Service Level**: Customer service and support quality
- **Response Time**: How quickly vendor responds to inquiries

#### Vendor Evaluation
- **Regular Reviews**: Periodic vendor performance assessments
- **Improvement Plans**: Work with vendors to address issues
- **Preferred Vendor Status**: Recognize top-performing suppliers
- **Risk Assessment**: Evaluate vendor reliability and stability

## Approval Workflows

### Approval Hierarchy

#### Approval Levels
- **Dollar Thresholds**: Different approval levels based on PO value
- **Department Approval**: Department manager authorization
- **Finance Approval**: Financial review for large purchases
- **Executive Approval**: Senior management for major expenditures

#### Approval Process
- **Sequential Approval**: Step-by-step approval chain
- **Parallel Approval**: Multiple approvers at same level
- **Emergency Override**: Expedited approval for urgent needs
- **Delegation**: Temporary approval delegation

### Approval Controls

#### Approval Rules
- **Budget Validation**: Check against available budgets
- **Policy Compliance**: Ensure adherence to procurement policies
- **Vendor Approval**: Verify vendor is on approved list
- **Asset Authorization**: Confirm asset ownership and responsibility

## Receiving Process

### Standard Receiving

1. **Delivery Notification**
   - Vendor notifies of shipment
   - Expected delivery date and tracking information
   - Prepare receiving documentation

2. **Physical Receiving**
   - Verify items against packing list
   - Check quantities and condition
   - Note any discrepancies or damages

3. **System Update**
   - Record received quantities in system
   - Update inventory levels and locations
   - Generate receiving reports

4. **Quality Inspection**
   - Verify items meet specifications
   - Test functionality if required
   - Document any quality issues

### Advanced Receiving Features

#### Serial Number Tracking
- **Individual Item Tracking**: Record serial numbers for trackable items
- **Warranty Registration**: Automatically create warranty records
- **Asset Assignment**: Link serialized items to specific assets
- **Lifecycle Management**: Track items throughout their lifecycle

#### Partial Receiving
- **Incomplete Shipments**: Handle partial deliveries
- **Backorder Management**: Track outstanding items
- **Expediting**: Follow up on delayed items
- **Substitute Parts**: Handle part substitutions

## Cost Tracking and Reporting

### Purchase Analysis

#### Spending Reports
- **Vendor Spending**: Total spend by vendor
- **Category Analysis**: Spending by part category
- **Asset Costs**: Maintenance costs by asset
- **Budget Tracking**: Actual vs. budgeted spending
- **Trend Analysis**: Spending patterns over time

#### Cost Optimization
- **Price Comparison**: Compare vendor pricing
- **Volume Discounts**: Negotiate better pricing for higher volumes
- **Contract Opportunities**: Identify items for annual contracts
- **Inventory Optimization**: Balance stock levels with purchasing costs

### Performance Metrics

#### Key Performance Indicators
- **Cost per Work Order**: Average purchasing cost per maintenance job
- **Emergency Purchase Rate**: Percentage of rush orders
- **Vendor Lead Times**: Average time from order to delivery
- **Purchase Order Cycle Time**: Time from request to order placement
- **Receiving Accuracy**: Percentage of orders received correctly

## Integration Features

### CMMS Integration

#### Work Order Connection
- **Automatic PO Creation**: Generate purchase orders from work order requirements
- **Parts Reservation**: Reserve parts for specific work orders
- **Cost Allocation**: Charge purchase costs to work orders
- **Material Planning**: Plan purchases based on scheduled maintenance

#### Inventory Integration
- **Stock Level Monitoring**: Track inventory levels and reorder points
- **Automatic Reordering**: Generate purchase orders for low stock items
- **Location Management**: Update inventory locations during receiving
- **Cost Updates**: Update inventory costs with latest purchase prices

### Asset Management Integration
- **Asset-Specific Purchasing**: Track purchases by individual asset
- **Warranty Tracking**: Link warranties to asset components
- **Maintenance Cost Analysis**: Total cost of ownership calculations
- **Parts Compatibility**: Ensure purchased parts are compatible with assets

## Mobile Access

### Mobile Purchasing Features

#### Field Purchasing
- **Emergency Orders**: Create urgent purchase orders from the field
- **Part Identification**: Use photos and descriptions to identify needed parts
- **Vendor Contact**: Direct communication with vendors
- **Approval Notifications**: Mobile notifications for pending approvals

#### Receiving Support
- **Mobile Receiving**: Receive shipments using mobile devices
- **Photo Documentation**: Capture images of received items
- **Barcode Scanning**: Scan part numbers and serial numbers
- **Instant Updates**: Real-time inventory updates

## Best Practices

### Procurement Efficiency

#### Process Optimization
- **Standardize Procedures**: Use consistent purchasing processes
- **Vendor Consolidation**: Reduce number of vendors where practical
- **Volume Purchasing**: Combine orders for better pricing
- **Annual Contracts**: Negotiate annual agreements for common parts

#### Data Quality
- **Accurate Part Numbers**: Ensure part numbers are correct and standardized
- **Complete Descriptions**: Provide detailed item descriptions
- **Proper Classifications**: Use consistent category and account codes
- **Vendor Information**: Maintain current vendor contact information

### Cost Control

#### Budget Management
- **Purchase Planning**: Plan purchases based on maintenance schedules
- **Budget Monitoring**: Track spending against approved budgets
- **Authorization Limits**: Enforce proper approval levels
- **Emergency Procedures**: Have processes for urgent purchases

#### Vendor Relations
- **Performance Reviews**: Regularly evaluate vendor performance
- **Relationship Building**: Develop strategic partnerships with key vendors
- **Payment Terms**: Negotiate favorable payment terms
- **Quality Standards**: Set and maintain quality expectations

The Purchasing module integrates seamlessly with all other CMMS functions to provide a complete procurement solution that supports effective maintenance operations and cost control.
