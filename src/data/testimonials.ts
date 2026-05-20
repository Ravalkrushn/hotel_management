export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  rating: number;
  comment: string;
  stayDate: string;
}

export const dummyTestimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Eleanor Vance",
    role: "Leisure Traveler",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The level of hospitality here is unparalleled. From the private check-in to the personalized room service, everything exceeded our expectations. The Presidential Suite was an absolute dream!",
    stayDate: "April 2026"
  },
  {
    id: "t-2",
    name: "Marcus Thorne",
    role: "Tech Entrepreneur",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The Executive Oceanfront Suite was the perfect base for my workation. Fast Wi-Fi, incredibly quiet space, and a view that inspired creativity. The club lounge access is highly recommended.",
    stayDate: "May 2026"
  },
  {
    id: "t-3",
    name: "Sophia & Liam Chen",
    role: "Honeymooners",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "We spent our honeymoon at the Sanctuary Garden Villa. The outdoor shower and private deck were so beautiful and secluded. The spa services left us feeling incredibly refreshed.",
    stayDate: "March 2026"
  }
];
