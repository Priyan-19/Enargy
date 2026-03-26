# ⚡ Enargy Setup Instructions

A concise guide for setting up and running the Enargy Smart Energy Meter project.

---

## 🏗️ 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [PostgreSQL](https://www.postgresql.org/) (Running on 5432)
- [NPM](https://www.npmjs.com/)

---

## 🗄️ 2. Database Creation
1. Create a database named `enargy` in PostgreSQL.
2. Initialize tables:
   ```bash
   psql -U postgres -d enargy -f backend/db/schema.sql
   ```
3. Confirm tables `energy_readings` and `payments` exist.

---

## 🔗 3. Smart Contract Deployment (Blockchain)
1. Install and start the local node:
   ```bash
   cd blockchain
   npm install
   npx hardhat node
   ```
2. **In a new terminal**, deploy the contract:
   ```bash
   cd blockchain
   npx hardhat run scripts/deploy.js --network localhost
   ```
3. **Important**: Copy the "Contract Address" from the terminal output (e.g., `0xe7f...`).

---

## ⚙️ 4. API & Backend Setup
1. Configure `backend/.env`:
   - Set `DB_PASSWORD` to your PostgreSQL password.
   - Set `CONTRACT_ADDRESS` to the address from step 3.
2. Install and launch the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

---

## 🚀 5. Running the System
You need to have **three terminals** running:

-   **Terminal 1**: `npx hardhat node` (Local Blockchain)
-   **Terminal 2**: `npm run dev` (Backend API)
-   **Terminal 3**: `npm run dev` (Frontend Dashboard)

**Dashboards**:
-   Access at `http://localhost:5173` or `http://localhost:3000`.

---

## 🧪 6. Simulating Data
No ESP32? Use the data simulator:
```bash
cd backend
node scripts/test_esp32.js
```
This script pushes data every 10 seconds to the backend, which will then store it in PostgreSQL and send it to the blockchain automatically.

---

## 🔌 7. ESP32 Hardware
1. Update `energy_meter.ino` with your actual IPv4 address (e.g., `serverName = "http://10.193.174.82..."`).
2. Current sensor pin (A0) and voltage sensor pin (A1).
3. Readings are sent every **2 minutes**.

---

**© 2026 Enargy Project.**
