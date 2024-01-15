import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";
import RootNavigator from "./RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./context/userContext";
import { BabyProvider } from "./context/babyContext";
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
        <UserProvider>
          <BabyProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </BabyProvider>
        </UserProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
