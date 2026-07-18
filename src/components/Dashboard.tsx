import React from 'react';
import { useApp } from '../context/AppContext';
import { mockWeatherData, mockMandiPrices, mockCropTasks } from '../data/mockData';
import {
  Scan,
  CloudSun,
  Bot,
  TrendingUp,
  Store,
  ArrowUpRight,
  Sprout,
  CalendarDays,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentUser, setActiveTab, diseaseHistory } = useApp();

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Namaste, {currentUser.name}!</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
              Welcome to Your <span className="emerald-gradient-text">AgriAI Smart Command</span>
            </h1>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Your farm in <strong className="text-emerald-400">{currentUser.location.district}, {currentUser.location.state}</strong> has 85% rain probability today. All AI diagnosis, mandi rates, and crop schedule alerts are synced live.
            </p>
          </div>

          {/* Quick AI Voice CTA */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('disease')}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              <Scan className="w-4 h-4" />
              <span>Diagnose Leaf Disease</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Ask Voice Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Overview Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weather Card */}
        <div
          onClick={() => setActiveTab('weather')}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Live Micro-Climate</span>
            <CloudSun className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-100">{mockWeatherData.temperature}°C</div>
            <div className="text-xs text-rose-400 font-semibold">{mockWeatherData.rainProbability}% Rain Probability</div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Postpone chemical spray</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Mandi Price Ticker Card */}
        <div
          onClick={() => setActiveTab('market')}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Red Onion Mandi Rate</span>
            <TrendingUp className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-100">₹{mockMandiPrices[0].currentPrice} <span className="text-xs text-slate-400 font-normal">/ Qtl</span></div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+9.6% Today • Lasalgaon APMC</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-emerald-400 font-bold">AI Advice: HOLD PRODUCE</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* AI Diagnosis Quick Status */}
        <div
          onClick={() => setActiveTab('disease')}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Recent AI Diagnosis</span>
            <Scan className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100 line-clamp-1">{diseaseHistory[0]?.diseaseName}</div>
            <div className="text-xs text-emerald-400 font-semibold">{diseaseHistory[0]?.confidence}% Confidence Score</div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>View treatment & remedies</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Task Schedule Card */}
        <div
          onClick={() => setActiveTab('calendar')}
          className="p-5 rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Today's Task</span>
            <CalendarDays className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100 line-clamp-1">{mockCropTasks[0].title}</div>
            <div className="text-[10px] text-slate-400">{mockCropTasks[0].crop} • {mockCropTasks[0].taskType}</div>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-rose-400 font-semibold">Priority Action</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Recent Disease Scans & B2B Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>Active Farm Health & Disease Alerts</span>
            </h3>
            <button onClick={() => setActiveTab('disease')} className="text-xs text-emerald-400 font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {diseaseHistory.slice(0, 2).map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div className="text-xs font-bold text-slate-100">{item.diseaseName}</div>
                    <div className="text-[10px] text-slate-400">{item.cropName} • {item.timestamp}</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  {item.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Store className="w-4 h-4 text-amber-400" />
              <span>Direct Kisan Marketplace Opportunities</span>
            </h3>
            <button onClick={() => setActiveTab('b2b')} className="text-xs text-emerald-400 font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-100">Red Onion (Garwa Variety)</div>
                <div className="text-[10px] text-slate-400">150 Quintals • Niphad, Nashik</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-emerald-400">₹31 / kg</div>
                <div className="text-[10px] text-slate-400">Reliance Agro Buyer Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
