"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Gift, 
  Coffee, 
  Plane, 
  GlassWater, 
  Percent, 
  HeartHandshake 
} from "lucide-react";

// Real room inventory synced with our system
const dummyRooms = [
  {
    id: "deluxe-serenity",
    name: "Deluxe Serenity Suite",
    price: 250,
    rating: 5,
    reviews: 124,
    image: "/images/room_luxury.jpg",
    description: "A serene coastal oasis overlooking pristine horizons.",
    amenities: ["King Bed", "Private Terrace", "Rain Shower", "Mini Bar"],
    guests: 2
  },
  {
    id: "executive-ocean",
    name: "Executive Ocean View Suite",
    price: 450,
    rating: 5,
    reviews: 98,
    image: "/images/room_executive.jpg",
    description: "Panoramic shoreline vistas with custom private butler access.",
    amenities: ["King Bed", "Ocean Vista Balcony", "Premium Tub", "Living Lounge"],
    guests: 2
  },
  {
    id: "presidential-royal",
    name: "Presidential Royal Suite",
    price: 850,
    rating: 5,
    reviews: 74,
    image: "/images/room_royal.jpg",
    description: "Palatial multi-room layouts designed fit for elite royalty.",
    amenities: ["2 King Beds", "Private Jacuzzi", "Butler Service", "Gourmet Kitchen"],
    guests: 4
  }
];

