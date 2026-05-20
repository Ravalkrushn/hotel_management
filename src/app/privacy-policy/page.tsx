"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronLeft, Scale, Info, Coins } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                  const isActive = link.href === "/privacy-policy";
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
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Active Policy</span>
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Privacy Policy</h1>
                </div>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                <p className="font-extrabold text-slate-800 dark:text-slate-200">Last updated: May 18, 2026</p>
                
                <p>
                  At Grand Hotel, we prioritize your absolute confidentiality and the safety of your personal data. This privacy policy describes the types of information we gather from you, how we secure it, and your options regarding its utilization.
                </p>

                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-4" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>1. Information We Collect</h3>
                <p>
                  When you book accommodations, we gather necessary credentials, including your full name, email contact details, physical address, passport identifiers, and transaction card data, to securely finalize reservations.
                </p>

                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-4" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>2. Cookies and Security</h3>
                <p>
                  We utilize cookies to optimize website transitions and session logs. Your connection credentials are safe under our 256-bit secure socket layer certificate protocols.
                </p>

                <h3 className="text-base font-bold text-slate-900 dark:text-white pt-4" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>3. Data Integrity Concerns</h3>
                <p>
                  Your data is never distributed, leased, or traded to independent commercial marketers. We only permit legal routing when forced under statutory compliance obligations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
