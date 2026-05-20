"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hotel, Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock register and redirect
    setTimeout(() => {
      setLoading(false);
      router.push("/account");
    }, 1500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-20 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md w-full px-4">
        
        {/* Card Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white mb-2">
              <Hotel className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create Account</h1>
            <p className="text-xs text-slate-400">Join our Gold Elite rewards membership today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input required type="text" placeholder="John" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input required type="text" placeholder="Doe" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input required type="email" placeholder="john.doe@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input required type="password" placeholder="Min. 8 characters" className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
              </div>
            </div>

            <div className="flex items-center text-xs text-slate-400">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input required type="checkbox" className="rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                <span>I agree to the Terms and Privacy Policy</span>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl flex items-center justify-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>{loading ? "Registering..." : "Create Free Account"}</span>
            </Button>
          </form>

          {/* Switch Options */}
          <div className="text-center border-t border-slate-100 dark:border-slate-800 pt-6 text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link href="/login" className="font-semibold text-amber-500 hover:text-amber-600 inline-flex items-center transition-colors">
              <span>Sign In</span>
              <ArrowRight className="h-3 w-3 ml-0.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
