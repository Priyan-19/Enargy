# Enargy – Blockchain-Based Smart Energy Meter System

## Folder Structure

```
EB/
├── backend/          # Node.js + Express API
├── blockchain/       # Hardhat + Solidity smart contract
├── frontend/         # React.js dashboard
└── README.md
```

## Quick Start

1. Setup PostgreSQL (see backend/db/schema.sql)
2. Configure backend/.env
3. Start backend: cd backend && npm start
4. Deploy contract: cd blockchain && npx hardhat run scripts/deploy.js --network localhost
5. Start frontend: cd frontend && npm start
