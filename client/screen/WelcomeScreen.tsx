import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";
import theme from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const { user } = useAuth(); // Hämtar användare

  if (user === null) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log("User object:", user);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      {user && (
        <>
          <Text variant="displayMedium" style={styles.title}>
            Välkommen, {user.email || "Guest"}!
          </Text>
        </>
      )}

      <Button mode="elevated" onPress={() => navigation.navigate("UserInfo")}>
        Ny graviditet
      </Button>

      <Button mode="elevated" onPress={() => navigation.navigate("Home")}>
        Följ graviditet
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
    color: theme.colors.background,
  },
  text: {
    fontFamily: "Overpass",
  },
});
