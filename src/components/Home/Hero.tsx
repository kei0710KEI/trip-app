"use client";

import Link from "next/link";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div className="relative w-full h-[120vh] sm:h-[100vh]">
      {/* overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-70"></div>
      {/* video */}
      <div className="relative w-full h-full overflow-hidden">
        <video
          src="/airPlain.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-[108%] object-cover absolute top-0 left-0"
        />
      </div>
      {/* text content */}
      <div className="absolute z-[100] w-full h-full top-0 left-0 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col w-full px-4 sm:px-0 gap-16 sm:gap-12">
          <div data-aos="fade-up">
            <TypeAnimation
              sequence={[
                "Let's Create Your Trip",
                2000,
                "Let's Plan Your Adventure",
                2000,
                "Let's Make Memories",
                2000,
              ]}
              wrapper="h1"
              speed={50}
              repeat={Infinity}
              className="text-[20px] text-center md:text-[30px] lg:text-[45px] tracking-[0.5rem] md:tracking-[0.7rem] text-white font-bold uppercase bg-gray-500/50 p-2 rounded-lg"
            />
          </div>
          <Link
            href="/create-trip"
            className="rounded-lg px-14 md:px-28 py-2.5 overflow-hidden group bg-rose-600 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative font-bold text-xl text-white">
              Create Trip
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
