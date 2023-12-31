import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScreen";
import SettingsScreen from "./screen/SettingsScreen";
import AddPregnancyScreen from "./screen/AddPregnancyScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "./context/userContext";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "./screen/WelcomeScreen";
import ShareScreen from "./screen/ShareScreen";

export type NotLoggedInStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
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
      <NotLoggedInStack.Screen name="Welcome" component={WelcomeScreen} />
    </NotLoggedInStack.Navigator>
  );
}

export type SettingsStackParamList = {
  Settings: undefined;
  AddPregnancy: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="AddPregnancy"
        component={AddPregnancyScreen}
        options={{ headerShown: true }}
      />
    </SettingsStack.Navigator>
  );
}

export type HomeStackParamList = {
  Home: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

export type RootTabParamList = {
  Share: undefined;
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  const { user } = useAuth();

  if (!user) {
    return <NotLoggedInStackScreen />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Share"
        component={ShareScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="share-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#A36361",
  },
});
