"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clipboard, 
  Download, 
  Printer, 
  Home, 
  User,
  Calendar,
  ShieldCheck
} from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  // Receipt details parsed from query parameters
  const [guestName, setGuestName] = useState("John Doe");
  const [guestEmail, setGuestEmail] = useState("john.doe@example.com");
  const [guestPhone, setGuestPhone] = useState("+91 98765-43210");
  const [roomName, setRoomName] = useState("Deluxe Serenity Suite");
  const [checkIn, setCheckIn] = useState("2026-05-20");
  const [checkOut, setCheckOut] = useState("2026-05-23");
  const [guestsCount, setGuestsCount] = useState("2");
  const [totalPaid, setTotalPaid] = useState("544.50");
  const [nights, setNights] = useState("3");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay (UPI/India NetBanking)");
  
  // Custom unique reservation number generated on checkout confirmation
  const [reservationNumber, setReservationNumber] = useState("GH-2026-99081");

  useEffect(() => {
    const qName = searchParams.get("name");
    const qEmail = searchParams.get("email");
    const qPhone = searchParams.get("phone");
    const qRoomName = searchParams.get("roomName");
    const qCheckin = searchParams.get("checkin");
    const qCheckout = searchParams.get("checkout");
    const qGuests = searchParams.get("guests");
    const qTotal = searchParams.get("total");
    const qNights = searchParams.get("nights");
    const qPayment = searchParams.get("paymentMethod");

    if (qName) setGuestName(qName);
    if (qEmail) setGuestEmail(qEmail);
    if (qPhone) setGuestPhone(qPhone);
    if (qRoomName) setRoomName(qRoomName);
    if (qCheckin) setCheckIn(qCheckin);
    if (qCheckout) setCheckOut(qCheckout);
    if (qGuests) setGuestsCount(qGuests);
    if (qTotal) setTotalPaid(qTotal);
    if (qNights) setNights(qNights);
    if (qPayment) setPaymentMethod(qPayment);

    // Generate random VVIP booking reference code
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    setReservationNumber(`GH-2026-${randomCode}`);
  }, [searchParams]);

  // Format dates elegantly for presentation
  const formatDateString = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // ACTUAL FILE DOWNLOAD: Generates a premium details invoice as a text file
  const handleDownloadInvoice = () => {
    const invoiceText = `
===================================================
             GRAND HOTEL DWARKA RESORT
                 OFFICIAL INVOICE
===================================================
Reservation Code:  ${reservationNumber}
Guest Full Name:   ${guestName}
Email Address:     ${guestEmail}
Phone Number:      ${guestPhone}
---------------------------------------------------
Room Booked:       ${roomName}
Stay Duration:     ${nights} Nights
Check-In Date:     ${checkIn} (From 2:00 PM)
Check-Out Date:    ${checkOut} (Before 12:00 PM)
Guests Config:     ${guestsCount} Guests
---------------------------------------------------
Settlement Method: ${paymentMethod}
Total Paid:        $${parseFloat(totalPaid).toFixed(2)}
Payment Status:    Paid & Fully Confirmed
---------------------------------------------------
Thank you for choosing Grand Hotel.
Your Dwarka beachfront coastline oasis awaits you!
===================================================
`;
    const blob = new Blob([invoiceText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GrandHotel_Invoice_${reservationNumber}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ACTUAL CALENDAR EXPORT: Generates a standard RFC ICS calendar file
  const handleAddCalendar = () => {
    const checkinDateFormatted = checkIn.replace(/-/g, "");
    const checkoutDateFormatted = checkOut.replace(/-/g, "");
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${checkinDateFormatted}T140000Z`,
      `DTEND:${checkoutDateFormatted}T120000Z`,
      `SUMMARY:Luxury Stay at Grand Hotel Resort - ${roomName}`,
      `DESCRIPTION:Your booking reference code is ${reservationNumber}. Settle in for absolute oceanfront paradise.`,
      "LOCATION:Dwaraka Beachfront Coastline, Gujarat, India",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");
    
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GrandHotel_Stay_${reservationNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        
        {/* Success Ticket Receipt Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-10 shadow-xl text-center space-y-6 print:border-none print:shadow-none print:p-0 relative overflow-hidden">
          
          {/* Subtle top success bar overlay */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500"></div>

          <div className="flex justify-center print:hidden">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 animate-bounce">
              <CheckCircle2 className="h-12 w-12" />
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-500 uppercase flex items-center justify-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 animate-pulse" />
              <span>Reservation Confirmed & Secured</span>
            </span>
            <h1 
              className="text-3xl font-extrabold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Your Dwarka Stay is Secured!
            </h1>
            <p 
              className="text-xs text-slate-550 dark:text-slate-400 max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
            >
              Thank you, <strong className="text-slate-800 dark:text-slate-200">{guestName}</strong>, for choosing Grand Hotel. A verification email containing your secure digital check-in voucher & tax invoice PDF has been sent automatically to <strong className="text-slate-800 dark:text-slate-200">{guestEmail}</strong>.
            </p>
          </div>

          {/* Booking Confirmation Code Clipboard */}
          <div className="bg-slate-50 dark:bg-slate-955 rounded-2xl p-4 inline-flex items-center space-x-2 border border-slate-100 dark:border-slate-800">
            <Clipboard className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Booking Reference:</span>
            <span className="text-sm font-black text-slate-900 dark:text-amber-500 font-mono tracking-wider">{reservationNumber}</span>
          </div>

          {/* Details Summary */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 text-left space-y-4">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Stay & Check-in Coordinates</h3>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-4 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1.5">Check-in</p>
                <p className="text-sm font-extrabold text-slate-850 dark:text-slate-200">{formatDateString(checkIn)}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Valet early arrival from 2:00 PM</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1.5">Check-out</p>
                <p className="text-sm font-extrabold text-slate-850 dark:text-slate-200">{formatDateString(checkOut)}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Late checkout extended before 12:00 PM</p>
              </div>
            </div>
            
            <div className="space-y-3.5 text-xs font-semibold text-slate-650 dark:text-slate-400 pt-2">
              <div className="flex justify-between pb-2.5 border-b border-slate-50 dark:border-slate-850">
                <span>Reserved Accommodation</span> 
                <span className="text-slate-850 dark:text-slate-200 font-extrabold">{roomName}</span>
              </div>
              <div className="flex justify-between pb-2.5 border-b border-slate-50 dark:border-slate-850">
                <span>Duration of Stay</span> 
                <span className="text-slate-850 dark:text-slate-200">{nights} {parseInt(nights) > 1 ? "Nights" : "Night"}</span>
              </div>
              <div className="flex justify-between pb-2.5 border-b border-slate-50 dark:border-slate-850">
                <span>Number of Guests</span> 
                <span className="text-slate-850 dark:text-slate-200">{guestsCount} {parseInt(guestsCount) > 1 ? "Guests" : "Guest"}</span>
              </div>
              <div className="flex justify-between pb-2.5 border-b border-slate-50 dark:border-slate-850">
                <span>Settlement Channel</span> 
                <span className="text-slate-850 dark:text-slate-200">{paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2.5 items-baseline">
                <span className="text-slate-900 dark:text-white uppercase tracking-wider text-[10px] font-extrabold">Total Invoice Settled</span> 
                <span className="text-amber-500 text-xl font-black">${parseFloat(totalPaid).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons (hidden on print) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 print:hidden">
            
            {/* Print Receipt */}
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="text-xs py-5 flex items-center justify-center space-x-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
            >
              <Printer className="h-4 w-4 text-slate-500 animate-pulse" />
              <span>Print Receipt</span>
            </Button>

            {/* Download Invoice */}
            <Button 
              variant="outline" 
              onClick={handleDownloadInvoice}
              className="text-xs py-5 flex items-center justify-center space-x-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Invoice PDF</span>
            </Button>

            {/* Add to Calendar */}
            <Button 
              variant="outline" 
              onClick={handleAddCalendar}
              className="text-xs py-5 flex items-center justify-center space-x-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
            >
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>Add to Calendar</span>
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4 pt-2 print:hidden">
            <Link href="/">
              <Button className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-5 flex items-center justify-center space-x-1 rounded-xl">
                <Home className="h-4 w-4" />
                <span>Home Page</span>
              </Button>
            </Link>
            <Link href="/rooms">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-5 flex items-center justify-center space-x-1 rounded-xl">
                <User className="h-4 w-4" />
                <span>Book Another Suite</span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-955 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider">Generating transaction receipt...</span>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
