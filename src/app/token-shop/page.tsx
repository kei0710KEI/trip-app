"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const TokenShop = () => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (tokenAmount: number) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}") as {
      email?: string;
    };

    if (!user?.email) {
      alert("Please log in first!");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenAmount, userEmail: user.email }),
    });

    const data = await response.json();
    setLoading(false);
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to initiate purchase.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
      >
        Token Shop
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
        {[
          { amount: 100, price: 5, description: "Starter Pack" },
          { amount: 500, price: 10, description: "Popular Choice" },
          { amount: 1000, price: 20, description: "Best Value" },
        ].map((plan, index) => (
          <motion.div
            key={plan.amount}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex justify-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaCoins className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                  {plan.description}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.6 }}
                  className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text text-transparent"
                >
                  {plan.amount}
                  <span className="text-lg ml-2">Tokens</span>
                </motion.div>
                <p className="text-2xl text-center mt-4 text-blue-600 font-medium">
                  ${plan.price}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(plan.amount)}
                  disabled={loading}
                  className="cursor-pointer bg-gradient-to-r from-primary to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-medium
                    hover:from-primary/80 hover:to-purple-700 transform transition-all duration-300
                    disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Processing...
                    </span>
                  ) : (
                    "Purchase Now"
                  )}
                </motion.button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TokenShop;
