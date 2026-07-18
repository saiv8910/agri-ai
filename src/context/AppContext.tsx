import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, LanguageCode, UserProfile, DiseaseDetectionResult, ProduceListing, MarketplaceOrder } from '../types';
import { mockUsers, sampleDiseaseResults, mockProduceListings } from '../data/mockData';
import { getTranslation } from '../utils/translations';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currentUser: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  t: (key: string) => string;
  diseaseHistory: DiseaseDetectionResult[];
  addDiseaseResult: (result: DiseaseDetectionResult) => void;
  produceListings: ProduceListing[];
  addProduceListing: (listing: ProduceListing) => void;
  orders: MarketplaceOrder[];
  addOrder: (order: MarketplaceOrder) => void;
  speakText: (text: string) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  notifications: { id: string; title: string; message: string; time: string; read: boolean }[];
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('farmer');
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [diseaseHistory, setDiseaseHistory] = useState<DiseaseDetectionResult[]>(sampleDiseaseResults);
  const [produceListings, setProduceListings] = useState<ProduceListing[]>(mockProduceListings);
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);

  // User Profile State with LocalStorage Persistence
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('agri_ai_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse user profile from localStorage:', e);
    }
    return mockUsers['farmer'];
  });

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // If switching role, check if custom profile or update role attribute
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        role: newRole,
        // keep user's custom name if set, or switch mock fallback
        name: prev.name && prev.name !== mockUsers[prev.role]?.name ? prev.name : (mockUsers[newRole]?.name || prev.name)
      };
      localStorage.setItem('agri_ai_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserProfile = (profileUpdate: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        ...profileUpdate,
        location: {
          ...prev.location,
          ...(profileUpdate.location || {})
        }
      };
      localStorage.setItem('agri_ai_user_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Rainfall Alert',
      message: 'Heavy rain predicted in Nashik over the next 12h.',
      time: '10 mins ago',
      read: false
    },
    {
      id: 'n2',
      title: 'Mandi Price Increase',
      message: 'Red Onion prices at Lasalgaon APMC surged by +9.6%.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 'n3',
      title: 'New Scheme Eligibility',
      message: 'You qualify for 40% SMAM equipment subsidy.',
      time: 'Yesterday',
      read: true
    }
  ]);

  const t = (key: string) => getTranslation(lang, key);

  const addDiseaseResult = (result: DiseaseDetectionResult) => {
    setDiseaseHistory((prev) => [result, ...prev]);
  };

  const addProduceListing = (listing: ProduceListing) => {
    setProduceListings((prev) => [listing, ...prev]);
  };

  const addOrder = (order: MarketplaceOrder) => {
    setOrders((prev) => [order, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('hi-IN'));
      if (indianVoice) utterance.voice = indianVoice;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Text-to-speech error:', e);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        lang,
        setLang,
        activeTab,
        setActiveTab,
        darkMode,
        setDarkMode,
        currentUser,
        updateUserProfile,
        isAccountModalOpen,
        setIsAccountModalOpen,
        t,
        diseaseHistory,
        addDiseaseResult,
        produceListings,
        addProduceListing,
        orders,
        addOrder,
        speakText,
        voiceEnabled,
        setVoiceEnabled,
        notifications,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
