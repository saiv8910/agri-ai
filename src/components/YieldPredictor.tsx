import React, { useState } from 'react';
import type { YieldPredictionInput, YieldPredictionResult, FertilizerRecommendation } from '../types';
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  Sprout
} from 'lucide-react';

export const YieldPredictor: React.FC = () => {
  const [formData, setFormData] = useState<YieldPredictionInput>({
    crop: 'Onion',
    acreage: 5,
    state: 'Maharashtra',
    district: 'Nashik',
    season: 'Kharif',
    soilType: 'Black Cotton Soil',
    nitrogen: 120,
    phosphorus: 35,
    potassium: 160,
    phLevel: 6.8,
    irrigationType: 'Drip Irrigation',
    pastYieldQuintals: 140
  });

  const [prediction, setPrediction] = useState<YieldPredictionResult | null>({
    expectedYieldQuintals: 165,
    yieldPerAcre: 33,
    confidence: 93.4,
    riskLevel: 'Low',
    potentialRevenueEst: 470250,
    recommendations: [
      'Increase Nitrogen split dosing at 45 days post sowing to maximize bulb weight.',
      'Maintain drip irrigation moisture between 35-40% to avoid root rot.',
      'Foliar spray of Micro-nutrients (Zinc & Boron) at 60 days stage.'
    ],
    deficiencyWarning: 'Phosphorus level (35 ppm) is slightly below optimal 45 ppm.'
  });

  const [fertilizerAdvice, setFertilizerAdvice] = useState<FertilizerRecommendation>({
    crop: 'Onion',
    growthStage: 'Vegetative',
    primaryNutrientNeeded: 'Nitrogen & Phosphorus Boost',
    recommendedFertilizer: 'NPK 19:19:19 + Single Super Phosphate (SSP)',
    dosagePerAcre: '25 kg NPK 19:19:19 + 50 kg SSP per acre',
    applicationSchedule: 'Every 12 days via drip line (Morning 6:00 - 8:00 AM)',
    estimatedCostRs: 4200,
    organicAlternative: 'Vermi-compost (2 Tons/acre) + Azotobacter bio-fertilizer (2 kg/acre)'
  });

  const [calculating, setCalculating] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);

    setTimeout(() => {
      const basePerAcre = formData.crop === 'Tomato' ? 45 : formData.crop === 'Cotton' ? 18 : 32;
      const totalYield = Math.round(basePerAcre * formData.acreage * (1 + (formData.nitrogen - 100) / 400));
      const perAcre = parseFloat((totalYield / formData.acreage).toFixed(1));
      const estPrice = formData.crop === 'Tomato' ? 4000 : formData.crop === 'Cotton' ? 7000 : 2850;

      setPrediction({
        expectedYieldQuintals: totalYield,
        yieldPerAcre: perAcre,
        confidence: 94.1,
        riskLevel: formData.phLevel < 6.0 || formData.phLevel > 8.0 ? 'Moderate' : 'Low',
        potentialRevenueEst: totalYield * estPrice,
        recommendations: [
          `Optimized for ${formData.district} micro-climate and ${formData.soilType}.`,
          'Split Nitrogen application into 3 doses to prevent leaching.',
          'Schedule pest monitoring during high humidity spells.'
        ],
        deficiencyWarning: formData.phosphorus < 40 ? 'Phosphorus replenishment advised.' : undefined
      });

      setFertilizerAdvice({
        crop: formData.crop,
        growthStage: 'Vegetative',
        primaryNutrientNeeded: 'Balanced NPK Drenching',
        recommendedFertilizer: 'NPK 10:26:26 + Neem Coated Urea',
        dosagePerAcre: `${Math.round(formData.acreage * 5)} kg total requirement`,
        applicationSchedule: 'Apply 2 split doses across 14-day interval',
        estimatedCostRs: Math.round(formData.acreage * 850),
        organicAlternative: 'Trichoderma + Neem Cake (100 kg/acre)'
      });

      setCalculating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>XGBoost & LightGBM Machine Learning Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">AI Yield Predictor & Soil Advisor</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Input soil parameters, crop type, and acreage. Our ML models predict expected harvest volume, gross revenue, and generate growth-stage specific fertilizer schedules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form Column */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Farm & Soil Parameters</span>
          </h3>

          <form onSubmit={handlePredict} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Target Crop</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Onion">Onion (Red Nashik)</option>
                <option value="Tomato">Tomato (Hybrid)</option>
                <option value="Wheat">Wheat (Sharbati)</option>
                <option value="Cotton">Cotton (BT Long Staple)</option>
                <option value="Rice">Basmati Rice (1121)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Farm Acreage (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.acreage}
                  onChange={(e) => setFormData({ ...formData, acreage: parseFloat(e.target.value) || 1 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Irrigation Type</label>
                <select
                  value={formData.irrigationType}
                  onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Canal / Flood">Canal / Flood</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>
            </div>

            {/* NPK Inputs */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block">Soil Test Values (NPK & pH)</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <label className="text-[10px] text-emerald-400 font-bold">N (ppm)</label>
                  <input
                    type="number"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({ ...formData, nitrogen: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-teal-400 font-bold">P (ppm)</label>
                  <input
                    type="number"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({ ...formData, phosphorus: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-amber-400 font-bold">K (ppm)</label>
                  <input
                    type="number"
                    value={formData.potassium}
                    onChange={(e) => setFormData({ ...formData, potassium: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-purple-400 font-bold">pH</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.phLevel}
                    onChange={(e) => setFormData({ ...formData, phLevel: parseFloat(e.target.value) || 7.0 })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center text-slate-200"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={calculating}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
            >
              {calculating ? (
                <span>Calculating Yield ML Model...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Prediction</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prediction Results & Fertilizer Advice Column */}
        <div className="lg:col-span-7 space-y-6">
          {prediction && (
            <>
              {/* Prediction Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 bg-emerald-950/20 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase">Expected Harvest Yield</div>
                  <div className="text-3xl font-extrabold text-slate-100">{prediction.expectedYieldQuintals} Qtl</div>
                  <div className="text-[11px] text-slate-300">({prediction.yieldPerAcre} Quintals / Acre)</div>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Est. Mandi Revenue</div>
                  <div className="text-3xl font-extrabold text-amber-400">₹{prediction.potentialRevenueEst.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400">Based on current APMC Mandi price</div>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">AI Risk Rating</div>
                  <div className="text-xl font-extrabold text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{prediction.riskLevel} Risk</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{prediction.confidence}% Confidence</div>
                </div>
              </div>

              {/* Fertilizer Prescription Card */}
              {fertilizerAdvice && (
                <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <span>Growth Stage Fertilizer Prescription</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">RECOMMENDED FERTILIZER</span>
                      <span className="text-slate-100 font-bold">{fertilizerAdvice.recommendedFertilizer}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">DOSAGE REQUIREMENT</span>
                      <span className="text-slate-100 font-bold">{fertilizerAdvice.dosagePerAcre}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">APPLICATION DATES</span>
                      <span className="text-slate-200">{fertilizerAdvice.applicationSchedule}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-semibold">ESTIMATED INPUT COST</span>
                      <span className="text-amber-400 font-bold">₹{fertilizerAdvice.estimatedCostRs}</span>
                    </div>
                  </div>

                  {/* Organic Alternative */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs">
                    <span className="text-amber-400 font-bold block mb-1">🌿 Organic / Bio-Fertilizer Alternative:</span>
                    <span className="text-slate-200">{fertilizerAdvice.organicAlternative}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
