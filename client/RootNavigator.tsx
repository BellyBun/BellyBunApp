import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
    </RootStack.Navigator>
  );
}
