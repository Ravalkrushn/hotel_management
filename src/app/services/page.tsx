"use client";

import React from "react";
import { 
  Utensils, 
  Sparkles, 
  Users, 
  Plane, 
  Shirt, 
  Map, 
  Check, 
  Compass,
  LucideIcon
} from "lucide-react";

interface Service {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  perks: string[];
  pricing: string;
}

export default function ServicesPage() {
  const hotelServices: Service[] = [
    {
      title: "24/7 Room Service",
      category: "Culinary & Dining",
      description: "Indulge in 24/7 personal in-room dining, with hot gourmet dishes from our Michelin kitchens delivered right to your bedside or private suite balcony.",
      icon: Utensils,
      perks: ["24/7 Butler Delivery", "Digital QR Ordering", "Michelin In-Room Pairing"],
      pricing: "A La Carte Menu"
    },
    {
      title: "Spa & Wellness Sanctuary",
      category: "Rejuvenation & Healing",
      description: "Restore your mind and body with clinical massotherapy, organic steam baths, holistic facial rituals, and custom hot stone therapies designed by wellness experts.",
      icon: Sparkles,
      perks: ["Hydrotherapy Chamber Access", "Organic Herbal Apothecary", "Les Clefs d'Or Treatments"],
      pricing: "Service Menu Rates"
    },
    {
      title: "Conference & Events Hall",
      category: "Corporate & Galas",
      description: "High-performance double-height conference halls equipped with smart presentation panels, corporate VIP lounges, and custom event planners.",
      icon: Users,
      perks: ["Smart Presentation Systems", "VIP Lounge Connectivity", "Corporate Dining Buffet"],
      pricing: "By Event Scale"
    },
    {
      title: "Airport Pickup & Drop",
      category: "VIP Transportation",
      description: "Seamless transitions in our private fleet of premium luxury sedans and SUVs, with certified chauffeurs greeting you right at the terminal gate.",
      icon: Plane,
      perks: ["VIP Airport Terminal Greeting", "Luxury EV Sedan Fleets", "Complimentary Wi-Fi & Water"],
      pricing: "Complimentary for Suites"
    },
    {
      title: "Express Valet Laundry Service",
      category: "Apparel Care",
      description: "Delicate dry cleaning, steam pressing, and organic laundering. Your apparel is returned perfectly pressed, refreshed, and hung within hours.",
      icon: Shirt,
      perks: ["Express 4-Hour Delivery", "Fine Silk & Wool Care", "Complimentary Button Repairs"],
      pricing: "Per-Item Pricing"
    },
    {
      title: "Les Clefs d'Or Tour Assistance",
      category: "Conscierge & Discovery",
      description: "Bespoke local tour curations, private yacht charter bookings, and VIP access to historic heritage temples, coordinated by our concierge desk.",
      icon: Map,
      perks: ["Les Clefs d'Or Certified Guides", "Private Yacht Charters", "Priority Monument Entries"],
      pricing: "Custom Quotations"
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1.5">
            <Compass className="h-4 w-4 animate-spin text-amber-500" style={{ animationDuration: "12s" }} />
            <span>Premium Experiences</span>
          </span>
          <h1 
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Elite Hospitality Services
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Every micro-detail of your stay is meticulously curated to guarantee unparalleled absolute comfort and gold-standard luxury.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotelServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx} 
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Category & Icon Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md">
                      {service.category}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 dark:bg-slate-955 dark:text-amber-500 border border-slate-100 dark:border-slate-800 transition-colors group-hover:bg-amber-500 group-hover:text-white shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 
                      className="text-lg font-extrabold text-slate-900 dark:text-white"
                      style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[48px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Perks Checklist */}
                  <div className="border-t border-slate-50 dark:border-slate-800 pt-4 space-y-2">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Gold-Standard Perks</span>
                    <div className="space-y-1.5">
                      {service.perks.map((perk, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-650 dark:text-slate-350">
                          <Check className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          <span className="font-medium">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing Footer */}
                <div className="border-t border-slate-50 dark:border-slate-850 pt-4 flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>Tariff Basis</span>
                  <span className="text-amber-500 font-extrabold">{service.pricing}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
