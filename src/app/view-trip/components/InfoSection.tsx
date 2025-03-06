"use client";

import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState, useCallback } from "react";
import { IoIosSend } from "react-icons/io";
import { TripData } from "@/types/trip";
import Image from "next/image";

interface InfoSectionProps {
  trip: TripData | null;
}

function InfoSection({ trip }: InfoSectionProps) {
  const [photoUrl, setPhotoUrl] = useState<string>();

  const GetPlacePhoto = useCallback(async () => {
    if (!trip?.userSelection?.location?.label) return;

    const data = {
      textQuery: trip.userSelection.location.label,
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
    <div>
      <Image
        src={photoUrl || "/placeholder.jpg"}
        alt={trip?.userSelection?.location?.label || "Location"}
        width={1200}
        height={340}
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className=" my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className=" hidden sm:flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🥂 No. Of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
