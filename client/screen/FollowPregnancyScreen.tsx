import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useBaby } from "../context/babyContext";
import { useUser } from "../context/userContext";
import theme from "../theme";

export default function FollowPregnancyScreen() {
  const { user } = useUser();
  const { followBaby } = useBaby();
  const [followBabyCode, setFollowBabyCode] = React.useState("");

  const handleFollowBaby = async () => {
    try {
      // Call the followBaby function with the followBabyCode
      await followBaby(followBabyCode);
      // Optionally, you can navigate or perform other actions after successfully following the baby
    } catch (error) {
      console.error("Error following baby:", error);
      // Handle the error as needed
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Följ graviditet
      </Text>
      <Text style={styles.text}>Ange kod/länk/mail</Text>
      <TextInput
        style={styles.input}
        editable={true}
        onChangeText={(text) => setFollowBabyCode(text)}
      />

      <Button style={styles.button} onPress={handleFollowBaby}>
        Följ graviditet
      </Button>
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
