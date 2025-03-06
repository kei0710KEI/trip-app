export interface Place {
    time: string;
    placeName: string;
    placeDetails: string;
    timeToTravel: string;
    ticketPricing: string;
  }
  
  export interface Hotel {
    hotelName: string;
    hotelAddress: string;
    price: string;
    rating: string;
  }
  
  export interface DayPlan {
    day: string;
    plan: Place[];
  }
  
  export interface TripData {
    userSelection: {
      location: {
        label: string;
        value: string;
      };
      noOfDays: number;
      budget: string;
      traveler: string;
    };
    tripData: {
      itinerary: DayPlan[];
      hotels: Hotel[];
    };
    userEmail: string;
    id: string;
  }