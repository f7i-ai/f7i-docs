---
sidebar_position: 3
---

# Outdoor Modem Setup Procedure

# Standard Operating Procedure: 4G Modem Setup

**Document ID:** SOP-HW-001
**Version:** 1.0
**Effective Date:** June 17, 2025  
**Review Date:** December 17, 2025  
**Owner:** Factory AI

---

## Overview

This procedure outlines the set up of the Outdoor 4G modems that is used to allow continuous data collection by the Factory AI sensors and gateways.

**Estimated Time:** 15 minutes per modem and gateway
**Frequency:** As required.
**Prerequisites:** Safety training certification

---

## Safety Requirements

⚠️ **Critical Safety Points:**
- Wear appropriate PPE at all times
- Follow lockout/tagout procedures

---

## Required Materials

- [ ] Outdoor modem kit(s)
- [ ] Hex/Allen keys (included in the kit)
- [ ] (Optional) Cable ties
- [ ] Monitron app installed on an iPhone ([iOS app on the App store](https://apps.apple.com/us/app/amazon-monitron/id1563396065)) or Android device ([Android app on the Google Play store](https://play.google.com/store/apps/details?id=aws.monitron.app&hl=en_AU&pli=1))

---

## Procedure

### Step 1: Follow assembly instructions in Steps 1 to 3 in the guide included in the kit.
**Action:** Assemble the Outdoor 4g modem.

**Details:**
- Attach 4g attenaes
- Attach 2.4ghz attenaes
- Open the enclosure, plug in the PoE ethernet cable to the PoE/LAN port.
- Close the enclosure and tigthen the gland

---

### Step 2: Find install location and mount to the Outdoor 4g modem to a pole or structure.
**Action:** Examine equipment for visible damage or wear

**Details:**
- Mounting brackets are supplied in the kit to allow easy installation on a pole. Alternatively, use the L bracket on another surface or directly afix the 4g modem using the mounting points.
- Find a suitable GPO (240v) to power the Outdoor 4g modem.
- Mount the outdoor 4g modem above 2m for better coverage.
- Ensure the outdoor 4g modem is within 20m of a gateway.
- Power on the gateway.

**✅ Expected Result:** Outdoor 4g modems are securely mounted on a structure within range of one or more gateways.

**💡 Tip:** Steel structures interfere with the signal, ensure the antennas are orientated towards the gateways.

---

### Step 3: Gateway configuration
**Action:** Configure the gateway(s) using the Monitron App

**Details:**
1. Find the Monitron project link email. Clicking the link will open the Monitron App.
1. Login using the Google SSO credentials provided via email
1. Once the project is open, in the top bar, select the site
1. In the top nav (☰ menu) select Gateways
1. Click Add Gateway
1. Locate the button on the side of the gateway and press it once (do not hold down). [The gateway lights will change from slow flash between orange and blue, to a rapid flash](https://docs.aws.amazon.com/Monitron/latest/user-guide/LED.html)
1. The phone will try to connect to the gateway using bluetooth. Pair the gateway to the phone by selecting it from the list.
1. After it connects to the gateway, Amazon Monitron scans for Wi-Fi networks. Choose the **Factory-AI** WiFi SSID being broadcast by the outdoor 4g modem.
1. The password has been securely shared with to you separately.
1. Repeat the steps for the remaining gateways.

---

### Step 4: Final Verification
**Action:** Verify gateways are online in the app

**Details:**
- Gateways should appear Online in the app.
- The gateway LED should show a solid amber light.

---

## Troubleshooting

| **Issue** | **Possible Cause** | **Action** |
|-----------|-------------------|------------|
| Cannot find the SSID, Can't connect to Wi-Fi | Outdoor 4g modem has been reset | Power on the gateway in the workshop, where you can open the enclosure and see the internal LEDs. Contact Factory AI for further assistance reconfiguring the 4g modem. |
| Can't configure gateway | Gateway won't pair with device, Gateway isn't in set up mode | Remove Monitron gateway devices from your mobile device. If the gateway lights are not flashing slowly between orange and blue, press and hold the side of the gateway for 7-10 seconds. |

---

## Documentation Requirements

After completing this procedure:

1. **Notify Factory AI:** We'll complete further checks and monitor that all devices are visible.

---

## Related Documents


---

**Questions or Issues?**  
Contact: Tim | tim+support@f7i.ai

*This document is controlled. Printed copies may not reflect the current version.*