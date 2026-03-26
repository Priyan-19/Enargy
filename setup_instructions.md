# ⚡ Enargy Setup Guide

A complete Blockchain-Based Smart Energy Meter System with real-time monitoring and automated billing.

---

## 🏗️ 1. Prerequisites

Before starting, ensure you have:
- [Node.js](https://nodejs.org/) (v16+)
- [PostgreSQL](https://www.postgresql.org/) (Running on port 5432)
- [NPM](https://www.npmjs.com/)

---

## 🗄️ 2. Database Setup

1. Open your PostgreSQL tool (pgAdmin, psql, etc.).
2. Create a new database named `enargy`.
3. Run the SQL script from `backend/db/schema.sql`:
   ```sql
   psql -U postgres -d enargy -f backend/db/schema.sql
   ```
4. Verify the `energy_readings` and `payments` tables exist.

---

## 🔗 3. Blockchain Deployment

This project uses a local Hardhat network for testing the Smart Contract.

1. Open a new terminal in the `blockchain/` folder:
   ```bash
   cd blockchain
   npm install
   ```
2. Start the Hardhat local node:
   ```bash
   npx hardhat node
   ```
3. Open a **second** terminal and deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
4. **IMPORTANT**: Copy the printed "Contract Address" (e.g., `0x5Fb...`).

---

## ⚙️ 4. Backend Configuration

1. Go into the `backend/` folder:
   ```bash
   cd backend
   npm install
   ```
2. Open the `.env` file (or copy from `.env.example`).
3. Paste the **Contract Address** from step 3 into `CONTRACT_ADDRESS`.
4. (Optional) Insert your PostgreSQL password in `DB_PASSWORD`.

---

## 🚀 5. Running the System

To see everything in action, you need three terminals:

### Terminal 1: Hardhat Node
Already running from Step 3. Keep it open.

### Terminal 2: Backend API
```bash
cd backend
npm run dev
```

### Terminal 3: Frontend Dashboard
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 6. Simulating ESP32 Data

If you don't have the real ESP32 running yet, use our built-in simulator:

```bash
cd backend
node scripts/test_esp32.js
```

This will start sending data every 10 seconds to the backend, which will then store it in PostgreSQL and send it to the blockchain. You will see the charts in the dashboard update automatically!

---

## 💳 7. Payment Integration (Optional)

To test payments, get your **Razorpay Test Keys** from the [Razorpay Dashboard](https://dashboard.razorpay.com/) and paste them into `backend/.env`.

- `RAZORPAY_KEY_ID`: `rzp_test_...`
- `RAZORPAY_KEY_SECRET`: `your_secret`

When paying, use the [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-mode/) (e.g., card number 4111 1111 1111 1111).
