"use client";

import React from "react";
import { 
  Waves, 
  Dumbbell, 
  Sparkles, 
  Car, 
  Smile, 
  GlassWater, 
  Compass, 
  Check,
  LucideIcon
} from "lucide-react";

interface Facility {
  name: string;
  category: string;
  details: string;
  icon: LucideIcon;
  highlights: string[];
  operationalHours: string;
}

export default function FacilitiesPage() {
  const resortFacilities: Facility[] = [
    {
      name: "Oceanfront Swimming Pool",
      category: "Recreation & Wellness",
      details: "A breathtaking heated infinity-edge pool that blends seamlessly into the ocean horizon, featuring premium personal cabanas and butler-served mocktail service.",
      icon: Waves,
      highlights: ["Heated Water System", "Adults-Only Quiet Zone", "Private Luxury Cabanas"],
      operationalHours: "06:00 AM - 09:00 PM"
    },
    {
      name: "Saffron Restaurant & Sunset Bar",
      category: "Culinary & Dining",
      details: "Savor gourmet coastal cuisines crafted by international Michelin-starred culinary chefs, alongside a historic cellar vault holding vintage award-winning wines.",
      icon: GlassWater,
      highlights: ["Michelin-Starred Chefs", "Alfresco Sunset Deck", "24/7 Suite Dining Service"],
      operationalHours: "07:00 AM - 11:30 PM"
    },
    {
      name: "Elite Gym & Fitness Centre",
      category: "Sports & Vitality",
      details: "Equipped with state-of-the-art TechnoGym cardiovascular machines, smart free-weights, high-performance training tracks, and on-demand personal trainers.",
      icon: Dumbbell,
      highlights: ["TechnoGym Equipment", "Somatic Yoga Sessions", "Certified Personal Trainers"],
      operationalHours: "24 Hours Operational"
    },
    {
      name: "The Royal Banquet Hall",
      category: "Celebrations & Conferences",
      details: "A grand, double-height royal banquet hall with custom gold-finished crystal chandeliers and sliding glass walls, perfect for hosting elite galas and weddings.",
      icon: Sparkles,
      highlights: ["1,500 Guest Capacity", "Full Audiovisual Systems", "Premium Catering Vaults"],
      operationalHours: "By Event Reservation"
    },
    {
      name: "Secure Multilevel Parking",
      category: "Transportation & VIP",
      details: "Complimentary, multi-level secure parking monitored 24/7 by smart security cameras, including high-speed Tesla EV charging stations and executive valet service.",
      icon: Car,
      highlights: ["24/7 Smart Surveillance", "Tesla EV Superchargers", "Valet Concierge Desk"],
      operationalHours: "24 Hours Operational"
    },
    {
      name: "Little Explorers Kids Play Area",
      category: "Family & Playtime",
      details: "A supervised indoor and outdoor adventure wonderland featuring soft play zones, toddler creative toy clusters, and engaging board games for our youngest guests.",
      icon: Smile,
      highlights: ["Supervised Childcare Staff", "Outdoor Activity Park", "Creative Art & Craft Desk"],
      operationalHours: "09:00 AM - 07:00 PM"
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1.5">
            <Compass className="h-4 w-4 animate-spin text-amber-500" style={{ animationDuration: "12s" }} />
            <span>Resort Grounds</span>
          </span>
          <h1 
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Luxury Estate Amenities
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Enjoy complete all-inclusive privilege access to our world-class recreational, culinary, and celebration amenities throughout your golden stay.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resortFacilities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div 
                key={idx} 
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Category & Icon Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md">
                      {facility.category}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-amber-500 border border-slate-100 dark:border-slate-800 transition-colors group-hover:bg-amber-500 group-hover:text-white shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-extrabold text-slate-900 dark:text-white"
                      style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                    >
                      {facility.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[48px]">
                      {facility.details}
                    </p>
                  </div>

                  {/* Checkbox Highlights */}
                  <div className="border-t border-slate-50 dark:border-slate-800 pt-4 space-y-2">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Exclusive Privileges</span>
                    <div className="space-y-1.5">
                      {facility.highlights.map((hl, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-650 dark:text-slate-350">
                          <Check className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span className="font-medium">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer timings */}
                <div className="border-t border-slate-50 dark:border-slate-850 pt-4 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Timings</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">{facility.operationalHours}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
