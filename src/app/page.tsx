import Hero from "@/components/Home/Hero";
import PopularDestinations from "@/components/Home/PopularDestinations";
import TravelNews from "@/components/Home/TravelNews";
import React from "react";

function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <PopularDestinations />
      <TravelNews />
    </div>
  );
}

export default Home;
