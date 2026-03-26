# ⚡ Complete Setup Guide: Blockchain Energy Meter System

A guide to setting up and running the end-to-end Smart Energy Meter project.

---

## 🗄️ 1. PostgreSQL Database
1.  **Installation**: Ensure PostgreSQL is running on port `5432`.
2.  **Database Creation**:
    -   Log in to psql: `psql -U postgres`
    -   Create DB: `CREATE DATABASE enargy;`
3.  **Schema Execution**: Run the schema script:
    -   `psql -U postgres -d enargy -f backend/db/schema.sql`
4.  **Confirm**: Verify tables `energy_readings` and `payments` are created.

---

## 🔗 2. Blockchain (Hardhat)
1.  **Install Dependencies**:
    ```bash
    cd blockchain
    npm install
    ```
2.  **Start Local Node**:
    ```bash
    npx hardhat node
    ```
    *(Keep this terminal open, it provides test accounts and private keys)*.
3.  **Deploy Contract**: Open a **new** terminal:
    ```bash
    cd blockchain
    npx hardhat run scripts/deploy.js --network localhost
    ```
4.  **Important**: Copy the **Contract Address** printed (e.g., `0x5Fb...`).

---

## ⚙️ 3. Node.js Backend
1.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```
2.  **Configure Environment**:
    -   Rename `.env.example` to `.env`.
    -   Set `DB_PASSWORD` to your PostgreSQL password.
    -   Set `CONTRACT_ADDRESS` to the address from Step 2.
    -   Verify `PORT=3000` and `API_KEY=EB_SECURE_KEY_123`.
3.  **Start Server**:
    ```bash
    npm run dev
    ```
    *(API is now live at http://localhost:3000)*

---

## 💻 4. Frontend Dashboard
1.  **Install Dependencies**:
    ```bash
    cd frontend
    npm install
    ```
2.  **Start Dashboard**:
    ```bash
    npm run dev
    ```
3.  **Access**: Open [http://localhost:3000](http://localhost:3000) in your browser.
    *(Note: Both frontend and backend use port 3000 by default; Vite serves the React app and proxies `/api` requests automatically)*.

---

## 🔌 5. ESP32 Firmware
1.  **Hardware Wiring**:
    -   Current Sensor (GPIO 34)
    -   Voltage Sensor (GPIO 35)
    -   LCD 16x2 (SDA/SCL pins for ESP32)
2.  **Arduino Setup**:
    -   Install `ArduinoJson` and `LiquidCrystal_I2C` libraries.
    -   Update `ssid` and `password` in `esp32_firmware/energy_meter/energy_meter.ino`.
    -   Update `serverName` if your PC's IP is not `192.168.1.100`.
3.  **Test Without Hardware**: Flip `testMode = true;` in the firmware to send random data for testing.

---

## 🧪 6. Simulating Data (No ESP32 needed)
If you're only testing the software flow:
1.  Ensure Backend is running.
2.  Open a terminal in `backend/`:
    ```bash
    node scripts/test_esp32.js
    ```
    This script will push data to the API every 10 seconds.

---

## 💳 7. Optional: Razorpay Test Mode
1.  Get test keys from the Razorpay Dashboard.
2.  Put `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env`.
3.  Use card `4111 1111 1111 1111` for successful test payments.

---

### 🛑 Troubleshooting
-   **DB Connection Error**: Ensure the database name matches `enargy` and your credentials in `.env` are correct.
-   **Blockchain Error**: Ensure the Hardhat node is running and the contract address in `.env` is exact.
-   **Cors Issues**: The project uses a proxy in `vite.config.js`. Ensure the backend server starts on the port specified in the config.
