import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import InfoCard from "../components/InfoCard";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="displayLarge" style={styles.title}>
          Home
        </Text>

        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("Signup")}>
          Signup
        </Button>
        <InfoCard />
      </ScrollView>
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
  },
  title: {
    fontFamily: "Oswald",
  },
  text: {
    fontFamily: "Overpass",
  },
});
