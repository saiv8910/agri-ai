export type UserRole = 'farmer' | 'buyer' | 'expert' | 'government' | 'admin';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'pa' | 'ta' | 'te' | 'kn' | 'bn';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  location: {
    district: string;
    state: string;
    pincode: string;
  };
  farmSizeAcres?: number;
  primaryCrops?: string[];
  avatarUrl?: string;
  verified: boolean;
}

export interface DiseaseDetectionResult {
  id: string;
  timestamp: string;
  imageUrl: string;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  confidence: number; // percentage
  severity: 'low' | 'moderate' | 'high' | 'severe';
  symptoms: string[];
  chemicalTreatment: string[];
  organicAlternatives: string[];
  preventiveMeasures: string[];
  nearbyShops: NearbyShop[];
}

export interface NearbyShop {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  phone: string;
  rating: number;
  verified: boolean;
  stockAvailable: string[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  uvIndex: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Overcast';
  soilMoisture: number;
  forecast7Days: {
    day: string;
    high: number;
    low: number;
    rainProb: number;
    condition: string;
  }[];
  agriAlerts: {
    id: string;
    type: 'warning' | 'info' | 'critical';
    title: string;
    message: string;
    action: string;
  }[];
}

export interface YieldPredictionInput {
  crop: string;
  acreage: number;
  state: string;
  district: string;
  season: string;
  soilType: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  phLevel: number;
  irrigationType: string;
  pastYieldQuintals: number;
}

export interface YieldPredictionResult {
  expectedYieldQuintals: number;
  yieldPerAcre: number;
  confidence: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  potentialRevenueEst: number;
  recommendations: string[];
  deficiencyWarning?: string;
}

export interface FertilizerRecommendation {
  crop: string;
  growthStage: 'Sowing' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Pre-Harvest';
  primaryNutrientNeeded: string;
  recommendedFertilizer: string;
  dosagePerAcre: string;
  applicationSchedule: string;
  estimatedCostRs: number;
  organicAlternative: string;
}

export interface MandiPriceItem {
  id: string;
  crop: string;
  variety: string;
  mandiName: string;
  district: string;
  state: string;
  currentPrice: number; // per quintal
  yesterdayPrice: number;
  priceChangePercent: number;
  predictedTomorrow: number;
  predictedNextWeek: number;
  predictedNextMonth: number;
  recommendation: 'SELL TODAY' | 'HOLD' | 'WAIT';
  historicalData: { date: string; price: number }[];
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerRating: number;
  crop: string;
  variety: string;
  quantityQuintals: number;
  pricePerKg: number;
  minOrderKg: number;
  harvestDate: string;
  location: string;
  district: string;
  state: string;
  organic: boolean;
  images: string[];
  status: 'available' | 'reserved' | 'sold';
}

export interface MarketplaceOrder {
  id: string;
  listingId: string;
  cropName: string;
  buyerName: string;
  buyerPhone: string;
  quantityKg: number;
  totalPriceRs: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'in_transit' | 'delivered';
  deliveryAddress: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  ministry: string;
  category: 'Subsidy' | 'Insurance' | 'Credit' | 'Equipment' | 'Soil Health';
  subsidyAmount: string;
  eligibility: string[];
  benefits: string;
  documentsRequired: string[];
  applyUrl: string;
}

export interface LoanOption {
  bankName: string;
  schemeName: string;
  maxAmountRs: number;
  interestRatePercent: number;
  subventionAvailable: boolean;
  effectiveRate: number;
  tenureYears: number;
  eligibility: string;
}

export interface CropTask {
  id: string;
  date: string;
  crop: string;
  taskType: 'Sowing' | 'Irrigation' | 'Fertilizer' | 'Pest Control' | 'Weeding' | 'Harvest';
  title: string;
  notes: string;
  completed: boolean;
  alertLevel: 'normal' | 'important';
}

export interface FarmFinancialItem {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

export interface IoTSensorData {
  soilMoisturePct: number;
  soilTempC: number;
  nitrogenPpm: number;
  phosphorusPpm: number;
  potassiumPpm: number;
  soilPh: number;
  lastUpdated: string;
  batteryPct: number;
}

export interface SatelliteNDVIData {
  ndviValue: number; // 0.0 - 1.0
  healthStatus: 'Excellent' | 'Good' | 'Moderate Concern' | 'Stress Detected';
  vegetationCoveragePct: number;
  waterStressPct: number;
  cloudCoverPct: number;
  satellitePassDate: string;
}
