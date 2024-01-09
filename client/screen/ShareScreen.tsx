import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { RootTabParamList } from "../RootNavigator";
import theme from "../theme";

type Props = NativeStackScreenProps<RootTabParamList, "Share">;

export default function ShareScreen({ navigation }: Props) {
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.title}>
          Share baby here
        </Text>
      </View>
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
