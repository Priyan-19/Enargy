# ⚡ ESP32 Energy Meter Firmware Setup

This folder contains the Arduino sketch for the ESP32 that measures electricity data using a PZEM-004T sensor.

---

## 🛠️ Hardware Requirements
- **ESP32 DevKit V1**
- **PZEM-004T (V3.0)** Energy Sensor
- **Jumper Wires**

---

## 🔌 Connection Diagram
| PZEM Pin | ESP32 Pin | Note |
| :--- | :--- | :--- |
| VCC | 5V | Sensor power |
| RX | GPIO 17 (TX2) | Serial TX pin |
| TX | GPIO 16 (RX2) | Serial RX pin |
| GND | GND | Ground |

---

## 💻 Software Setup (Arduino IDE)

1.  **Install ESP32 Board**: Open Arduino IDE → File → Preferences → Paste the URL in 'Additional Board Manager URLs': `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`. Then go to Boards Manager and install **esp32**.
2.  **Install Required Library**: Go to Sketch → Include Library → Manage Libraries. Search for and install:
    - `PZEM004Tv30` (by Jakub Mandula)
3.  **Update Config**: Open `energy_meter.ino` and update these lines:
    ```cpp
    const char* ssid     = "YOUR_WIFI_SSID";
    const char* password = "YOUR_WIFI_PASSWORD";
    const char* serverUrl = "http://192.168.1.XX:3001/api/energy"; // Use your computer's local IP address
    ```

---

## 🧪 Testing Without Sensor
If you don't have a sensor yet, the firmware will detect its absence and automatically send **Simulated Random Data** to the backend. This allows you to test the entire system (Frontend/Blockchain) without physical hardware.

---

## 🔒 Security Feature (Integrity Hash)
The firmware automatically generates a SHA256 hash of all data before sending. This hash is then recalculated by the backend and stored on the blockchain, ensuring the data's integrity from its source to the ledger.
