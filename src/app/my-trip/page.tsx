"use client";

import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserTripCardItem from "./components/UserTripCardItem";
import { TripData } from "@/types/trip";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.email) {
      router.push("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(q);
      setUserTrips([]);
      querySnapshot.forEach((doc) => {
        setUserTrips((prevVal) => [...prevVal, doc.data() as TripData]);
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <Plane className="h-8 w-8 text-purple-500 animate-bounce" />
        <h2 className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          My Trips
        </h2>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5"
      >
        {!loading && userTrips?.length > 0 
          ? userTrips.map((trip, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transform transition-all duration-300 hover:shadow-lg"
              >
                <UserTripCardItem trip={trip} />
              </motion.div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-[220px] w-full bg-gradient-to-r from-purple-100 to-blue-100 animate-pulse rounded-xl backdrop-blur-sm"
              />
            ))}
      </motion.div>
    </motion.div>
  );
}

export default MyTrip;
