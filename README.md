# ⚡ Enargy: Blockchain-Integrated Smart Energy Grid

**Enargy** is a next-generation smart energy management ecosystem that combines IoT hardware, decentralized ledgers, and modern web interfaces to provide a transparent, secure, and automated electricity billing solution.

The project addresses the core challenges of traditional energy grids: data tampering, billing disputes, and lack of real-time transparency.

---

## 🏗️ System Architecture

Enargy operates through four interconnected layers:

1.  **IoT Layer (ESP32 Firmware)**: Captures real-time energy data from physical lines and transmits it with cryptographic integrity hashes.
2.  **Orchestration Layer (Node.js Backend)**: Receives IoT data, verifies its integrity, manages the relational database, and bridges to the blockchain.
3.  **Trust Layer (Ethereum Blockchain)**: Stores immutable energy consumption records and executes billing logic via Solidity smart contracts.
4.  **Presentation Layer (React Frontend)**: Provides an interactive dashboard for consumers to monitor usage and for the Electricity Board (EB) to manage the grid.

---

## ✨ Key Features

-   **Tamper-Proof Data**: Every reading is hashed using SHA256 at the source (ESP32) and verified by the backend.
-   **Immutable Records**: Historical consumption is stored on a decentralized ledger, making it impossible to alter past bills.
-   **Real-time Monitoring**: Live visualization of voltage, current, power, and total consumption.
-   **Automated Billing**: Smart contracts calculate monthly bills based on predefined tariffs.
-   **Integrated Payments**: Native Razorpay integration for seamless bill settlement.
-   **Hardware Simulation**: Full-stack testing is possible without physical hardware using the built-in "Simulated Mode" in the firmware.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Chart.js, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js, Ethers.js, PostgreSQL |
| **Blockchain** | Solidity, Hardhat, OpenZeppelin |
| **IoT/Hardware** | C++, ESP32, PZEM-004T Sensor |

---

## 📂 Project Structure

```text
Enargy/
├── backend/            # Node.js API server & Database logic
├── blockchain/         # Hardhat project with Solidity contracts
├── esp32_firmware/     # Arduino/C++ code for the energy meter
├── frontend/           # React dashboard & UI
└── RUN_COMMANDS.md     # Quick-start execution guide
```

---

## 🚀 Getting Started

To set up the full ecosystem, you will need to open **three separate terminals**.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+)
-   [PostgreSQL](https://www.postgresql.org/) (Running locally or via cloud)
-   [Arduino IDE](https://www.arduino.cc/en/software) (for ESP32 deployment)

### 1. Blockchain Setup
```powershell
cd blockchain
npm install
npx hardhat node  # Starts local Ethereum node
```

### 2. Backend Setup
```powershell
cd backend
npm install
# Configure .env with your DB and Blockchain credentials
npm run dev
```

### 3. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```

---

## 🔑 Access Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin (EB)** | `EB-Admin` | `TNEB@ADMIN` | 
| **Consumer** | `MTR001` | `TNEB@MTR001` |

---

## 🔒 Security Implementation

### Data Integrity
The ESP32 calculates a SHA256 hash of the JSON payload containing:
-   `meter_id`
-   `voltage`, `current`, `power`, `energy`
-   `timestamp`

The backend recalculates this hash. If they don't match, the reading is rejected as "tampered."

### Blockchain Trust
Once verified, the backend sends the reading to the `EnergyMeter` smart contract. The contract stores:
-   The total consumption for the period.
-   The root hash of the data for future audits.

---

## 📄 License

This project is developed for educational and research purposes in the field of Smart Grids and Blockchain technology.
