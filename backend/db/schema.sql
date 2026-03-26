-- ============================================================
-- Enargy: Blockchain-Based Smart Energy Meter
-- PostgreSQL Schema Setup
-- ============================================================

-- Create the database (run this manually in psql as superuser)
-- CREATE DATABASE enargy;

-- Connect to the enargy database and run the rest:

-- ============================================================
-- TABLE: energy_readings
-- Stores every reading sent by the ESP32 meter
-- ============================================================
CREATE TABLE IF NOT EXISTS energy_readings (
    id                SERIAL PRIMARY KEY,          -- Auto-incrementing row ID
    meter_id          VARCHAR(50)  NOT NULL,        -- Meter identifier (e.g. "MTR001")
    timestamp         TIMESTAMP    NOT NULL,        -- Reading timestamp from device
    voltage           FLOAT        NOT NULL,        -- Voltage in Volts
    current           FLOAT        NOT NULL,        -- Current in Amperes
    power             FLOAT        NOT NULL,        -- Power in Watts
    energy_kwh        FLOAT        NOT NULL,        -- Cumulative energy in kWh
    hash              TEXT         NOT NULL,        -- Integrity hash from ESP32
    blockchain_tx_hash TEXT,                        -- Ethereum transaction hash (filled after blockchain write)
    created_at        TIMESTAMP    DEFAULT NOW()    -- Server-side insert timestamp
);

-- Index to speed up meter-specific queries
CREATE INDEX IF NOT EXISTS idx_energy_meter_id ON energy_readings(meter_id);
CREATE INDEX IF NOT EXISTS idx_energy_timestamp ON energy_readings(timestamp);

-- ============================================================
-- TABLE: payments
-- Stores Razorpay payment records
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
    id                SERIAL PRIMARY KEY,
    meter_id          VARCHAR(50)  NOT NULL,
    bill_month        VARCHAR(20)  NOT NULL,        -- e.g. "2026-03"
    amount            FLOAT        NOT NULL,        -- Billed amount in ₹
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    status            VARCHAR(20)  DEFAULT 'pending', -- pending | paid | failed
    created_at        TIMESTAMP    DEFAULT NOW()
);

-- ============================================================
-- Verify tables exist
-- ============================================================
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
