import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPregnancyScreen from "./screen/AddPregnancyScreen";
import FollowPregnancyScreen from "./screen/FollowPregnancyScreen";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SettingsScreen from "./screen/SettingsScreen";
import SignupScreen from "./screen/SignupScreen";
import UserInfoScreen from "./screen/UserInfoScreen";
import WelcomeScreen from "./screen/WelcomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  UserInfo: undefined;
  AddPregnancy: undefined;
  FollowPregnancy: undefined;
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
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      <RootStack.Screen name="UserInfo" component={UserInfoScreen} />
      <RootStack.Screen name="AddPregnancy" component={AddPregnancyScreen} />
      <RootStack.Screen
        name="FollowPregnancy"
        component={FollowPregnancyScreen}
      />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}
