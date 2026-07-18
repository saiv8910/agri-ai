import type {
  DiseaseDetectionResult,
  WeatherData,
  MandiPriceItem,
  ProduceListing,
  GovernmentScheme,
  LoanOption,
  CropTask,
  FarmFinancialItem,
  IoTSensorData,
  SatelliteNDVIData,
  UserProfile
} from '../types';

export const mockUsers: Record<string, UserProfile> = {
  farmer: {
    id: 'usr_f1',
    name: 'Ramesh Patel',
    phone: '+91 98765 43210',
    role: 'farmer',
    location: {
      district: 'Nashik',
      state: 'Maharashtra',
      pincode: '422001'
    },
    farmSizeAcres: 8.5,
    primaryCrops: ['Onion', 'Grape', 'Wheat', 'Tomato'],
    verified: true
  },
  buyer: {
    id: 'usr_b1',
    name: 'Reliance Agro Procurements (Amit Shah)',
    phone: '+91 99887 76655',
    role: 'buyer',
    location: {
      district: 'Mumbai Suburbs',
      state: 'Maharashtra',
      pincode: '400051'
    },
    verified: true
  },
  expert: {
    id: 'usr_e1',
    name: 'Dr. Sunita Deshmukh (Senior Agronomist)',
    phone: '+91 91234 56789',
    role: 'expert',
    location: {
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '411005'
    },
    verified: true
  },
  government: {
    id: 'usr_g1',
    name: 'Rajesh Kumar (Agriculture Officer)',
    phone: '+91 94111 22334',
    role: 'government',
    location: {
      district: 'Nagpur',
      state: 'Maharashtra',
      pincode: '440001'
    },
    verified: true
  },
  admin: {
    id: 'usr_a1',
    name: 'AgriAI SuperAdmin',
    phone: '+91 90000 00000',
    role: 'admin',
    location: {
      district: 'New Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    verified: true
  }
};

export const sampleDiseaseResults: DiseaseDetectionResult[] = [
  {
    id: 'diag_101',
    timestamp: '2026-07-18 10:15 AM',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
    cropName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    scientificName: 'Alternaria solani',
    confidence: 94.8,
    severity: 'high',
    symptoms: [
      'Concentric ring spots (bullseye pattern) on lower leaves',
      'Yellowing around brown lesion margins',
      'Stem lesion near soil level causes damping off'
    ],
    chemicalTreatment: [
      'Spray Chlorothalonil 75% WP @ 2g/liter of water',
      'Apply Mancozeb 75% WP @ 2.5g/liter at 10-day intervals',
      'Copper Oxychloride 50% WP @ 3g/liter for bacterial prevention'
    ],
    organicAlternatives: [
      'Neem oil spray (10,000 PPM) @ 5ml/liter with liquid soap',
      'Trichoderma viride bio-fungicide bio-drenching (5g/liter)',
      'Baking soda solution (1 tbsp per gallon water + 1/2 tsp horticultural oil)'
    ],
    preventiveMeasures: [
      'Rotate tomato with non-solanaceous crops (like corn or beans) every 2 years',
      'Drip irrigation instead of overhead spraying to keep foliage dry',
      'Mulch soil around plants to prevent fungal spores from splashing up'
    ],
    nearbyShops: [
      {
        id: 'shp_1',
        name: 'Kisan Krishi Kendra & Seed Store',
        address: 'Main Market Road, Pimpalgaon, Nashik',
        distanceKm: 2.4,
        phone: '+91 98221 12345',
        rating: 4.8,
        verified: true,
        stockAvailable: ['Mancozeb 75% WP', 'Neem Oil 10000 PPM', 'Trichoderma Viride']
      },
      {
        id: 'shp_2',
        name: 'AgriCare Farmer Support Center',
        address: 'Station Road, Niphad, Nashik',
        distanceKm: 5.1,
        phone: '+91 97654 32109',
        rating: 4.6,
        verified: true,
        stockAvailable: ['Chlorothalonil 75% WP', 'Copper Oxychloride', 'Organic Bio-Pesticides']
      }
    ]
  },
  {
    id: 'diag_102',
    timestamp: '2026-07-16 04:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    cropName: 'Cotton',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    scientificName: 'Begomovirus clcuv',
    confidence: 91.2,
    severity: 'moderate',
    symptoms: [
      'Upward or downward curling of leaf margins',
      'Thickening of leaf veins with leaf-like enations on lower surface',
      'Stunted plant height and reduced boll count'
    ],
    chemicalTreatment: [
      'Control Whitefly vector using Imidacloprid 17.8% SL @ 0.5ml/liter',
      'Spray Acetamiprid 20% SP @ 0.2g/liter',
      'Diafenthiuron 50% WP @ 1g/liter during peak nymph period'
    ],
    organicAlternatives: [
      'Yellow Sticky Traps (20 traps/acre) to catch adult whiteflies',
      'Neem seed kernel extract (NSKE 5%) spray every 7 days',
      'Verticillium lecanii bio-insecticide @ 5g/liter'
    ],
    preventiveMeasures: [
      'Sow disease-resistant varieties recommended by PAU/ICAR',
      'Destroy weed hosts like Abutilon indicum near farm boundary',
      'Maintain barrier crops like pearl millet or sorghum around cotton fields'
    ],
    nearbyShops: [
      {
        id: 'shp_1',
        name: 'Kisan Krishi Kendra & Seed Store',
        address: 'Main Market Road, Pimpalgaon, Nashik',
        distanceKm: 2.4,
        phone: '+91 98221 12345',
        rating: 4.8,
        verified: true,
        stockAvailable: ['Imidacloprid 17.8%', 'Yellow Sticky Traps', 'NSKE 5%']
      }
    ]
  }
];

export const mockWeatherData: WeatherData = {
  temperature: 29.5,
  humidity: 78,
  rainProbability: 85,
  windSpeed: 14.2,
  uvIndex: 7,
  condition: 'Rainy',
  soilMoisture: 42,
  forecast7Days: [
    { day: 'Today', high: 30, low: 24, rainProb: 85, condition: 'Heavy Rain' },
    { day: 'Tomorrow', high: 31, low: 23, rainProb: 60, condition: 'Light Thunder' },
    { day: 'Mon', high: 33, low: 25, rainProb: 20, condition: 'Partly Cloudy' },
    { day: 'Tue', high: 34, low: 24, rainProb: 10, condition: 'Sunny' },
    { day: 'Wed', high: 34, low: 25, rainProb: 15, condition: 'Sunny' },
    { day: 'Thu', high: 32, low: 23, rainProb: 40, condition: 'Cloudy' },
    { day: 'Fri', high: 31, low: 23, rainProb: 70, condition: 'Moderate Rain' },
  ],
  agriAlerts: [
    {
      id: 'alt_1',
      type: 'critical',
      title: 'High Heavy Rainfall Warning (Next 12 Hours)',
      message: 'Imminent rainfall of 45-65mm expected. High risk of waterlogging in low-lying crop beds.',
      action: 'Ensure field drainage channels are cleared immediately. Postpone all chemical spraying and fertilizer broadcasting.'
    },
    {
      id: 'alt_2',
      type: 'warning',
      title: 'High Humidity Fungus Risk Alert',
      message: 'Relative humidity over 75% for 48h creates optimal conditions for Late Blight & Powdery Mildew in Solanaceous crops.',
      action: 'Schedule preventive bio-fungicide drenching once rainfall ceases tomorrow afternoon.'
    },
    {
      id: 'alt_3',
      type: 'info',
      title: 'Favorable Sowing Window (Tue-Wed)',
      message: 'Clear sky and balanced soil moisture (35-40%) projected for Tuesday and Wednesday.',
      action: 'Ideal window for transplanting onion nursery and cotton field preparation.'
    }
  ]
};

export const mockMandiPrices: MandiPriceItem[] = [
  {
    id: 'mp_1',
    crop: 'Onion (Red Nashik)',
    variety: 'Medium Quality',
    mandiName: 'Lasalgaon APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    currentPrice: 2850,
    yesterdayPrice: 2600,
    priceChangePercent: 9.6,
    predictedTomorrow: 2980,
    predictedNextWeek: 3250,
    predictedNextMonth: 3600,
    recommendation: 'HOLD',
    historicalData: [
      { date: '12 Jul', price: 2400 },
      { date: '13 Jul', price: 2450 },
      { date: '14 Jul', price: 2520 },
      { date: '15 Jul', price: 2500 },
      { date: '16 Jul', price: 2600 },
      { date: '17 Jul', price: 2710 },
      { date: '18 Jul', price: 2850 },
    ]
  },
  {
    id: 'mp_2',
    crop: 'Tomato (Hybrid)',
    variety: 'Grade A Firm',
    mandiName: 'Pimpalgaon Market',
    district: 'Nashik',
    state: 'Maharashtra',
    currentPrice: 4200,
    yesterdayPrice: 4400,
    priceChangePercent: -4.5,
    predictedTomorrow: 4100,
    predictedNextWeek: 3800,
    predictedNextMonth: 3400,
    recommendation: 'SELL TODAY',
    historicalData: [
      { date: '12 Jul', price: 4600 },
      { date: '13 Jul', price: 4550 },
      { date: '14 Jul', price: 4500 },
      { date: '15 Jul', price: 4420 },
      { date: '16 Jul', price: 4400 },
      { date: '17 Jul', price: 4300 },
      { date: '18 Jul', price: 4200 },
    ]
  },
  {
    id: 'mp_3',
    crop: 'Wheat (Sharbati)',
    variety: 'Premium Grain',
    mandiName: 'Khanna Mandi',
    district: 'Ludhiana',
    state: 'Punjab',
    currentPrice: 2450,
    yesterdayPrice: 2440,
    priceChangePercent: 0.4,
    predictedTomorrow: 2460,
    predictedNextWeek: 2480,
    predictedNextMonth: 2550,
    recommendation: 'WAIT',
    historicalData: [
      { date: '12 Jul', price: 2410 },
      { date: '13 Jul', price: 2420 },
      { date: '14 Jul', price: 2430 },
      { date: '15 Jul', price: 2435 },
      { date: '16 Jul', price: 2440 },
      { date: '17 Jul', price: 2445 },
      { date: '18 Jul', price: 2450 },
    ]
  },
  {
    id: 'mp_4',
    crop: 'Cotton (BT Long Staple)',
    variety: 'Grade A',
    mandiName: 'Rajkot APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    currentPrice: 7120,
    yesterdayPrice: 6980,
    priceChangePercent: 2.0,
    predictedTomorrow: 7200,
    predictedNextWeek: 7500,
    predictedNextMonth: 7900,
    recommendation: 'HOLD',
    historicalData: [
      { date: '12 Jul', price: 6850 },
      { date: '13 Jul', price: 6900 },
      { date: '14 Jul', price: 6920 },
      { date: '15 Jul', price: 6950 },
      { date: '16 Jul', price: 6980 },
      { date: '17 Jul', price: 7050 },
      { date: '18 Jul', price: 7120 },
    ]
  }
];

export const mockProduceListings: ProduceListing[] = [
  {
    id: 'lst_301',
    farmerId: 'usr_f1',
    farmerName: 'Ramesh Patel',
    farmerPhone: '+91 98765 43210',
    farmerRating: 4.9,
    crop: 'Red Onion (Garwa Variety)',
    variety: 'Nashik Medium Size (55mm+)',
    quantityQuintals: 150,
    pricePerKg: 31,
    minOrderKg: 1000,
    harvestDate: '2026-07-10',
    location: 'Niphad Taluka',
    district: 'Nashik',
    state: 'Maharashtra',
    organic: false,
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580145032338-3f5077f1740f?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available'
  },
  {
    id: 'lst_302',
    farmerId: 'usr_f2',
    farmerName: 'Sardar Gurpreet Singh',
    farmerPhone: '+91 94170 88990',
    farmerRating: 4.8,
    crop: 'Organic Basmati Rice (1121)',
    variety: 'Steam Export Quality',
    quantityQuintals: 220,
    pricePerKg: 92,
    minOrderKg: 500,
    harvestDate: '2026-07-05',
    location: 'Amritsar Rural',
    district: 'Amritsar',
    state: 'Punjab',
    organic: true,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available'
  },
  {
    id: 'lst_303',
    farmerId: 'usr_f3',
    farmerName: 'Kaveri Ammal',
    farmerPhone: '+91 94432 11223',
    farmerRating: 5.0,
    crop: 'Fresh Tomatoes (Desi Hybrid)',
    variety: 'Firm Red Grade A',
    quantityQuintals: 80,
    pricePerKg: 45,
    minOrderKg: 200,
    harvestDate: '2026-07-17',
    location: 'Dharmapuri',
    district: 'Dharmapuri',
    state: 'Tamil Nadu',
    organic: false,
    images: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available'
  }
];

export const mockSchemes: GovernmentScheme[] = [
  {
    id: 'sch_1',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Subsidy',
    subsidyAmount: '₹6,000 / year in 3 equal installments',
    eligibility: [
      'Small and marginal landholder farmer families',
      'Valid Aadhaar linked bank account',
      'Land ownership records in state database'
    ],
    benefits: 'Direct financial support transferred straight into farmer bank accounts every 4 months to purchase agricultural inputs.',
    documentsRequired: ['Aadhaar Card', 'Land Khatauni / Revenue Record', 'Bank Passbook Details', 'Mobile Number'],
    applyUrl: 'https://pmkisan.gov.in'
  },
  {
    id: 'sch_2',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    ministry: 'Ministry of Agriculture',
    category: 'Insurance',
    subsidyAmount: 'Up to 90% Govt Premium Subsidy',
    eligibility: [
      'All farmers growing notified crops in notified areas',
      'Kharif crop premium: 2%, Rabi crop premium: 1.5%',
      'Covers natural calamities, pests, and post-harvest loss'
    ],
    benefits: 'Comprehensive crop insurance coverage protecting against non-preventable yield loss due to floods, drought, or dry spells.',
    documentsRequired: ['Proposal form', 'Sowing Certificate', 'Land Saptabara (7/12)', 'Cancelled Cheque'],
    applyUrl: 'https://pmfby.gov.in'
  },
  {
    id: 'sch_3',
    title: 'Kisan Credit Card (KCC) Scheme with Interest Subvention',
    ministry: 'RBI & NABARD',
    category: 'Credit',
    subsidyAmount: 'Effective Interest Rate 4% (3% Subvention)',
    eligibility: [
      'Farmers, Tenant farmers, Sharecroppers, Self Help Groups',
      'Cultivation land or lease document',
      'Good credit score (CIBIL > 650)'
    ],
    benefits: 'Flexible revolving collateral-free loan up to ₹1.6 Lakhs (up to ₹3 Lakhs with land mortgage) for crop inputs and working capital.',
    documentsRequired: ['KCC Application Form', 'Pahani / 7/12 extract', '2 Passport photos', 'Aadhaar & PAN'],
    applyUrl: 'https://www.nabard.org'
  }
];

export const mockLoans: LoanOption[] = [
  {
    bankName: 'State Bank of India (SBI)',
    schemeName: 'SBI YONO Krishi KCC Loan',
    maxAmountRs: 300000,
    interestRatePercent: 7.0,
    subventionAvailable: true,
    effectiveRate: 4.0,
    tenureYears: 5,
    eligibility: 'All farmers having cultivable land holding.'
  },
  {
    bankName: 'Bank of Baroda',
    schemeName: 'Baroda Kisan Gold Card',
    maxAmountRs: 500000,
    interestRatePercent: 7.25,
    subventionAvailable: true,
    effectiveRate: 4.25,
    tenureYears: 3,
    eligibility: 'Farmers with minimum 2 acres owned agricultural land.'
  },
  {
    bankName: 'HDFC Bank',
    schemeName: 'HDFC Tractor & Farm Equipment Credit',
    maxAmountRs: 1000000,
    interestRatePercent: 8.5,
    subventionAvailable: false,
    effectiveRate: 8.5,
    tenureYears: 7,
    eligibility: 'Minimum annual farm income of ₹1,50,000.'
  }
];

export const mockCropTasks: CropTask[] = [
  {
    id: 'tsk_1',
    date: '2026-07-18',
    crop: 'Tomato',
    taskType: 'Pest Control',
    title: 'Inspect lower leaves for Early Blight spots',
    notes: 'Apply bio-fungicide (Trichoderma) if moisture exceeds 75%',
    completed: false,
    alertLevel: 'important'
  },
  {
    id: 'tsk_2',
    date: '2026-07-20',
    crop: 'Onion',
    taskType: 'Fertilizer',
    title: 'Second Dose NPK (19:19:19) Drenching',
    notes: '25kg per acre via drip line before 10 AM',
    completed: false,
    alertLevel: 'normal'
  },
  {
    id: 'tsk_3',
    date: '2026-07-22',
    crop: 'Grape',
    taskType: 'Irrigation',
    title: 'Light Irrigation (2 Hours Drip Cycle)',
    notes: 'Check soil moisture sensors; aim for 38% moisture.',
    completed: false,
    alertLevel: 'normal'
  }
];

export const mockFinancials: FarmFinancialItem[] = [
  {
    id: 'fin_1',
    date: '2026-07-15',
    type: 'income',
    category: 'Crop Sales (Marketplace)',
    amount: 145000,
    description: 'Sold 50 Quintals Tomato to Reliance Agro'
  },
  {
    id: 'fin_2',
    date: '2026-07-12',
    type: 'expense',
    category: 'Fertilizers & Seeds',
    amount: 18500,
    description: 'Purchased 10 Bags NPK 10:26:26 + Neem Cake'
  },
  {
    id: 'fin_3',
    date: '2026-07-08',
    type: 'expense',
    category: 'Labor & Field Prep',
    amount: 12000,
    description: 'Drip line setup labor & bed preparation'
  },
  {
    id: 'fin_4',
    date: '2026-07-01',
    type: 'income',
    category: 'Govt Subsidy (PM-KISAN)',
    amount: 2000,
    description: 'Installment #16 credited via DBT'
  }
];

export const mockIoTSensor: IoTSensorData = {
  soilMoisturePct: 41.5,
  soilTempC: 26.8,
  nitrogenPpm: 128,
  phosphorusPpm: 42,
  potassiumPpm: 185,
  soilPh: 6.7,
  lastUpdated: 'Just now (Live Field Node #04)',
  batteryPct: 92
};

export const mockSatelliteNDVI: SatelliteNDVIData = {
  ndviValue: 0.76,
  healthStatus: 'Good',
  vegetationCoveragePct: 88.4,
  waterStressPct: 12.1,
  cloudCoverPct: 4.2,
  satellitePassDate: 'Sentinel-2 (2026-07-17)'
};
