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
        style={[styles.container, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.title}>
          Vänligen logga in eller skapa konto {"\n"}för att börja följa
          graviditet
        </Text>
        <Button
          mode="elevated"
          onPress={() => navigation.navigate("Login")}
          labelStyle={[styles.button]}
          style={styles.buttonContainer}
        >
          Logga in
        </Button>
        <Button
          mode="elevated"
          onPress={() => navigation.navigate("Signup")}
          labelStyle={[styles.button]}
          style={styles.buttonContainer}
        >
          Skapa konto
        </Button>
      </View>
    );
  }

  console.log("User object:", user);

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text variant="displayMedium" style={styles.title}>
            Välkommen {user.email || "Guest"}!
          </Text>
        </>
      )}

      <Button
        mode="elevated"
        onPress={() => navigation.navigate("AddPregnancy")}
        labelStyle={[styles.button]}
        style={styles.buttonContainer}
      >
        Ny graviditet
      </Button>

      <Button
        mode="elevated"
        onPress={() => navigation.navigate("FollowPregnancy")}
        labelStyle={[styles.button]}
        style={styles.buttonContainer}
      >
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
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontFamily: "Oswald",
    color: theme.colors.background,
    textAlign: "center",
    marginBottom: 50,
    fontSize: 20,
  },
  text: {
    fontFamily: "Overpass",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "60%",
  },
  button: {
    color: theme.colors.primary,
  },
});
