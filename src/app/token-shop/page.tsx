"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCoins } from "react-icons/fa";

const TokenShop = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Purchase Tokens
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          {[
            { amount: 100, price: 5, description: "Starter Pack" },
            { amount: 500, price: 10, description: "Popular Choice" },
            { amount: 1000, price: 20, description: "Best Value" },
          ].map((plan, index) => (
            <motion.div
              key={plan.amount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <FaCoins className="text-4xl text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {plan.description}
                </h3>
                <p className="text-3xl font-bold text-gray-800 mb-2">
                  {plan.amount} Tokens
                </p>
                <p className="text-xl text-blue-600 font-medium mb-6">
                  ${plan.price}
                </p>
                <button
                  onClick={() => handlePurchase(plan.amount)}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-medium
                    hover:from-blue-600 hover:to-indigo-700 transform transition-all duration-300
                    disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Purchase Now"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TokenShop;
