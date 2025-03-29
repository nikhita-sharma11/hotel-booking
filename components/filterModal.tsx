import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

export default function FilterModal({ visible, onClose, applyFilters }) {
  const [filters, setFilters] = useState({
    location: "",
    rating: "any",
    priceRange: [0, 10000],
    propertyType: "",
    roomType: "",
  });

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Hotels</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#36498A" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <Text style={styles.label}>Rating:</Text>
            <Picker
              selectedValue={filters.rating ?? "any"}
              style={styles.picker}
              dropdownIconColor="#36498A"
              onValueChange={(value) => {
                if (value === "any") {
                  setFilters({ ...filters, rating: null });
                } else {
                  setFilters({ ...filters, rating: value });
                }
              }}
            >
              <Picker.Item label="Any" value="any" /> // ✅ Use "any" instead of
              undefined
              <Picker.Item label="⭐ 3 & above" value={3} />
              <Picker.Item label="⭐ 4 & above" value={4} />
              <Picker.Item label="⭐ 5 only" value={5} />
            </Picker>

            <Text style={styles.label}>Price Range:</Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Min ₹"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setFilters({
                    ...filters,
                    priceRange: [parseInt(text) || 0, filters.priceRange[1]],
                  })
                }
              />
              <Text style={styles.dash}>-</Text>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Max ₹"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                onChangeText={(text) =>
                  setFilters({
                    ...filters,
                    priceRange: [
                      filters.priceRange[0],
                      parseInt(text) || 10000,
                    ],
                  })
                }
              />
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => applyFilters(filters)}
            >
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#36498A",
  },
  label: {
    color: "#36498A",
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#36498A",
    padding: 10,
    borderRadius: 8,
    color: "#36498A",
    backgroundColor: "#f7f7f7",
  },
  picker: {
    color: "#36498A",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    borderColor: "#36498A",
    borderWidth: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dash: {
    color: "#36498A",
    fontSize: 20,
    marginHorizontal: 10,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: "#36498A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
