"use client";

import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { TripData } from "@/types/trip";

interface UserTripCardItemProps {
  trip: TripData;
}

function UserTripCardItem({ trip }: UserTripCardItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string>();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
  }, [trip?.userSelection?.location?.label]);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip, GetPlacePhoto]);

  return (
    <Link href={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all">
        <Image
          src={photoUrl || "/placeholder.jpg"}
          alt={trip?.userSelection?.location?.label || "Trip location"}
          width={400}
          height={220}
          className="object-cover rounded-xl h-[220px]"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
