# ⚡ Enargy: Blockchain-Based Smart Energy Meter

An end-to-end IoT system for secure, transparent, and automated energy monitoring and billing.

[![GitHub Repo](https://img.shields.io/badge/GitHub-Priyan--19%2FEnargy-blue?logo=github)](https://github.com/Priyan-19/Enargy)

---

## 🏗️ Project Architecture

-   **ESP32 Firmware**: Reads voltage/current from sensors, generates data hashes, and sends readings every 2 minutes.
-   **Node.js Backend**: Validates incoming data, stores it in **PostgreSQL**, and anchors it to the blockchain.
-   **Hardhat Blockchain**: A Solidity smart contract (Ethers v6) providing an immutable ledger for energy readings.
-   **React Dashboard**: Real-time analytics, automated billing (Slab system), and Razorpay payment integration.

---

## 📂 Folder Structure

```text
EB/
├── backend/                  # Node.js + Express API
│   ├── blockchain/           # Ethers.js client for Smart Contract
│   ├── db/                   # PostgreSQL connection & schema
│   ├── middleware/           # API auth & request validation
│   ├── routes/               # Express API endpoints (energy, payment)
│   ├── scripts/              # Helper scripts (test data simulator)
│   ├── .env                  # Environment configurations
│   └── server.js             # Backend entry point
├── blockchain/               # Hardhat + Solidity project
│   ├── contracts/            # Smart Contracts (EnergyMeter.sol)
│   ├── scripts/              # Deployment scripts
│   └── hardhat.config.js     # Hardhat settings
├── frontend/                 # React.js + Vite Dashboard
│   └── src/
│       ├── pages/            # App Views (Admin, Consumer, Login)
│       ├── services/         # Axios API configurations
│       ├── App.jsx           # Application routing
│       └── index.css         # Global styling
├── esp32_firmware/           # Arduino IDE Code
│   └── energy_meter/
│       └── energy_meter.ino  # Main ESP32 source code
├── COMPLETE_SETUP_GUIDE.md   # Deep dive configuration instructions
├── RUN_INSTRUCTIONS.md       # Quick start guides for testing
├── CREDENTIALS.md            # Default login credentials
└── README.md                 # Project Overview (This file)
```

---

## 🚀 Quick Setup

### 1. Database
Create a PostgreSQL database named `enargy` and run:
`psql -U postgres -d enargy -f backend/db/schema.sql`

### 2. Blockchain
```bash
cd blockchain
npm install
npx hardhat node
# (In a new terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Backend
Update `backend/.env` with your DB credentials and the `CONTRACT_ADDRESS` from the step above.
```bash
cd backend
npm install
npm run dev
```

### 4. Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📖 Documentation
Detailed guides are available in the repository:
-   [**Complete Setup Guide**](COMPLETE_SETUP_GUIDE.md) - Deep dive into all configurations.
-   [**Setup Instructions**](setup_instructions.md) - Simplified quick start guide.

---

© 2026 Priyan-19. All rights reserved.
