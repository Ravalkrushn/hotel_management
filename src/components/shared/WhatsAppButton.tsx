"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/1234567890?text=Hello!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 duration-1000 -z-10"></span>
      
      {/* Icon */}
      <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-6" />
      
      {/* Tooltip */}
      <span className="absolute left-16 scale-0 rounded bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md transition-all duration-300 group-hover:scale-100 whitespace-nowrap">
        Chat with us!
      </span>
    </a>
  );
}
