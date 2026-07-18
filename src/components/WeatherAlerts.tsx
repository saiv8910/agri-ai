import React, { useState } from 'react';
import { mockWeatherData } from '../data/mockData';
import {
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  Calendar,
  Compass,
  Thermometer,
  ShieldAlert,
  CloudLightning
} from 'lucide-react';

export const WeatherAlerts: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Nashik, MH');
  const weather = mockWeatherData;

  const districts = ['Nashik, MH', 'Ludhiana, PB', 'Rajkot, GJ', 'Guntur, AP', 'Pune, MH'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <CloudRain className="w-4 h-4" />
            <span>Hyper-Local Micro-Climate Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">Weather & Farm Advisory</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Real-time atmospheric telemetry combined with AI crop vulnerability models to deliver timely spray warnings and irrigation scheduling.
          </p>
        </div>

        {/* Location Dropdown */}
        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-700">
          <Compass className="w-4 h-4 text-emerald-400" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none"
          >
            {districts.map((d) => (
              <option key={d} value={d} className="bg-slate-900 text-slate-200">
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Weather Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temp Card */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Temperature</span>
            <Thermometer className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{weather.temperature}°C</div>
          <div className="text-[11px] text-slate-400">Condition: {weather.condition}</div>
        </div>

        {/* Humidity */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Humidity</span>
            <Droplets className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{weather.humidity}%</div>
          <div className="text-[11px] text-emerald-400 font-medium">High fungal spore development risk</div>
        </div>

        {/* Rain Prob */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Rain Probability</span>
            <CloudLightning className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{weather.rainProbability}%</div>
          <div className="text-[11px] text-rose-400 font-medium">Postpone chemical spraying</div>
        </div>

        {/* Soil Moisture */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Soil Moisture</span>
            <Wind className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{weather.soilMoisture}%</div>
          <div className="text-[11px] text-emerald-400 font-medium">Optimal root hydration level</div>
        </div>
      </div>

      {/* Actionable Agronomic Alerts */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Active Weather Agronomic Alerts ({selectedDistrict})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weather.agriAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                alert.type === 'critical'
                  ? 'bg-rose-950/20 border-rose-500/40 text-slate-200'
                  : alert.type === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/40 text-slate-200'
                  : 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.type === 'critical' ? 'text-rose-400' : alert.type === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                  }`} />
                  <span className="text-xs font-bold">{alert.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px]">
                <span className="font-bold text-emerald-400 block mb-1">RECOMMENDED ACTION:</span>
                <span className="text-slate-200">{alert.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast Matrix */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800">
        <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>7-Day Micro-Climate Forecast Matrix</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast7Days.map((day, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl text-center space-y-2 border transition-all ${
                idx === 0
                  ? 'bg-emerald-500/10 border-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-slate-300">{day.day}</div>
              <div className="my-1 flex justify-center text-emerald-400">
                {day.rainProb > 50 ? <CloudRain className="w-6 h-6" /> : <Sun className="w-6 h-6 text-amber-400" />}
              </div>
              <div className="text-xs font-bold text-slate-100">
                {day.high}° <span className="text-slate-400 font-normal">/ {day.low}°</span>
              </div>
              <div className="text-[10px] text-teal-400 font-medium">{day.rainProb}% Rain</div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
