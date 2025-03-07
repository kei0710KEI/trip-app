"use client";

import React from "react";
import HotelCardItem from "./HotelCardItem";
import { TripData } from "@/types/trip";

interface HotelsProps {
  trip: TripData | null;
}

function Hotels({ trip }: HotelsProps) {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl mb-6">Hotel Recommendation</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
