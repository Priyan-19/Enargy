import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxied via Vite
  headers: {
    'Content-Type': 'application/json'
  }
});

// For ESP32 data ingestion (x-api-key)
export const setApiKey = (key) => {
  api.defaults.headers.common['x-api-key'] = key;
};

// Consumers
export const getLatestReadings = () => api.get('/readings?limit=10');
export const getMeterReadings = (meterId) => api.get(`/meter/${meterId}`);
export const getBilling = (meterId) => api.get(`/bill/${meterId}`);

// Admin
export const getBlockchainData = () => api.get('/blockchain');
export const getAllReadings = () => api.get('/readings?limit=100');

export default api;
