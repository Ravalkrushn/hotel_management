"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, User, ShieldCheck, Mail, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-amber-500 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Profile Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your guest credentials and authentication setups.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" defaultValue="John" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" defaultValue="Doe" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="email" defaultValue="john.doe@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Change Password Placeholder */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center"><Lock className="h-4.5 w-4.5 text-amber-500 mr-2" /> Security Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">New Password</label>
                  <input type="password" placeholder="New secure credentials" className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {saved && (
                <span className="text-xs font-semibold text-emerald-500 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1" /> Profile Changes Saved Successfully!
                </span>
              )}
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 px-6 rounded-lg ml-auto shadow-sm">
                Save Account Changes
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
