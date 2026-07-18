import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Stethoscope,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Users,
  AlertTriangle,
  Database,
  Cpu
} from 'lucide-react';

export const SpecializedPortals: React.FC = () => {
  const { role, diseaseHistory, speakText } = useApp();
  const [approvedQueue, setApprovedQueue] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedQueue((prev) => [...prev, id]);
    speakText('Diagnosis report approved by expert agronomist');
  };

  if (role === 'expert') {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl glass-card border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-teal-950/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center space-x-2">
              <Stethoscope className="w-4 h-4" />
              <span>Senior Agronomist Verification Portal</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mt-1">Disease Review & Prescription Queue</h2>
          </div>
        </div>

        <div className="space-y-4">
          {diseaseHistory.map((item) => {
            const isApproved = approvedQueue.includes(item.id);
            return (
              <div key={item.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-3">
                    <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{item.diseaseName}</h3>
                      <div className="text-xs text-slate-400">{item.cropName} • Scanned: {item.timestamp}</div>
                      <div className="text-[11px] text-emerald-400 font-bold mt-1">AI Confidence: {item.confidence}%</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isApproved ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified & Approved</span>
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve AI Prescription</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (role === 'government') {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl glass-card border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-teal-950/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>State Department of Agriculture Telemetry</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mt-1">Regional Drought Risk & PMFBY Subsidy Monitor</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Registered District Farmers</span>
            <div className="text-3xl font-extrabold text-slate-100">142,850</div>
            <div className="text-[11px] text-emerald-400">+12% YoY Onboarding</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">DBT Subsidy Disbursed</span>
            <div className="text-3xl font-extrabold text-amber-400">₹85.6 Cr</div>
            <div className="text-[11px] text-slate-400">PM-KISAN Installment #16</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pest Outbreak Alert Level</span>
            <div className="text-xl font-extrabold text-amber-400 flex items-center space-x-1">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Moderate (Solanaceous)</span>
            </div>
            <div className="text-[11px] text-slate-400">Early Blight in Nashik</div>
          </div>
        </div>
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-2xl glass-card border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900 to-teal-950/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>AgriAI Production System Administration</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mt-1">Platform Telemetry & Infrastructure Node Status</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase">PyTorch GPU Load</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-100">34%</div>
            <div className="text-[10px] text-emerald-400">NVIDIA A10G Active</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase">API Request Volume</span>
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-100">12,450 req/m</div>
            <div className="text-[10px] text-slate-400">Avg Latency: 42ms</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase">PostgreSQL Pool</span>
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-100">28 / 100</div>
            <div className="text-[10px] text-emerald-400">Healthy replica sync</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-bold uppercase">Active Platform Users</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-slate-100">248,900</div>
            <div className="text-[10px] text-emerald-400">+1,420 today</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
