import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useHotelStore } from "../store/hotelStore";
import { SearchBar } from "../../components/searchBar";
import { HotelCard } from "../../components/hotelCard";
import FilterModal from "@/components/filterModal";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
export default function HomeScreen() {
  const route = useRoute();
  const userState = route.params?.location || "Delhi";

  const { hotels, loading, error, fetchHotels, searchQuery } = useHotelStore();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [filters, setFilters] = useState({
    rating: null,
    priceRange: [0, 10000],
  });
  const [sortOption, setSortOption] = useState(null);
  useEffect(() => {
    fetchHotels(userState);
  }, [userState]);

  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
    setFilterVisible(false);
  };

  const applySort = (option) => {
    setSortOption(option);
    setSortVisible(false);
  };
  const filteredHotels = hotels.filter((hotel) => {
    const hotelPrice = Number(hotel.starting_room_price) || 0;
    const minPrice = filters.priceRange?.[0] ?? 0;
    const maxPrice = filters.priceRange?.[1] ?? 10000;
    const matchesPrice = hotelPrice >= minPrice && hotelPrice <= maxPrice;
    const matchesRating = filters.rating
      ? Number(hotel.rating) >= filters.rating
      : true;

    return (
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      matchesPrice &&
      matchesRating
    );
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    const priceA = Number(a.starting_room_price) || 0;
    const priceB = Number(b.starting_room_price) || 0;
    const ratingA = Number(a.rating) || 0;
    const ratingB = Number(b.rating) || 0;

    if (sortOption === "price_low_high") return priceA - priceB;
    if (sortOption === "price_high_low") return priceB - priceA;
    if (sortOption === "rating_high_low") return ratingB - ratingA;

    return 0;
  });

  return (
    <View style={styles.container}>
      <SearchBar />

      {loading && <ActivityIndicator size="large" color="#d4af37" />}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      <FlatList
        initialNumToRender={5}
        data={sortedHotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HotelCard hotel={item} />}
      />
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterVisible(true)}
      >
        <Ionicons name="filter" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortVisible(true)}
      >
        <Ionicons name="swap-vertical" size={24} color="white" />
      </TouchableOpacity>
      {filterVisible && (
        <FilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          applyFilters={applyFilters}
        />
      )}
      <Modal transparent={true} animationType="slide" visible={sortVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort By</Text>

            <TouchableOpacity
              style={[
                styles.sortOption,
                sortOption === "price_low_high" && styles.selectedOption,
              ]}
              onPress={() => applySort("price_low_high")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortOption === "price_low_high" && styles.selectedText,
                ]}
              >
                Price: Low to High
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortOption,
                sortOption === "price_high_low" && styles.selectedOption,
              ]}
              onPress={() => applySort("price_high_low")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortOption === "price_high_low" && styles.selectedText,
                ]}
              >
                Price: High to Low
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortOption,
                sortOption === "rating_high_low" && styles.selectedOption,
              ]}
              onPress={() => applySort("rating_high_low")}
            >
              <Text
                style={[
                  styles.optionText,
                  sortOption === "rating_high_low" && styles.selectedText,
                ]}
              >
                Rating: High to Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSortVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  filterButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#36498A",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#36498A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  sortButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#d4af37",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#d4af37",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#36498A",
  },
  sortOption: {
    padding: 12,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#36498A",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#36498A",
  },
  optionText: {
    fontSize: 16,
    color: "#36498A",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#d4af37",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#d4af37",
  },
});
