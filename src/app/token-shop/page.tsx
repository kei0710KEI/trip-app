"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const tokenPackages = [
  {
    tokens: 100,
    price: 500,
    popular: false,
    priceId: "price_100tokens",
  },
  {
    tokens: 500,
    price: 1000,
    popular: true,
    priceId: "price_500tokens",
  },
  {
    tokens: 1000,
    price: 3000,
    popular: false,
    priceId: "price_1000tokens",
  },
];

export default function TokenShop() {
  const handlePurchase = async (priceId: string) => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      // Here you would typically make an API call to your backend to create a Stripe Checkout Session
      // For demonstration, we'll show the structure
      /*
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
      */
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Purchase Tokens
            </h1>
            <p className="text-xl text-gray-600">
              Choose the token package that suits your travel planning needs
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {tokenPackages.map((pkg, index) => (
            <motion.div
              key={pkg.tokens}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`p-6 relative ${
                  pkg.popular ? "border-blue-500 border-2" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center mb-6">
                  <Coins className="w-12 h-12 text-yellow-500" />
                </div>

                <h3 className="text-2xl font-bold text-center mb-2">
                  {pkg.tokens} Tokens
                </h3>

                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">
                    ¥{pkg.price.toLocaleString()}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    Generate {Math.floor(pkg.tokens / 10)} itineraries
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    No expiration date
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    Instant delivery
                  </li>
                </ul>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handlePurchase(pkg.priceId)}
                >
                  Purchase Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="text-sm">
            Secure payment powered by Stripe
            <br />
            All prices are in Japanese Yen (JPY)
          </p>
        </div>
      </div>
    </div>
  );
}
