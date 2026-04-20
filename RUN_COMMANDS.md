# 🚀 Enargy: Manual Run Commands & Credentials

Use this guide to quickly spin up the **Enargy** ecosystem for development. You will need to open **three separate terminals**.

---

## 🏃 Execution Order

### Terminal 1: Blockchain Node
Start the local Ethereum network using Hardhat.
```powershell
cd blockchain
npx hardhat node
```
*Note: Keep this running. It acts as our local ledger.*

### Terminal 2: Backend API
Start the Node.js server to bridge IoT, Database, and Blockchain.
```powershell
cd backend
npm run dev
```
*Runs on: http://localhost:3000*

### Terminal 3: Frontend Dashboard
Start the React interface for users and admins.
```powershell
cd frontend
npm run dev
```
*Runs on: http://localhost:5173*

---

## 🔑 Access Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin (EB)** | `EB-Admin` | `TNEB@ADMIN` | 
| **Consumer** | `MTR001` | `TNEB@MTR001` |

> [!TIP]
> Consumer passwords follow the format `TNEB@{{meter_id}}`.

---

## 🛠️ Maintenance Commands

- **Compile Smart Contracts**: `cd blockchain; npx hardhat compile`
- **Deploy Contracts**: `cd blockchain; npx hardhat run scripts/deploy.js --network localhost`
- **Reinstall All Dependencies**: Run `npm install` in `backend`, `frontend`, and `blockchain` folders.
