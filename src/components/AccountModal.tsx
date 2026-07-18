import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole, UserProfile } from '../types';
import {
  User,
  Phone,
  MapPin,
  CheckCircle2,
  X,
  Sparkles,
  Save
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, setRole, speakText } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'register'>('profile');

  // Edit Profile Form State
  const [profileData, setProfileData] = useState<UserProfile>(currentUser);

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    name: '',
    phone: '',
    password: '',
    role: 'farmer' as UserRole,
    district: '',
    state: '',
    pincode: '',
    farmSizeAcres: 5,
    primaryCrops: 'Onion, Wheat, Tomato'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileData);
    setSavedSuccess(true);
    speakText(`Profile updated for ${profileData.name}`);

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  const handleRegisterNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.phone) return;

    const newProfile: UserProfile = {
      id: `usr_custom_${Date.now()}`,
      name: registerForm.name,
      phone: registerForm.phone,
      role: registerForm.role,
      location: {
        district: registerForm.district || 'My District',
        state: registerForm.state || 'My State',
        pincode: registerForm.pincode || '000000'
      },
      farmSizeAcres: registerForm.farmSizeAcres,
      primaryCrops: registerForm.primaryCrops.split(',').map((c) => c.trim()),
      verified: true
    };

    setRole(registerForm.role);
    updateUserProfile(newProfile);
    setSavedSuccess(true);
    speakText(`Welcome ${newProfile.name}! Account created successfully.`);

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl glass-card border border-emerald-500/30 p-6 space-y-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg shadow-emerald-500/20">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">User Account Center</h3>
              <p className="text-xs text-slate-400">Manage your credentials, farm details & persona</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('profile');
              setProfileData(currentUser);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Edit Current Profile
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'register'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create / Switch Account
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">Account Details Saved!</h4>
            <p className="text-xs text-slate-300">Your custom profile name and farm location are now active.</p>
          </div>
        ) : activeTab === 'profile' ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Role Persona</label>
                <select
                  value={profileData.role}
                  onChange={(e) => {
                    const newR = e.target.value as UserRole;
                    setProfileData({ ...profileData, role: newR });
                    setRole(newR);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="farmer">Farmer</option>
                  <option value="buyer">B2B Buyer</option>
                  <option value="expert">Agri Expert</option>
                  <option value="government">Govt Official</option>
                  <option value="admin">System Admin</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">District / City</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={profileData.location.district}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: { ...profileData.location, district: e.target.value }
                      })
                    }
                    placeholder="District name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">State</label>
                <input
                  type="text"
                  required
                  value={profileData.location.state}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      location: { ...profileData.location, state: e.target.value }
                    })
                  }
                  placeholder="State name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {profileData.role === 'farmer' && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Farm Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profileData.farmSizeAcres || 5}
                    onChange={(e) => setProfileData({ ...profileData, farmSizeAcres: parseFloat(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Primary Crops</label>
                  <input
                    type="text"
                    value={profileData.primaryCrops?.join(', ') || ''}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        primaryCrops: e.target.value.split(',').map((c) => c.trim())
                      })
                    }
                    placeholder="e.g. Tomato, Onion, Wheat"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterNewAccount} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold mb-1 block">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Aniket Sharma"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Mobile Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 00000"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Role Persona</label>
                <select
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value as UserRole })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-semibold"
                >
                  <option value="farmer">Farmer</option>
                  <option value="buyer">B2B Buyer</option>
                  <option value="expert">Agri Expert</option>
                  <option value="government">Govt Official</option>
                  <option value="admin">System Admin</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">District / City</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune / Ludhiana"
                  value={registerForm.district}
                  onChange={(e) => setRegisterForm({ ...registerForm, district: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">State</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharashtra / Punjab"
                  value={registerForm.state}
                  onChange={(e) => setRegisterForm({ ...registerForm, state: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create & Activate Account</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
