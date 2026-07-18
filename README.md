# AgriAI – Intelligent AI Farming Assistant for India 🌾🤖

AgriAI is an enterprise-grade, modern AI-powered SaaS agriculture platform designed to empower Indian farmers, agricultural buyers, agronomists, state officials, and platform administrators.

---

## 🌟 Key Features & AI Modules

1. **AI Leaf Disease Detection**: Drag & drop / camera leaf scan powered by PyTorch vision models. Provides pathogen diagnosis, severity level, chemical sprays, organic bio-remedies, and nearby agritech store lookup with stock details.
2. **Multilingual Voice AI Assistant**: IndicLLM powered conversational voice chatbot supporting English, Hindi, Marathi, Punjabi, Tamil, Telugu, Kannada, and Bengali with Web Speech STT & TTS audio synthesis.
3. **Hyper-Local Weather Intelligence**: Atmospheric micro-climate tracking with 7-day forecasts, soil moisture sensors, and actionable agronomic warnings (e.g. "Postpone chemical spray due to rain").
4. **AI Yield & Fertilizer Predictor**: XGBoost / LightGBM regression calculator taking soil NPK + pH + acreage -> predicting harvest yield (quintals), potential gross mandi revenue, risk rating, and growth-stage fertilizer prescriptions.
5. **APMC Mandi Price Intelligence**: Real-time mandi rates across Indian states with Recharts line graphs, 30-day AI forecasts, and dynamic **SELL TODAY / HOLD / WAIT** recommendations.
6. **Direct B2B Marketplace**: Farmer-to-Buyer trade portal with zero middleman commissions, produce listing creation, buyer lot filter, instant negotiation, and escrow order tracking.
7. **Government Schemes & Loan Assistant**: Scheme eligibility checker (PM-KISAN, PMFBY, SMAM) and Kisan Credit Card (KCC) bank comparison with 3% interest subvention.
8. **Crop Calendar, Ledger & Telemetry Hub**: Interactive farming task schedule, farm income/expense ledgers, ground IoT sensor feeds, and Sentinel-2 satellite NDVI vegetation health indices.
9. **Role-Based Portals**: Specialized workflows for Farmers, Buyers, Agronomists (Disease Review Queue), Government Officials (Drought & Pest Telemetry), and Admins.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS v4 + Glassmorphism + Dark/Light Theme
- **Data Visualization**: Recharts (Mandi price trends & financial charts)
- **Voice & Accessibility**: Web Speech API (Speech-to-Text & Text-to-Speech synthesis)
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python 3.10) with Pydantic v2 & OpenAPI Swagger docs
- **Database**: PostgreSQL 15 (Normalized schema with UUIDv4, foreign keys, indexes, audit timestamps, soft deletes)
- **Caching & Async**: Redis 7 + Celery worker queue
- **AI Models**: PyTorch (Vision Convolutional Model), XGBoost (Yield & Pest Predictor)

---

## 🚀 Running the Project

### 1. Frontend Web App
```bash
# Navigate to project directory
cd /Users/amazing/.gemini/antigravity/scratch/agri-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

### 2. Backend FastAPI Server
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser to test OpenAPI Swagger docs.

### 3. Full Stack Docker Deployment
```bash
docker-compose up --build -d
```
