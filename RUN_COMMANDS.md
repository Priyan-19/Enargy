# 🚀 Manual Run Commands & Credentials

Use this cheatsheet to quickly start the **Enargy** system for daily development. You will need to open **three separate terminals**.

---

## 🏃 Run Commands

### Terminal 1: Blockchain Node
Start the local Ethereum network:
```powershell
cd blockchain
npx hardhat node
```
*(Leave this running in the background)*

### Terminal 2: Backend API
Start the Node.js server to bridge IoT, DB, and Blockchain:
```powershell
cd backend
npm run dev
```
*(Runs on http://localhost:3000)*

### Terminal 3: Frontend Dashboard
Start the React interface:
```powershell
cd frontend
npm run dev
```
*(Runs on http://localhost:5173)*

---

## 🔑 Login Credentials

Use the following credentials to access the web dashboard:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin (Electricity Board)** | `EB-Admin` | `TNEB@ADMIN` |
| **Consumer (Electricity User)** | `MTR001` | `TNEB@MTR001` |

*(Note: Consumer passwords follow the format `TNEB@{{meter_id}}`)*
