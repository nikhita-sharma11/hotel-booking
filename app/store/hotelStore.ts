import { create } from "zustand";
import axios from "axios";

interface Hotel {
  id: number;
  name: string;
  starting_room_price: number;
  rating: string;
  city_name: string;
  state: string;
  country: string;
  property_type: string;
  room_type: string;
  amenities: string[];
  thumbnail: string;
}

interface HotelStore {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    location: string;
    rating: number | null;
    priceRange: [number, number];
    propertyType: string;
    roomType: string;
    amenities: string[];
  };
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<HotelStore["filters"]>) => void;
  fetchHotels: (location: string) => Promise<void>; 
}

export const useHotelStore = create<HotelStore>((set) => ({
  hotels: [],
  loading: false,
  error: null,
  searchQuery: "",
  filters: {
    location: "",
    rating: null,
    priceRange: [0, 10000],
    propertyType: "",
    roomType: "",
    amenities: [],
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  fetchHotels: async (location) => { 
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `https://api.idbookhotels.com/api/v1/hotels/properties/?offset=0&limit=10&country=India&state=${location}`
      );
      set({ hotels: response.data.data || [] });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
