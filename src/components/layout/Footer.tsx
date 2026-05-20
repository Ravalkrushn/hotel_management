"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Our Rooms", href: "/rooms" },
    { name: "About Us", href: "/about" },
    { name: "Services & Amenities", href: "/services" },
    { name: "Facilities", href: "/facilities" },
    { name: "Latest Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cancellation Policy", href: "/cancellation-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 sm:grid-cols-2">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/hotel_logo.png"
                alt="Grand Hotel Logo"
                width={240}
                height={72}
                className="h-18 w-auto object-contain object-left"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Experience the epitome of luxury, exquisite comfort, and world-class hospitality in the heart of the paradise. Your dream stay awaits.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-white transition-colors duration-300" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-white transition-colors duration-300" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.81.055.97.044 1.503.206 1.854.342.465.18.797.393 1.14.736.343.344.557.675.737 1.14.135.351.298.884.342 1.854.047 1.026.055 1.38.055 3.81 0 2.43-.008 2.784-.055 3.81-.044.97-.206 1.503-.342 1.854a3.369 3.369 0 01-.737 1.14c-.343.343-.675.557-1.14.737-.351.135-.884.298-1.854.342-1.026.047-1.38.055-3.81.055-2.43 0-2.784-.008-3.81-.055-.97-.044-1.503-.206-1.854-.342a3.37 3.37 0 01-1.14-.737 3.37 3.37 0 01-.737-1.14c-.135-.351-.298-.884-.342-1.854-.047-1.026-.055-1.38-.055-3.81 0-2.43.008-2.784.055-3.81.044-.97.206-1.503.342-1.854a3.37 3.37 0 01.737-1.14c.343-.343.675-.557 1.14-.737.351-.135.884-.298 1.854-.342C9.531 2.008 9.886 2 12.315 2zm0-2C9.72 0 9.387.01 8.358.058a9.42 9.42 0 00-3.118.6A5.368 5.368 0 003.32 2.01c-.887.887-1.42 1.936-1.688 3.118A9.42 9.42 0 001.5 8.358C1.01 9.387 1 9.72 1 12.315c0 2.595.01 2.927.058 3.957a9.42 9.42 0 00.6 3.118 5.368 5.368 0 001.352 1.92 5.368 5.368 0 001.92 1.352c.983.38 2.083.543 3.118.59.103.005.4.012 1.357.012s1.254-.007 1.357-.012c1.035-.047 2.135-.21 3.118-.59a5.368 5.368 0 001.92-1.352 5.368 5.368 0 001.352-1.92c.38-.983.543-2.083.59-3.118.005-.103.012-.4.012-1.357s-.007-1.254-.012-1.357c-.047-1.035-.21-2.135-.59-3.118a5.368 5.368 0 00-1.352-1.92 5.368 5.368 0 00-1.92-1.352c-.983-.38-2.083-.543-3.118-.59C15.28.01 14.947 0 12.315 0zm0 5.993a6.322 6.322 0 100 12.645 6.322 6.322 0 000-12.645zm0 10.645a4.322 4.322 0 110-8.644 4.322 4.322 0 010 8.644zm5.278-11.379a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-white transition-colors duration-300" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3">
              Policies
            </h3>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold text-white tracking-wider uppercase mb-6 border-l-2 border-amber-500 pl-3">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>123 Luxury Boulevard, Ocean Bay Paradise, Resort State, 90210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-amber-500 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                <a href="mailto:info@grandhotel.com" className="hover:text-amber-500 transition-colors">
                  info@grandhotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {currentYear} Grand Hotel. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Designed for ultimate luxury and comfort.
          </p>
        </div>
      </div>
    </footer>
  );
}
