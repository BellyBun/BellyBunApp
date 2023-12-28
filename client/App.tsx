import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";
import RootNavigator from "./RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/userContext";

export default function App() {
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
