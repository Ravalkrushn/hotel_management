"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Calendar, Hotel, CheckCircle } from "lucide-react";

export default function MyBookingsPage() {
  const activeBookings = [
    {
      id: "GH-2026-99081",
      room: "Deluxe Serenity Room",
      dates: "May 20 - May 23, 2026",
      amount: "$544.50",
      status: "Confirmed",
      checkIn: "3:00 PM",
    },
  ];

  const pastBookings = [
    {
      id: "GH-2025-41290",
      room: "Sunset Ridge Loft",
      dates: "Oct 12 - Oct 15, 2025",
      amount: "$680.00",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-amber-500 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Reservations</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage, view, or request changes to your room bookings.</p>
        </div>

        {/* Active Reservations */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs">Upcoming Stays</h2>
          {activeBookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">ID: {booking.id}</span>
                <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <CheckCircle className="h-3 w-3" />
                  <span>{booking.status}</span>
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Hotel className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{booking.room}</h3>
                    <p className="text-xs text-slate-400">Grand Hotel Resort Suite</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{booking.dates}</p>
                    <p className="text-xs text-slate-400">Check-in at {booking.checkIn}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Stays */}
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs">Past History</h2>
          {pastBookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm opacity-75 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{booking.room}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{booking.dates}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{booking.amount}</p>
                  <span className="inline-flex items-center space-x-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
