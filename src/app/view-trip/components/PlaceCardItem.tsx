"use client";

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState, useCallback } from "react";
import { Place } from "@/types/trip";
import Image from "next/image";

interface PlaceCardItemProps {
  place: Place;
}

function PlaceCardItem({ place }: PlaceCardItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: place.placeName,
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
  }, [place.placeName]);

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place, GetPlacePhoto]);

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="border rounded-xl p-3 mt-2 flex gap-5 
        hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <Image
          src={photoUrl || "/placeholder.jpg"}
          alt={place.placeName}
          width={130}
          height={130}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2">🕙 {place.timeToTravel}</h2>
          <h2 className="mt-2">🎟️ {place.ticketPricing}</h2>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
