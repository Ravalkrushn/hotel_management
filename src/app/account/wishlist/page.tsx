"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: "room-2",
      name: "Executive Oceanfront Suite",
      price: "$320 / night",
      category: "Suite",
      img: "/images/room_executive.jpg",
    },
    {
      id: "room-3",
      name: "Presidential Royal Suite",
      price: "$850 / night",
      category: "Signature Suite",
      img: "/images/room_penthouse.jpg",
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-amber-500 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Wishlist</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Accommodations and luxury packages you have saved for later.</p>
          </div>
          <Heart className="h-8 w-8 text-rose-500 fill-rose-500 shrink-0" />
        </div>

        {/* Wishlist Grid */}
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{item.category}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight mt-0.5">{item.name}</h3>
                  <p className="text-sm text-slate-500 font-semibold mt-1">{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0 justify-end">
                <Link href={`/booking?room=${item.id}`}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs py-4 flex items-center justify-center space-x-1.5 rounded-lg shadow-sm">
                    <span>Reserve Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
