import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import InfoCard from "../components/InfoCard";
import PregnancyProgress from "../components/ProgressBar";

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
        <PregnancyProgress />

        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("Signup")}>
          Signup
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Settings")}
        >
          Settings
        </Button>
        <InfoCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    marginTop: -140, // TODO: Fixa så att det inte är hårdkodat
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
