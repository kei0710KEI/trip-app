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

export const destinationData = [
  {
    id: 1,
    image: "/images/d1.jpg",
    city: "Tokyo",
    url: "https://www.google.com/maps/search/Tokyo"
  },
  {
    id: 2,
    image: "/images/d2.jpg",
    city: "Kyoto",
    url: "https://www.google.com/maps/search/Kyoto"
  },
  {
    id: 3,
    image: "/images/d3.jpg",
    city: "Osaka",
    url: "https://www.google.com/maps/search/Osaka"
  },
  {
    id: 4,
    image: "/images/d4.jpg",
    city: "Sapporo",
    url: "https://www.google.com/maps/search/Sapporo"
  },
  {
    id: 5,
    image: "/images/d5.jpg",
    city: "Fukuoka",
    url: "https://www.google.com/maps/search/Fukuoka"
  },
  {
    id: 6,
    image: "/images/d6.jpg",
    city: "Nagoya",
    url: "https://www.google.com/maps/search/Nagoya"
  },
  {
    id: 7,
    image: "/images/d7.jpg",
    city: "Okinawa",
    url: "https://www.google.com/maps/search/Okinawa"
  },
  {
    id: 8,
    image: "/images/d8.jpg",
    city: "Hiroshima",
    url: "https://www.google.com/maps/search/Hiroshima"
  },
  {
    id: 9,
    image: "/images/d9.jpg",
    city: "Yamanashi",
    url: "https://www.google.com/maps/search/Yamanashi"
  },
  
];

// prompt for Gemini AI
export const AI_PROMPT =
  "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";

