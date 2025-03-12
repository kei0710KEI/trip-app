"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Menu, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserToken } from "@/types/user";
import { toast } from "sonner";
import { Coins } from "lucide-react";

interface UserData {
  picture?: string;
  email?: string;
}

function Header() {
  const [user, setUser] = useState<UserData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo: TokenResponse) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setUser(resp.data);
      setOpenDialog(false);

      // トークンの初期設定を確認
      const userTokenRef = doc(db, "userTokens", resp.data.email);
      const userTokenDoc = await getDoc(userTokenRef);

      if (!userTokenDoc.exists()) {
        // 初回サインインの場合、50トークンを付与
        const userToken: UserToken = {
          email: resp.data.email,
          tokens: 50,
          lastUpdated: {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0,
          },
        };
        await setDoc(userTokenRef, userToken);
        toast.success("Welcome Bonus 50 Tokens Added!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5 relative">
      <a href="/">
        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
      </a>
      <div className="hidden md:block">
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full cursor-pointer">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trip">
              <Button variant="outline" className="rounded-full cursor-pointer">
                My Trips
              </Button>
            </a>
            <a href="/tokens">
              <Button
                variant="outline"
                className="rounded-full flex items-center gap-2 cursor-pointer"
              >
                <Coins className="h-4 w-4" />
                Token Management
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User avatar"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      {/* モバイルメニュー */}
      <div className="md:hidden">
        {user ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 w-full bg-white shadow-lg border-t mt-2 p-4 z-50">
                <div className="flex flex-col gap-4">
                  <a href="/create-trip" className="w-full">
                    <Button variant="outline" className="w-full rounded-full">
                      + Create Trip
                    </Button>
                  </a>
                  <a href="/my-trip" className="w-full">
                    <Button variant="outline" className="w-full rounded-full">
                      My Trips
                    </Button>
                  </a>
                  <a href="/tokens" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full rounded-full flex items-center justify-center gap-2"
                    >
                      <Coins className="h-4 w-4" />
                      トークン管理
                    </Button>
                  </a>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={user.picture}
                      className="h-[35px] w-[35px] rounded-full"
                      alt="User avatar"
                    />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
