import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { HomeStackParamList } from "../RootNavigator";
import InfoCard from "../components/InfoCard";
import PregnancyProgress from "../components/ProgressBar";
import theme from "../theme";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
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
  title: {
    fontFamily: "Oswald",
  },
  text: {
    fontFamily: "Overpass",
  },
});
