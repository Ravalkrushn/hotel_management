"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dummyRooms } from "@/data/rooms";
import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Trash2, 
  ArrowRight, 
  Users, 
  Maximize, 
  BedDouble,
  ChevronRight,
  Compass
} from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = React.useState<Room[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Read from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIds = JSON.parse(localStorage.getItem("gh-wishlist") || "[]");
      const matchedRooms = dummyRooms.filter((r) => savedIds.includes(r.id));
      setWishlist(matchedRooms);
      setLoading(false);
    }
  }, []);

  // Remove room from wishlist
  const handleRemove = (roomId: string) => {
    if (typeof window === "undefined") return;
    const savedIds = JSON.parse(localStorage.getItem("gh-wishlist") || "[]");
    const updatedIds = savedIds.filter((id: string) => id !== roomId);
    localStorage.setItem("gh-wishlist", JSON.stringify(updatedIds));
    
    // Update local state instantly with a smooth transition
    setWishlist(prev => prev.filter(r => r.id !== roomId));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1.5">
            <Heart className="h-4 w-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span>Curated Sanctuary</span>
          </span>
          <h1 
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            My Saved Sanctuary
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Review your shortlisted boutique suites and luxury villas, and book directly when you are ready for a getaway.
          </p>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
          </div>
        ) : wishlist.length === 0 ? (
          
          /* Elegant Luxury Empty State */
          <div className="max-w-md mx-auto text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-8 md:p-12 space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/30">
              <Compass className="h-8 w-8 text-amber-500 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Sanctuary is Empty</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Discover world-class rooms and signature ocean-front suites tailored just for you. Save your favorites to plan your perfect vacation!
              </p>
            </div>
            <div className="pt-2">
              <Link href="/rooms">
                <Button className="w-full py-5 rounded-xl shadow-lg shadow-amber-500/10 flex items-center justify-center space-x-2">
                  <span>Explore Rooms</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          
          /* Wishlist Grid of Rooms */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((room) => {
              const displayPrice = room.discountPrice ?? room.price;
              const hasDiscount = !!room.discountPrice;

              return (
                <div 
                  key={room.id} 
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header wrapper */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-800 backdrop-blur-sm dark:bg-slate-950/90 dark:text-amber-500">
                        {room.category}
                      </div>

                      {/* Remove Button inside Image overlay */}
                      <button
                        onClick={() => handleRemove(room.id)}
                        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-rose-600 transition-all duration-350 shadow-md active:scale-95"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Pricing Tag */}
                      <div className="absolute bottom-4 right-4 rounded-xl bg-slate-950/95 px-3 py-1.5 text-white backdrop-blur-sm shadow-md flex items-baseline space-x-1">
                        {hasDiscount && (
                          <span className="text-[11px] text-slate-400 line-through font-light">
                            ${room.price}
                          </span>
                        )}
                        <span className="text-base font-extrabold text-amber-400">
                          ${displayPrice}
                        </span>
                        <span className="text-[10px] text-slate-300 font-light">/ night</span>
                      </div>
                    </div>

                    {/* Details container */}
                    <div className="p-6">
                      <h3 
                        className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors"
                        style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                      >
                        {room.name}
                      </h3>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {room.description}
                      </p>

                      {/* Specs Icons */}
                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-slate-100 py-3 dark:border-slate-800">
                        <div className="flex flex-col items-center justify-center text-center">
                          <Users className="h-4 w-4 text-amber-500" />
                          <span className="mt-1 text-[10px] font-semibold text-slate-650 dark:text-slate-450">
                            {room.capacity} Guests
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center border-l border-r border-slate-100 dark:border-slate-800">
                          <Maximize className="h-4 w-4 text-amber-500" />
                          <span className="mt-1 text-[10px] font-semibold text-slate-650 dark:text-slate-450 font-mono">
                            {room.specifications.size ?? "45 m²"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                          <BedDouble className="h-4 w-4 text-amber-500" />
                          <span className="mt-1 text-[10px] font-semibold text-slate-650 dark:text-slate-450 line-clamp-1">
                            {room.specifications.bed ? room.specifications.bed.split("or")[0].trim() : "1 King"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="p-6 pt-0 mt-auto flex items-center justify-between gap-3">
                    <button 
                      onClick={() => handleRemove(room.id)}
                      className="flex items-center space-x-1 text-[11px] font-bold uppercase tracking-wider text-rose-500 hover:text-rose-600 transition-colors py-2 px-1 rounded-lg"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>

                    <Link href={`/booking?room=${room.id}`} className="flex-1">
                      <Button className="w-full py-4 rounded-xl flex items-center justify-center space-x-1 shadow-md shadow-amber-500/10">
                        <span>Book Directly</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
