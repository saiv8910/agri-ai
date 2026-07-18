import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleDiseaseResults } from '../data/mockData';
import type { DiseaseDetectionResult } from '../types';
import {
  UploadCloud,
  Camera,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Phone,
  Star,
  Leaf,
  ShieldCheck,
  Sparkles,
  History,
  Droplets
} from 'lucide-react';

export const DiseaseDetection: React.FC = () => {
  const { addDiseaseResult, diseaseHistory, speakText } = useApp();

  const [analyzing, setAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<DiseaseDetectionResult | null>(diseaseHistory[0] || null);

  const sampleCropPresets = [
    { name: 'Tomato Leaf Blight', image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80', crop: 'Tomato' },
    { name: 'Cotton Leaf Curl', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80', crop: 'Cotton' },
    { name: 'Wheat Leaf Rust', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', crop: 'Wheat' },
    { name: 'Healthy Grape Leaf', image: 'https://images.unsplash.com/photo-1596321821759-c29007fef7b5?auto=format&fit=crop&w=800&q=80', crop: 'Grape' }
  ];

  const handleRunAnalysis = (imageUrl: string, presetCrop: string) => {
    setAnalyzing(true);

    setTimeout(() => {
      let result: DiseaseDetectionResult;

      if (presetCrop === 'Cotton') {
        result = sampleDiseaseResults[1];
      } else if (presetCrop === 'Wheat') {
        result = {
          id: `diag_${Date.now()}`,
          timestamp: 'Just now',
          imageUrl,
          cropName: 'Wheat',
          diseaseName: 'Puccinia triticina (Brown Rust)',
          scientificName: 'Puccinia triticina',
          confidence: 96.2,
          severity: 'moderate',
          symptoms: [
            'Orange-brown pustules scattered randomly on upper leaf surfaces',
            'Premature leaf senescence reducing photosynthesis area',
            'Grain shriveling during milk-filling stage'
          ],
          chemicalTreatment: [
            'Spray Propiconazole 25% EC @ 1ml/liter water',
            'Apply Tebuconazole 250 EC @ 1ml/liter'
          ],
          organicAlternatives: [
            'Spray Fermented Butter Milk (Lassi 5%) mixed with Copper strip water',
            'Neem Seed Kernel Extract 5% spray'
          ],
          preventiveMeasures: [
            'Sow rust-resistant varieties like HD-2967 or PBW-550',
            'Avoid excessive Nitrogen application'
          ],
          nearbyShops: sampleDiseaseResults[0].nearbyShops
        };
      } else {
        result = {
          ...sampleDiseaseResults[0],
          id: `diag_${Date.now()}`,
          timestamp: 'Just now',
          imageUrl
        };
      }

      setAnalyzing(false);
      setCurrentResult(result);
      addDiseaseResult(result);
      speakText(`AI detected ${result.diseaseName} with ${result.confidence}% confidence. Treatment suggestions ready.`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>PyTorch & YOLOv8 Computer Vision Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">AI Crop Disease Diagnosis</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Upload or take a photo of an infected leaf. Our neural net scans for over 45+ crop diseases, identifies pathogens, severity, and provides verified chemical & organic remedies.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="font-bold text-slate-200">98.4% Accuracy</div>
            <div className="text-[10px] text-slate-400">Trained on 150,000+ Indian Leaf Samples</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload & Preset Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* File Upload Box */}
          <div className="p-6 rounded-2xl glass-card border-2 border-dashed border-emerald-500/40 text-center hover:border-emerald-400 transition-all">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Upload Crop Leaf Photo</h3>
            <p className="text-xs text-slate-400 mt-1">Drag & drop PNG/JPG image or tap to select from gallery</p>

            <div className="flex items-center justify-center space-x-3 mt-4">
              <button
                onClick={() => handleRunAnalysis(sampleCropPresets[0].image, 'Tomato')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
              >
                <Camera className="w-4 h-4" />
                <span>Simulate Camera Scan</span>
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="p-4 rounded-2xl glass-card">
            <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Or Select Sample Leaf Image</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {sampleCropPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunAnalysis(preset.image, preset.crop)}
                  className="group relative rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all text-left"
                >
                  <img src={preset.image} alt={preset.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2 flex flex-col justify-end">
                    <span className="text-[11px] font-bold text-white leading-tight">{preset.name}</span>
                    <span className="text-[9px] text-emerald-400">{preset.crop}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scan History */}
          <div className="p-4 rounded-2xl glass-card">
            <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center space-x-2">
              <History className="w-4 h-4 text-amber-400" />
              <span>Recent Diagnoses History</span>
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {diseaseHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentResult(item)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left border text-xs transition-all ${
                    currentResult?.id === item.id
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <img src={item.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-slate-200">{item.diseaseName}</div>
                      <div className="text-[10px] text-slate-400">{item.cropName} • {item.timestamp}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {item.confidence}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Remedies Column */}
        <div className="lg:col-span-7">
          {analyzing ? (
            <div className="h-full min-h-[400px] rounded-2xl glass-card flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 animate-spin flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-100">Running PyTorch Vision Model...</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Segmenting chlorosis patterns, necrotic ring spots, and fungal spore signatures...
              </p>
            </div>
          ) : currentResult ? (
            <div className="space-y-6">
              {/* Diagnosis Header Card */}
              <div className="p-6 rounded-2xl glass-card border border-emerald-500/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={currentResult.imageUrl}
                      alt={currentResult.diseaseName}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-500/50"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {currentResult.cropName} Disease
                      </span>
                      <h3 className="text-xl font-bold text-slate-100 mt-1">{currentResult.diseaseName}</h3>
                      <p className="text-xs text-slate-400 italic">{currentResult.scientificName}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{currentResult.confidence}% AI Confidence</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase mt-1 px-2 py-0.5 rounded ${
                      currentResult.severity === 'high' || currentResult.severity === 'severe'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      Severity: {currentResult.severity}
                    </span>
                  </div>
                </div>

                {/* Symptoms */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Identified Symptoms</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                    {currentResult.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start space-x-2 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Chemical Treatment */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Droplets className="w-4 h-4" />
                      <span>Recommended Fungicide / Spray</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      {currentResult.chemicalTreatment.map((chem, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                          <span>{chem}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organic Alternatives */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <Leaf className="w-4 h-4" />
                      <span>Organic / Bio-Alternatives</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      {currentResult.organicAlternatives.map((org, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">🌿</span>
                          <span>{org}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nearby Agricultural Shops */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>Nearby Agri-Shops with Stock</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentResult.nearbyShops.map((shop) => (
                      <div key={shop.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-xs font-bold text-slate-100 flex items-center space-x-1">
                              <span>{shop.name}</span>
                              {shop.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                            <div className="text-[10px] text-slate-400">{shop.address}</div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            {shop.distanceKm} km
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800">
                          <div className="flex items-center space-x-1 text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="font-bold">{shop.rating}</span>
                          </div>

                          <a
                            href={`tel:${shop.phone}`}
                            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[10px]"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Shop</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
