"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Purchase Tokens</h1>

      <div className="grid gap-6 max-w-md mx-auto">
        {[100, 500, 1000].map((amount) => (
          <button
            key={amount}
            className="w-full bg-blue-500 text-white p-4 rounded-lg text-xl hover:bg-blue-600 disabled:bg-gray-400"
            onClick={() => handlePurchase(amount)}
            disabled={loading}
          >
            {amount} Tokens - ${amount === 100 ? 5 : amount === 500 ? 10 : 20}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TokenShop;
