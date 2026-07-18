import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { DiseaseDetection } from './components/DiseaseDetection';
import { WeatherAlerts } from './components/WeatherAlerts';
import { AIChatbot } from './components/AIChatbot';
import { YieldPredictor } from './components/YieldPredictor';
import { MarketPrices } from './components/MarketPrices';
import { Marketplace } from './components/Marketplace';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { FarmHub } from './components/FarmHub';
import { SpecializedPortals } from './components/SpecializedPortals';
import { AccountModal } from './components/AccountModal';

const MainContent: React.FC = () => {
  const { activeTab, isAccountModalOpen, setIsAccountModalOpen } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'disease':
        return <DiseaseDetection />;
      case 'weather':
        return <WeatherAlerts />;
      case 'chatbot':
        return <AIChatbot />;
      case 'yield':
        return <YieldPredictor />;
      case 'market':
        return <MarketPrices />;
      case 'b2b':
        return <Marketplace />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'calendar':
      case 'financials':
      case 'iot':
        return <FarmHub />;
      case 'expert_portal':
      case 'govt_portal':
      case 'admin_portal':
        return <SpecializedPortals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
        <Navigation />
        <main className="flex-1 overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>

      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            AgriAI Enterprise SaaS • Production Architecture © 2026 Antigravity
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-emerald-400 cursor-pointer">PyTorch Vision</span>
            <span>•</span>
            <span className="hover:text-emerald-400 cursor-pointer">APMC Mandi API</span>
            <span>•</span>
            <span className="hover:text-emerald-400 cursor-pointer">Sentinel-2 Satellite</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
