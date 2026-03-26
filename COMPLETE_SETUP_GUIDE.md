# ⚡ Complete Setup Guide: Blockchain Energy Meter System

A comprehensive guide for setting up and running the end-to-end **Enargy** Smart Energy Meter project.

---

## 🗄️ 1. PostgreSQL Database

The project uses PostgreSQL (v12+) for rapid data access and historical persistence.

1.  **Installation**: Ensure PostgreSQL is running on port `5432`.
2.  **Database Creation**:
    -   Run: `psql -U postgres`
    -   Execute: `CREATE DATABASE enargy;`
3.  **Schema Execution**: Initialize the tables using the provided script:
    -   `psql -U postgres -d enargy -f backend/db/schema.sql`
4.  **Confirm**: Tables `energy_readings` and `payments` should be created.

---

## 🔗 2. Blockchain (Hardhat + Ethers v6)

The project handles immutable ledger accounting via a Solidity smart contract.

1.  **Install Dependencies**:
    ```bash
    cd blockchain
    npm install
    # (Note: This project uses Ethers v6)
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
4.  **Important**: Copy the **Contract Address** printed (e.g., `0xe7f...`).

---

## ⚙️ 3. Node.js Backend

The backend acts as the bridge between IoT (ESP32) and Blockchain.

1.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```
2.  **Configure Environment**:
    -   Open `.env`.
    -   Set `DB_PASSWORD` to your PostgreSQL password.
    -   Set `CONTRACT_ADDRESS` to the address from Step 2.
    -   Verify `API_KEY=EB_SECURE_KEY_123` (this must match the ESP32 code).
3.  **Start Server**:
    ```bash
    npm run dev
    ```
    *(API is now live at http://localhost:3000)*
4.  **Response Format**: Note: The `POST /api/energy` now only returns the `blockchain_tx_hash` for IoT efficiency.

---

## 💻 4. Frontend Dashboard

The React-based dashboard provides real-time monitoring and billing.

1.  **Install Dependencies**:
    ```bash
    cd frontend
    npm install
    ```
2.  **Start Dashboard**:
    ```bash
    npm run dev
    ```
3.  **Access**: Open [http://localhost:5173](http://localhost:5173) (Vite default) or [http://localhost:3000](http://localhost:3000).

---

## 🔌 5. ESP32 Firmware

Firmware for the ESP32-based hardware (Arduino C++).

1.  **Arduino Setup**:
    -   Install `ArduinoJson`, `HTTPClient`, and `LiquidCrystal_I2C`.
    -   Update `ssid` and `password` in `energy_meter.ino`.
    -   Update `serverName` to reflect your PC's actual IPv4 address.
2.  **Delay**: Default delay is set to **2 minutes** (`120000ms`) between readings.
3.  **Test Mode**: Flip `testMode = true;` to simulate sensor values without hardware.

---

## 🧪 6. Simulating Data (No ESP32 needed)

If you're only testing the software flow:
Run the internal backend simulator:
```bash
cd backend
node scripts/test_esp32.js
```
This script pushes data to the API as if an ESP32 was connected.

---

## 💳 7. Optional: Razorpay Test Mode

1.  Put `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env`.
2.  Use card `4111 1111 1111 1111` for successful test payments.

---

### 🛑 Troubleshooting
-   **Ethers Migration**: Ensure you use `hre.ethers.formatEther` (v6 syntax) instead of Ethers v5 utils.
-   **No Null Hash**: The backend will return a 500 error if the blockchain fails, ensuring `blockchain_tx_hash` is never null in a 201 response.
-   **Port Conflict**: Ensure no other service is using port 3000 or 5432.
