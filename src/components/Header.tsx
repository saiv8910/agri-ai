import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { languageNames } from '../utils/translations';
import type { UserRole, LanguageCode } from '../types';
import {
  Sprout,
  Globe,
  Bell,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  UserCheck,
  ShieldAlert,
  Building2,
  Stethoscope,
  ShoppingCart,
  Tractor,
  Check,
  Settings
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    lang,
    setLang,
    darkMode,
    setDarkMode,
    currentUser,
    voiceEnabled,
    setVoiceEnabled,
    notifications,
    markNotificationRead,
    speakText,
    setIsAccountModalOpen
  } = useApp();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const roles: { key: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'farmer', label: 'Farmer', icon: <Tractor className="w-4 h-4" />, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
    { key: 'buyer', label: 'B2B Buyer', icon: <ShoppingCart className="w-4 h-4" />, color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
    { key: 'expert', label: 'Agri Expert', icon: <Stethoscope className="w-4 h-4" />, color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
    { key: 'government', label: 'Govt Official', icon: <Building2 className="w-4 h-4" />, color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
    { key: 'admin', label: 'System Admin', icon: <ShieldAlert className="w-4 h-4" />, color: 'bg-rose-500/20 text-rose-400 border-rose-500/40' },
  ];

  const currentRoleInfo = roles.find((r) => r.key === role) || roles[0];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setShowRoleMenu(false);
    speakText(`Switched role to ${newRole}`);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 text-white shadow-lg shadow-emerald-500/20 animate-pulse-slow">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                AgriAI
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PRO v2.5
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Intelligent Farming Assistant for India
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${currentRoleInfo.color} hover:brightness-125`}
            >
              {currentRoleInfo.icon}
              <span className="hidden md:inline">{currentRoleInfo.label}</span>
              <UserCheck className="w-3.5 h-3.5 opacity-60 ml-1" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl glass-card bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50">
                <div className="text-[11px] font-medium text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Select Active Persona
                </div>
                <div className="space-y-1 mt-1">
                  {roles.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => handleRoleChange(r.key)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                        role === r.key
                          ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {r.icon}
                        <span>{r.label}</span>
                      </div>
                      {role === r.key && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium border border-slate-700"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>{languageNames[lang].nativeName}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl glass-card bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 grid grid-cols-1 gap-1">
                <div className="text-[11px] font-medium text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Select Language / भाषा
                </div>
                {(Object.keys(languageNames) as LanguageCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-left ${
                      lang === code
                        ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{languageNames[code].nativeName}</span>
                    <span className="text-[10px] text-slate-400">({languageNames[code].name})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice Feedback Toggle */}
          <button
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (next) speakText('Voice assistance enabled');
            }}
            title={voiceEnabled ? 'Disable Voice Assistance' : 'Enable Voice Assistance'}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              voiceEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl glass-card bg-slate-900 border border-slate-700 shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-200">Alerts & Notifications</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {unreadCount} new
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                        n.read
                          ? 'bg-slate-800/40 border-slate-800 text-slate-400'
                          : 'bg-slate-800 border-emerald-500/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] mt-1 text-slate-300 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>

          {/* User Profile Badge (Clickable to Open Account Center Modal) */}
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="flex items-center space-x-2 pl-2 border-l border-slate-800 hover:opacity-85 transition-opacity text-left group"
            title="Click to Edit Profile & Account Details"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md group-hover:scale-105 transition-transform">
              {currentUser.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-200 line-clamp-1 flex items-center space-x-1">
                <span>{currentUser.name}</span>
                <Settings className="w-3 h-3 text-emerald-400 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="text-[10px] text-slate-400">{currentUser.location.district}, {currentUser.location.state}</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
