"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  ShieldCheck, 
  Hotel, 
  Calendar, 
  Lock, 
  ArrowLeft,
  Smartphone,
  Check,
  Building,
  MapPin,
  Info
} from "lucide-react";

// Accommodations inventory list for reference
const roomInventory: { [key: string]: { name: string; capacity: string } } = {
  "deluxe-serenity": { name: "Deluxe Serenity Suite", capacity: "2 Guests Capacity" },
  "executive-ocean": { name: "Executive Ocean View Suite", capacity: "2 Guests Capacity" },
  "signature-villa": { name: "Signature Sanctuary Garden Villa", capacity: "3 Guests Capacity" },
  "royal-penthouse": { name: "Royal Ocean Terrace Penthouse", capacity: "4 Guests Capacity" }
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Invoice details parsed from query parameters
  const [roomId, setRoomId] = useState("deluxe-serenity");
  const [checkIn, setCheckIn] = useState("2026-05-20");
  const [checkOut, setCheckOut] = useState("2026-05-23");
  const [guestsCount, setGuestsCount] = useState("2");
  const [totalPrice, setTotalPrice] = useState("544.50");
  const [subtotal, setSubtotal] = useState("450.00");
  const [discount, setDiscount] = useState("0.00");
  const [tax, setTax] = useState("94.50");
  const [promoCode, setPromoCode] = useState("");

  // Guest Contact details
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+91 98765-43210");

  // Billing Address details
  const [billingAddress, setBillingAddress] = useState({
    street: "123 Maharaja Palace Grounds",
    city: "Dwarka",
    state: "Gujarat",
    zipCode: "361335"
  });

  // Payment Options Tab Selection: 'razorpay' | 'stripe' | 'hotel'
  const [paymentOption, setPaymentOption] = useState<"razorpay" | "stripe" | "hotel">("razorpay");
  const [upiId, setUpiId] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Sync state from query parameters on mount
  useEffect(() => {
    const qRoomId = searchParams.get("roomId");
    const qCheckin = searchParams.get("checkin");
    const qCheckout = searchParams.get("checkout");
    const qGuests = searchParams.get("guests");
    const qTotal = searchParams.get("total");
    const qSubtotal = searchParams.get("subtotal");
    const qDiscount = searchParams.get("discount");
    const qTax = searchParams.get("tax");
    const qPromo = searchParams.get("promo");

    if (qRoomId) setRoomId(qRoomId);
    if (qCheckin) setCheckIn(qCheckin);
    if (qCheckout) setCheckOut(qCheckout);
    if (qGuests) setGuestsCount(qGuests);
    if (qTotal) setTotalPrice(qTotal);
    if (qSubtotal) setSubtotal(qSubtotal);
    if (qDiscount) setDiscount(qDiscount);
    if (qTax) setTax(qTax);
    if (qPromo) setPromoCode(qPromo);
  }, [searchParams]);

  // Compute stay duration nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 3;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime <= 0) return 1;
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const nights = getNights();
  const roomDetails = roomInventory[roomId] || roomInventory["deluxe-serenity"];

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if mandatory fields are filled
    if (!firstName || !lastName || !email || !phone) {
      alert("Please complete all Guest Contact Information fields.");
      return;
    }

    if (!billingAddress.street || !billingAddress.city || !billingAddress.state || !billingAddress.zipCode) {
      alert("Please complete all Billing Address fields.");
      return;
    }

    // Redirect dynamically to dynamic booking confirmation page carrying receipt details
    const confirmationQuery = new URLSearchParams({
      name: `${firstName} ${lastName}`,
      email,
      phone,
      roomName: roomDetails.name,
      checkin: checkIn,
      checkout: checkOut,
      guests: guestsCount,
      total: totalPrice,
      nights: nights.toString(),
      paymentMethod: paymentOption === "razorpay" ? "Razorpay (UPI/India NetBanking)" : paymentOption === "stripe" ? "Stripe (International Cards)" : "Pay at Hotel (Cash on Arrival)"
    }).toString();

    router.push(`/booking-confirmation?${confirmationQuery}`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Top return arrow */}
        <div className="mb-6">
          <Link href="/booking" className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-amber-500 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Customize Booking</span>
          </Link>
        </div>

        {/* Header Summary */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1.5">
            <Lock className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span>Secure 256-Bit SSL Payment Gateway</span>
          </span>
          <h1 
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Checkout & Settle Payment
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-xs max-w-md mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Confirm guest credentials and choose your preferred settlement gateway to secure your luxury Dwarka beach chamber.
          </p>
        </div>

        <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns - Forms & Payments (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Guest Contact details */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm space-y-6">
              <h2 
                className="text-xl font-bold text-slate-900 dark:text-white flex items-center"
                style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 text-xs font-extrabold mr-2">1</span>
                <span>Guest Contact Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">First Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Doe" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="john.doe@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765-43210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
              </div>
            </div>

            {/* 2. Billing Address Form */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm space-y-6">
              <h2 
                className="text-xl font-bold text-slate-900 dark:text-white flex items-center"
                style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 text-xs font-extrabold mr-2">2</span>
                <span>Billing Address</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Street Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. 123 Royal Terrace Gardens" 
                      value={billingAddress.street}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">City</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Dwarka" 
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">State</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Gujarat" 
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Postal / Zip Code</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="361335" 
                    value={billingAddress.zipCode}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Country</label>
                  <input 
                    type="text" 
                    required 
                    disabled
                    value="India" 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-150 bg-slate-100 dark:bg-slate-950 text-xs text-slate-400 focus:outline-none dark:border-slate-800 font-bold" 
                  />
                </div>
              </div>
            </div>

            {/* 3. Interactive Payment Options tab layout */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm space-y-6">
              <h2 
                className="text-xl font-bold text-slate-900 dark:text-white flex items-center"
                style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 text-xs font-extrabold mr-2">3</span>
                <span>Select Payment Gateway</span>
              </h2>

              {/* Dynamic Option Selection Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Razorpay Option */}
                <button
                  type="button"
                  onClick={() => setPaymentOption("razorpay")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all ${
                    paymentOption === "razorpay"
                      ? "border-amber-500 bg-amber-500/5 text-amber-500 shadow-md"
                      : "border-slate-150 bg-slate-50 dark:bg-slate-955 text-slate-655 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Smartphone className="h-6 w-6 text-amber-500 mb-2" />
                  <span className="text-xs font-extrabold uppercase tracking-widest block">Razorpay</span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Primary (India Gateways)</span>
                </button>

                {/* Stripe Option */}
                <button
                  type="button"
                  onClick={() => setPaymentOption("stripe")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all ${
                    paymentOption === "stripe"
                      ? "border-amber-500 bg-amber-500/5 text-amber-500 shadow-md"
                      : "border-slate-150 bg-slate-50 dark:bg-slate-955 text-slate-655 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <CreditCard className="h-6 w-6 text-amber-500 mb-2" />
                  <span className="text-xs font-extrabold uppercase tracking-widest block">Stripe Cards</span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Optional (International)</span>
                </button>

                {/* Pay at Hotel Option */}
                <button
                  type="button"
                  onClick={() => setPaymentOption("hotel")}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all ${
                    paymentOption === "hotel"
                      ? "border-amber-500 bg-amber-500/5 text-amber-500 shadow-md"
                      : "border-slate-150 bg-slate-50 dark:bg-slate-955 text-slate-655 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Building className="h-6 w-6 text-amber-500 mb-2" />
                  <span className="text-xs font-extrabold uppercase tracking-widest block">Pay At Hotel</span>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Cash/Card On Arrival</span>
                </button>
              </div>

              {/* Dynamic Input Screens based on Option */}
              <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                
                {/* RAZORPAY SCREEN */}
                {paymentOption === "razorpay" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-500">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Razorpay Secure Gateway Activated</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Settle payment via **UPI (GPay, PhonePe, Paytm)**, India Credit/Debit cards, or leading banking NetBanking portals.
                    </p>
                    <div className="space-y-2 pt-2">
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">Enter UPI ID for quick request</label>
                      <input 
                        type="text" 
                        placeholder="john@okaxis" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955 font-mono" 
                      />
                    </div>
                  </div>
                )}

                {/* STRIPE SCREEN */}
                {paymentOption === "stripe" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-500">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>Stripe secure 256-Bit credit card vault active</span>
                    </div>
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Cardholder Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Doe" 
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955" 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4111 2222 3333 4444" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955 font-mono" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Expiration Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955 font-mono" 
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">CVV Code</label>
                          <input 
                            type="password" 
                            placeholder="•••" 
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-805 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-955 font-mono" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CASH ON ARRIVAL */}
                {paymentOption === "hotel" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-amber-500">
                      <Info className="h-4.5 w-4.5 shrink-0" />
                      <span>Zero Prepayment Required</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Settle your booking bills in cash, domestic cards, or mobile banking directly at our Dwarka front desk concierge desk during physical check-in.
                    </p>
                    <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4 text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                      Please note: Government issued photo ID verification is strictly mandatory for checkout at reception.
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Right Column - Booking Summary Sidebar (1 col) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-md">
              <h3 
                className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-4 border-b border-slate-100 dark:border-slate-800"
                style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
              >
                Booking Summary
              </h3>
              
              <div className="space-y-5 text-xs font-semibold">
                <div className="flex items-start space-x-3">
                  <Hotel className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-slate-850 dark:text-slate-200">{roomDetails.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{roomDetails.capacity} • {guestsCount} Guests</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-slate-850 dark:text-slate-200">Stay Coordinates</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                      {nights} {nights > 1 ? "Nights" : "Night"} ({checkIn} to {checkOut})
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Invoice Details */}
              <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3.5 text-xs font-semibold text-slate-650 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Room Charge Subtotal</span>
                  <span className="text-slate-850 dark:text-slate-200">${parseFloat(subtotal).toFixed(2)}</span>
                </div>
                {parseFloat(discount) > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Discount Applied ({promoCode})</span>
                    <span>-${parseFloat(discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Luxury Tax & VAT (12%)</span>
                  <span className="text-slate-850 dark:text-slate-200">${parseFloat(tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-900 dark:text-white uppercase tracking-wider text-xs">Total Amount</span>
                  <span className="text-amber-500 text-xl font-extrabold">${parseFloat(totalPrice).toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Payment Trigger */}
              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span className="uppercase tracking-widest text-[10px]">Confirm Secure Booking</span>
                </Button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider">Preparing secure gateway...</span>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
