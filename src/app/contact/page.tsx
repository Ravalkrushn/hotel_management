"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  ShieldCheck,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1.5">
            <Compass className="h-4 w-4 animate-spin text-amber-500" style={{ animationDuration: "12s" }} />
            <span>Get In Touch</span>
          </span>
          <h1 
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Contact Our Concierge
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Have a special inquiry, airport pick-up request, or corporate event details? Our 24/7 gold-standard personal butler staff is here for you.
          </p>
        </div>

        {/* 2. Form & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Info Cards & WhatsApp */}
          <div className="space-y-6">
            
            {/* Address Info */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-start space-x-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <MapPin className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Resort Location</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Maharaja Palace Grounds, Golden Sunset Beach, Dwarka Coast, Gujarat - 361335
                </p>
              </div>
            </div>

            {/* Phone Info */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-start space-x-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Phone className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>24/7 Reservations</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Phone: <a href="tel:+91289567890" className="hover:text-amber-500 transition-colors font-semibold">+91 (289) 567-890</a>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Toll-Free: 1800-555-LUXURY
                </p>
              </div>
            </div>

            {/* Email Info */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-start space-x-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Mail className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Email Inquiry</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  General: <a href="mailto:concierge@grandhotelgujarat.com" className="hover:text-amber-500 transition-colors">concierge@grandhotel.com</a>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Events: <a href="mailto:events@grandhotelgujarat.com" className="hover:text-amber-500 transition-colors">events@grandhotel.com</a>
                </p>
              </div>
            </div>

            {/* Glowing Interactive WhatsApp Button */}
            <a 
              href="https://wa.me/91289567890?text=Hi%20Grand%20Hotel%20Concierge,%20I'd%20like%20to%20inquire%20about%20a%20luxury%20stay!"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl p-6 shadow-lg shadow-emerald-600/10 border border-emerald-500/20 transition-all duration-300 hover:-translate-y-1 block"
            >
              {/* Pulsing ring indicator */}
              <span className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
              </span>

              <div className="flex items-center space-x-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white">
                  <MessageSquare className="h-5.5 w-5.5 fill-white/10" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-wide">WhatsApp Live Chat</h4>
                  <p className="text-[10px] text-emerald-100 font-semibold uppercase tracking-wider mt-0.5">Chat with Personal Butler</p>
                </div>
              </div>
              
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </a>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-md">
              {submitted ? (
                
                /* Success screen */
                <div className="text-center py-16 space-y-6">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20">
                      <ShieldCheck className="h-8 w-8 animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>Message Received Successfully!</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="font-bold text-slate-700 dark:text-white">{formData.name}</span>. Your private inquiry has been assigned to our front desk butler concierge. We will get back to you within 24 hours at <span className="underline font-semibold">{formData.email}</span>.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button 
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="px-6 py-5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                
                /* Inquiry Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 
                    className="text-2xl font-bold text-slate-900 dark:text-white"
                    style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                  >
                    Send Us An Inquiry
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe" 
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765-43210" 
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                      />
                    </div>
                    {/* Subject */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Subject Inquiry</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="e.g. Suite Upgrade or Airport VIP Pickup" 
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200" 
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Your Message</label>
                    <textarea 
                      required 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your special requests, dietary custom restrictions, or dates here..." 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full py-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10">
                    <Send className="h-4 w-4" />
                    <span>Send Inquiry Message</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* 3. Google Maps Interactive Embed Section */}
        <div className="space-y-6 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Interactive Route</span>
            <h2 
              className="text-2xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Explore Resort Borders
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Live geographic positioning of Maharaja Palace grounds on the coastline of Gujarat.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-150 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118228.32971295325!2d68.90566373722284!3d22.241512402123565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39569c2409f584e1%3A0x6b77e8ea73e24b42!2sDwarka%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716111111111!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Grand Hotel Beach Resort Google Map Location"
              className="w-full h-full object-cover dark:filter dark:invert-[90%] dark:hue-rotate-[180deg]"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
