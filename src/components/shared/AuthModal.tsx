"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Hotel, Mail, Lock, LogIn, User, UserPlus, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
  const router = useRouter();
  const [view, setView] = useState<"login" | "register">(initialView);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialView]);

  if (!isOpen || !mounted) return null;

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock action and redirect
    setTimeout(() => {
      setLoading(false);
      onClose();
      router.push("/account");
    }, 1500);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white mb-2">
            <Hotel className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {view === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-xs text-slate-400">
            {view === "login" 
              ? "Access your exclusive Grand Hotel dashboard" 
              : "Join our Gold Elite rewards membership today"}
          </p>
        </div>

        <form onSubmit={handleAction} className="space-y-4">
          {view === "register" && (
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
          )}

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
              <input required type="password" placeholder={view === "register" ? "Min. 8 characters" : "••••••••"} className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" />
            </div>
          </div>

          {view === "login" ? (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:text-amber-500 font-medium transition-colors">Forgot Password?</a>
            </div>
          ) : (
            <div className="flex items-center text-xs text-slate-400">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input required type="checkbox" className="rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                <span>I agree to the Terms and Privacy Policy</span>
              </label>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl flex items-center justify-center space-x-2">
            {view === "login" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            <span>
              {loading 
                ? (view === "login" ? "Authenticating..." : "Registering...") 
                : (view === "login" ? "Login to Account" : "Create Free Account")}
            </span>
          </Button>
        </form>

        {/* Switch Options */}
        <div className="text-center border-t border-slate-100 dark:border-slate-800 pt-6 mt-6 text-xs text-slate-400">
          <span>{view === "login" ? "New to Grand Hotel? " : "Already have an account? "}</span>
          <button 
            type="button"
            onClick={() => setView(view === "login" ? "register" : "login")} 
            className="font-semibold text-amber-500 hover:text-amber-600 inline-flex items-center transition-colors"
          >
            <span>{view === "login" ? "Create Account" : "Sign In"}</span>
            <ArrowRight className="h-3 w-3 ml-0.5" />
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
