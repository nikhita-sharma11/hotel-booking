import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
type Amenity = {
  id: number;
  title: string;
  hotel_amenity: {
    id: number;
    title: string;
    detail: { name: string; type: string; options: string[] }[];
  }[];
};

type Hotel = {
  id: number;
  name: string;
  image: { image: string }[];
  starting_room_price: number;
  rating: number;
  description?: string;
  amenity_details?: Amenity[];
};

type RootStackParamList = {
  HotelDetails: { hotel: Hotel };
};

type HotelDetailsRouteProp = RouteProp<RootStackParamList, "HotelDetails">;

const HotelDetailsScreen: React.FC = () => {
  const route = useRoute<HotelDetailsRouteProp>();
  const navigation = useNavigation();
  const { hotel } = route.params;
  const imageUrl = hotel.property_gallery?.[0]?.media;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.price}>₹{hotel.starting_room_price} / night</Text>
        <Text style={styles.rating}>⭐ {hotel.rating} / 5</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        {hotel.amenity_details?.map((category) => (
          <View key={category.id} style={styles.amenityCategory}>
            <Text style={styles.amenityCategoryTitle}>{category.title}</Text>
            {category.hotel_amenity.map((amenity) => (
              <Text key={amenity.id} style={styles.amenityItem}>
                • {amenity.title}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
  image: { width: "100%", height: 250 },
  infoContainer: { padding: 20 },
  name: { fontSize: 22, fontWeight: "bold", color: "#36498A" },
  price: { fontSize: 18, color: "#d4af37", marginTop: 5 },
  rating: { fontSize: 16, color: "#555", marginTop: 5 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#36498A",
    marginBottom: 5,
  },
  description: { fontSize: 16, color: "#666" },
  amenityCategory: { marginBottom: 15 },
  amenityCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d4af37",
    marginBottom: 5,
  },
  amenityItem: { fontSize: 16, color: "#444" },
  bookButton: {
    backgroundColor: "#d4af37",
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  bookText: { fontSize: 18, fontWeight: "bold", color: "white" },
});

export default HotelDetailsScreen;
