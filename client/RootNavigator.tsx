import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import SettingsScreen from "./screen/SettingsScreen";
import LoggedInScreen from "./screen/LoggedInScreen";
import UserInfoScreen from "./screen/UserInfoScreen";
import AddPregnancyScreen from "./screen/AddPregnancyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "./context/userContext";

export type NotLoggedInStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const NotLoggedInStack =
  createNativeStackNavigator<NotLoggedInStackParamList>();

function NotLoggedInStackScreen() {
  return (
    <NotLoggedInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NotLoggedInStack.Screen name="Login" component={LoginScreen} />
      <NotLoggedInStack.Screen name="Signup" component={SignupScreen} />
    </NotLoggedInStack.Navigator>
  );
}

export type LoggedInStackParamList = {
  LoggedIn: undefined;
  UserInfo: undefined;
  AddPregnancy: undefined;
};

const LoggedInStack = createNativeStackNavigator<LoggedInStackParamList>();

function LoggedInStackScreen() {
  return (
    <LoggedInStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoggedInStack.Screen name="LoggedIn" component={LoggedInScreen} />
      <LoggedInStack.Screen name="UserInfo" component={UserInfoScreen} />
      <LoggedInStack.Screen
        name="AddPregnancy"
        component={AddPregnancyScreen}
      />
    </LoggedInStack.Navigator>
  );
}

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  const { user } = useAuth();

  if (!user) {
    // User not logged in, render login/signup stack
    return <NotLoggedInStackScreen />;
  }

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
