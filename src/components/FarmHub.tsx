import React, { useState } from 'react';
import { mockCropTasks, mockFinancials, mockIoTSensor, mockSatelliteNDVI } from '../data/mockData';
import {
  CalendarDays,
  Wallet,
  Activity,
  Satellite,
  CheckCircle2,
  Zap
} from 'lucide-react';

export const FarmHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'financials' | 'iot'>('calendar');
  const [tasks, setTasks] = useState(mockCropTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const totalIncome = mockFinancials.filter((f) => f.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = mockFinancials.filter((f) => f.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Farm Operations & Precision Agriculture Hub</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">Crop Calendar, Ledger & Telemetry</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Track day-to-day agronomic schedules, manage farm profit & loss ledgers, and connect live IoT ground sensors & Sentinel-2 satellite NDVI crop health feeds.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'calendar' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Crop Schedule
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'financials' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Farm Financials
          </button>
          <button
            onClick={() => setActiveTab('iot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'iot' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            IoT & Satellite
          </button>
        </div>
      </div>

      {activeTab === 'calendar' && (
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <CalendarDays className="w-4 h-4 text-emerald-400" />
              <span>Upcoming Agronomic Task Schedule</span>
            </h3>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  task.completed
                    ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      task.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{task.title}</div>
                    <div className="text-[10px] text-slate-400">
                      {task.crop} • {task.taskType} • Scheduled for {task.date}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    task.alertLevel === 'important' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {task.taskType}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'financials' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Revenue</span>
              <div className="text-3xl font-extrabold text-emerald-400">₹{totalIncome.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400">Marketplace & Subsidy Payouts</div>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-rose-500/30 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Input Expenses</span>
              <div className="text-3xl font-extrabold text-rose-400">₹{totalExpense.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400">Seeds, Fertilizer & Labor</div>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-amber-500/30 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Net Farm Profit</span>
              <div className="text-3xl font-extrabold text-amber-400">₹{netProfit.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-400">+34% Profitability</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Recent Financial Ledger Entries</span>
            </h3>

            <div className="divide-y divide-slate-800 text-xs">
              {mockFinancials.map((fin) => (
                <div key={fin.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">{fin.description}</div>
                    <div className="text-[10px] text-slate-400">{fin.category} • {fin.date}</div>
                  </div>
                  <div className={`font-extrabold text-sm ${fin.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fin.type === 'income' ? '+' : '-'}₹{fin.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'iot' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ground Sensors */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Live Ground IoT Sensors (Node #04)</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                ONLINE • {mockIoTSensor.batteryPct}% Battery
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">SOIL MOISTURE</span>
                <span className="text-2xl font-extrabold text-slate-100">{mockIoTSensor.soilMoisturePct}%</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">SOIL TEMPERATURE</span>
                <span className="text-2xl font-extrabold text-slate-100">{mockIoTSensor.soilTempC}°C</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">NITROGEN (N)</span>
                <span className="text-2xl font-extrabold text-emerald-400">{mockIoTSensor.nitrogenPpm} ppm</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold">SOIL pH LEVEL</span>
                <span className="text-2xl font-extrabold text-purple-400">{mockIoTSensor.soilPh}</span>
              </div>
            </div>
          </div>

          {/* Satellite NDVI */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <Satellite className="w-4 h-4 text-teal-400" />
                <span>Sentinel-2 Satellite NDVI Health Feed</span>
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Vegetation Vigor (NDVI Score):</span>
                <span className="text-xl font-extrabold text-emerald-400">{mockSatelliteNDVI.ndviValue}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Field Health Status:</span>
                <span className="font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                  {mockSatelliteNDVI.healthStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Crop Canopy Coverage:</span>
                <span className="font-bold text-slate-200">{mockSatelliteNDVI.vegetationCoveragePct}%</span>
              </div>

              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-900">
                Last Satellite Overpass: {mockSatelliteNDVI.satellitePassDate}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
