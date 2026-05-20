"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Search, 
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info
} from "lucide-react";

interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  focusKeyphrase: string;
  schemaType: string;
}

interface BlogPost {
  title: string;
  slug: string;
  category: "Travel Tips & Guides" | "Local Attractions" | "Hotel News & Events";
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  seo: SEOFields;
}

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSEO, setExpandedSEO] = useState<Record<string, boolean>>({});

  const categories = ["All", "Travel Tips & Guides", "Local Attractions", "Hotel News & Events"];

  const blogPosts: BlogPost[] = [
    {
      title: "Top 5 Secret Spots in the Tropical Islands",
      slug: "secret-spots-tropical-islands",
      category: "Travel Tips & Guides",
      excerpt: "Discover the hidden beaches and pristine bays located just miles away from the Grand Resort, curated by our gold-standard concierge team.",
      date: "May 10, 2026",
      author: "Juliet Vane (Butler Concierge)",
      readTime: "5 min read",
      image: "/images/room_luxury.jpg",
      seo: {
        metaTitle: "Secret Coastal Spots Near Grand Resort | Concierge Travel Guide",
        metaDescription: "Shortlisted secret beaches, pristine bays, and hidden coves in Gujarat curated by our award-winning personal concierge staff.",
        keywords: ["hidden beaches", "private guide", "luxury travel", "coastal secrets"],
        focusKeyphrase: "Secret Coastal Spots",
        schemaType: "TravelArticle"
      }
    },
    {
      title: "Holistic Wellness: 3 Days of Mind-Body Restoration",
      slug: "holistic-wellness-mind-body-restoration",
      category: "Travel Tips & Guides",
      excerpt: "A deep dive into how spending three days in premium hot stone spas and thermal chambers can restore your mental focus and vitality.",
      date: "May 02, 2026",
      author: "Dr. Rachel Chen (Spa Director)",
      readTime: "6 min read",
      image: "/images/about_legacy.jpg",
      seo: {
        metaTitle: "Holistic Wellness Spa Guide | Reset Mind & Vitality",
        metaDescription: "Unveil the therapeutic benefits of thermal steam chambers and sensory hot stones at Grand Hotel's international organic spa.",
        keywords: ["wellness retreat", "spa guide", "hot stone massage", "mental health"],
        focusKeyphrase: "Holistic Wellness Retreat",
        schemaType: "MedicalWebPage"
      }
    },
    {
      title: "A Historic Guide to the Gujarat Heritage Temples",
      slug: "historic-guide-gujarat-heritage-temples",
      category: "Local Attractions",
      excerpt: "Discover ancient stone carvings, historical sun temples, and legendary palace ruins nestled just a scenic drive away from our estate.",
      date: "April 28, 2026",
      author: "Vikramaditya Mewar",
      readTime: "8 min read",
      image: "/images/hero_banner_main.png",
      seo: {
        metaTitle: "Historical Gujarat Temples Guide | Ancient Architecture Tour",
        metaDescription: "Plan your cultural itinerary with our guide to historic temples and archaeological monuments near the Grand Resort.",
        keywords: ["heritage guide", "historical temples", "palace ruins", "culture"],
        focusKeyphrase: "Gujarat Heritage Temples",
        schemaType: "GuideArticle"
      }
    },
    {
      title: "Navigating the Pristine White Sand Marine Sanctuary",
      slug: "pristine-white-sand-marine-sanctuary",
      category: "Local Attractions",
      excerpt: "An elite yacht guide to the marine preserve offering dolphin watching, reef snorkeling, and custom sunset cruise charters.",
      date: "April 18, 2026",
      author: "Capt. Aarav Patel (Yacht Captain)",
      readTime: "7 min read",
      image: "/images/room_villa.jpg",
      seo: {
        metaTitle: "Marine Sanctuary & Yacht Cruise Guide | Sunset Snorkeling",
        metaDescription: "Explore rare coral reefs, dolphin pods, and charter a custom sunset yacht cruise through our private beach concierge.",
        keywords: ["marine reserve", "dolphin cruise", "yacht charter", "coral reefs"],
        focusKeyphrase: "Marine Sanctuary Cruise",
        schemaType: "TouristAttraction"
      }
    },
    {
      title: "Grand Wine Vault Cellar & Pairings Unveiling",
      slug: "grand-wine-vault-cellar-pairings-unveiling",
      category: "Hotel News & Events",
      excerpt: "Our head sommelier Charles is opening the temperature-controlled historic vaults for exclusive private tastings this summer.",
      date: "April 10, 2026",
      author: "Sommelier Charles",
      readTime: "5 min read",
      image: "/images/room_executive.jpg",
      seo: {
        metaTitle: "Grand Wine Cellar Opening | Private Tastings & Pairings",
        metaDescription: "Book your seat for exclusive private wine cellar tastings and gourmet seafood pairings curated by Michelin-starred culinary chefs.",
        keywords: ["wine vaults", "sommelier tasting", "michelin culinary", "seafood pairings"],
        focusKeyphrase: "Wine Vault Tastings",
        schemaType: "Event"
      }
    },
    {
      title: "Carbon-Neutral Solar Upgrade & Organic Wellness Farm",
      slug: "carbon-neutral-solar-upgrade-organic-farm",
      category: "Hotel News & Events",
      excerpt: "Grand Hotel completes its 100% solar microgrid installation, launching our farm-to-table organic crop cultivation plots.",
      date: "March 22, 2026",
      author: "CEO Aditi Sharma",
      readTime: "4 min read",
      image: "/images/room_luxury.jpg",
      seo: {
        metaTitle: "Green Eco-Sustainability Milestone | 100% Carbon Neutral",
        metaDescription: "Discover how our boutique resort achieved zero carbon emissions via solar installations and organic farming initiatives.",
        keywords: ["eco-resort", "green energy", "solar microgrid", "farm-to-table"],
        focusKeyphrase: "Carbon Neutral Sustainability",
        schemaType: "NewsArticle"
      }
    }
  ];

  const toggleSEO = (slug: string) => {
    setExpandedSEO(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-955 py-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center justify-center space-x-1">
            <Bookmark className="h-4 w-4 fill-amber-500/10 text-amber-500" />
            <span>Grand Magazine</span>
          </span>
          <h1 
            className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
          >
            Latest Stories & Local Guides
          </h1>
          <p 
            className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto"
            style={{ fontFamily: '"Founders Grotesk Text", Arial, sans-serif' }}
          >
            Read about local travel secrets, cultural temple tours, organic sustainability updates, and culinary milestones.
          </p>
        </div>

        {/* Filter and Search Bar Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-8">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/10"
                    : "bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search guides, news, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-150 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-800">
            <Info className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No articles matched your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const isSEOOpen = !!expandedSEO[post.slug];

              return (
                <div 
                  key={post.slug} 
                  className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Image Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-150 dark:bg-slate-800">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute left-4 top-4 rounded-lg bg-amber-500 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      {/* Meta information row */}
                      <div className="flex items-center space-x-3 text-[10px] font-semibold text-slate-400">
                        <span className="flex items-center uppercase tracking-wider">
                          <Calendar className="h-3 w-3 mr-1 text-amber-500" /> 
                          {post.date}
                        </span>
                        <span className="flex items-center uppercase tracking-wider">
                          <Clock className="h-3 w-3 mr-1 text-amber-500" /> 
                          {post.readTime}
                        </span>
                      </div>

                      <h3 
                        className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 hover:text-amber-500 transition-colors"
                        style={{ fontFamily: 'Apris, "Times New Roman", sans-serif' }}
                      >
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="text-[10px] text-slate-400 font-medium">
                        By <span className="font-bold text-slate-600 dark:text-slate-300">{post.author}</span>
                      </div>
                    </div>

                    {/* Dynamic SEO Metadata Inspector Collapsible Drawer */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                      <button
                        onClick={() => toggleSEO(post.slug)}
                        className="w-full flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors py-1 px-2 rounded bg-slate-50 dark:bg-slate-950"
                      >
                        <span className="flex items-center space-x-1">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                          <span>SEO Metadata Inspector</span>
                        </span>
                        {isSEOOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>

                      {isSEOOpen && (
                        <div className="bg-amber-500/5 dark:bg-amber-500/2 rounded-xl border border-amber-500/10 p-4 space-y-2.5 text-[11px] leading-relaxed">
                          <div>
                            <span className="block font-bold text-[9px] uppercase tracking-wider text-amber-500">Target Meta Title</span>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">{post.seo.metaTitle}</span>
                          </div>
                          <div>
                            <span className="block font-bold text-[9px] uppercase tracking-wider text-amber-500">Meta Description</span>
                            <span className="text-slate-550 dark:text-slate-400">{post.seo.metaDescription}</span>
                          </div>
                          <div>
                            <span className="block font-bold text-[9px] uppercase tracking-wider text-amber-500">Focus Keyphrase</span>
                            <span className="text-slate-700 dark:text-slate-300 font-semibold font-mono bg-white dark:bg-slate-950 px-1.5 py-0.5 rounded border border-slate-150 dark:border-slate-800">{post.seo.focusKeyphrase}</span>
                          </div>
                          <div>
                            <span className="block font-bold text-[9px] uppercase tracking-wider text-amber-500">Schema.org Markup Type</span>
                            <span className="text-slate-600 dark:text-slate-400 font-mono">{post.seo.schemaType}</span>
                          </div>
                          <div>
                            <span className="block font-bold text-[9px] uppercase tracking-wider text-amber-500 font-sans">Index Keywords</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.seo.keywords.map((kw, i) => (
                                <span key={i} className="text-[9px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-full dark:text-slate-400">
                                  #{kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between">
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-600 transition-colors"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                      
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
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
