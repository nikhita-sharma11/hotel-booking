import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (location.trim() === "") return;
    navigation.navigate("Home", { location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to IDBook Hotels</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the state"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Hotels</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#36498A",
    marginBottom: 20,
  },
  input: {
    width: width * 0.8,
    maxWidth: 400,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: width * 0.8,
    maxWidth: 400,
    backgroundColor: "#36498A",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
