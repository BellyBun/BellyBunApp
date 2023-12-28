import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const [isLoaded] = useFonts({
    Oswald: require("../assets/fonts/Oswald-Bold.ttf"),
    Overpass: require("../assets/fonts/Overpass-Light.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      onLayout={handleOnLayout}
    >
      <Text variant="displayLarge" style={styles.title}>
        Home
      </Text>
      <Text variant="displayMedium" style={styles.text}>
        Another text
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate("Signup")}>
        Signup
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Oswald",
  },
  text: {
    fontFamily: "Overpass",
  },
});
