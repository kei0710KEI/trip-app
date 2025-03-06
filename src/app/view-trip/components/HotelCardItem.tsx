"use client";

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Hotel } from "@/types/trip";
import React, { useEffect, useState } from "react";

interface HotelCardItemProps {
  hotel: Hotel;
}

function HotelCardItem({ hotel }: HotelCardItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel.hotelName,
    };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos?.length > 0) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[0].name
        );
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.hotelName + "," + hotel.hotelAddress
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || "/placeholder.jpg"}
          className="rounded-xl h-[180px] w-full object-cover"
          alt={hotel.hotelName}
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel.price}</h2>
          <h2 className="text-sm">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
