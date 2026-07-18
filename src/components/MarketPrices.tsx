import React, { useState } from 'react';
import { mockMandiPrices } from '../data/mockData';
import type { MandiPriceItem } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export const MarketPrices: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<MandiPriceItem>(mockMandiPrices[0]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>APMC Mandi Price Forecasting & Time Series Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">Mandi Market Price Intelligence</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Real-time market rates across 500+ APMC mandis in India. Powered by time-series prediction models to recommend whether you should SELL TODAY, HOLD, or WAIT.
          </p>
        </div>
      </div>

      {/* Selected Crop Overview Header Card */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Crop Switcher Pills */}
          <div className="flex flex-wrap gap-2">
            {mockMandiPrices.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCrop(item)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCrop.id === item.id
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {item.crop}
              </button>
            ))}
          </div>

          {/* Dynamic AI Recommendation Badge */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-400 uppercase">AI Recommendation:</span>
            <div
              className={`px-4 py-2 rounded-xl font-extrabold text-xs tracking-wider flex items-center space-x-2 border shadow-lg ${
                selectedCrop.recommendation === 'SELL TODAY'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-rose-500/10 animate-pulse'
                  : selectedCrop.recommendation === 'HOLD'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-emerald-500/10'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{selectedCrop.recommendation}</span>
            </div>
          </div>
        </div>

        {/* Selected Crop Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Today's Modal Rate</span>
            <div className="text-2xl font-extrabold text-slate-100 mt-1">₹{selectedCrop.currentPrice} <span className="text-xs text-slate-400 font-normal">/ Qtl</span></div>
            <div className={`text-xs font-bold flex items-center space-x-1 mt-0.5 ${selectedCrop.priceChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selectedCrop.priceChangePercent >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{selectedCrop.priceChangePercent >= 0 ? '+' : ''}{selectedCrop.priceChangePercent}% vs yesterday</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted Tomorrow</span>
            <div className="text-2xl font-extrabold text-slate-100 mt-1">₹{selectedCrop.predictedTomorrow}</div>
            <span className="text-[10px] text-slate-400">7-Day Model Target</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted 7-Days</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹{selectedCrop.predictedNextWeek}</div>
            <span className="text-[10px] text-emerald-400">+14% expected gain</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Primary APMC Market</span>
            <div className="text-sm font-bold text-slate-200 mt-1 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{selectedCrop.mandiName}</span>
            </div>
            <span className="text-[10px] text-slate-400">{selectedCrop.district}, {selectedCrop.state}</span>
          </div>
        </div>
      </div>

      {/* Recharts Price History Graph */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Price Movement History & Trend Projection ({selectedCrop.crop})</span>
            </h3>
            <p className="text-xs text-slate-400">Modal price in ₹ per quintal over the last 7 days</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedCrop.historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* APMC Mandi Comparison Table */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800">
        <h3 className="text-sm font-bold text-slate-100 mb-4 flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-rose-400" />
          <span>Regional APMC Mandi Price Comparison</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">APMC Mandi</th>
                <th className="p-3">Location</th>
                <th className="p-3">Crop Variety</th>
                <th className="p-3">Today Rate (Qtl)</th>
                <th className="p-3">24h Change</th>
                <th className="p-3">AI Trend Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {mockMandiPrices.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-bold text-slate-100">{item.mandiName}</td>
                  <td className="p-3 text-slate-400">{item.district}, {item.state}</td>
                  <td className="p-3 text-slate-300">{item.crop}</td>
                  <td className="p-3 font-extrabold text-slate-100">₹{item.currentPrice}</td>
                  <td className={`p-3 font-bold ${item.priceChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.priceChangePercent >= 0 ? '+' : ''}{item.priceChangePercent}%
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      item.recommendation === 'SELL TODAY' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {item.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
