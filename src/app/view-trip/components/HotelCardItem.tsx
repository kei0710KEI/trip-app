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
    >
      <div
        className="border rounded-xl p-3 mt-2 flex gap-5 
        hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <Image
          src={photoUrl || "/placeholder.jpg"}
          alt={hotel.hotelName}
          width={130}
          height={130}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{hotel.hotelName}</h2>
          <p className="text-sm text-gray-400">{hotel.hotelAddress}</p>
          <h2 className="mt-2">💰 {hotel.price}</h2>
          <h2 className="mt-2">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
