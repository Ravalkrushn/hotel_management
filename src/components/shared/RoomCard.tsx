"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Maximize, BedDouble, ArrowRight, Heart } from "lucide-react";
import { Room } from "@/types";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const displayPrice = room.discountPrice ?? room.price;
  const hasDiscount = !!room.discountPrice;

  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("gh-wishlist") || "[]");
      setIsSaved(wishlist.includes(room.id));
    }
  }, [room.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === "undefined") return;

    const wishlist = JSON.parse(localStorage.getItem("gh-wishlist") || "[]");
    let updated: string[];
    if (wishlist.includes(room.id)) {
      updated = wishlist.filter((id: string) => id !== room.id);
      setIsSaved(false);
    } else {
      updated = [...wishlist, room.id];
      setIsSaved(true);
    }
    localStorage.setItem("gh-wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-800 backdrop-blur-sm dark:bg-slate-950/90 dark:text-amber-500">
          {room.category}
        </div>

        {/* Floating Heart Button */}
        <button
          onClick={toggleWishlist}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-700 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-115 active:scale-95 dark:bg-slate-950/80 dark:text-slate-200"
          title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart className={`h-4.5 w-4.5 transition-colors ${isSaved ? "fill-rose-500 text-rose-500" : "text-slate-600 hover:text-rose-500"}`} />
        </button>
        
        {/* Price tag overlay */}
        <div className="absolute bottom-4 right-4 rounded-xl bg-slate-950/95 px-4 py-2 text-white backdrop-blur-sm shadow-lg flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Starting at</span>
          <div className="flex items-center space-x-1.5">
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through font-light">
                ${room.price}
              </span>
            )}
            <span className="text-lg font-bold text-amber-400">
              ${displayPrice}
            </span>
            <span className="text-xs text-slate-300 font-light">/ night</span>
          </div>
        </div>
      </div>

      {/* Details container */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
          {room.name}
        </h3>
        
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {room.description}
        </p>

        {/* Specifications Icons */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-slate-100 py-3 dark:border-slate-800">
          <div className="flex flex-col items-center justify-center text-center">
            <Users className="h-4.5 w-4.5 text-amber-500" />
            <span className="mt-1 text-[11px] font-medium text-slate-600 dark:text-slate-400">
              {room.capacity} Guests
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-r border-slate-100 dark:border-slate-800">
            <Maximize className="h-4.5 w-4.5 text-amber-500" />
            <span className="mt-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 font-mono">
              {room.specifications.size ?? "45 m²"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <BedDouble className="h-4.5 w-4.5 text-amber-500" />
            <span className="mt-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
              {room.specifications.bed ? room.specifications.bed.split("or")[0].trim() : "1 King"}
            </span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="mt-6 flex items-center justify-between space-x-3">
          <Link href={`/rooms/${room.slug}`} className="flex-1">
            <Button variant="outline" className="w-full text-slate-700 border-slate-200 dark:text-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs py-5">
              Details
            </Button>
          </Link>
          <Link href={`/booking?room=${room.id}`} className="flex-1">
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs py-5 flex items-center justify-center space-x-1 group/btn">
              <span>Book Now</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
