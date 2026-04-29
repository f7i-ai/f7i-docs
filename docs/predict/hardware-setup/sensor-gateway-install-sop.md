---
sidebar_position: 5
---

# Sensor & Gateway Installation Procedure

# Standard Operating Procedure: Sensor & Gateway Installation

**Document ID:** SOP-HW-002
**Version:** 1.0
**Effective Date:** December 22, 2025
**Review Date:** June 22, 2026
**Owner:** Factory AI

---

## Overview

This procedure outlines the installation of Factory AI sensors and gateways for vibration monitoring and predictive maintenance. Proper installation ensures reliable data collection and accurate anomaly detection.

**Estimated Time:** 5-10 minutes per sensor, 10-15 minutes per gateway
**Frequency:** As required
**Prerequisites:** Safety training certification, Site induction complete

---

## Safety Requirements

⚠️ **Critical Safety Points:**

- **Lockout/Tagout (LOTO):** Equipment must be isolated before sensor installation. Follow site-specific LOTO procedures.
- **Personal Protective Equipment (PPE):** Wear appropriate PPE at all times, including:
  - Safety glasses (if required by site)
  - Gloves (nitrile recommended when handling adhesive)
  - Safety boots
  - Hearing protection (if required by site)
  - High-visibility vest (if required by site)
  - FR clothing (if required by site)

---

## Prerequisites

Before beginning installation:

- [ ] **WiFi Credentials** – Required for WiFi gateways (SSID and password)
- [ ] **Network Details** – Required for Ethernet gateways:
  - DHCP available, or
  - Static IP configuration (IP address, subnet mask, gateway address, DNS servers)
