import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./homeScreen";
import HotelDetailsScreen from "@/components/hotelDetailScreen";
import WelcomeScreen from "./welcomeScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="HotelDetails" component={HotelDetailsScreen} />
    </Stack.Navigator>
  );
}
