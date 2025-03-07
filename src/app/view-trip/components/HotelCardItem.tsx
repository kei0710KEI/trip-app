"use client";

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState, useCallback } from "react";
import { Hotel } from "@/types/trip";
import Image from "next/image";

interface HotelCardItemProps {
  hotel: Hotel;
}

function HotelCardItem({ hotel }: HotelCardItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  const GetPlacePhoto = useCallback(async () => {
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
  }, [hotel.hotelName]);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel, GetPlacePhoto]);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.hotelName
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="border rounded-xl overflow-hidden hover:scale-105 transition-all hover:shadow-md cursor-pointer h-full">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={photoUrl || "/placeholder.jpg"}
            alt={hotel.hotelName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-lg line-clamp-1">{hotel.hotelName}</h2>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {hotel.hotelAddress}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-lg font-semibold">💰 {hotel.price}</span>
            <span className="text-yellow-600">★ {hotel.rating}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
