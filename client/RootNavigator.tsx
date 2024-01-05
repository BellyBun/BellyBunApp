import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPregnancyScreen from "./screen/AddPregnancyScreen";
import ChooseRoleScreen from "./screen/ChooseRoleScreen";
import EnterUserNameScreen from "./screen/EnterUserNameScreen";
import HomeScreen from "./screen/HomeScreen";
import LoggedInScreen from "./screen/LoggedInScreen";
import LoginScreen from "./screen/LoginScreen";
import SettingsScreen from "./screen/SettingsScreen";
import SignupScreen from "./screen/SignupScreen";
import UserInfoScreen from "./screen/UserInfoScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  LoggedIn: undefined;
  UserInfo: undefined;
  AddPregnancy: undefined;
  Settings: undefined;
  Username: undefined;
  Role: undefined;
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
      <RootStack.Screen name="Username" component={EnterUserNameScreen} />
      <RootStack.Screen name="Role" component={ChooseRoleScreen} />
    </RootStack.Navigator>
  );
}
