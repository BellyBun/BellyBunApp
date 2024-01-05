import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { RootTabParamList } from "../RootNavigator";
import InfoCard from "../components/InfoCard";
import theme from "../theme";

type Props = NativeStackScreenProps<RootTabParamList, "Home">;

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
