import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ProduceListing, MarketplaceOrder } from '../types';
import {
  Store,
  PlusCircle,
  Search,
  CheckCircle2,
  MapPin,
  Phone,
  ShoppingCart,
  ShieldCheck,
  Star,
  Leaf,
  X
} from 'lucide-react';

export const Marketplace: React.FC = () => {
  const { produceListings, addProduceListing, addOrder, currentUser, role, speakText } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<ProduceListing | null>(null);
  const [orderQuantityKg, setOrderQuantityKg] = useState(1000);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // New Listing Form State
  const [newCrop, setNewCrop] = useState({
    crop: '',
    variety: '',
    quantityQuintals: 50,
    pricePerKg: 30,
    minOrderKg: 500,
    location: currentUser.location.district,
    organic: false,
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80'
  });

  const filteredListings = produceListings.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrganic = organicOnly ? item.organic : true;
    return matchesSearch && matchesOrganic;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop.crop || !newCrop.variety) return;

    const listing: ProduceListing = {
      id: `lst_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmerRating: 5.0,
      crop: newCrop.crop,
      variety: newCrop.variety,
      quantityQuintals: newCrop.quantityQuintals,
      pricePerKg: newCrop.pricePerKg,
      minOrderKg: newCrop.minOrderKg,
      harvestDate: new Date().toISOString().split('T')[0],
      location: newCrop.location,
      district: currentUser.location.district,
      state: currentUser.location.state,
      organic: newCrop.organic,
      images: [newCrop.imageUrl],
      status: 'available'
    };

    addProduceListing(listing);
    setShowAddModal(false);
    speakText(`Produce listing created for ${newCrop.crop}`);
  };

  const handlePlaceOrder = () => {
    if (!selectedListing) return;

    const order: MarketplaceOrder = {
      id: `ord_${Date.now()}`,
      listingId: selectedListing.id,
      cropName: selectedListing.crop,
      buyerName: currentUser.name,
      buyerPhone: currentUser.phone,
      quantityKg: orderQuantityKg,
      totalPriceRs: orderQuantityKg * selectedListing.pricePerKg,
      orderDate: new Date().toLocaleDateString(),
      status: 'in_transit',
      deliveryAddress: `${currentUser.location.district}, ${currentUser.location.state}`
    };

    addOrder(order);
    setOrderSuccess(true);
    speakText(`Order placed successfully for ${orderQuantityKg} kg of ${selectedListing.crop}`);

    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedListing(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Store className="w-4 h-4" />
            <span>Direct Kisan-to-Buyer Trading Hub</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">B2B Agricultural Marketplace</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Farmers post produce directly to cut out middleman commissions. Institutional buyers, exporters, and retail chains place bulk orders with escrow protection.
          </p>
        </div>

        {role === 'farmer' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Produce for Sale</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl glass-card border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search crop, district, or farmer name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer text-xs text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={organicOnly}
              onChange={(e) => setOrganicOnly(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
            />
            <span className="flex items-center space-x-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Organic Only</span>
            </span>
          </label>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl glass-card border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.crop}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                    {item.quantityQuintals} Quintals Available
                  </span>
                  {item.organic && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 font-extrabold text-[10px] flex items-center space-x-1">
                      <Leaf className="w-3 h-3" />
                      <span>Organic</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-lg">
                  ₹{item.pricePerKg} <span className="text-[10px] font-normal">/ kg</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-slate-100">{item.crop}</h3>
                  <div className="text-xs text-slate-400">{item.variety}</div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 border-t border-b border-slate-800 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Farmer:</span>
                    <span className="font-semibold text-slate-200 flex items-center space-x-1">
                      <span>{item.farmerName}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-amber-400">{item.farmerRating}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-slate-200 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{item.district}, {item.state}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Min Order:</span>
                    <span className="font-semibold text-emerald-400">{item.minOrderKg} kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`tel:${item.farmerPhone}`}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Kisan</span>
              </a>

              <button
                onClick={() => {
                  setSelectedListing(item);
                  setOrderQuantityKg(item.minOrderKg);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy Bulk Lot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl glass-card border border-emerald-500/30 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">B2B Purchase Order ({selectedListing.crop})</h3>
              <button onClick={() => setSelectedListing(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-slate-100">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Escrow payment locked. Farmer has been notified for dispatch.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                  <img src={selectedListing.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <div className="font-bold text-slate-200">{selectedListing.crop}</div>
                    <div className="text-slate-400">{selectedListing.farmerName} • ₹{selectedListing.pricePerKg}/kg</div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Order Quantity (kg)</label>
                  <input
                    type="number"
                    step="100"
                    min={selectedListing.minOrderKg}
                    value={orderQuantityKg}
                    onChange={(e) => setOrderQuantityKg(parseInt(e.target.value) || selectedListing.minOrderKg)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-bold text-sm"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Min Order: {selectedListing.minOrderKg} kg</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-300">Total Purchase Value:</span>
                  <span className="text-emerald-400">₹{(orderQuantityKg * selectedListing.pricePerKg).toLocaleString()}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Order with Escrow</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Produce Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl glass-card border border-emerald-500/30 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">Post New Produce for Sale</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Crop Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Onion / Hybrid Tomato"
                  value={newCrop.crop}
                  onChange={(e) => setNewCrop({ ...newCrop, crop: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Variety / Quality Grade</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade A Export Firm"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Quantity (Quintals)</label>
                  <input
                    type="number"
                    value={newCrop.quantityQuintals}
                    onChange={(e) => setNewCrop({ ...newCrop, quantityQuintals: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold mb-1 block">Price per Kg (₹)</label>
                  <input
                    type="number"
                    value={newCrop.pricePerKg}
                    onChange={(e) => setNewCrop({ ...newCrop, pricePerKg: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="organicChk"
                  checked={newCrop.organic}
                  onChange={(e) => setNewCrop({ ...newCrop, organic: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-emerald-500"
                />
                <label htmlFor="organicChk" className="text-slate-300 font-medium">100% Organic Certified Harvest</label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
              >
                Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
