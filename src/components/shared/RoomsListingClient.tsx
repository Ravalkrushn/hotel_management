"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Room } from "@/types";
import RoomCard from "./RoomCard";
import { SlidersHorizontal, RotateCcw, Calendar, Search, ArrowUpDown, ShieldCheck } from "lucide-react";

interface RoomsListingClientProps {
  initialRooms: Room[];
}

export default function RoomsListingClient({ initialRooms }: RoomsListingClientProps) {
  // State variables for interactive search, filters and sort
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(850);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);

  // Available unique amenities list for filter checkbox
  const availableAmenities = [
    { label: "AC (Air Conditioning)", value: "AC" },
    { label: "Free Wi-Fi", value: "WiFi" },
    { label: "Pool View", value: "Pool View" },
    { label: "Private Balcony", value: "Balcony" },
    { label: "Panoramic Ocean View", value: "Ocean View" },
  ];

  // Helper to check if check-in/check-out dates are selected
  const isDatesValid = checkInDate && checkOutDate;

  // Filter and Sort Logic
  const filteredAndSortedRooms = useMemo(() => {
    let result = [...initialRooms];

    // 1. Text Search Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (room) =>
          room.name.toLowerCase().includes(query) ||
          room.description.toLowerCase().includes(query) ||
          room.category.toLowerCase().includes(query)
      );
    }

    // 2. Room Type Filter
    if (selectedTypes.length > 0) {
      result = result.filter((room) => selectedTypes.includes(room.category));
    }

    // 3. Price Filter
    result = result.filter((room) => {
      const activePrice = room.discountPrice || room.price;
      return activePrice <= priceRange;
    });

    // 4. Capacity Filter
    if (selectedCapacities.length > 0) {
      result = result.filter((room) => {
        return selectedCapacities.some((cap) => {
          if (cap === "1") return room.capacity === 1;
          if (cap === "2") return room.capacity === 2;
          if (cap === "family") return room.capacity >= 3;
          return true;
        });
      });
    }

    // 5. Amenities Filter
    if (selectedAmenities.length > 0) {
      result = result.filter((room) => {
        return selectedAmenities.every((amenity) => {
          const matchMap: Record<string, string[]> = {
            "AC": ["air conditioning", "ac"],
            "WiFi": ["wi-fi", "wifi", "internet"],
            "Pool View": ["pool view", "pool access", "plunge pool"],
            "Balcony": ["balcony", "terrace", "deck"],
            "Ocean View": ["ocean view", "oceanfront", "sea view"]
          };
          const keywords = matchMap[amenity] || [amenity.toLowerCase()];
          return room.amenities.some((roomAmenity) =>
            keywords.some((keyword) => roomAmenity.toLowerCase().includes(keyword))
          );
        });
      });
    }

    // 6. Sort Logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === "latest") {
      // Sort by newest rooms first (higher IDs represent newer room additions in our mock database)
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Popularity (default order as provided)
      // Keep initial array order
    }

    return result;
  }, [initialRooms, searchQuery, selectedTypes, priceRange, selectedCapacities, selectedAmenities, sortBy]);

  // Pagination Logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredAndSortedRooms.length / itemsPerPage);
  const paginatedRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedRooms.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedRooms, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTypes, priceRange, selectedCapacities, selectedAmenities, sortBy]);

  // Handlers
  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleCapacityChange = (cap: string) => {
    setSelectedCapacities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap]
    );
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setCheckInDate("");
    setCheckOutDate("");
    setSelectedTypes([]);
    setPriceRange(850);
    setSelectedCapacities([]);
    setSelectedAmenities([]);
    setSortBy("popularity");
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 1. Header Hero section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Grand Accommodations</span>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Luxury Rooms & Suites
        </h1>
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <span>Home</span>
          <span>/</span>
          <span className="text-amber-500 font-medium">Rooms</span>
        </div>
        <p className="mt-5 text-slate-500 dark:text-slate-400 leading-relaxed text-base">
          Discover a perfect blend of space, designer furniture, and world-class luxury at Velnora Grand Hotel. Filter by your preferences and dates to book your premium stay.
        </p>
      </div>

      {/* 2. Horizontal Quick Booking & Sort Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl mb-10 transition-all duration-300">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 items-end">
          {/* Search Query */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400">Search Room</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Ocean, Deluxe, Villa..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-semibold"
              />
            </div>
          </div>

          {/* Check-In Date */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400">Check-In Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-semibold cursor-pointer"
              />
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400">Check-Out Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={checkOutDate}
                min={checkInDate || undefined}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-semibold cursor-pointer"
              />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 font-sans">Sort By</label>
            <div className="relative">
              <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-semibold cursor-pointer appearance-none"
              >
                <option value="popularity">Popularity (Default)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="latest">Latest Additions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Date Selection Info Banner */}
        {isDatesValid && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center space-x-2 text-xs text-amber-600 dark:text-amber-400 font-bold">
            <ShieldCheck className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 animate-pulse" />
            <span>Showing available rooms for stay from {checkInDate} to {checkOutDate}. Enjoy premium booking perks!</span>
          </div>
        )}
      </div>

      {/* 3. Main Grid layout: Sidebar on left (1/4 width) & Cards Grid on right (3/4 width) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Mobile filter toggle button */}
        <button
          onClick={() => setIsFilterOpenMobile(!isFilterOpenMobile)}
          className="lg:hidden w-full flex items-center justify-center space-x-2 bg-amber-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:bg-amber-600 transition-all"
        >
          <SlidersHorizontal className="h-4.5 w-4.5" />
          <span>{isFilterOpenMobile ? "Hide" : "Show"} Advanced Filters</span>
        </button>

        {/* Filters Sidebar Column */}
        <div
          className={`${
            isFilterOpenMobile ? "block" : "hidden"
          } lg:block w-full lg:w-80 flex-shrink-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-8 sticky top-24 transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4.5 w-4.5 text-amber-500" />
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Filter Rooms</h3>
            </div>
            <button
              onClick={handleResetFilters}
              title="Reset All"
              className="text-xs font-bold text-slate-400 hover:text-amber-500 flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Filter Group 1: Room Type */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Room Type</h4>
            <div className="space-y-2">
              {["Standard", "Deluxe", "Suite"].map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="h-4.5 w-4.5 rounded border-slate-200 dark:border-slate-800 text-amber-500 focus:ring-amber-500/20 bg-slate-50 dark:bg-slate-950 transition-all cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-amber-500 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Group 2: Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Max Price per night</h4>
              <span className="text-sm font-extrabold text-amber-500">${priceRange}</span>
            </div>
            <input
              type="range"
              min="75"
              max="850"
              step="25"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none transition-all"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>Min: $75</span>
              <span>Max: $850</span>
            </div>
          </div>

          {/* Filter Group 3: Capacity */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Capacity</h4>
            <div className="space-y-2">
              {[
                { label: "1 Person", value: "1" },
                { label: "2 Persons", value: "2" },
                { label: "Family (3+ Persons)", value: "family" },
              ].map((cap) => (
                <label key={cap.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCapacities.includes(cap.value)}
                    onChange={() => handleCapacityChange(cap.value)}
                    className="h-4.5 w-4.5 rounded border-slate-200 dark:border-slate-800 text-amber-500 focus:ring-amber-500/20 bg-slate-50 dark:bg-slate-950 transition-all cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-amber-500 transition-colors">
                    {cap.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Group 4: Amenities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Amenities</h4>
            <div className="space-y-2">
              {availableAmenities.map((amenity) => (
                <label key={amenity.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.value)}
                    onChange={() => handleAmenityChange(amenity.value)}
                    className="h-4.5 w-4.5 rounded border-slate-200 dark:border-slate-800 text-amber-500 focus:ring-amber-500/20 bg-slate-50 dark:bg-slate-950 transition-all cursor-pointer"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-amber-500 transition-colors">
                    {amenity.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Listing Grid Column (3/4 width) */}
        <div className="flex-1 w-full space-y-10">
          {/* Active stats bar */}
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-6 py-4 rounded-2xl shadow-md">
            <div className="font-semibold text-slate-700 dark:text-slate-300">
              Showing <span className="text-amber-500 font-extrabold">{filteredAndSortedRooms.length}</span> matching{" "}
              {filteredAndSortedRooms.length === 1 ? "room" : "rooms"}
            </div>
            {currentPage > 1 && (
              <div className="hidden sm:block text-xs font-bold text-slate-400">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {/* Rooms Grid */}
          {paginatedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedRooms.map((room) => (
                <div key={room.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          ) : (
            /* No Rooms Found State */
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 shadow-xl text-center space-y-6 max-w-lg mx-auto mt-8">
              <div className="h-16 w-16 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <SlidersHorizontal className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-xl">No Accommodations Found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  We couldn&apos;t find any suites or rooms matching your chosen filters. Try loosening your price constraints or picking fewer amenity requirements.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-amber-500 text-white hover:bg-amber-600 font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-500/20"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* 4. Elegant Custom Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-6">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-extrabold transition-all duration-200 flex items-center space-x-1 select-none disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"
              >
                <span>&larr; Previous</span>
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-11 w-11 rounded-xl text-sm font-extrabold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-extrabold transition-all duration-200 flex items-center space-x-1 select-none disabled:opacity-40 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300"
              >
                <span>Next &rarr;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
