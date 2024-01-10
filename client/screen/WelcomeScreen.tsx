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
        <Text variant="displayMedium" style={styles.title}>
          {user ? `Welcome ${user.username}` : "Welcome"}
        </Text>
        <Text style={styles.text}>Vad vill du göra?</Text>
        <Button
          style={styles.button}
          onPress={
            () => navigation.navigate("Settings", { screen: "AddPregnancy" }) // Varför error? hjälp!
          }
        >
          Ny graviditet
        </Button>

        <Button style={styles.button}>Följ graviditet</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.primary,
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
  },
});
