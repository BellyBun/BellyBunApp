import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
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
});
