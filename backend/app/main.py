"""
AgriAI - FastAPI Enterprise Backend Application
Includes OpenAPI Swagger docs, JWT Auth, PyTorch/YOLOv8 vision inference, ML yield forecasting, and B2B marketplace endpoints.
"""

from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import datetime
import uuid

app = FastAPI(
    title="AgriAI Enterprise API",
    description="Intelligent AI Farming Assistant for India REST API Server",
    version="2.5.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic v2 Models
class UserRegister(BaseModel):
    full_name: str
    phone_number: str
    password: str
    role: str = Field(default="farmer")
    district: str
    state: str
    pincode: str

class YieldPredictRequest(BaseModel):
    crop: str
    acreage: float
    nitrogen: int
    phosphorus: int
    potassium: int
    ph_level: float
    district: str

class YieldPredictResponse(BaseModel):
    expected_yield_quintals: float
    yield_per_acre: float
    confidence_pct: float
    risk_level: str
    estimated_revenue_rs: float

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "AgriAI FastAPI Backend",
        "version": "2.5.0",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

@app.post("/api/v1/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister):
    return {
        "id": str(uuid.uuid4()),
        "full_name": user.full_name,
        "phone_number": user.phone_number,
        "role": user.role,
        "access_token": f"jwt_mock_token_{uuid.uuid4().hex[:12]}",
        "token_type": "bearer"
    }

@app.post("/api/v1/ai/disease-diagnosis")
async def diagnose_leaf_disease(file: UploadFile = File(...)):
    # Simulated PyTorch / YOLOv8 Vision Model Pipeline
    return {
        "diagnosis_id": str(uuid.uuid4()),
        "filename": file.filename,
        "crop_name": "Tomato",
        "disease_name": "Early Blight (Alternaria solani)",
        "scientific_name": "Alternaria solani",
        "confidence_pct": 94.8,
        "severity": "high",
        "chemical_treatment": [
            "Spray Chlorothalonil 75% WP @ 2g/liter of water",
            "Apply Mancozeb 75% WP @ 2.5g/liter at 10-day intervals"
        ],
        "organic_alternatives": [
            "Neem oil spray (10,000 PPM) @ 5ml/liter with liquid soap",
            "Trichoderma viride bio-fungicide (5g/liter)"
        ]
    }

@app.post("/api/v1/ai/predict-yield", response_model=YieldPredictResponse)
def predict_yield(req: YieldPredictRequest):
    # Simulated XGBoost Regression Inference
    base_per_acre = 33.0 if req.crop.lower() == "onion" else 42.0
    total_yield = round(base_per_acre * req.acreage * (1 + (req.nitrogen - 100) / 400), 1)
    per_acre = round(total_yield / req.acreage, 1)
    est_price = 2850.0 if req.crop.lower() == "onion" else 4000.0

    return {
        "expected_yield_quintals": total_yield,
        "yield_per_acre": per_acre,
        "confidence_pct": 94.1,
        "risk_level": "Low" if 6.0 <= req.ph_level <= 7.5 else "Moderate",
        "estimated_revenue_rs": round(total_yield * est_price, 2)
    }

@app.get("/api/v1/market/prices/{crop_name}")
def get_mandi_prices(crop_name: str, state: str = "Maharashtra"):
    return {
        "crop": crop_name,
        "state": state,
        "mandi_name": "Lasalgaon APMC",
        "current_modal_price": 2850.0,
        "yesterday_price": 2600.0,
        "change_pct": 9.6,
        "predicted_tomorrow": 2980.0,
        "ai_recommendation": "HOLD"
    }
