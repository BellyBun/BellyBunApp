import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { NotLoggedInStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";
import theme from "../theme";

type Props = NativeStackScreenProps<NotLoggedInStackParamList, "Login">;

export default function WelcomeScreen({ navigation }: Props) {
  const { user } = useAuth();

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text variant="displayMedium" style={styles.title}>
            {user ? `Välkommen ${user.username}` : "Välkommen"}
          </Text>
          <Text style={styles.text}>Vad vill du göra?</Text>
        </View>
        <View style={styles.bottomSection}>
          <Button
            style={styles.button}
            onPress={() => navigation.navigate("AddPregnancy")}
          >
            Ny graviditet
          </Button>

          <Button
            style={styles.button}
            onPress={() => navigation.navigate("FollowPregnancy")}
          >
            Följ graviditet
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  bottomSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  title: {
    fontFamily: "Oswald",
    color: theme.colors.background,
  },
  text: {
    fontFamily: "Overpass",
    fontSize: 20,
    color: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.background,
    width: 200,
    marginBottom: 10,
  },
});
