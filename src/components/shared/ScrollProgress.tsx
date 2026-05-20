"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const maxScroll = documentHeight - windowHeight;
      if (maxScroll <= 0) {
        setScrollProgress(100);
      } else {
        const progress = Math.max(1, Math.min(100, Math.round((scrollY / maxScroll) * 100)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial value properly
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Scroll to Top"
    >
      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 52 52">
        {/* Background track */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          className="stroke-slate-100 dark:stroke-slate-800"
          strokeWidth="4"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          className="stroke-amber-500 transition-all duration-150 ease-out"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex h-full w-full items-center justify-center">
        <span className="text-[11px] font-black tracking-tighter text-slate-700 dark:text-slate-200">
          {scrollProgress}%
        </span>
      </div>
    </div>
  );
}
