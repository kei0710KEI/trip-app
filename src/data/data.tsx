export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

// Static Data
export const destinationData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    country: "France",
    travelers: "150,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74",
    country: "USA",
    travelers: "250,000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
    country: "Italy",
    travelers: "180,000",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    country: "Japan",
    travelers: "200,000",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8",
    country: "Australia",
    travelers: "120,000",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce",
    country: "Canada",
    travelers: "175,000",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    country: "Germany",
    travelers: "160,000",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    country: "Brazil",
    travelers: "140,000",
  },
];


// prompt for Gemini AI
export const AI_PROMPT =
  "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";

