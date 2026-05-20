import React from "react";
import { dummyRooms } from "@/data/rooms";
import RoomsListingClient from "@/components/shared/RoomsListingClient";

export default function RoomsPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 py-16 min-h-screen transition-colors duration-300">
      <RoomsListingClient initialRooms={dummyRooms} />
    </div>
  );
}