- [ ] **Site Access** – Confirmed access to installation areas
- [ ] **Equipment Isolation** – LOTO permits obtained for machines being instrumented
- [ ] **SKF Axios App** – Installed on mobile device:
  - [iOS App Store](https://apps.apple.com/us/app/skf-axios/id1659834627)
  - [Google Play Store](https://play.google.com/store/apps/details?id=com.skf.axios&hl=en_AU)
- [ ] **Project Access** – SKF Axios project invitation received and accepted

---

## Required Materials

### Cleaning Supplies
- [ ] Isopropyl alcohol (IPA) 70% or higher
- [ ] Clean rags or lint-free wipes
- [ ] Microfibre cloth (for drying)

### Adhesive
- [ ] **[Loctite 454](https://docs.rs-online.com/86cf/0900766b801dff4e.pdf)** – For flat surfaces (general use)
- [ ] **[Loctite 4070](https://techsil.s3.eu-west-2.amazonaws.com/TE/TDS/HECY50040-tds.pdf)** – Excellent for **60–100°C** surface or operating temperature at the mount (including curved surfaces in this temperature band)
- [ ] **[Loctite HY 4090](https://datasheets.tdx.henkel.com/LOCTITE-HY-4090-en_GL.pdf)** – Best suited when surface or operating temperature **exceeds 100°C**; two-part dual-cartridge product—follow manufacturer mixing and application instructions

### Hardware
- [ ] Sensors (as per installation plan)
- [ ] Gateway(s)
- [ ] Gateway power supplies (5V 2A, single phase)

### Documentation
- [ ] Sensor location map
- [ ] Asset register or equipment list

---

## Procedure

### Part A: Gateway Installation

Complete gateway installation first to ensure sensors can connect immediately after mounting.

#### Step A1: Select Gateway Location
**Action:** Identify optimal mounting locations for gateways

**Details:**
- Mount gateways **2 meters** off the ground for optimal range
- Ensure line-of-sight to sensor locations where possible
- Maximum distance between sensor and gateway: **20 meters**
- Install gateways **outside** of metal cabinets or enclosures
- Ensure power source availability (5V 2A required)
- Gateways are IP65 rated and suitable for industrial environments

**💡 Tip:** Steel structures interfere with Bluetooth signal. Position gateways to minimise obstructions between sensors and gateways.

---

#### Step A2: Mount & Power Gateway
**Action:** Physically install and power on the gateway

**Details:**
1. Secure gateway to mounting surface using appropriate hardware
2. Route power cable to gateway location
3. Connect power supply to gateway
4. Verify LED indicators illuminate (orange and blue LEDs should turn on)

**✅ Expected Result:** Gateway powers on with LED activity

---

#### Step A3: Configure Gateway
**Action:** Commission gateway using the SKF Axios App (formerly Monitron)

**Details:**
1. Open the SKF Axios project link (received via email)
2. Login using provided Google SSO credentials
3. Select the appropriate site from the top bar
4. Navigate to **☰ Menu → Gateways**
5. Tap **Add Gateway**
6. Press the button on the side of the gateway **once** (do not hold)
   - LEDs will change from slow orange/blue flash to rapid flash
7. Wait for phone to detect gateway via Bluetooth
8. Select the gateway from the list to pair
9. **For WiFi Gateway:**
   - Select the WiFi network (SSID)
   - Enter the WiFi password
10. **For Ethernet Gateway:**
    - Select **DHCP** (recommended) or **Static IP**
    - If using **Static IP**, enter:
      - IP Address
      - Subnet Mask
      - Gateway Address
      - Primary DNS
      - Secondary DNS (optional)
11. Wait for gateway to connect to the cloud

**✅ Expected Result:** Gateway appears as "Online" in the app with solid amber LED

**💡 Tip:** If the gateway doesn't appear in the Bluetooth list, ensure no other devices are paired to it. You may need to factory reset (hold button for 7-10 seconds).

---

### Part B: Sensor Installation

#### Step B1: Verify Sensor Position
**Action:** Confirm optimal mounting location before applying adhesive

**Details:**
1. Ensure equipment is isolated (LOTO in place)
2. Place sensor on intended location **without adhesive** to test fit
3. Verify:
   - **Proximity:** Sensor is as close to vibration source as possible
   - **Surface Contact:** Adequate contact between sensor and machine surface
   - **Space:** Sufficient clearance for the sensor
   - **Orientation:** Note the X, Y, Z axes marked on the sensor
4. Consider primary, secondary, and tertiary positions:
   - **Primary (best):** Closest to bearing/vibration source on rigid surface
   - **Secondary:** Slightly further but still on rigid mounting
   - **Tertiary:** Backup position if primary/secondary unavailable

**💡 Tip:** For assets with multiple components, consider installing separate sensors to monitor different failure modes.

---

#### Step B2: Prepare Installation Area
**Action:** Clean the mounting surface

**Details:**
1. Clean the mounting surface with isopropyl alcohol
2. Wipe thoroughly to remove oil, grease, and debris
3. Dry with microfibre cloth and ensure no lint remains

**💡 Tip:** If installing multiple sensors nearby, clean all surfaces first. This allows you to apply adhesive to multiple sensors before the adhesive tip dries out.

---

#### Step B3: Apply Adhesive & Mount Sensor
**Action:** Permanently affix sensor to equipment

**Details:**
1. Apply adhesive sparingly to underside of sensor
2. **Important:** Avoid the metal circle in the centre (temperature sensor)
3. Press sensor firmly onto the cleaned surface
4. Hold sensor in place:
   - Flat surfaces: **15 seconds**
   - Curved surfaces: **30 seconds**
5. Do not disturb sensor for at least 60 seconds after release

**⚠️ Warning:** Adhesive bonds instantly. Ensure correct positioning before contact.

**✅ Expected Result:** Sensor is securely mounted and level with the surface

---

#### Step B4: Record Installation
**Action:** Document the sensor installation

**Details:**
1. Note the sensor serial number (printed on sensor label)
2. Record the asset/equipment where sensor was installed
3. Take a photo of the installed sensor
4. Mark the sensor location on the installation plan

---

### Part C: Verification

#### Step C1: Verify Sensor Connectivity
**Action:** Confirm sensors are communicating with gateways

**Details:**
1. In the SKF Axios App, navigate to **☰ Menu → Sensors**
2. Verify newly installed sensors appear in the list
3. Check sensor status shows as connected
4. Note: Initial data may take up to 1 hour to appear

**✅ Expected Result:** All installed sensors appear in the app and show connectivity

---

#### Step C2: Final Gateway Check
**Action:** Confirm all gateways remain online

**Details:**
1. Navigate to **☰ Menu → Gateways**
2. Verify all gateways show "Online" status
3. LED on each gateway should be solid amber

---

## Troubleshooting

| **Issue** | **Possible Cause** | **Action** |
|-----------|-------------------|------------|
| Gateway won't pair with phone | Another device is connected, or gateway not in pairing mode | Remove Monitron gateway from phone's Bluetooth settings. Press and hold gateway button for 7-10 seconds to factory reset. |
| Gateway shows offline | Network connectivity issue | Power cycle the gateway. Check WiFi/Ethernet connection. Verify SSID and password. |
| Gateway LED is solid green or slow orange flash | Not connected to cloud | Check modem/network connectivity. Power cycle gateway. |
| Sensor not appearing in app | Out of range, gateway offline, or sensor not activated | Ensure gateway is online. Verify sensor is within 20m of gateway. Wait up to 1 hour for initial sync. |
| Sensor won't stay mounted | Surface not clean or wrong adhesive type or temperature band | Remove sensor, re-clean surface. Use adhesive matched to surface geometry and to the mount-point temperature (4070 for 60–100°C, HY 4090 above 100°C; see Required Materials). |
| Weak sensor signal | Obstruction or distance | Relocate gateway closer or install additional gateway. |

---

## Documentation Requirements

After completing this procedure:

1. **Submit Installation Report:** Provide Factory AI with:
   - List of installed sensors (serial numbers + asset locations)
   - List of installed gateways (locations + network type)
   - Photos of installed equipment
   - Any issues encountered

2. **Factory AI Verification:** We will:
   - Verify all devices are visible in the cloud
   - Confirm data is being collected
   - Commission assets in the monitoring platform

---

## Related Documents

- [Sensor Install Guide](/docs/predict/hardware-setup/sensor-install-guide) – Detailed sensor positioning guidance
- [Gateway Specifications](/docs/predict/hardware-setup/gateways) – Gateway technical details
- [Outdoor Modem Setup](/docs/predict/hardware-setup/modems) – 4G modem installation procedure
- [Troubleshooting](/docs/predict/hardware-setup/troubleshooting) – Common issues and resolutions

---

## Revision History

| **Version** | **Date** | **Author** | **Changes** |
|------------|----------|------------|-------------|
| 1.0 | December 22, 2025 | Factory AI | Initial release |

---

**Questions or Issues?**
Contact: Tim | tim+support@f7i.ai

*This document is controlled. Printed copies may not reflect the current version.*