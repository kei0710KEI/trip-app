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
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Token Management</h1>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            Current Token Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-center">
            {userTokens?.tokens || 0}
            <span className="text-lg ml-2">Tokens</span>
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            Last Updated:
            {userTokens?.lastUpdated
              ? new Date(userTokens.lastUpdated.seconds * 1000).toLocaleString()
              : "Not Updated"}
          </p>
        </CardContent>
        <CardFooter>
          <a className="text-blue-500 hover:text-blue-300" href="/token-shop">
            Need more tokens?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
