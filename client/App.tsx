import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";
import RootNavigator from "./RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/userContext";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    Overpass: require("./assets/fonts/Overpass-Light.ttf"),
    Oswald: require("./assets/fonts/Oswald-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <PaperProvider theme={theme}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
