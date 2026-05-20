import { Room } from "@/types";

export const dummyRooms: Room[] = [
  {
    id: "room-1",
    name: "Deluxe Serenity Room",
    slug: "deluxe-serenity-room",
    category: "Deluxe",
    price: 180,
    discountPrice: 150,
    capacity: 2,
    description: "Experience serene comfort in our Deluxe Room, featuring contemporary styling, plush king-size bedding, and a private balcony overlooking our lush manicured gardens. Complete with state-of-the-art entertainment and a spa-like bathroom.",
    images: [
      "/images/room_luxury.jpg",
      "/images/room_luxury.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "4K Smart TV",
      "Private Balcony",
      "Mini Bar & Nespresso Machine",
      "Premium Bathrobes & Slippers",
      "24/7 Room Service",
      "Garden View"
    ],
    specifications: {
      size: "45 m²",
      bed: "1 King Bed or 2 Single Beds",
      view: "Garden View",
      bathroom: "Luxury Marble Bathroom with Rain Shower"
    }
  },
  {
    id: "room-2",
    name: "Executive Oceanfront Suite",
    slug: "executive-oceanfront-suite",
    category: "Suite",
    price: 320,
    discountPrice: 280,
    capacity: 3,
    description: "Designed for business leaders and travelers seeking extra luxury, our Executive Suite offers a separate elegant living space, breathtaking floor-to-ceiling ocean views, and premium personalized services.",
    images: [
      "/images/room_executive.jpg",
      "/images/room_executive.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Ocean View",
      "Separate Living & Dining Area",
      "Personal Concierge Service",
      "Complimentary Club Lounge Access",
      "Deep Soaking Bathtub",
      "Secure Digital Safe"
    ],
    specifications: {
      size: "75 m²",
      bed: "1 Ultra-plush King Bed",
      view: "Ocean & Sunset View",
      bathroom: "Dual Vanity Marble Bathroom with Jacuzzi Bath"
    }
  },
  {
    id: "room-3",
    name: "Presidential Royal Suite",
    slug: "presidential-royal-suite",
    category: "Suite",
    price: 850,
    discountPrice: 750,
    capacity: 4,
    description: "Indulge in absolute grandeur in the Presidential Royal Suite. Spanning a vast layout with premium custom furniture, private dining options, an expansive terrace with a private plunge pool, and dedicated private butler service.",
    images: [
      "/images/room_penthouse.jpg",
      "/images/room_penthouse.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Pool View",
      "Private Plunge Pool & Terrace",
      "Dedicated 24/7 Personal Butler",
      "Private Chef Dinings Available",
      "In-suite Private Bar & Wine Cellar",
      "Premium Sound System by Bang & Olufsen",
      "Airport VIP Chauffeur Transfer"
    ],
    specifications: {
      size: "180 m²",
      bed: "2 Royal King Beds",
      view: "360-degree Panoramic City & Coastline View",
      bathroom: "En-suite Jacuzzis & Steam Rooms in both bathrooms"
    }
  },
  {
    id: "room-4",
    name: "Sanctuary Garden Villa",
    slug: "sanctuary-garden-villa",
    category: "Deluxe",
    price: 490,
    capacity: 4,
    description: "An oasis of tranquility surrounded by tropical flora. The Sanctuary Garden Villa is a private detached retreat offering an outdoor shower, private sun deck, separate kitchen, and spacious modern open-plan living.",
    images: [
      "/images/room_villa.jpg",
      "/images/room_villa.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Pool View",
      "Private Sun Deck & Lounge Chairs",
      "Outdoor Rain Forest Shower",
      "Fully Equipped Kitchenette",
      "Espresso Bar",
      "Direct Garden & Pool Access",
      "Bose Surround System"
    ],
    specifications: {
      size: "110 m²",
      bed: "1 King Bed & 2 Double Beds",
      view: "Lush Botanical Gardens",
      bathroom: "Open-concept Spa Bathroom with Sky Views"
    }
  },
  {
    id: "room-5",
    name: "Sunset Ridge Loft",
    slug: "sunset-ridge-loft",
    category: "Standard",
    price: 240,
    discountPrice: 210,
    capacity: 2,
    description: "A stylish two-level loft with industrial-chic design details, featuring high wooden beam ceilings, a floating staircase, a Cozy Fireplace, and superb elevated views of the mountain ridge.",
    images: [
      "/images/room_executive.jpg",
      "/images/room_executive.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Suspended Loft Bedroom",
      "Eco-Friendly Glass Fireplace",
      "Marshall Bluetooth Speaker",
      "Cozy Loft Living Area",
      "Premium Egyptian Cotton Linens",
      "Artisanal Coffee & Tea Set"
    ],
    specifications: {
      size: "60 m²",
      bed: "1 Queen Bed",
      view: "Mountain Ridge & Sunset",
      bathroom: "Sleek Modern Bathroom with Walk-in Shower"
    }
  },
  {
    id: "room-6",
    name: "Classic Standard Room",
    slug: "classic-standard-room",
    category: "Standard",
    price: 90,
    discountPrice: 80,
    capacity: 1,
    description: "Our Classic Standard Room offers exceptional value and comfort for solo travelers. Fully equipped with a comfortable queen bed, modern work desk, smart storage space, and sleek premium bathroom fixtures.",
    images: [
      "/images/about_legacy.jpg",
      "/images/about_legacy.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "4K Smart TV",
      "Comfortable Work Desk",
      "Tea & Coffee Maker",
      "24/7 Room Service"
    ],
    specifications: {
      size: "28 m²",
      bed: "1 Queen Bed",
      view: "Quiet Courtyard View",
      bathroom: "Modern Bathroom with Rain Shower"
    }
  },
  {
    id: "room-7",
    name: "Cozy Single Nest",
    slug: "cozy-single-nest",
    category: "Standard",
    price: 75,
    capacity: 1,
    description: "A cozy and warm nest perfectly tailored for budget-conscious business executives or solo adventurers. Enjoy high-speed internet, a comfortable single bed, and peaceful surroundings for a sound night's sleep.",
    images: [
      "/images/room_luxury.jpg",
      "/images/room_luxury.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Plush Single Bed",
      "Digital Safe Box",
      "Iron & Ironing Board",
      "Sleek Standing Shower"
    ],
    specifications: {
      size: "20 m²",
      bed: "1 Comfortable Single Bed",
      view: "Atrium View",
      bathroom: "Compact Smart Bathroom with Walk-in Shower"
    }
  },
  {
    id: "room-8",
    name: "Deluxe Family Oasis",
    slug: "deluxe-family-oasis",
    category: "Deluxe",
    price: 220,
    discountPrice: 195,
    capacity: 4,
    description: "Create wonderful memories with your loved ones in our spacious Family Oasis. Features two connected bedrooms, separate bath and shower zones, dynamic pool views, and specialized child-friendly services.",
    images: [
      "/images/room_villa.jpg",
      "/images/room_villa.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Pool View",
      "Private Balcony",
      "Separate Kid's Bedroom",
      "Smart TV with Kid's Channels",
      "Mini Bar & Snacks",
      "Complimentary Laundry Service"
    ],
    specifications: {
      size: "85 m²",
      bed: "1 King Bed & 2 Twin Beds",
      view: "Main Pool & Gardens",
      bathroom: "Expansive Bathroom with Kid-friendly Tub"
    }
  },
  {
    id: "room-9",
    name: "Horizon Ocean Suite",
    slug: "horizon-ocean-suite",
    category: "Suite",
    price: 380,
    discountPrice: 340,
    capacity: 3,
    description: "Gaze upon the endless blue ocean from this high-floor suite. Features an open-concept lounge, a spectacular balcony with lounge seating, customized local artwork, and exclusive ocean sunset experiences.",
    images: [
      "/images/room_executive.jpg",
      "/images/room_executive.jpg"
    ],
    amenities: [
      "Free High-speed Wi-Fi",
      "Air Conditioning (AC)",
      "Ocean View",
      "Private Balcony",
      "Walk-in Wardrobe",
      "Nespresso Coffee Station",
      "Premium Bluetooth Speakers",
      "In-room Gourmet Dining Options"
    ],
    specifications: {
      size: "90 m²",
      bed: "1 Ultra King Bed & 1 Sofa Bed",
      view: "180-degree Panoramic Ocean View",
      bathroom: "Dual Head Rain Shower & Deep Soaking Tub"
    }
  }
];
