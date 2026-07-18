import React, { useState } from 'react';
import { mockSchemes, mockLoans } from '../data/mockData';
import {
  Landmark,
  CheckCircle2,
  ExternalLink,
  CreditCard,
  Building
} from 'lucide-react';

export const GovernmentSchemes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schemes' | 'loans'>('schemes');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Central & State Ministry Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">Government Schemes & Loan Assistant</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Discover active government subsidies, PM-KISAN payouts, PMFBY crop insurance, and Kisan Credit Card (KCC) low-interest loans with 3% interest subvention.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'schemes' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Govt Schemes
          </button>
          <button
            onClick={() => setActiveTab('loans')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'loans' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            KCC Loans & Subsidies
          </button>
        </div>
      </div>

      {activeTab === 'schemes' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-6 rounded-2xl glass-card border border-slate-800 flex flex-col justify-between hover:border-emerald-500/40 transition-all space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{scheme.ministry}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 leading-snug">{scheme.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{scheme.benefits}</p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-semibold">FINANCIAL BENEFIT:</span>
                    <span className="text-amber-400 font-extrabold text-sm">{scheme.subsidyAmount}</span>
                  </div>

                  <div className="mt-4 space-y-1 text-xs">
                    <span className="text-slate-400 font-semibold block">Eligibility Criteria:</span>
                    {scheme.eligibility.map((crit, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-slate-700"
                >
                  <span>Apply via Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Kisan Credit Card (KCC) Bank Comparison Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockLoans.map((loan, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-8 h-8 text-amber-400 p-1.5 bg-amber-500/10 rounded-lg" />
                    <div>
                      <div className="text-xs font-bold text-slate-100">{loan.bankName}</div>
                      <div className="text-[10px] text-slate-400">{loan.schemeName}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-b border-slate-800 py-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Sanction:</span>
                      <span className="font-bold text-slate-100">₹{(loan.maxAmountRs / 100000).toFixed(1)} Lakhs</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Standard Interest:</span>
                      <span className="line-through text-slate-500">{loan.interestRatePercent}%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Govt Subvention Rate:</span>
                      <span className="font-extrabold text-emerald-400">{loan.effectiveRate}% / year</span>
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                    Apply for KCC Loan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
