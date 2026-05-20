"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  User, 
  Calendar, 
  Heart, 
  Award, 
  MapPin, 
  Lock, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Home, 
  Plus, 
  Trash, 
  ArrowRight,
  LogOut,
  Compass,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Address {
  id: string;
  label: "Residence" | "Office" | "Billing" | "Other";
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface RoomItem {
  id: string;
  name: string;
  price: string;
  category: string;
  img: string;
}

export default function AccountDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "bookings" | "wishlist" | "addresses">("overview");
  
  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-0000"
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      label: "Office",
      street: "123 High-End Corporate Plaza, Silicon Valley",
      city: "San Jose",
      state: "CA",
      zip: "94025"
    },
    {
      id: "addr-2",
      label: "Residence",
      street: "456 Royal Terrace Gardens, Central Park Avenue",
      city: "New York",
      state: "NY",
      zip: "10001"
    }
  ]);
  const [newAddr, setNewAddr] = useState({
    label: "Residence" as Address["label"],
    street: "",
    city: "",
    state: "",
    zip: ""
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<RoomItem[]>([]);

  // Bookings state
  const activeBookings = [
    {
      id: "GH-2026-99081",
      room: "Deluxe Serenity Room",
      dates: "May 20 - May 23, 2026",
      amount: "$544.50",
      status: "Confirmed",
      checkIn: "3:00 PM",
      img: "/images/room_luxury.jpg"
    }
  ];

  const pastBookings = [
    {
      id: "GH-2025-41290",
      room: "Sunset Ridge Loft",
      dates: "Oct 12 - Oct 15, 2025",
      amount: "$680.00",
      status: "Completed",
      img: "/images/room_villa.jpg"
    }
  ];

  // Load wishlist from local storage on mount
  useEffect(() => {
    const fetchWishlist = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("gh-wishlist");
        if (saved) {
          try {
            setWishlist(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
    fetchWishlist();
    window.addEventListener("wishlist-updated", fetchWishlist);
    return () => window.removeEventListener("wishlist-updated", fetchWishlist);
  }, []);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const removeWishlistItem = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("gh-wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.state || !newAddr.zip) return;
    const added: Address = {
      id: `addr-${Date.now()}`,
      ...newAddr
    };
    setAddresses(prev => [...prev, added]);
    setNewAddr({ label: "Residence", street: "", city: "", state: "", zip: "" });
    setShowAddForm(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-12 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Gold Elite Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle gold grid overlay background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-amber-950/10 to-slate-900 opacity-40 pointer-events-none"></div>

          <div className="flex items-center space-x-5 relative z-10">
            <div className="h-20 w-20 rounded-3xl bg-amber-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-amber-500/20 shrink-0">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-sm text-slate-400 font-medium mt-0.5">{profileData.email}</p>
              <div className="mt-2 flex items-center space-x-1.5 text-xs text-amber-400 font-extrabold uppercase tracking-widest">
                <Award className="h-4 w-4 fill-amber-400/10" />
                <span>Gold Elite Member</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl px-6 py-4 border border-white/5 text-center shrink-0 relative z-10">
            <p className="text-[10px] text-slate-350 uppercase tracking-widest font-extrabold">Loyalty Points</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">12,450</p>
          </div>
        </div>

        {/* 2. Interactive Member Hub Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Tab Sidebar Selection */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-4">Member Portal</span>
              <nav className="flex flex-col space-y-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all w-full text-left ${
                    activeTab === "overview"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "text-slate-655 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-850"
                  }`}
                >
                  <Compass className="h-4.5 w-4.5 shrink-0" />
                  <span>VIP Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all w-full text-left ${
                    activeTab === "profile"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "text-slate-655 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-850"
                  }`}
                >
                  <User className="h-4.5 w-4.5 shrink-0" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all w-full text-left ${
                    activeTab === "bookings"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "text-slate-655 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-850"
                  }`}
                >
                  <Calendar className="h-4.5 w-4.5 shrink-0" />
                  <span>Stay History</span>
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all w-full text-left ${
                    activeTab === "wishlist"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "text-slate-655 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-850"
                  }`}
                >
                  <Heart className="h-4.5 w-4.5 shrink-0" />
                  <span>Saved Rooms</span>
                  {wishlist.length > 0 && (
                    <span className="ml-auto bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all w-full text-left ${
                    activeTab === "addresses"
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                      : "text-slate-655 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-850"
                  }`}
                >
                  <MapPin className="h-4.5 w-4.5 shrink-0" />
                  <span>Saved Addresses</span>
                </button>
              </nav>
            </div>

            <Link href="/" className="flex items-center space-x-3 px-10 py-3 text-slate-400 hover:text-rose-500 text-xs font-bold uppercase tracking-wider transition-colors w-full">
              <LogOut className="h-4.5 w-4.5 shrink-0" />
              <span>Logout Portal</span>
            </Link>
          </div>

          {/* Active Tab Panel Content */}
          <div className="lg:col-span-3">
            
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                  <div className="pb-4 border-b border-slate-100 dark:border-slate-850">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Upcoming Sanctuary Stay</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Your luxury check-in coordinates are finalized.</p>
                  </div>

                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">RESIDENCY ID: {booking.id}</span>
                        <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{booking.status}</span>
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row gap-5 items-start">
                        <div className="relative h-20 w-32 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                          <Image src={booking.img} alt={booking.room} fill className="object-cover" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>{booking.room}</h3>
                          <p className="text-xs text-slate-500 font-medium">Grand Dwarka Oceanfront Estate Suite</p>
                          <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-semibold pt-1">
                            <span className="flex items-center uppercase tracking-wider"><Calendar className="h-3.5 w-3.5 mr-1 text-amber-500" /> {booking.dates}</span>
                            <span className="flex items-center uppercase tracking-wider"><Compass className="h-3.5 w-3.5 mr-1 text-amber-500" /> Check-in: {booking.checkIn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loyalty perks panel */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Elite Membership Privileges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <div className="flex items-center space-x-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 text-[10px]">✓</span>
                      <span>Complimentary Airport VIP Chauffeur</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 text-[10px]">✓</span>
                      <span>Complimentary High-speed Wi-Fi & Lounge</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 text-[10px]">✓</span>
                      <span>Early Check-in & Late Checkout Priority</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 text-[10px]">✓</span>
                      <span>Exclusive Suite Space Upgrade Access</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROFILE & SECURITY */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* 1. Profile details form */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                  <form onSubmit={handleProfileSave} className="space-y-6">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-850 pb-3" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                      Profile Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            required 
                            type="text" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                          />
                        </div>
                      </div>
                      {/* Last Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            required 
                            type="text" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                          />
                        </div>
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            required 
                            type="email" 
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            required 
                            type="tel" 
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      {profileSaved && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 flex items-center">
                          <ShieldCheck className="h-4.5 w-4.5 mr-1 text-emerald-500 animate-bounce" /> Profile Details Saved!
                        </span>
                      )}
                      <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 px-6 rounded-xl ml-auto shadow-sm text-xs uppercase tracking-wider">
                        Save Profile Changes
                      </Button>
                    </div>
                  </form>
                </div>

                {/* 2. Change password form */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                  <form onSubmit={handlePasswordSave} className="space-y-6">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center border-b border-slate-50 dark:border-slate-850 pb-3" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                      <Lock className="h-4.5 w-4.5 text-amber-500 mr-2" /> Change Password
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Current Password</label>
                        <input 
                          required 
                          type="password" 
                          placeholder="••••••••" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">New Password</label>
                        <input 
                          required 
                          type="password" 
                          placeholder="New secure password" 
                          className="w-full px-4 py-3 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955" 
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      {passwordSaved && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500 flex items-center">
                          <ShieldCheck className="h-4.5 w-4.5 mr-1 text-emerald-500 animate-bounce" /> Password Changed Successfully!
                        </span>
                      )}
                      <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 px-6 rounded-xl ml-auto shadow-sm text-xs uppercase tracking-wider">
                        Update Password
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB: STAY HISTORY */}
            {activeTab === "bookings" && (
              <div className="space-y-8">
                
                {/* Upcoming */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-md space-y-6">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-850 pb-3" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                    Upcoming stays
                  </h2>
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Resort ID: {booking.id}</span>
                        <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                          <ShieldCheck className="h-3 w-3" />
                          <span>{booking.status}</span>
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-5 items-start">
                        <div className="relative h-16 w-28 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                          <Image src={booking.img} alt={booking.room} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>{booking.room}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">dates: <span className="font-bold text-slate-650 dark:text-slate-200">{booking.dates}</span></p>
                          <p className="text-xs text-slate-400 mt-0.5">Amount Paid: <span className="font-bold text-amber-500">{booking.amount}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Past stays */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-md space-y-6">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-850 pb-3" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                    Past Reservation History
                  </h2>
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap opacity-75 hover:opacity-100 transition-opacity">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-14 w-20 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                            <Image src={booking.img} alt={booking.room} fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>{booking.room}</h3>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{booking.dates}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white">{booking.amount}</p>
                          <span className="inline-flex items-center space-x-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-slate-600 dark:bg-slate-800 dark:text-slate-400 mt-1">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: WISHLIST & SAVED ROOMS */}
            {activeTab === "wishlist" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                      Saved Luxury Rooms
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Shortlisted accommodations saved from your rooms directory.</p>
                  </div>
                  <Heart className="h-6 w-6 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                      <Compass className="h-6 w-6 animate-spin" style={{ animationDuration: "12s" }} />
                    </div>
                    <p className="text-xs font-semibold text-slate-550 dark:text-slate-400">Your wishlist is currently empty.</p>
                    <Link href="/rooms" className="inline-flex items-center text-xs font-bold text-amber-500 hover:text-amber-600 uppercase tracking-widest transition-colors">
                      <span>Explore Rooms Directory</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((item) => (
                      <div key={item.id} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                            <Image src={item.img} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="text-[8px] font-extrabold text-amber-500 uppercase tracking-widest">{item.category}</span>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mt-0.5" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>{item.name}</h3>
                            <p className="text-xs text-amber-500 font-extrabold mt-1">{item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0 justify-end">
                          <button 
                            onClick={() => removeWishlistItem(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all"
                            title="Remove from wishlist"
                          >
                            <Trash className="h-4.5 w-4.5" />
                          </button>
                          <Link href={`/booking?room=${item.id}`}>
                            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] uppercase tracking-widest py-3 px-4 flex items-center justify-center space-x-1.5 rounded-xl shadow-sm">
                              <span>Reserve Suite</span>
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SAVED ADDRESSES */}
            {activeTab === "addresses" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-850 pb-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>
                      Saved Addresses
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage coordinates for corporate billing and transfers.</p>
                  </div>
                  <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-xl hover:bg-amber-500 hover:text-white transition-all shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                {/* Add new address form block */}
                {showAddForm && (
                  <form onSubmit={handleAddAddress} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-amber-500/15 space-y-4 animate-fadeIn">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-500">New Address Coordinates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Label Type</label>
                        <select 
                          value={newAddr.label}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, label: e.target.value as Address["label"] }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        >
                          <option value="Residence">Residence</option>
                          <option value="Office">Office</option>
                          <option value="Billing">Billing</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Street Address</label>
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. 123 Luxury Road"
                          value={newAddr.street}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, street: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">City</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Dwarka"
                          value={newAddr.city}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">State</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Gujarat"
                          value={newAddr.state}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Zip / Pin Code</label>
                        <input 
                          required
                          type="text" 
                          placeholder="361335"
                          value={newAddr.zip}
                          onChange={(e) => setNewAddr(prev => ({ ...prev, zip: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2 justify-end">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-500"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-sm"
                      >
                        Save Coordinates
                      </Button>
                    </div>
                  </form>
                )}

                {/* Addresses listing */}
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                          {address.label === "Office" ? <Briefcase className="h-5 w-5" /> : <Home className="h-5 w-5" />}
                        </div>
                        <div>
                          <span className="text-[8px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                            {address.label}
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1.5 leading-relaxed">
                            {address.street}, {address.city}, {address.state} - {address.zip}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteAddress(address.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all shrink-0"
                        title="Delete Address"
                      >
                        <Trash className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
