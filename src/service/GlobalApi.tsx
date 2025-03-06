import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

interface PlaceSearchData {
  textQuery: string;
}

export const GetPlaceDetails = (data: PlaceSearchData) =>
  axios.post(BASE_URL, data, config);

export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=500&maxWidthPx=500&key=" +
  process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;
