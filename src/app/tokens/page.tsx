"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserToken } from "@/types/user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";

export default function TokensPage() {
  const router = useRouter();
  const [userTokens, setUserTokens] = useState<UserToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTokens = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user?.email) {
        router.push("/");
        return;
      }

      try {
        const userTokenRef = doc(db, "userTokens", user.email);
        const userTokenDoc = await getDoc(userTokenRef);

        if (userTokenDoc.exists()) {
          setUserTokens(userTokenDoc.data() as UserToken);
        }
      } catch (error) {
        console.error("Failed to get token information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

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
        Token Management
      </motion.h1>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Coins className="h-6 w-6 text-yellow-500" />
              </motion.div>
              Current Token Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
              className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text text-transparent"
            >
              {userTokens?.tokens || 0}
              <span className="text-lg ml-2">Tokens</span>
            </motion.div>
            {(userTokens?.tokens || 0) < 10 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200"
              >
                <p>⚠️ 10 tokens are required to generate a trip plan.</p>
                <p>Please purchase more tokens.</p>
              </motion.div>
            )}
            <p className="text-sm text-gray-500 text-center mt-2">
              Last Updated:
              {userTokens?.lastUpdated
                ? new Date(userTokens.lastUpdated.seconds * 1000).toLocaleString()
                : "Not Updated"}
            </p>
          </CardContent>
          <CardFooter>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="animate-bounce text-blue-600 hover:text-blue-300 text-xl font-semibold transition-colors duration-300"
              href="/token-shop"
            >
              Need more tokens? →
            </motion.a>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
