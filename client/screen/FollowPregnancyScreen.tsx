import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { HomeStackParamList } from "../RootNavigator";
import { useBaby } from "../context/babyContext";
import { useUser } from "../context/userContext";
import theme from "../theme";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function FollowPregnancyScreen({ navigation }: Props) {
  const { user } = useUser();
  const { followBaby } = useBaby();
  const [followBabyCode, setFollowBabyCode] = React.useState("");

  const handleFollowBaby = async () => {
    try {
      await followBaby(followBabyCode);
      navigation.navigate("Home", undefined);
    } catch (error) {
      console.error("Error following baby:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Följ graviditet
      </Text>
      <Text style={styles.text}>Ange kod</Text>
      <TextInput
        style={styles.input}
        editable={true}
        onChangeText={(text) => setFollowBabyCode(text)}
        onSubmitEditing={handleFollowBaby}
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
