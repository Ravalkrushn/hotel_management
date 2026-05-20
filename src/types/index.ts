export interface Room {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  capacity: number;
  description: string;
  images: string[];
  amenities: string[];
  specifications: Record<string, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'guest' | 'admin';
  avatarUrl?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId?: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface Review {
  id: string;
  roomId: string;
  userId?: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}
