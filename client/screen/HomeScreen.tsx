import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { HomeStackParamList } from "../RootNavigator";
import InfoCard from "../components/InfoCard";
import PregnancyProgress from "../components/ProgressBar";
import theme from "../theme";

type Props = NativeStackScreenProps<HomeStackParamList, "HomeStack">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
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
