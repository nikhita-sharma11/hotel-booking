import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

interface Hotel {
  id: number;
  name: string;
  starting_room_price: number;
  rating: string;
  city_name: string;
  state: string;
  country: string;
  property_gallery: { image: string }[];
  amenity_details: { name: string }[];
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const navigation = useNavigation();

  const imageUrl = hotel.property_gallery?.[0]?.media;

  const amenities =
    hotel.amenity_details
      ?.flatMap((category) => category.hotel_amenity)
      ?.map((amenity) => amenity.title)
      ?.slice(0, 5)
      ?.join(", ") || "No amenities listed";
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("HotelDetails", { hotel })}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>No Image Available</Text>
      )}
      <Text style={styles.title}>{hotel.name}</Text>
      <Text style={styles.price}>Price: ₹{hotel.starting_room_price}</Text>
      <Text style={styles.rating}>⭐ {hotel.rating} / 5</Text>
      <Text style={styles.location}>
        📍 {hotel.city_name}, {hotel.state}, {hotel.country}
      </Text>
      <Text style={styles.amenities}>🏨 Amenities: {amenities}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  noImage: {
    textAlign: "center",
    fontStyle: "italic",
    color: "gray",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#28a745",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
  amenities: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});
