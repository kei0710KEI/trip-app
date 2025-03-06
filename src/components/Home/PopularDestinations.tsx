"use client";

import { destinationData } from "@/data/data";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const PopularDestinations = () => {
  return (
    <div className="pt-20 pb-20">
      {/* section heading */}
      <h2 className="text-3xl font-bold text-center">人気の観光地</h2>

      {/* section content */}
      <div className="mt-14 w-[80%] mx-auto">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
        >
          {destinationData.map((data) => {
            return (
              <div key={data.id} className="m-3">
                {/* image div */}
                <div className="relative h-[400px]">
                  {/* overlay */}
                  <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                  {/* image */}
                  <Image
                    src={data.image}
                    alt={data.country}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <h1 className="text-lg font-semibold mt-4">{data.country}</h1>
                <p className="text-sm text-gray-600">
                  {data.travelers} Travelers
                </p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularDestinations;
