import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useUser } from "../context/userContext";
import theme from "../theme";

export default function FollowPregnancyScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Följ graviditet
      </Text>
      <Text style={styles.text}>Ange kod/länk/mail</Text>
      <TextInput style={styles.input} editable={true} />

      <Button style={styles.button}>Följ graviditet</Button>
    </View>
  );
}

const styles = StyleSheet.create({
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
  input: {
    width: "60%",
    height: 40,
    borderRadius: 5,
    backgroundColor: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.background,
    width: 200,
  },
});
