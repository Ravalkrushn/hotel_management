"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { dummyRooms } from "@/data/rooms";
import { dummyTestimonials } from "@/data/testimonials";
import RoomCard from "@/components/shared/RoomCard";
import { Button } from "@/components/ui/button";
import {
  Hotel,
  Star,
  Calendar,
  ChevronRight
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomePage() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [category, setCategory] = useState("all");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    // Only run on client-side mount
    if (typeof window === "undefined" || !containerRef.current || !imageRef.current) return;

    // Register ScrollTrigger safely
    gsap.registerPlugin(ScrollTrigger);

    // Style properties cleanly using GSAP
    gsap.set(imageRef.current, { scale: 1.0, transformOrigin: "center center" });

    // Pin ONLY the background image cover while the hero container scrolls, removing any zoom-in scaling effect
    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80px", // Align with sticky navbar height
        end: "bottom top", // Keep pinned until the hero section is completely scrolled past
        pin: imageRef.current,
        pinSpacing: false, // Let text content and downstream sections scroll smoothly over the image
        scrub: true,
      }
    });

    // 2. Quick Book CTA Bar Scroll Entrance (Initially hidden, slides up & fades in on slight scroll down)
    gsap.fromTo(".quick-book-animate",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top -50px", // Triggers entrance when user scrolls down past 50px
          toggleActions: "play none none reverse",
        }
      }
    );

    // 3. Scroll-driven Entry Animations for downstream sections

    // About Section Text Slide-fade-in
    gsap.fromTo(".about-text-animate",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-text-animate",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // About Section Image Slide-zoom-in
    gsap.fromTo(".about-image-animate",
      { x: 50, scale: 0.95, opacity: 0 },
      {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-image-animate",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Room Categories Card Stagger
    gsap.fromTo(".category-card-animate",
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".category-card-animate",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Featured Rooms Stagger
    gsap.fromTo(".featured-room-animate",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-room-animate",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Testimonials Marquee Ribbon Entrance
    gsap.fromTo(".animate-marquee-ribbon",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".animate-marquee-ribbon",
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Photo Gallery Images cascade
    gsap.fromTo(".gallery-image-animate",
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gallery-image-animate",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );

    return () => {
      // Memory cleanup for Next.js hot-reload stability
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/booking?checkin=${checkIn}&checkout=${checkOut}&category=${category}`);
  };

  const categories = [
    {
      name: "Luxury Rooms",
      desc: "Plush, serene, elegant",
      img: "/images/room_luxury.jpg",
      slug: "rooms"
    },
    {
      name: "Executive Suites",
      desc: "Ocean vistas, bespoke styling",
      img: "/images/room_executive.jpg",
      slug: "suites"
    },
    {
      name: "Signature Villas",
      desc: "Private pools, complete luxury",
      img: "/images/room_villa.jpg",
      slug: "villas"
    },
    {
      name: "Royal Penthouses",
      desc: "Sky terraces, butler concierge",
      img: "/images/room_penthouse.jpg",
      slug: "penthouses"
    }
  ];

  const gallery = [
    "/images/about_legacy.jpg",
    "/images/room_executive.jpg",
    "/images/room_luxury.jpg",
    "/images/room_villa.jpg",
    "/images/room_penthouse.jpg",
    "/images/blog_tropical.jpg"
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* GSAP Pinning Wrapper - containerRef is pinned natively by ScrollTrigger */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[600px] lg:h-[calc(100vh-80px)] min-h-[500px] max-h-[750px] flex items-center justify-center bg-slate-950 px-4 text-center text-white overflow-hidden z-10"
        style={{ clipPath: "inset(0px)" }}
      >


        {/* GSAP Pinned Zoom Hero Image - placed above the video with perfect sharpness */}
        <div ref={imageRef} className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          <Image
            src="/images/1.png"
            alt="Hero Banner Cover 1"
            fill
            priority={currentHeroIndex === 0}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              currentHeroIndex === 0 ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/images/2.png"
            alt="Hero Banner Cover 2"
            fill
            priority={currentHeroIndex === 1}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              currentHeroIndex === 1 ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/images/3.png"
            alt="Hero Banner Cover 3"
            fill
            priority={currentHeroIndex === 2}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              currentHeroIndex === 2 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 z-20"></div>

        {/* Hero Content - parallax shifted slightly */}
        <div ref={contentRef} className="relative z-30 mx-auto max-w-4xl space-y-5">


          <h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Your Sanctuary of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Refined Luxury</span>
          </h1>

          <p
            className="mx-auto max-w-xl text-sm text-slate-350 sm:text-base md:text-lg"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Immerse yourself in world-class amenities, stunning architecture, and personalized service tailored just for you.
          </p>

          {/* Special Hero Offer callout */}
          <div
            className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-white text-xs sm:text-sm font-semibold text-amber-600 shadow-md"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            <span><strong>Special Offer:</strong> Save 20% on all suites + complimentary welcome drink today!</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/rooms">
              <Button className="px-8 py-5" size="lg">
                Explore Rooms
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="px-8 py-5 text-white border-white/20 hover:border-white hover:bg-white/10" size="lg">
                Discover Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Book CTA Form Bar */}
      <section className="quick-book-animate relative z-20 -mt-10 mx-auto max-w-5xl w-full px-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl p-4 md:p-6">
          <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-amber-500" /> Check-in Date
              </label>
              <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-amber-500" /> Check-out Date
              </label>
              <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 flex items-center">
                <Hotel className="h-4 w-4 mr-1.5 text-amber-500" /> Category
              </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                <option value="all" className="dark:bg-slate-900">All Room Types</option>
                <option value="room" className="dark:bg-slate-900">Standard Rooms</option>
                <option value="suite" className="dark:bg-slate-900">Luxury Suites</option>
                <option value="villa" className="dark:bg-slate-900">Resort Villas</option>
              </select>
            </div>
            <Button type="submit" variant="secondary" className="w-full py-4 rounded-xl flex items-center justify-center space-x-1.5">
              <span>Secure Reservation</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* 1. About The Hotel Section - COLOR A (bg-white) */}
      <section className="w-full bg-white dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 about-text-animate">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Heritage & Prestige</span>
              <h2
                className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight"
                style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
              >
                A Symphony of Exquisite Comfort & Ocean Elegance
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                For over two decades, Grand Hotel has served as the premier choice for luxury travelers, celebrities, and global elite seeking an immersive tropical oasis. Our meticulously kept grounds boast pristine beaches, gourmet vaults, and private wellness spas set against panoramic ocean lookouts.
              </p>
              <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                Under our Les Clefs d&apos;Or concierge service, every itinerary is tailored directly to your desires, ensuring an experience that is both uniquely personal and effortlessly luxurious.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button className="px-6 py-5">
                    Read Our Legacy
                  </Button>
                </Link>
              </div>
            </div>
            <div className="about-image-animate relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-150 dark:border-slate-700 shadow-md">
              <Image src="/images/about_legacy.jpg" alt="Resort Legacy Grounds" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Room Categories Grid - COLOR B (bg-slate-50) */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 py-20 border-t border-b border-slate-100 dark:border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Rooms & Penthouses</span>
            <h2
              className="text-3xl font-extrabold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Room Categories
            </h2>
            <p
              className="text-slate-500 dark:text-slate-400 text-sm"
              style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
            >
              Discover beautiful rooms meticulously designed to fulfill all elements of space, style, and luxury.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/rooms?cat=${cat.slug}`} className="category-card-animate group relative h-72 rounded-2xl overflow-hidden bg-slate-900 block shadow-sm border border-slate-100 dark:border-slate-850">
                <Image src={cat.img} alt={cat.name} fill className="object-cover opacity-90 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                  <h3 className="font-extrabold text-lg text-white" style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}>{cat.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Rooms Section - COLOR A (bg-white) */}
      <section className="w-full bg-white dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Signature Stays</span>
            <h2
              className="text-3xl font-extrabold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Featured Rooms
            </h2>
            <p
              className="text-slate-500 dark:text-slate-400 text-sm"
              style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
            >
              Handpicked luxury suites offering prime coastal views, premium amenities, and spacious floor layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dummyRooms.slice(0, 3).map((room) => (
              <div key={room.id} className="featured-room-animate">
                <RoomCard room={room} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/rooms">
              <Button variant="outline" className="px-6 py-5">
                View All Accommodations
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* 6. Guest Testimonials - COLOR B (bg-slate-50) */}
      <section className="w-full bg-slate-50 dark:bg-slate-955 py-20 border-t border-b border-slate-100 dark:border-slate-900 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Guest Feedback</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Testimonials</h2>
            <p
              className="text-slate-500 dark:text-slate-400 text-sm"
              style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
            >
              Hear directly from our elite members about their experiences during their luxury stays.
            </p>
          </div>

          {/* Infinite Smooth Scrolling Marquee from Right to Left */}
          <div className="relative w-full overflow-hidden py-4">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marqueeContinuous {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.333%); }
              }
              .animate-marquee-ribbon {
                display: flex;
                gap: 1.5rem;
                width: max-content;
                animation: marqueeContinuous 32s linear infinite;
              }
              .animate-marquee-ribbon:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Soft fade gradients on edges for high-end luxury look */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-955 z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-955 z-10 pointer-events-none"></div>

            <div className="animate-marquee-ribbon">
              {[...dummyTestimonials, ...dummyTestimonials, ...dummyTestimonials].map((t, idx) => (
                <div key={idx} className="w-[310px] sm:w-[370px] shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 shrink-0" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-655 dark:text-slate-450 italic leading-relaxed">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 pt-6 border-t border-slate-50 dark:border-slate-800 mt-6">
                    {t.avatarUrl && (
                      <div className="h-10 w-10 rounded-full overflow-hidden shrink-0 relative">
                        <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Photo Gallery Grid - COLOR A (bg-white) */}
      <section className="w-full bg-white dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Resort Memories</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Photo Gallery</h2>
            <p
              className="text-slate-500 dark:text-slate-400 text-sm"
              style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
            >
              Catch a glimpse of pristine shores, modern layout architectural rooms, and scenic viewpoints.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((imgUrl, idx) => (
              <div key={idx} className="gallery-image-animate relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 group shadow-sm">
                <Image src={imgUrl} alt={`Resort memory detail ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
