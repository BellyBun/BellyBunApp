import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { HomeStackParamList, RootTabParamList } from "../RootNavigator";
import InfoCard from "../components/InfoCard";
import PregnancyProgress from "../components/ProgressBar";
import theme from "../theme";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
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
