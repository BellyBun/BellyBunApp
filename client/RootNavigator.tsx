import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import SettingsScreen from "./screen/SettingsScreen";
import LoggedInScreen from "./screen/LoggedInScreen";
import UserInfoScreen from "./screen/UserInfoScreen";
import AddPregnancyScreen from "./screen/AddPregnancyScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  LoggedIn: undefined;
  UserInfo: undefined;
  AddPregnancy: undefined;
  Settings: undefined;
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
      <RootStack.Screen name="LoggedIn" component={LoggedInScreen} />
      <RootStack.Screen name="UserInfo" component={UserInfoScreen} />
      <RootStack.Screen name="AddPregnancy" component={AddPregnancyScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}
