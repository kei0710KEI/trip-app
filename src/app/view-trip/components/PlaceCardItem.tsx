"use client";

import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { Place } from "@/types/trip";

interface PlaceCardItemProps {
  place: Place;
}

function PlaceCardItem({ place }: PlaceCardItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
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
  };

  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="border rounded-xl p-3 mt-2 flex gap-5 
        hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      >
        <img
          src={photoUrl || "/placeholder.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
          alt={place.placeName}
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2">🕙 {place.timeToTravel}</h2>
          <h2 className="mt-2">🎟️ {place.ticketPricing}</h2>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
