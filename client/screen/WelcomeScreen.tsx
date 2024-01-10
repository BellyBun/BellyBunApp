import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { NotLoggedInStackParamList } from "../RootNavigator";
import theme from "../theme";
import { useUser } from "../context/userContext";

type Props = NativeStackScreenProps<NotLoggedInStackParamList, "Login">;

export default function WelcomeScreen({ navigation }: Props) {
  const { user } = useUser();

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.title}>
          Welcome {user.username}
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
