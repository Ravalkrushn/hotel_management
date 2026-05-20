import React from "react";
import { notFound } from "next/navigation";
import { dummyRooms } from "@/data/rooms";
import RoomDetailClient from "@/components/shared/RoomDetailClient";

interface RoomDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic SEO Metadata for each premium room dynamically on the server
export async function generateMetadata({ params }: RoomDetailPageProps) {
  const room = dummyRooms.find((r) => r.slug === params.slug);
  if (!room) {
    return {
      title: "Room Not Found | Velnora Grand Hotel"
    };
  }
  return {
    title: `${room.name} - Luxury Accommodations | Velnora Grand Hotel`,
    description: room.description.substring(0, 155) + "..."
  };
}

export default function RoomDetailPage({ params }: RoomDetailPageProps) {
  const room = dummyRooms.find((r) => r.slug === params.slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-12 min-h-screen transition-colors duration-300">
      <RoomDetailClient room={room} allRooms={dummyRooms} />
    </div>
  );
}
