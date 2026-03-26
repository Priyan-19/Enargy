# 🚀 How to Run the Project (Manual Checklist)

To run the complete **Enargy** suite locally, open **three** separate terminals on your computer.

---

### 🟢 Terminal 1: Blockchain Node
Provide a local Ethereum network for the smart contract.
```powershell
cd blockchain
npx hardhat node
```
*(Leave this terminal running in the background)*.

---

### 🔵 Terminal 2: Node.js Backend API
The bridge between your IoT devices and the blockchain.
```powershell
cd backend
npm run dev
```
*(Server will be live on http://localhost:3000)*.

---

### 🟠 Terminal 3: React.js Frontend Dashboard
The user-facing dashboard for consumers and admins.
```powershell
cd frontend
npm run dev
```
*(Access at http://localhost:5173 or http://localhost:3000)*.

---

### 📡 Terminal 4: Data Simulator (Simulation Mode)
If you don't have the real ESP32 connected, run this to generate data.
```powershell
cd backend
node scripts/test_esp32.js
```
*(This will push a reading every 10 seconds to your dashboard)*.

---

### 🖱️ Access the Local System

| Interface | URL | Credentials |
|-----------|-----|-------------|
| **Admin Authority** | [http://localhost:3000](http://localhost:3000) | `EB-Admin` / `TNEB@ADMIN` |
| **Consumer Portal** | [http://localhost:3000](http://localhost:3000) | `MTR001` / `TNEB@MTR001` |

---

### 💡 Tips
-   **Contract Re-deployment**: If you restart the blockchain node, you must re-run `npx hardhat run scripts/deploy.js --network localhost` in the blockchain folder.
-   **Credentials**: Check [CREDENTIALS.md](CREDENTIALS.md) for more details.
