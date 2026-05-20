"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/shared/AuthModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login");

  const updateWishlistCount = () => {
    if (typeof window !== "undefined") {
      const wishlist = JSON.parse(localStorage.getItem("gh-wishlist") || "[]");
      setWishlistCount(wishlist.length);
    }
  };

  React.useEffect(() => {
    updateWishlistCount();
    if (typeof window !== "undefined") {
      window.addEventListener("wishlist-updated", updateWishlistCount);
      return () => window.removeEventListener("wishlist-updated", updateWishlistCount);
    }
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Facilities", href: "/facilities" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/hotel_logo.png"
                alt="Grand Hotel Logo"
                width={160}
                height={48}
                priority
                className="h-10 sm:h-12 w-auto object-contain object-left"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-amber-500 ${
                  isActive(link.href)
                    ? "text-amber-500 border-b-2 border-amber-500 pb-1"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/wishlist" title="My Wishlist">
              <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-amber-500 dark:text-slate-300">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-950">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <button 
              onClick={() => { setIsAuthModalOpen(true); setAuthModalView("login"); }}
              title="Account"
              className="inline-flex items-center justify-center rounded-md text-slate-600 hover:text-amber-500 dark:text-slate-300 h-10 w-10"
            >
              <User className="h-5 w-5" />
            </button>
            <Link href="/booking">
              <Button className="bg-amber-500 text-white hover:bg-amber-600 font-semibold tracking-wide px-5 py-6 rounded-lg transition-all shadow-md shadow-amber-500/20">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-amber-500 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-900"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 border-t border-slate-100 dark:border-slate-800" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-4 pt-3 bg-white dark:bg-slate-955">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-amber-50 text-amber-500 dark:bg-amber-955/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-slate-100 pt-4 mt-4 flex flex-col space-y-3 dark:border-slate-800">
            <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 px-3">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500/10" />
              <span className="text-base font-medium flex items-center space-x-1.5">
                <span>My Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </span>
            </Link>

            <button 
              onClick={() => { setIsOpen(false); setIsAuthModalOpen(true); setAuthModalView("login"); }}
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 px-3 w-full text-left"
            >
              <User className="h-5 w-5" />
              <span className="text-base font-medium">My Account</span>
            </button>
            <Link href="/booking" onClick={() => setIsOpen(false)} className="w-full">
              <Button className="w-full bg-amber-500 text-white hover:bg-amber-600 py-5 font-semibold">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialView={authModalView}
      />
    </nav>
  );
}
