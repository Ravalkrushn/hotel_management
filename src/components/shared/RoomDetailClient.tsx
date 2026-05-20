"use client";

import React, { useState, useMemo } from "react";
import { Room } from "@/types";
import RoomCard from "./RoomCard";
import { 
  Calendar, User, Mail, Phone, 
  Building2, MessageSquare, Send, CheckCircle2, ChevronRight,
  Wifi, Wind, Tv, Compass, Waves, ShowerHead, Star, Bath, Check, AlertCircle
} from "lucide-react";
import Image from "next/image";

interface RoomDetailClientProps {
  room: Room;
  allRooms: Room[];
}

export default function RoomDetailClient({ room, allRooms }: RoomDetailClientProps) {
  // Gallery Zoom State
  const [activeImage, setActiveImage] = useState(room.images[0] || "/images/room_luxury.jpg");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  // Booking Form State
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [showBookSuccess, setShowBookSuccess] = useState(false);

  // Group Inquiry Modal State
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    roomsNeeded: "2",
    guestsCount: "4",
    message: "",
  });
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);

  // Reviews State
  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      userName: "Sophia Loren",
      rating: 5,
      comment: "Absolutely breathtaking! The oceanfront suite was pristine, spacious, and the service was beyond 5-star quality. Highly recommend the sunset lounge access.",
      createdAt: "May 10, 2026",
    },
    {
      id: "rev-2",
      userName: "Alexander Wright",
      rating: 4,
      comment: "A truly luxurious stay at Velnora Grand. The modern specifications and private balcony views are exactly as described. The room service was incredibly fast.",
      createdAt: "May 02, 2026",
    }
  ]);
  const [newReview, setNewReview] = useState({ userName: "", rating: 5, comment: "" });
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  // 1. Mouse move handler for image hover-to-zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // 2. Dynamic Price & Nights Calculation
  const displayPrice = room.discountPrice ?? room.price;
  const totalNights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkInDate, checkOutDate]);

  const totalAmount = totalNights * displayPrice;
  const taxAmount = totalAmount * 0.12; // 12% Hotel Tax
  const finalAmount = totalAmount + taxAmount;

  // 3. Dynamic Amenities to Icons Mapping
  const getAmenityIcon = (amenityName: string) => {
    const name = amenityName.toLowerCase();
    if (name.includes("wi-fi") || name.includes("internet")) return <Wifi className="h-5 w-5 text-amber-500" />;
    if (name.includes("air conditioning") || name.includes("ac")) return <Wind className="h-5 w-5 text-amber-500" />;
    if (name.includes("tv") || name.includes("television")) return <Tv className="h-5 w-5 text-amber-500" />;
    if (name.includes("balcony") || name.includes("terrace")) return <Compass className="h-5 w-5 text-amber-500" />;
    if (name.includes("pool")) return <Waves className="h-5 w-5 text-amber-500" />;
    if (name.includes("shower") || name.includes("rain shower")) return <ShowerHead className="h-5 w-5 text-amber-500" />;
    if (name.includes("bathtub") || name.includes("jacuzzi")) return <Bath className="h-5 w-5 text-amber-500" />;
    return <Check className="h-5 w-5 text-amber-500" />;
  };

  // 4. WhatsApp Click-to-Chat prefills
  const getWhatsAppLink = () => {
    const text = `Hello Velnora Grand Hotel! I would like to inquire about booking the ${room.name} (${room.category}) for ${guestCount} guest(s). ${
      checkInDate ? `Check-in: ${checkInDate}, Check-out: ${checkOutDate}.` : ""
    } Please confirm availability!`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
  };

  // 5. Related Rooms Recommendation
  const relatedRooms = useMemo(() => {
    return allRooms
      .filter((r) => r.id !== room.id)
      .slice(0, 3);
  }, [allRooms, room.id]);

  // 6. Average Review Score & Total Reviews
  const averageRating = useMemo(() => {
    if (reviewsList.length === 0) return 0;
    const total = reviewsList.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((total / reviewsList.length).toFixed(1));
  }, [reviewsList]);

  // Submit dynamic review handler
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName.trim() || !newReview.comment.trim()) return;

    const submittedReview = {
      id: `rev-${Date.now()}`,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: "Today",
    };

    setReviewsList((prev) => [submittedReview, ...prev]);
    setIsReviewSubmitted(true);
    setNewReview({ userName: "", rating: 5, comment: "" });
    setTimeout(() => setIsReviewSubmitted(false), 4000);
  };

  // Submit Inquiry handler
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone) return;
    setIsInquirySubmitted(true);
    setTimeout(() => {
      setIsInquirySubmitted(false);
      setShowInquiryModal(false);
      setInquiryForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        roomsNeeded: "2",
        guestsCount: "4",
        message: "",
      });
    }, 3500);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) return;
    setShowBookSuccess(true);
    setTimeout(() => setShowBookSuccess(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Path */}
      <nav className="mb-6 flex space-x-2 text-xs font-semibold text-slate-400">
        <a href="/" className="hover:text-amber-500">Home</a>
        <span>/</span>
        <a href="/rooms" className="hover:text-amber-500">Rooms</a>
        <span>/</span>
        <span className="text-amber-500">{room.name}</span>
      </nav>

      {/* Title & Reviews Summary */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-wider mb-2">
            {room.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            {room.name}
          </h1>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4.5 py-2.5 rounded-2xl shadow-sm self-start md:self-auto">
          <div className="flex items-center text-amber-500">
            <Star className="h-5 w-5 fill-current" />
            <span className="ml-1 text-sm font-black">{averageRating}</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{reviewsList.length} Guest Reviews</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Columns: Image Gallery, Specs, Amenities, Reviews */}
        <div className="lg:col-span-2 space-y-10">
          {/* A. Dynamic Image Gallery with hover zoom */}
          <div className="space-y-4">
            <div 
              className="overflow-hidden relative rounded-3xl aspect-[16/10] bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl cursor-zoom-in group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={activeImage}
                alt={room.name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
                className="w-full h-full object-cover transition-transform duration-150 ease-out"
                style={{
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                }}
              />
              <div className="absolute top-4 left-4 bg-slate-950/40 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full select-none">
                Hover to Zoom
              </div>
            </div>

            {/* Thumbnail Selection Carousel */}
            <div className="flex space-x-3.5 overflow-x-auto pb-2">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex-shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all shadow-md ${
                    activeImage === img ? "border-amber-500 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${room.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* B. Overview Description */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg border-b border-slate-50 dark:border-slate-800 pb-3">
              Room Overview
            </h3>
            <p className="text-slate-500 dark:text-slate-300 leading-relaxed text-sm">
              {room.description}
            </p>
          </div>

          {/* C. Premium Specifications Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg border-b border-slate-50 dark:border-slate-800 pb-3">
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Room Area</span>
                <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 font-mono">{room.specifications.size || "38 m²"}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bed Setup</span>
                <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{room.specifications.bed || "1 King Bed"}</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Max Guests</span>
                <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{room.capacity} Guests</span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Floor Level</span>
                <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
                  {room.id === "room-3" || room.id === "room-9" ? "8th Penthouse Floor" : "4th Premium Floor"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/50 md:col-span-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scenic View</span>
                <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{room.specifications.view || "Lush Gardens"}</span>
              </div>
            </div>
          </div>

          {/* D. Icon-mapped Amenities List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg border-b border-slate-50 dark:border-slate-800 pb-3">
              Included Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center space-x-3 group">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* E. Reviews Section (Interactive submit, distribution bars) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-8">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg border-b border-slate-50 dark:border-slate-800 pb-3">
              Guest Feedback & Ratings
            </h3>

            {/* Rating distribution dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-center md:border-r border-slate-200/50 dark:border-slate-800/50 py-2">
                <span className="block text-5xl font-black text-slate-800 dark:text-white">{averageRating}</span>
                <div className="flex items-center justify-center text-amber-500 mt-1">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="block text-xs font-bold text-slate-400 mt-2">Based on {reviewsList.length} reviews</span>
              </div>
              <div className="md:col-span-2 space-y-2">
                {/* 5 Star bar */}
                <div className="flex items-center text-xs text-slate-500 font-bold space-x-2">
                  <span className="w-10">5 Star</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                  <span className="w-6 text-right">80%</span>
                </div>
                {/* 4 Star bar */}
                <div className="flex items-center text-xs text-slate-500 font-bold space-x-2">
                  <span className="w-10">4 Star</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                  <span className="w-6 text-right">20%</span>
                </div>
                {/* Other bars */}
                {[3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center text-xs text-slate-500 font-bold space-x-2">
                    <span className="w-10">{s} Star</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                    <span className="w-6 text-right">0%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* List of Reviews */}
            <div className="space-y-6">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/60 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <span className="block text-sm font-extrabold text-slate-700 dark:text-slate-200">{rev.userName}</span>
                        <span className="block text-[10px] text-slate-400 font-bold">{rev.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="h-4.5 w-4.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Add custom Review form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Write a Review</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.userName}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, userName: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">Rating Score</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold appearance-none cursor-pointer"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                    <option value="2">★★☆☆☆ (2 Stars)</option>
                    <option value="1">★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">Your Feedback</label>
                <textarea
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your stay experience at Velnora Resorts..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                ></textarea>
              </div>

              {isReviewSubmitted && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-extrabold rounded-xl flex items-center space-x-2 animate-fade-in">
                  <CheckCircle2 className="h-4.5 w-4.5 text-green-500 flex-shrink-0 animate-pulse" />
                  <span>Thank you! Your luxury stay review has been dynamically submitted and calculated.</span>
                </div>
              )}

              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Right 1 Column: Sticky Dynamic Reservation Panel */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-baseline justify-between border-b border-slate-50 dark:border-slate-800 pb-4.5">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Per Night Rate</span>
              <div className="flex items-center space-x-2">
                {room.discountPrice && (
                  <span className="text-sm font-bold text-slate-400 line-through">${room.price}</span>
                )}
                <span className="text-2xl font-black text-amber-500">${displayPrice}</span>
              </div>
            </div>

            {/* Date Selectors & Guest Counter Form */}
            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400">Check-In Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-extrabold cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400">Check-Out Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    min={checkInDate || undefined}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-extrabold cursor-pointer"
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400">Guest Count</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-extrabold cursor-pointer appearance-none"
                  >
                    {Array.from({ length: room.capacity }).map((_, i) => (
                      <option key={i} value={String(i + 1)}>
                        {i + 1} {i === 0 ? "Guest" : "Guests"} {i + 1 === room.capacity ? "(Max Limit)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Billing Rate Breakdown */}
              {totalNights > 0 ? (
                <div className="p-4.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2.5 text-xs animate-fade-in font-bold text-slate-500">
                  <div className="flex justify-between">
                    <span>Rate breakdown</span>
                    <span className="text-slate-700 dark:text-slate-300 font-extrabold">${displayPrice} &times; {totalNights} nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Total</span>
                    <span className="text-slate-700 dark:text-slate-300 font-extrabold">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax & Services (12%)</span>
                    <span className="text-slate-700 dark:text-slate-300 font-extrabold">${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-slate-800 pt-2.5 flex justify-between text-sm text-slate-800 dark:text-white font-extrabold">
                    <span>Grand Total</span>
                    <span className="text-amber-500 font-black">${finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                checkInDate && checkOutDate && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl flex items-center space-x-2">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>Please enter a valid check-out date after check-in.</span>
                  </div>
                )
              )}

              {showBookSuccess && (
                <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-extrabold rounded-xl flex items-center space-x-2 animate-bounce">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Perfect! Room booking initiated. Checking availability details...</span>
                </div>
              )}

              {/* Book Now Button */}
              <button
                type="submit"
                disabled={!checkInDate || !checkOutDate || totalNights <= 0}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:pointer-events-none text-white font-black py-4.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 text-center block text-sm tracking-wide"
              >
                Book Now
              </button>
            </form>

            <div className="border-t border-slate-50 dark:border-slate-800 pt-4.5 space-y-3">
              {/* WhatsApp direct Inquiry button */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 border-2 border-green-500 hover:bg-green-500/10 text-green-600 dark:text-green-400 font-extrabold py-3.5 rounded-xl transition-all active:scale-95 text-sm"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.419 5.422.002 12.038.002c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.284 3.508 8.487-.005 6.617-5.424 12.032-12.04 12.032-2.006-.001-3.98-.502-5.733-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.503 4.936 1.504 5.378 0 9.75-4.374 9.754-9.755.002-2.607-1.011-5.059-2.852-6.901C16.595 2.16 14.148 1.15 11.54 1.15 6.161 1.15 1.79 5.525 1.786 10.904c-.001 1.776.486 3.447 1.411 4.908l-.99 3.613 3.731-.977-.113-.076z" />
                </svg>
                <span>WhatsApp Instant Inquiry</span>
              </a>

              {/* Bulk / Group booking Inquiry button (Very Important) */}
              <button
                onClick={() => setShowInquiryModal(true)}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl transition-all active:scale-95 text-sm shadow-md"
              >
                <Building2 className="h-4.5 w-4.5" />
                <span>Bulk / Group Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Rooms Section */}
      {relatedRooms.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-black uppercase text-amber-500 tracking-wider">Recommendations</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Explore Related Rooms
              </h3>
            </div>
            <a href="/rooms" className="text-xs font-black text-amber-500 hover:text-amber-600 flex items-center space-x-1 transition-colors">
              <span>View All Accommodations</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedRooms.map((r) => (
              <div key={r.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                <RoomCard room={r} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* F. Bulk / Group Inquiry Modal (Very Important) */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-2xl my-8 space-y-6">
            
            {/* Close button */}
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center font-bold text-sm select-none"
            >
              &times;
            </button>

            {/* Header */}
            <div className="space-y-1.5 pr-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">Corporate & Group Booking</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Bulk Stay Inquiry Form
              </h3>
              <p className="text-xs text-slate-400 font-bold leading-relaxed">
                Planning an event, wedding, or corporate stay? Fill out this inquiry form and our booking manager will send you exclusive group discount quotes!
              </p>
            </div>

            {/* Inquiry Form */}
            {isInquirySubmitted ? (
              <div className="p-8 text-center space-y-4 animate-fade-in">
                <div className="h-16 w-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-lg">Inquiry Submitted Successfully</h4>
                  <p className="text-xs text-slate-400 font-bold leading-relaxed max-w-sm mx-auto">
                    Thank you, {inquiryForm.name}! Your group stay requirements are sent. Our reservations team will reach out to you at {inquiryForm.email} within 2 hours.
                  </p>
                </div>
                <span className="text-[10px] text-amber-500 font-black animate-pulse">Processing group rates...</span>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {/* Contact Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="john@company.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Company / Event Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Company or Event Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g. Annual Executive Summit"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                    />
                  </div>
                </div>

                {/* Rooms Needed & Guest Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Rooms Required</label>
                    <select
                      value={inquiryForm.roomsNeeded}
                      onChange={(e) => setInquiryForm((prev) => ({ ...prev, roomsNeeded: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="2-5">2 to 5 Rooms</option>
                      <option value="6-10">6 to 10 Rooms</option>
                      <option value="11-20">11 to 20 Rooms</option>
                      <option value="20+">More than 20 Rooms</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Total Group Size</label>
                    <select
                      value={inquiryForm.guestsCount}
                      onChange={(e) => setInquiryForm((prev) => ({ ...prev, guestsCount: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="4-10">4 to 10 Guests</option>
                      <option value="11-25">11 to 25 Guests</option>
                      <option value="26-50">26 to 50 Guests</option>
                      <option value="50+">More than 50 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Custom message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Event stay requirements</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      rows={3}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Enter specific room requests, catering needs, or group check-in policies..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-bold"
                    ></textarea>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 text-sm"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Group Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
