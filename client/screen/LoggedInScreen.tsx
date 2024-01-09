import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  const { user } = useAuth(); // Access user information from context

  // Render loading state while user data is being fetched
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

  // Render home screen with user data
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {user && (
        <>
          <Text variant="displayLarge" style={styles.title}>
            Welcome, {user.email || "Guest"}!
          </Text>
          <Text style={styles.text}>User ID: {user.id}</Text>
          <Text style={styles.text}>User Name: {user.name}</Text>
          <Text style={styles.text}>
            Due Date: {user.dueDate?.toLocaleDateString() || "Not available"}
          </Text>
        </>
      )}
      <Button mode="elevated" onPress={() => navigation.navigate("UserInfo")}>
        AddUserInfo
      </Button>

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
  },
  title: {
    fontFamily: "Oswald",
  },
  text: {
    fontFamily: "Overpass",
  },
});
