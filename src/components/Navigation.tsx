import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Scan,
  CloudSun,
  Bot,
  TrendingUp,
  Store,
  Landmark,
  CalendarDays,
  Wallet,
  Activity,
  Calculator,
  Stethoscope,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, role, t } = useApp();

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" />, roles: ['farmer', 'buyer', 'expert', 'government', 'admin'] },
    { id: 'disease', label: t('diseaseDetection'), icon: <Scan className="w-5 h-5" />, roles: ['farmer', 'expert', 'admin'] },
    { id: 'weather', label: t('weatherAlerts'), icon: <CloudSun className="w-5 h-5" />, roles: ['farmer', 'government', 'admin'] },
    { id: 'chatbot', label: t('aiChatbot'), icon: <Bot className="w-5 h-5" />, roles: ['farmer', 'buyer', 'expert', 'government', 'admin'] },
    { id: 'yield', label: t('yieldPrediction'), icon: <Calculator className="w-5 h-5" />, roles: ['farmer', 'expert', 'government', 'admin'] },
    { id: 'market', label: t('marketPrices'), icon: <TrendingUp className="w-5 h-5" />, roles: ['farmer', 'buyer', 'government', 'admin'] },
    { id: 'b2b', label: t('marketplace'), icon: <Store className="w-5 h-5" />, roles: ['farmer', 'buyer', 'admin'] },
    { id: 'schemes', label: t('schemes'), icon: <Landmark className="w-5 h-5" />, roles: ['farmer', 'government', 'admin'] },
    { id: 'calendar', label: t('cropCalendar'), icon: <CalendarDays className="w-5 h-5" />, roles: ['farmer', 'expert'] },
    { id: 'financials', label: t('farmFinancials'), icon: <Wallet className="w-5 h-5" />, roles: ['farmer', 'admin'] },
    { id: 'iot', label: t('iotSatellite'), icon: <Activity className="w-5 h-5" />, roles: ['farmer', 'government', 'admin'] },
  ];

  // Role specific extra tabs
  if (role === 'expert') {
    navItems.push({ id: 'expert_portal', label: 'Expert Review Queue', icon: <Stethoscope className="w-5 h-5" />, roles: ['expert'] });
  }
  if (role === 'government') {
    navItems.push({ id: 'govt_portal', label: 'Govt Region Analytics', icon: <Building2 className="w-5 h-5" />, roles: ['government'] });
  }
  if (role === 'admin') {
    navItems.push({ id: 'admin_portal', label: 'Admin Telemetry', icon: <ShieldCheck className="w-5 h-5" />, roles: ['admin'] });
  }

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-full lg:w-64 bg-slate-900/50 border-r border-slate-800 p-3 flex flex-row lg:flex-col justify-between overflow-x-auto lg:overflow-y-auto shrink-0 scrollbar-none">
      <div className="flex lg:flex-col space-x-1 lg:space-x-0 lg:space-y-1 w-full">
        <div className="hidden lg:block px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Navigation Menu
        </div>
        {filteredItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-emerald-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
