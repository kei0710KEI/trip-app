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


  export const JapaneseCities = [
    [
      { label: "Hokkaido (北海道)", value: "hokkaido" },
      { label: "Aomori (青森)", value: "aomori" },
      { label: "Iwate (岩手)", value: "iwate" },
      { label: "Miyagi (宮城)", value: "miyagi" },
      { label: "Akita (秋田)", value: "akita" },
      { label: "Yamagata (山形)", value: "yamagata" },
      { label: "Fukushima (福島)", value: "fukushima" },
      { label: "Ibaraki (茨城)", value: "ibaraki" },
      { label: "Tochigi (栃木)", value: "tochigi" },
      { label: "Gunma (群馬)", value: "gunma" },
      { label: "Saitama (埼玉)", value: "saitama" },
      { label: "Chiba (千葉)", value: "chiba" },
      { label: "Tokyo (東京)", value: "tokyo" },
      { label: "Kanagawa (神奈川)", value: "kanagawa" },
      { label: "Niigata (新潟)", value: "niigata" },
      { label: "Toyama (富山)", value: "toyama" },
      { label: "Ishikawa (石川)", value: "ishikawa" },
      { label: "Fukui (福井)", value: "fukui" },
      { label: "Yamanashi (山梨)", value: "yamanashi" },
      { label: "Nagano (長野)", value: "nagano" },
      { label: "Gifu (岐阜)", value: "gifu" },
      { label: "Shizuoka (静岡)", value: "shizuoka" },
      { label: "Aichi (愛知)", value: "aichi" },
      { label: "Mie (三重)", value: "mie" },
      { label: "Shiga (滋賀)", value: "shiga" },
      { label: "Kyoto (京都)", value: "kyoto" },
      { label: "Osaka (大阪)", value: "osaka" },
      { label: "Hyogo (兵庫)", value: "hyogo" },
      { label: "Nara (奈良)", value: "nara" },
      { label: "Wakayama (和歌山)", value: "wakayama" },
      { label: "Tottori (鳥取)", value: "tottori" },
      { label: "Shimane (島根)", value: "shimane" },
      { label: "Okayama (岡山)", value: "okayama" },
      { label: "Hiroshima (広島)", value: "hiroshima" },
      { label: "Yamaguchi (山口)", value: "yamaguchi" },
      { label: "Tokushima (徳島)", value: "tokushima" },
      { label: "Kagawa (香川)", value: "kagawa" },
      { label: "Ehime (愛媛)", value: "ehime" },
      { label: "Kochi (高知)", value: "kochi" },
      { label: "Fukuoka (福岡)", value: "fukuoka" },
      { label: "Saga (佐賀)", value: "saga" },
      { label: "Nagasaki (長崎)", value: "nagasaki" },
      { label: "Kumamoto (熊本)", value: "kumamoto" },
      { label: "Oita (大分)", value: "oita" },
      { label: "Miyazaki (宮崎)", value: "miyazaki" },
      { label: "Kagoshima (鹿児島)", value: "kagoshima" },
      { label: "Okinawa (沖縄)", value: "okinawa" },
      // Add more cities as needed
      
    ]    
  ];