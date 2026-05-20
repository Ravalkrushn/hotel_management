"use client";

import React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Compass,
  Award,
  Sparkles,
  Target,
  Users,
  Star,
  X
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPage() {
  const [activeLightboxImg, setActiveLightboxImg] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (activeLightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLightboxImg]);
  const stats = [
    { target: 28, suffix: "+", label: "Years of Legacy" },
    { target: 120, suffix: "+", label: "Bespoke Suites" },
    { target: 25, suffix: "+", label: "International Awards" },
    { target: 99.8, suffix: "%", label: "Guest Satisfaction", decimals: 1 }
  ];

  const team = [
    {
      name: "Maharaja Vikramaditya Mewar",
      role: "Founder & Chairman",
      desc: "Laying the foundation of Gujarat's first ultra-luxury coastal oasis with a vision of blending royal heritage with five-star hospitality.",
      img: "/images/IMG-20251012-WA0085.jpg"
    },
    {
      name: "Aditi Sharma",
      role: "Chief Executive Officer",
      desc: "Directing global operations, standardizing our signature Les Clefs d'Or concierge workflows, and maintaining eco-green certification.",
      img: "/images/IMG_20240707_191422.jpg"
    },
    {
      name: "Chef Elena Rostova",
      role: "Michelin Executive Chef",
      desc: "Curating temperature-controlled historic wine vaults and pairing them with organic local seafood delicacies year-round.",
      img: "/images/1000702140.jpg"
    }
  ];

  const milestones = [
    {
      year: "1998",
      title: "Foundation Stone Laid",
      desc: "Acquired historic coastal lands to construct an architectural masterpiece.",
      img: "/images/about_legacy.jpg"
    },
    {
      year: "2006",
      title: "Unveiling Signature Villas",
      desc: "Launched standalone pool villas with private heated plunge pools.",
      img: "/images/room_villa.jpg"
    },
    {
      year: "2014",
      title: "Five-Star Diamond Status",
      desc: "Recognized by the Global Luxury Guild for outstanding concierge workflows.",
      img: "/images/room_luxury.jpg"
    },
    {
      year: "2021",
      title: "Eco-Carbon Neutral Upgrade",
      desc: "Transitioned to full solar grids and organic wellness farms.",
      img: "/images/blog_tropical.jpg"
    },
    {
      year: "2026",
      title: "Unveiled Royal Penthouses",
      desc: "Opened sanctuary suites with 360-degree coastline decks.",
      img: "/images/room_penthouse.jpg"
    }
  ];

  const awards = [
    { title: "Michelin Guide Key 2025", authority: "Michelin Travel", img: "/images/award_michelin.png" },
    { title: "Condé Nast Gold List 2024", authority: "Condé Nast Traveler", img: "/images/award_condenast.png" },
    { title: "World Luxury Hotel Award", authority: "Global Hotel Awards", img: "/images/award_worldluxury.png" },
    { title: "Five Star Alliance Badge", authority: "Luxury Guild", img: "/images/award_Luxury_Guild.png" }
  ];

  // GSAP Horizontal Pinning refs
  const timelineContainerRef = React.useRef<HTMLDivElement>(null);
  const timelineTrackRef = React.useRef<HTMLDivElement>(null);
  const progressPathRef = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    // Only run client-side
    if (typeof window === "undefined" || !timelineContainerRef.current || !timelineTrackRef.current) return;

    // Register ScrollTrigger cleanly
    gsap.registerPlugin(ScrollTrigger);

    const track = timelineTrackRef.current;
    const container = timelineContainerRef.current;

    // Scroll amount calculation (total track width minus viewport client container width)
    const scrollAmount = track.scrollWidth - container.clientWidth;

    // Create GSAP ScrollTrigger timeline pin animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.2, // Premium smooth inertia
        start: "top 90px", // Pinned just below sticky navbar
        end: () => `+=${scrollAmount + 3500}`, // MASSIVE scroll depth for extremely slow, premium pacing!
        invalidateOnRefresh: true,
      }
    });

    // Animate x position of track container (slides in perfect sync with the progress line!)
    tl.to(track, {
      x: -scrollAmount,
      ease: "none"
    }, 0);

    // Animate strokeDashoffset of SVG progress path synchronously (forwards and backwards)
    if (progressPathRef.current) {
      tl.to(progressPathRef.current, {
        strokeDashoffset: 0,
        ease: "none"
      }, 0);
    }

    // Query all milestone card content containers inside the horizontal track
    const cardContents = track.querySelectorAll(".milestone-card-content");
    cardContents.forEach((card, idx) => {
      // Map exact physical SVG curve progress fractions to when the gold line tip reaches each dot!
      let fraction = 0;
      if (idx === 0) fraction = 0.0;
      else if (idx === 1) fraction = 0.14;
      else if (idx === 2) fraction = 0.28;
      else if (idx === 3) fraction = 0.42;
      else if (idx === 4) fraction = 0.57;

      // Dramatically increase trigger speed and offset for later photos (3rd, 4th, 5th) so they reveal way earlier!
      let offset = 0.09;
      if (idx === 1) offset = 0.11;      // 2nd photo reveals faster
      else if (idx === 2) offset = 0.18; // 3rd photo reveals way faster!
      else if (idx === 3) offset = 0.26; // 4th photo reveals way faster!
      else if (idx === 4) offset = 0.35; // 5th photo reveals way faster!

      const triggerTime = Math.max(0, fraction - offset);

      // Snaps cards to 100% full solid opacity exactly as reached!
      tl.fromTo(card,
        { opacity: 0, scale: 0.5, y: idx % 2 === 0 ? -25 : 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.05, // Snappy snap-in reveal
          ease: "power1.out"
        },
        triggerTime
      );
    });

    // Stats Grid Number Counting Animation on Scroll
    const statsGrid = document.getElementById("about-stats-grid");
    const statsTweens: gsap.core.Tween[] = [];
    if (statsGrid) {
      const numberElements = statsGrid.querySelectorAll(".stat-number-val");
      numberElements.forEach((el) => {
        const targetVal = parseFloat(el.getAttribute("data-target") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);

        const countObj = { val: 0 };
        const tween = gsap.to(countObj, {
          val: targetVal,
          duration: 2.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsGrid,
            start: "top 85%", // Triggers when the stats grid enters 85% of the viewport from bottom
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            el.textContent = countObj.val.toFixed(decimals) + suffix;
          }
        });
        statsTweens.push(tween);
      });
    }

    return () => {
      // Memory cleanup for Next.js hot-reload
      tl.scrollTrigger?.kill();
      tl.kill();
      statsTweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-955 py-16 min-h-screen text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 1. Header/Hero block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1.5">
            <Sparkles className="h-4 w-4 animate-spin text-amber-500" style={{ animationDuration: "8s" }} />
            <span>Discover Our Story</span>
          </span>
          <h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white leading-tight"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            A Symphony of Exquisite Comfort & Ocean Elegance
          </h1>
          <p
            className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Immerse yourself in world-class amenities, stunning architecture, and personalized service tailored just for you.
          </p>
        </div>

        {/* 2. Overview & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Heritage & Legacy</span>
            <h2
              className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Our Story of Luxury Hospitality
            </h2>
            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
              Established in 1998 on the sun-kissed coastline, Grand Hotel was born from a singular passion: to redefine luxury coastal living. We began as a small boutique estate of ten luxury suites and have grown into Gujarat&apos;s most prestigious five-star sanctuary.
            </p>
            <p className="text-slate-655 dark:text-slate-350 text-sm leading-relaxed">
              Our architectural blueprint bridges regional maritime heritage with modern minimalism. Over nearly three decades, our gold-standard personal butler staff and culinary professionals have curated custom experiences, ensuring that every itinerary exceeds expectations and provides memories that last a lifetime.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-150 dark:border-slate-700 shadow-xl group">
            <Image
              src="/images/about_legacy.jpg"
              alt="Grand Hotel Historic Grounds"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-955/10 group-hover:bg-slate-955/0 transition-all duration-300"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          id="about-stats-grid"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-b border-slate-100 dark:border-slate-800 py-12"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p
                className="text-3xl sm:text-4xl font-extrabold text-amber-500 stat-number-val"
                data-target={stat.target}
                data-suffix={stat.suffix}
                data-decimals={stat.decimals || 0}
              >
                0{stat.suffix}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* 3. Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-10 space-y-4 border-l-4 border-l-amber-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Compass className="h-6 w-6" />
            </div>
            <h3
              className="text-2xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Our Vision
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              To remain the world&apos;s gold-standard luxury ocean sanctuary, where pristine nature merges with architectural artistry and personalized butler concierge service, offering elite global travelers a timeless escape.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-10 space-y-4 border-l-4 border-l-amber-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <Target className="h-6 w-6" />
            </div>
            <h3
              className="text-2xl font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Our Mission
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              To meticulously engineer and custom-tailor every aspect of our guests&apos; holiday stays, ensuring strict privacy, Michelin-starred culinary artistry, organic wellness, and sustainable hospitality management.
            </p>
          </div>
        </div>

        {/* 4. Hotel History Timeline - Custom svg curvy wavy line drawing on scroll (Clean & borderless) */}
        <div className="space-y-4">

          {/* GSAP Pinning Container - completely borderless and transparent */}
          <div
            ref={timelineContainerRef}
            className="relative w-full h-[620px] overflow-hidden bg-transparent flex flex-col justify-between z-20"
          >

            {/* Header info - Center aligned at top */}
            <div className="text-center max-w-2xl mx-auto space-y-1.5 pb-4">
              <h2
                className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
                style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
              >
                Hotel History Timeline
              </h2>
              <p
                className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto"
                style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
              >
                A chronological voyage showcasing three decades of architectural expansion and service distinction.
              </p>
            </div>

            {/* Horizontal Track Wrapper */}
            <div className="relative flex-1 flex items-center overflow-hidden h-[480px]">

              {/* Side sliding container */}
              <div
                ref={timelineTrackRef}
                className="relative flex items-center space-x-24 px-28 pr-[55vw] select-none h-full"
                style={{ width: "max-content" }}
              >

                {/* Winding Curvy SVG Wave passing horizontally behind the cards */}
                <svg
                  className="absolute h-[220px] top-1/2 -translate-y-1/2 pointer-events-none z-0"
                  viewBox="0 0 1820 200"
                  preserveAspectRatio="none"
                  style={{ left: "272px", width: "1820px" }}
                >
                  {/* Background dashed curve path */}
                  <path
                    d="M 0 100 C 208 0, 208 200, 416 100 C 624 0, 624 200, 832 100 C 1040 0, 1040 200, 1248 100 C 1456 0, 1456 200, 1664 100 C 1742 50, 1742 150, 1820 100"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeDasharray="8,8"
                    className="dark:stroke-slate-800"
                  />
                  {/* Animated solid golden progress curve path drawing / reversing on scroll */}
                  <path
                    ref={progressPathRef}
                    d="M 0 100 C 208 0, 208 200, 416 100 C 624 0, 624 200, 832 100 C 1040 0, 1040 200, 1248 100 C 1456 0, 1456 200, 1664 100 C 1742 50, 1742 150, 1820 100"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="2000"
                    strokeDashoffset="2000"
                  />
                </svg>

                {milestones.map((m, idx) => {
                  const isOdd = idx % 2 === 0;

                  return (
                    <div
                      key={idx}
                      className="relative w-[320px] shrink-0 h-full flex flex-col justify-center items-center z-10"
                    >
                      {/* Alternating top/bottom wave blocks */}
                      {isOdd ? (
                        /* ODD YEARS: ALIGNED ABOVE THE CENTER LINE */
                        <>
                          <div className="milestone-card-content flex flex-col justify-end pb-8 h-1/2 w-full items-center opacity-0">

                            {/* Portrait luxury Image box (Upgraded to w-52 h-64!) */}
                            <div 
                              className="relative w-52 h-64 rounded-2xl overflow-hidden shadow-md group border border-slate-100 dark:border-slate-800 cursor-zoom-in"
                              onClick={() => setActiveLightboxImg(m.img)}
                            >
                              <Image
                                src={m.img}
                                alt={m.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>

                            {/* Clean labels below image exactly like the photo */}
                            <span className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest mt-4 block text-center">
                              {m.year}
                            </span>
                            <h4
                              className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 text-center font-[Apris] uppercase"
                            >
                              {m.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 text-center font-medium leading-relaxed max-w-[220px] mx-auto">
                              {m.desc}
                            </p>
                          </div>
                          {/* Bottom filler spacing */}
                          <div className="h-1/2 w-full"></div>
                        </>
                      ) : (
                        /* EVEN YEARS: ALIGNED BELOW THE CENTER LINE */
                        <>
                          {/* Top filler spacing */}
                          <div className="h-1/2 w-full"></div>

                          <div className="milestone-card-content flex flex-col justify-start pt-8 h-1/2 w-full items-center opacity-0">

                            {/* Portrait luxury Image box (Upgraded to w-52 h-64!) */}
                            <div 
                              className="relative w-52 h-64 rounded-2xl overflow-hidden shadow-md group border border-slate-100 dark:border-slate-800 cursor-zoom-in"
                              onClick={() => setActiveLightboxImg(m.img)}
                            >
                              <Image
                                src={m.img}
                                alt={m.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>

                            {/* Clean labels below image */}
                            <span className="text-[10px] font-black text-amber-600 dark:text-amber-500 uppercase tracking-widest mt-4 block text-center">
                              {m.year}
                            </span>
                            <h4
                              className="text-sm font-extrabold text-slate-900 dark:text-white mt-1 text-center font-[Apris] uppercase"
                            >
                              {m.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 text-center font-medium leading-relaxed max-w-[220px] mx-auto">
                              {m.desc}
                            </p>
                          </div>
                        </>
                      )}



                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        </div>

        {/* 5. Founder & Management Team */}
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center space-x-1">
              <Users className="h-4 w-4 text-amber-500" />
              <span>Leadership Visionaries</span>
            </span>
            <h2
              className="text-3xl font-extrabold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Management & Founder Team
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Meet the passionate stewards curating your VIP luxury getaways year after year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-855 p-6 text-center space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Circular profile image container */}
                  <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                    >
                      {t.name}
                    </h4>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-amber-500">{t.role}</p>
                  </div>
                  <p className="text-xs text-slate-555 dark:text-slate-400 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* 7. Awards & Certifications */}
        <div className="space-y-12 border-t border-slate-100 dark:border-slate-800 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center space-x-1">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Accolades of Merit</span>
            </span>
            <h2
              className="text-3xl font-extrabold text-slate-900 dark:text-white"
              style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
            >
              Awards & Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            {awards.map((aw, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 hover:border-amber-500/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {aw.img ? (
                    <div 
                      className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800 shadow-sm group cursor-zoom-in"
                      onClick={() => setActiveLightboxImg(aw.img)}
                    >
                      <Image 
                        src={aw.img} 
                        alt={aw.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center mb-4 bg-slate-100/50 dark:bg-slate-950/40 text-amber-500/80">
                      <Star className="h-10 w-10 fill-amber-500/20 text-amber-500 animate-pulse" />
                    </div>
                  )}
                  <h4 
                    className="font-extrabold text-sm text-slate-900 dark:text-white"
                    style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                  >
                    {aw.title}
                  </h4>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-extrabold tracking-wider mt-1.5">
                  {aw.authority}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal (Rendered via React Portal at body root to bypass all layout stacking contexts!) */}
        {activeLightboxImg && mounted && typeof document !== "undefined" && createPortal(
          <div 
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[999999] flex items-center justify-center p-4 sm:p-8"
            style={{ animation: "modalFadeIn 0.25s ease-out" }}
            onClick={() => setActiveLightboxImg(null)}
          >
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes modalScaleIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}} />

            {/* Close Button at top-right */}
            <button 
              className="absolute top-6 right-6 text-white hover:text-amber-500 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer z-[1000000]"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxImg(null);
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Premium Image Container */}
            <div 
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
              style={{ animation: "modalScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={activeLightboxImg} 
                alt="Enlarged gallery view" 
                fill 
                className="object-contain rounded-2xl select-none"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          </div>,
          document.body
        )}

      </div>
    </div>
  );
}
