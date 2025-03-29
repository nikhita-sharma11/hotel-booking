import React, { useCallback, useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";
import { useHotelStore } from "@/app/store/hotelStore";
import debounce from "lodash.debounce";

const { width } = Dimensions.get("window");

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useHotelStore();
  const [localSearch, setLocalSearch] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 0),
    []
  );

  useEffect(() => {
    debouncedSearch(localSearch);
    return () => debouncedSearch.cancel();
  }, [localSearch]);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search hotels"
        placeholderTextColor="#A0A0A0"
        value={searchQuery}
        returnKeyType="search"
        onChangeText={setLocalSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  input: {
    height: 45,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderColor: "#36498A",
    backgroundColor: "#fff",
    width: width * 0.9,
    maxWidth: 400,
    fontSize: 16,
  },
});
