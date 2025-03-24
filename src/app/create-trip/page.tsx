"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import axios from "axios";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
  JapaneseCities,
} from "@/lib/data";
import { chatSession } from "@/service/AIModal";
import { Coins } from "lucide-react";
import { motion } from "framer-motion";

interface GooglePlaceOption {
  label: string;
  value: string;
}

interface FormData {
  location?: GooglePlaceOption;
  noOfDays?: number;
  budget?: string;
  traveler?: string;
}

function CreateTrip() {
  const [place, setPlace] = useState<GooglePlaceOption | undefined>();
  const [formData, setFormData] = useState<FormData>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userTokens, setUserTokens] = useState<number | null>(null);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (
    name: keyof FormData,
    value: FormData[keyof FormData]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const handleGenerateClick = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const userTokenRef = doc(db, "userTokens", JSON.parse(user).email);
    const userTokenDoc = await getDoc(userTokenRef);

    if (!userTokenDoc.exists() || userTokenDoc.data().tokens < 10) {
      toast.error("You don't have enough tokens");
      router.push("/tokens");
      return;
    }

    setUserTokens(userTokenDoc.data().tokens);
    setOpenConfirmDialog(true);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    const userTokenRef = doc(db, "userTokens", JSON.parse(user).email);
    const userTokenDoc = await getDoc(userTokenRef);

    if (!userTokenDoc.exists() || userTokenDoc.data().tokens < 10) {
      toast.error("You don't have enough tokens");
      router.push("/tokens");
      return;
    }

    if (
      (formData.noOfDays && formData.noOfDays > 5 && !formData.location) ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please fill all details");
      return;
    }

    await setDoc(userTokenRef, {
      ...userTokenDoc.data(),
      tokens: userTokenDoc.data().tokens - 10,
      lastUpdated: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    });

    toast("Please wait...");
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location?.label || ""
    )
      .replace("{traveler}", formData.traveler || "")
      .replace("{budget}", formData.budget || "")
      .replace("{totalDays}", formData.noOfDays?.toString() || "");

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      setLoading(false);
      if (responseText) {
        await SaveAiTrip(responseText);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to generate trip");
      console.error(error);
    }
  };

  const SaveAiTrip = async (TripData: string) => {
    try {
      setLoading(true);
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        toast.error("User not found");
        return;
      }

      const user = JSON.parse(userStr);
      const docId = Date.now().toString();

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      router.push(`/view-trip/${docId}`);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save trip");
      console.error(error);
    }
  };

  const GetUserProfile = (tokenInfo: { access_token: string }) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        handleGenerateClick();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to get user profile");
      });
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const filteredCities = JapaneseCities[0].filter((city) =>
    city.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
      >
        Trip Planner
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-gray-500 text-xl text-center"
      >
        Please fill in your travel preferences to generate a customized
        itinerary.
      </motion.p>

      <div className="mt-20 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg relative z-50"
          onClick={() => handleSectionClick("location")}
        >
          <h2
            className={`text-xl my-3 font-medium ${
              activeSection === "location" ? "animate-bounce" : ""
            }`}
          >
            Where would you like to travel? 
          </h2>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                handleSectionClick("location");
              }}
              onBlur={() => {
                setTimeout(() => setIsFocused(false), 200);
              }}
              placeholder="Search for a city..."
              className="w-full p-2 border rounded transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {isFocused && filteredCities.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCities.map((city) => (
                  <div
                    key={city.value}
                    className={`p-2 cursor-pointer hover:bg-purple-50 transition-colors duration-150
                      ${
                        formData.location?.value === city.value
                          ? "bg-purple-50"
                          : ""
                      }
                    `}
                    onClick={() => {
                      setPlace(city);
                      handleInputChange("location", city);
                      setSearchTerm(city.label);
                      setActiveSection(null);
                      setIsFocused(false);
                    }}
                  >
                    {city.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg"
          onClick={() => handleSectionClick("days")}
        >
          <h2
            className={`text-xl my-3 font-medium ${
              activeSection === "days" ? "animate-bounce" : ""
            }`}
          >
            How many days are you planning to travel{" "}
            {place ? `to ${place.label}` : "there"}?
          </h2>
          <Input
            placeholder="Ex.3"
            type="number"
            min={1}
            className="transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-purple-500"
            onFocus={() => handleSectionClick("days")}
            onChange={(e) => {
              handleInputChange("noOfDays", parseInt(e.target.value, 10));
              if (e.target.value) setActiveSection(null);
            }}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg mt-10"
        onClick={() => handleSectionClick("budget")}
      >
        <h2
          className={`text-xl my-3 font-medium ${
            activeSection === "budget" ? "animate-bounce" : ""
          }`}
        >
          What is your Budget {place ? `to ${place.label}` : ""}?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleInputChange("budget", item.title);
                setActiveSection(null);
              }}
              className={`p-4 border cursor-pointer rounded-lg transition-all duration-300
              ${
                formData.budget === item.title
                  ? "shadow-lg border-purple-500 bg-purple-50"
                  : "hover:shadow-lg hover:border-gray-300"
              }
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg mt-10"
        onClick={() => handleSectionClick("traveler")}
      >
        <h2
          className={`text-xl my-3 font-medium ${
            activeSection === "traveler" ? "animate-bounce" : ""
          }`}
        >
          Who are you traveling with?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                handleInputChange("traveler", item.people);
                setActiveSection(null);
              }}
              className={`p-4 border cursor-pointer rounded-lg transition-all duration-300
              ${
                formData.traveler === item.people
                  ? "shadow-lg border-purple-500 bg-purple-50"
                  : "hover:shadow-lg hover:border-gray-300"
              }
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="my-10 justify-end flex"
      >
        <Button
          disabled={loading}
          onClick={handleGenerateClick}
          className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </motion.div>

      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/90">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-600 animate-bounce" />
              Confirm Token Consumption
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consumed Tokens</span>
                    <span className="font-semibold text-lg text-red-500">
                      -10 tokens
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Current Balance</span>
                    <span className="font-semibold text-lg">
                      {userTokens} tokens
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">After Generation</span>
                    <span className="font-semibold text-lg text-blue-600">
                      {userTokens ? userTokens - 10 : 0} tokens
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    ※ This operation will consume 10 tokens. The generated plan
                    will be saved and can be viewed later.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmDialog(false)}
              className="flex-1 hover:bg-gray-100 transition-colors duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpenConfirmDialog(false);
                OnGenerateTrip();
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              Generate Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog}>
        <DialogContent className="backdrop-blur-md bg-white/90">
          <DialogHeader>
            <DialogDescription>
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                src="/logo.jpg"
                alt="Logo"
              />
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-lg mt-7"
              >
                Sign In With Google
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Sign in to the App with Google authentication securely
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => login()}
                  className="w-full mt-5 flex gap-4 items-center bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In with Google
                </Button>
              </motion.div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default CreateTrip;
