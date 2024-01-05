import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";

type Props = NativeStackScreenProps<RootStackParamList, "Role">;

export default function ChooseRoleScreen({ navigation }: Props) {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={{ color: theme.colors.background }}>
        Välkommen {user.userName}
      </Text>
      <Text variant="titleMedium" style={{ color: theme.colors.background }}>
        Vad heter du?
      </Text>

      <Button mode="elevated" onPress={() => navigation.navigate("Home")}>
        Go to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  input: {
    width: "60%",
    borderRadius: 100,
  },
});
