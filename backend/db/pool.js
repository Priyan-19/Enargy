// ============================================================
// db/pool.js – PostgreSQL Connection Pool
// Uses the "pg" library to create a reusable connection pool.
// ============================================================

const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool (automatically manages multiple connections)
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'enargy',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'yourpassword',
});

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
  } else {
    console.log('✅ PostgreSQL connected successfully');
    release(); // Return client back to pool
  }
});

module.exports = pool;
