import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import InfoCard from "../components/InfoCard";
import PregnancyProgress from "../components/ProgressBar";
import theme from "../theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <PregnancyProgress />
        <InfoCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    gap: 50,
    paddingBottom: 20,
    backgroundColor: theme.colors.background,
  },
});
