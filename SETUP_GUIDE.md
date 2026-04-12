# ⚡ Enargy: Setup & Execution Guide

This guide provides a comprehensive, step-by-step procedure to set up and run the **Enargy** Blockchain-Based Smart Energy Meter system.

---

## 🏗️ Project Overview
Enargy is an end-to-end IoT ecosystem consisting of:
1.  **Blockchain (Hardhat)**: Immutable ledger for energy readings.
2.  **Backend (Node.js)**: API bridge between IoT and Blockchain.
3.  **Frontend (React)**: Real-time monitoring and billing dashboard.
4.  **IoT Firmware (ESP32)**: Hardware code for energy sensing.

---

## 🛠️ Step 1: Database Setup (PostgreSQL)
The project uses PostgreSQL for caching and historical data.

1.  **Install PostgreSQL**: Ensure it's running on port `5432`.
2.  **Create Database**:
    ```sql
    CREATE DATABASE enargy;
    ```
3.  **Initialize Schema**:
    If you do not have the `psql` tool in your PATH, you can run the built-in Node.js script:
    ```bash
    cd backend
    node scripts/init_db.js
    ```

---

## 🔗 Step 2: Blockchain Initialization
1.  **Navigate to Directory**:
    ```bash
    cd blockchain
    ```
2.  **Start Local Node**:
    ```bash
    npx hardhat node
    ```
    *Keep this terminal running.*
3.  **Deploy Smart Contract** (in a new terminal):
    ```bash
    cd blockchain
    npx hardhat run scripts/deploy.js --network localhost
    ```
4.  **Copy the Contract Address**: Note the address printed (e.g., `0x5FbDB...`).

---

## ⚙️ Step 3: Backend Configuration
1.  **Navigate to Directory**:
    ```bash
    cd backend
    ```
2.  **Configure Environment**:
    -   Copy `.env.example` to `.env`.
    -   Update `DB_PASSWORD` with your PostgreSQL password.
    -   Update `CONTRACT_ADDRESS` with the address from Step 2.
3.  **Start Server**:
    ```bash
    npm run dev
    ```
    *Server runs on http://localhost:3000.*

---

## 💻 Step 4: Frontend Dashboard
1.  **Navigate to Directory**:
    ```bash
    cd frontend
    ```
2.  **Start Dashboard**:
    ```bash
    npm run dev
    ```
    *Access at http://localhost:5173.*

---

## 🧪 Step 5: Data Simulation (Optional)
If you don't have the ESP32 hardware connected, you can simulate energy readings:
```bash
cd backend
node scripts/test_esp32.js
```

---

## 🔑 Default Credentials
| Portal | Username | Password |
|--------|----------|----------|
| **Admin** | `EB-Admin` | `TNEB@ADMIN` |
| **Consumer** | `MTR001` | `TNEB@MTR001` |

---

## 🛑 Troubleshooting
-   **Blockchain Restart**: If you restart `npx hardhat node`, you **must** redeploy the contract and update the `CONTRACT_ADDRESS` in `backend/.env`.
-   **PostgreSQL Port**: Ensure no other service is occupying port `5432`.
-   **ESP32 Connectivity**: Ensure the `serverName` in `energy_meter.ino` matches your computer's local IP address.
