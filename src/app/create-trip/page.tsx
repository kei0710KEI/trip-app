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
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import axios from "axios";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/lib/data";
import { chatSession } from "@/service/AIModal";
import { Coins } from "lucide-react";

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
      toast.error("トークンが不足しています");
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
      .replace("{totalDays}", formData.noOfDays?.toString() || "")
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

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v: GooglePlaceOption | null) => {
                if (v) {
                  setPlace(v);
                  handleInputChange("location", v);
                }
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning to travel there?
          </h2>
          <Input
            placeholder="Ex.3"
            type="number"
            min={1}
            onChange={(e) =>
              handleInputChange("noOfDays", parseInt(e.target.value, 10))
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer 
            rounded-lg hover:shadow-lg
            ${formData.budget === item.title && "shadow-lg border-black"}
            `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg
            hover:shadow-lg
            ${formData.traveler === item.people && "shadow-lg border-black"}
            `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={handleGenerateClick}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              Confirm Token Consumption
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consumed Tokens</span>
                    <span className="font-semibold text-lg">-10 tokens</span>
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
                <p className="text-sm text-gray-500">
                  ※ This operation will consume 10 tokens
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpenConfirmDialog(false);
                OnGenerateTrip();
              }}
              className="flex-1"
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={() => login()}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
