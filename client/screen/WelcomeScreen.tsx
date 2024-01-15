import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { NotLoggedInStackParamList } from "../RootNavigator";
import { useUser } from "../context/userContext";
import theme from "../theme";

type Props = NativeStackScreenProps<NotLoggedInStackParamList, "Login">;

export default function WelcomeScreen({ navigation }: Props) {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        {user ? `Välkommen ${user.username}` : "Välkommen"}
      </Text>
      <Text style={styles.text}>Vad vill du göra?</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: theme.colors.primary,
  },

  title: {
    fontFamily: "Oswald",
    color: theme.colors.background,
    marginBottom: 10,
  },
  text: {
    fontFamily: "Overpass",
    fontSize: 20,
    color: theme.colors.background,
    marginBottom: 10,
  },
  button: {
    backgroundColor: theme.colors.background,
    width: 200,
    marginBottom: 10,
  },
});
