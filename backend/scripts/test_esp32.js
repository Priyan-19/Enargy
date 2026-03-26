// ============================================================
// scripts/test_esp32.js – Mock ESP32 Simulator
//
// Sends energy data to the Node.js backend every 10 seconds,
// just like the real ESP32 would.
// ============================================================

const axios = require('axios');
const crypto = require('crypto');

const API_URL = 'http://localhost:3000/api/energy';
const API_KEY = 'EB_SECURE_KEY_123'; // Must match backend/.env
const METER_ID = 'MTR001';

console.log('🚀 Starting ESP32 Simulator...');
console.log(`📡 Sending data to ${API_URL}...`);

// Initial energy state
let energyKwh = 0.025;

function generateData() {
  const timestamp = new Date().toISOString().split('.')[0];
  const voltage   = (Math.random() * (245 - 220) + 220).toFixed(2); // 220-245V
  const current   = (Math.random() * (2.0 - 0.1) + 0.1).toFixed(3); // 0.1-2.0A
  const power     = (voltage * current).toFixed(2);
  
  // Power increments energy (Simplified: Wh = W * (10s / 3600s))
  const energyIncrement = (power * (10 / 3600)) / 1000;
  energyKwh += energyIncrement;

  // Create hash (In real ESP32, this is a SHA256 of the data string)
  const dataString = `${METER_ID}${timestamp}${voltage}${current}${power}${energyKwh.toFixed(4)}`;
  const hash = crypto.createHash('sha256').update(dataString).digest('hex');

  return {
    meter_id:  METER_ID,
    timestamp: timestamp,
    voltage:   parseFloat(voltage),
    current:   parseFloat(current),
    power:     parseFloat(power),
    energy_kwh: parseFloat(energyKwh.toFixed(4)),
    hash:      hash
  };
}

async function sendData() {
  const data = generateData();
  
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':    API_KEY
      }
    });
    
    console.log(`✅ [${data.timestamp}] Sent! DB ID: ${response.data.id} | TX: ${response.data.blockchain_tx_hash?.substring(0,10)}...`);
  } catch (err) {
    console.error(`❌ [${data.timestamp}] FAILED:`, err.response?.data?.error || err.message);
  }
}

// Send every 10 seconds
setInterval(sendData, 10000);

// Also send one immediately
sendData();
