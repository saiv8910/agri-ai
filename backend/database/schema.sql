-- ============================================================================
-- AgriAI Platform Production PostgreSQL DDL Schema
-- Environment: PostgreSQL 15+
-- Features: UUIDv4 PKs, Normalized Tables, Foreign Keys, Indexing, Audit Columns, Soft Deletes
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- ENUM TYPES
-- ----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('farmer', 'buyer', 'expert', 'government', 'admin');
CREATE TYPE disease_severity AS ENUM ('low', 'moderate', 'high', 'severe');
CREATE TYPE mandi_recommendation AS ENUM ('SELL TODAY', 'HOLD', 'WAIT');
CREATE TYPE listing_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled');
CREATE TYPE task_category AS ENUM ('Sowing', 'Irrigation', 'Fertilizer', 'Pest Control', 'Weeding', 'Harvest');

-- ----------------------------------------------------------------------------
-- 1. USERS & PROFILES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'farmer',
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    farm_size_acres DECIMAL(8, 2) DEFAULT 0.0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_location ON users(state, district);

-- ----------------------------------------------------------------------------
-- 2. AI CROP DISEASE DIAGNOSIS HISTORY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE disease_diagnoses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_s3_url VARCHAR(500) NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    disease_name VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(150),
    confidence_score DECIMAL(5, 2) NOT NULL, -- e.g. 94.80%
    severity disease_severity NOT NULL,
    chemical_treatment JSONB DEFAULT '[]'::jsonb,
    organic_alternatives JSONB DEFAULT '[]'::jsonb,
    preventive_measures JSONB DEFAULT '[]'::jsonb,
    verified_by_expert_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disease_farmer ON disease_diagnoses(farmer_id);
CREATE INDEX idx_disease_crop ON disease_diagnoses(crop_name);

-- ----------------------------------------------------------------------------
-- 3. APMC MANDI PRICES & TREND PREDICTIONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE mandi_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_name VARCHAR(100) NOT NULL,
    variety VARCHAR(100) NOT NULL,
    mandi_name VARCHAR(150) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    current_modal_price_rs DECIMAL(10, 2) NOT NULL,
    yesterday_price_rs DECIMAL(10, 2) NOT NULL,
    price_change_pct DECIMAL(5, 2) NOT NULL,
    predicted_tomorrow_rs DECIMAL(10, 2) NOT NULL,
    predicted_next_week_rs DECIMAL(10, 2) NOT NULL,
    ai_recommendation mandi_recommendation NOT NULL DEFAULT 'HOLD',
    recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mandi_crop_loc ON mandi_prices(crop_name, state, district);
CREATE INDEX idx_mandi_date ON mandi_prices(recorded_date);

-- ----------------------------------------------------------------------------
-- 4. B2B PRODUCE LISTINGS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE produce_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    variety VARCHAR(100) NOT NULL,
    quantity_quintals DECIMAL(10, 2) NOT NULL,
    price_per_kg_rs DECIMAL(10, 2) NOT NULL,
    min_order_kg INT NOT NULL DEFAULT 500,
    harvest_date DATE NOT NULL,
    is_organic BOOLEAN DEFAULT FALSE,
    image_urls JSONB DEFAULT '[]'::jsonb,
    status listing_status DEFAULT 'available',
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_listings_crop ON produce_listings(crop_name);
CREATE INDEX idx_listings_status ON produce_listings(status);

-- ----------------------------------------------------------------------------
-- 5. B2B ORDERS & ESCROW PAYMENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE marketplace_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES produce_listings(id) ON DELETE RESTRICT,
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    quantity_kg INT NOT NULL,
    total_price_rs DECIMAL(12, 2) NOT NULL,
    escrow_locked BOOLEAN DEFAULT TRUE,
    status order_status DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    tracking_number VARCHAR(100),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_buyer ON marketplace_orders(buyer_id);
CREATE INDEX idx_orders_farmer ON marketplace_orders(farmer_id);
CREATE INDEX idx_orders_status ON marketplace_orders(status);

-- ----------------------------------------------------------------------------
-- 6. CROP CALENDAR & TASK SCHEDULE TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE crop_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    task_category task_category NOT NULL,
    title VARCHAR(200) NOT NULL,
    notes TEXT,
    scheduled_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_farmer_date ON crop_tasks(farmer_id, scheduled_date);

-- ----------------------------------------------------------------------------
-- 7. IOT SENSOR & SATELLITE NDVI TELEMETRY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE telemetry_feeds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    soil_moisture_pct DECIMAL(5, 2),
    soil_temp_c DECIMAL(5, 2),
    nitrogen_ppm INT,
    phosphorus_ppm INT,
    potassium_ppm INT,
    soil_ph DECIMAL(4, 2),
    ndvi_score DECIMAL(4, 3), -- 0.000 to 1.000
    satellite_overpass_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_telemetry_farmer ON telemetry_feeds(farmer_id, created_at DESC);