// Curated luxury add-ons
const addonServices = [
  {
    id: "breakfast",
    name: "Gourmet Breakfast Buffet",
    description: "Michelin-curated gourmet buffet served daily to your table.",
    price: 25,
    type: "per_day_per_guest",
    icon: Coffee
  },
  {
    id: "pickup",
    name: "VVIP Airport Transfer",
    description: "Chauffeur pick-up directly from the airport terminal in luxury sedan.",
    price: 50,
    type: "one_time",
    icon: Plane
  },
  {
    id: "lounge",
    name: "Sky VIP Club Access",
    description: "Complimentary elite premium drinks, high-tea, and sunset appetizers.",
    price: 35,
    type: "per_day_per_guest",
    icon: GlassWater
  }
];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Initial State parsing from URL search params
  const [selectedRoomId, setSelectedRoomId] = useState("deluxe-serenity");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal percentage
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Sync state from query parameters on mount
  useEffect(() => {
    // Populate default dates if not provided
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const checkinParam = searchParams.get("checkin");
    const checkoutParam = searchParams.get("checkout");
    const categoryParam = searchParams.get("category");

    setCheckInDate(checkinParam || formatDate(today));
    setCheckOutDate(checkoutParam || formatDate(tomorrow));
    
    if (categoryParam) {
      if (categoryParam.includes("suite") || categoryParam.includes("executive")) {
        setSelectedRoomId("executive-ocean");
      } else if (categoryParam.includes("presidential") || categoryParam.includes("royal")) {
        setSelectedRoomId("presidential-royal");
      } else {
        setSelectedRoomId("deluxe-serenity");
      }
    }
  }, [searchParams]);

  // Calculate nights dynamically
  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 1;
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const nights = getNights();
  const room = dummyRooms.find((r) => r.id === selectedRoomId) || dummyRooms[0];

  // Pricing calculations
  const baseRoomCost = room.price * nights;

  const getAddonCost = () => {
    return selectedAddons.reduce((sum, addonId) => {
      const add = addonServices.find(a => a.id === addonId);
      if (!add) return sum;
      if (add.type === "per_day_per_guest") {
        return sum + (add.price * nights * guestsCount);
      }
      return sum + add.price;
    }, 0);
  };

  const addonCost = getAddonCost();
  const subtotal = baseRoomCost + addonCost;
  const discountAmount = subtotal * appliedDiscount;
  const taxAmount = (subtotal - discountAmount) * 0.12; // 12% luxury tax
  const totalCost = (subtotal - discountAmount) + taxAmount;

  // Addon selection toggle
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Coupon code verification
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();
    if (code === "GRAND25") {
      setAppliedDiscount(0.25);
      setCouponSuccess("GRAND25 applied successfully! Enjoy 25% exclusive summer savings.");
    } else if (code === "GRAND20") {
      setAppliedDiscount(0.20);
      setCouponSuccess("GRAND20 applied successfully! Enjoy 20% room discount.");
    } else if (code === "WELCOME10") {
      setAppliedDiscount(0.10);
      setCouponSuccess("WELCOME10 applied successfully! Enjoy 10% welcome bonus discount.");
    } else if (code === "") {
      setCouponError("Please enter a valid coupon code.");
    } else {
      setCouponError("Invalid or expired coupon voucher. Please try GRAND25.");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate dynamically carrying all invoice information to simulated gateway checkout page
    const checkoutQuery = new URLSearchParams({
      roomId: room.id,
      checkin: checkInDate,
      checkout: checkOutDate,
      guests: guestsCount.toString(),
      addons: selectedAddons.join(","),
      requests: specialRequests,
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: taxAmount.toFixed(2),
      total: totalCost.toFixed(2),
      promo: appliedDiscount > 0 ? couponCode : ""
    }).toString();

    router.push(`/checkout?${checkoutQuery}`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Bespoke Stays</span>
          <h1 
            className="text-4xl font-extrabold text-slate-955 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Customize Your Dream Getaway
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Review suite selections, enrich your luxury experience with curated add-ons, and secure check-in details.
          </p>
        </div>

        {/* Master Booking Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Form inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Dates & Guests Block */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">1. Select Reservation Details</h3>
              </div>

              {/* Dynamic Checkin & Checkout Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    min={checkInDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Room select & Guests picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Select Accommodations</label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold"
                  >
                    {dummyRooms.map(r => (
                      <option key={r.id} value={r.id} className="dark:bg-slate-900">{r.name} - ${r.price}/night</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Number of Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold"
                  >
                    <option value={1} className="dark:bg-slate-900">1 Guest</option>
                    <option value={2} className="dark:bg-slate-900">2 Guests</option>
                    <option value={3} className="dark:bg-slate-900">3 Guests</option>
                    <option value={4} className="dark:bg-slate-900">4 Guests</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Add-on Services Block */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">2. Enhance Your Experience</h3>
              </div>

              <div className="space-y-4">
                {addonServices.map((addon) => {
                  const IconComponent = addon.icon;
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div 
                      key={addon.id} 
                      onClick={() => toggleAddon(addon.id)}
                      className={`border rounded-2xl p-5 flex items-start space-x-4 cursor-pointer transition-all duration-200 ${
                        isChecked 
                          ? "border-amber-500/40 bg-amber-500/[0.02] shadow-sm" 
                          : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-transparent"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-colors ${
                        isChecked ? "bg-amber-500 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{addon.name}</h4>
                          <span className="text-xs font-bold text-amber-500 shrink-0">
                            ${addon.price} {addon.type === "per_day_per_guest" ? "/ day / guest" : "one-time"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed max-w-lg">
                          {addon.description}
                        </p>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all ${
                        isChecked ? "bg-amber-500 border-amber-500 text-white scale-110 shadow-sm" : "border-slate-200 dark:border-slate-700"
                      }`}>
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Special Requests Text Field */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">3. Special Requests</h3>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Additional Wishes or Dietary Requirements</label>
                <textarea
                  rows={4}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="E.g., early arrival check-in requests, honeymoon setups, feather-free bedding materials, dietary restrictions, child cradle setups..."
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 leading-relaxed"
                />
              </div>
            </div>

          </div>

          {/* Right Column - Summary & Price breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Room Summary Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="relative h-56 w-full bg-slate-100">
                <Image 
                  src={room.image} 
                  alt={room.name} 
                  fill 
                  className="object-cover" 
                  sizes="(max-w-768px) 100vw, 40vw"
                />
                <div className="absolute top-4 left-4 bg-slate-950/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[10px] font-extrabold text-amber-400 tracking-widest uppercase shadow-sm">
                  Active Summary
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xl">{room.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {room.amenities.map((am, idx) => (
                    <span 
                      key={idx} 
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/40 text-slate-600 dark:text-slate-350 text-[10px] font-bold px-3 py-1 rounded-full flex items-center"
                    >
                      <Check className="h-2.5 w-2.5 text-amber-500 mr-1 stroke-[3]" />
                      {am}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-md space-y-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg pb-4 border-b border-slate-100 dark:border-slate-800">
                Price Breakdown
              </h3>

              {/* Dynamic details listing */}
              <div className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Room Selection ({nights} {nights > 1 ? "nights" : "night"})</span>
                  <span className="text-slate-850 dark:text-slate-200">${baseRoomCost.toFixed(2)}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-850">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Add-on Services</span>
                    {selectedAddons.map((addonId) => {
                      const add = addonServices.find(a => a.id === addonId);
                      if (!add) return null;
                      const cost = add.type === "per_day_per_guest" 
                        ? (add.price * nights * guestsCount)
                        : add.price;
                      return (
                        <div key={addonId} className="flex justify-between pl-2 text-slate-550 dark:text-slate-450">
                          <span>• {add.name}</span>
                          <span>${cost.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-500 pt-2 border-t border-slate-50 dark:border-slate-850">
                    <span>Voucher Coupon Discount ({appliedDiscount * 100}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span>Subtotal</span>
                  <span className="text-slate-800 dark:text-slate-200 font-extrabold">${(subtotal - discountAmount).toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Luxury Tax & VAT (12%)</span>
                  <span className="text-slate-800 dark:text-slate-200">${taxAmount.toFixed(2)}</span>
                </div>

                {/* Final Booking Total */}
                <div className="flex justify-between pt-5 border-t border-slate-100 dark:border-slate-800 items-baseline">
                  <span className="text-slate-900 dark:text-white font-extrabold text-sm uppercase tracking-wider">Total Est. Price</span>
                  <span className="text-amber-500 font-black text-2xl">${totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon inputs */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <label className="block text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Apply Promo Coupon</label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="E.g., GRAND25"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-xs font-bold"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-850 dark:hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-500 font-semibold">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-emerald-500 font-semibold flex items-center"><Gift className="h-3 w-3 mr-1" />{couponSuccess}</p>}
                </form>
              </div>

              {/* Interactive payment submit button */}
              <div className="pt-2">
                <Button 
                  onClick={handleCheckoutSubmit}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-6 rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2 hover:-translate-y-0.5 duration-200"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider">Preparing booking dashboard...</span>
        </div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
