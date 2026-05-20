"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronLeft, Scale, Info, Coins } from "lucide-react";

export default function RefundPolicyPage() {
  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
    { name: "Terms & Conditions", href: "/terms", icon: Scale },
    { name: "Cancellation Policy", href: "/cancellation-policy", icon: Info },
    { name: "Refund Policy", href: "/refund-policy", icon: Coins },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-amber-500 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Unified Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-4">Legal Hub</span>
              <nav className="flex flex-col space-y-1">
                {legalLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = link.href === "/refund-policy";
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-amber-500 text-white shadow-md shadow-amber-500/10 animate-pulse"
                          : "text-slate-655 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-850"
                      }`}
                      style={{ animationDuration: "12s" }}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Active Content Block */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-md space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Coins className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Active Policy</span>
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Refund Policy</h1>
                </div>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="font-extrabold text-slate-800 dark:text-slate-200">Last updated: May 18, 2026</p>
                
                <p>
                  This refund policy sets forth how refunds are calculated, processed, and disbursed to our guests when bookings are modified or cancelled.
                </p>

                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-4" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>1. Method of Refund</h3>
                <p>
                  All authorized refunds will be issued strictly to the original card or payment channel used during the initial transaction. We do not provide cash or check refunds.
                </p>

                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-4" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>2. Processing Timeframes</h3>
                <p>
                  Once approved by our financial office, refunds are issued immediately. However, standard clearing times for commercial banking institutions can take between 5 to 10 working days.
                </p>

                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-4" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>3. Non-Refundable Items</h3>
                <p>
                  Bespoke event planning fees, custom culinary orders, and priority VIP transfer fees are completely non-refundable once committed.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
