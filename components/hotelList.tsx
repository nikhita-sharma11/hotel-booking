import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { HotelCard } from "./hotelCard";
import { Picker } from "@react-native-picker/picker";

const HotelsList = ({ hotels }) => {
  const [filters, setFilters] = useState({
    location: "",
    rating: null,
    priceRange: { min: 0, max: 10000 },
    propertyType: "",
    roomType: "",
    amenities: [],
  });

  const [sortOption, setSortOption] = useState("price_low_to_high");

  const filteredHotels = hotels
    .filter(
      (hotel) =>
        !filters.location ||
        hotel.city_name.includes(filters.location) ||
        hotel.state.includes(filters.location) ||
        hotel.country.includes(filters.location)
    )
    .filter(
      (hotel) => !filters.rating || Number(hotel.rating) >= filters.rating
    )
    .filter(
      (hotel) =>
        hotel.starting_room_price >= filters.priceRange.min &&
        hotel.starting_room_price <= filters.priceRange.max
    )
    .filter(
      (hotel) =>
        !filters.propertyType || hotel.property_type === filters.propertyType
    )
    .filter(
      (hotel) => !filters.roomType || hotel.room_type === filters.roomType
    )
    .filter(
      (hotel) =>
        filters.amenities.length === 0 ||
        filters.amenities.every((a) =>
          hotel.amenity_details.some((amenity) => amenity.name === a)
        )
    );

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortOption) {
      case "price_low_to_high":
        return a.starting_room_price - b.starting_room_price;
      case "price_high_to_low":
        return b.starting_room_price - a.starting_room_price;
      case "rating_high_to_low":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter city, state, or country"
        style={styles.input}
        onChangeText={(text) => setFilters({ ...filters, location: text })}
      />

      <Picker
        selectedValue={filters.rating}
        onValueChange={(value) => setFilters({ ...filters, rating: value })}
      >
        <Picker.Item label="Any Rating" value={null} />
        <Picker.Item label="⭐ 3 & above" value={3} />
        <Picker.Item label="⭐ 4 & above" value={4} />
        <Picker.Item label="⭐ 5 only" value={5} />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={(value) => setSortOption(value)}
      >
        <Picker.Item label="Price: Low to High" value="price_low_to_high" />
        <Picker.Item label="Price: High to Low" value="price_high_to_low" />
        <Picker.Item label="Rating: High to Low" value="rating_high_to_low" />
      </Picker>

      <FlatList
        data={sortedHotels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HotelCard hotel={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default HotelsList;
