"use client";

import Hero from "@/components/Home/Hero";
import Destination from "@/components/Home/Destination";
import React from "react";
import CTA from "@/components/Home/CTA";
import Explanation from "@/components/Home/Explanation";

function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Destination />
      <Explanation />
      <CTA />
    </div>
  );
}

export default Home;
