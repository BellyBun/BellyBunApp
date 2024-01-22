import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { useUser } from "./context/userContext";
import AddPregnancyScreen from "./screen/AddPregnancyScreen";
import FollowPregnancyScreen from "./screen/FollowPregnancyScreen";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SettingsScreen from "./screen/SettingsScreen";
import SignupScreen from "./screen/SignupScreen";
import WelcomeScreen from "./screen/WelcomeScreen";
import ShareScreen from "./screen/ShareScreen";

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

export type WelcomeStackParamList = {
  WelcomeStack: undefined;
};

export type ShareStackParamList = {
  Share: undefined;
};

const ShareStack = createNativeStackNavigator<ShareStackParamList>();

function ShareStackScreen() {
  return (
    <ShareStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ShareStack.Screen name="Share" component={ShareScreen} />
    </ShareStack.Navigator>
  );
}

const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();

//Let this be: it will be used with conditional rendering later
function WelcomeStackScreen() {
  const { user } = useUser();

  return (
    <WelcomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <WelcomeStack.Screen name="WelcomeStack" component={WelcomeScreen} />
    </WelcomeStack.Navigator>
  );
}

export type SettingsStackParamList = {
  Settings: undefined;
  AddPregnancy: undefined;
  FollowPregnancy: undefined;
};

const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen
        name="AddPregnancy"
        component={AddPregnancyScreen}
      />
      <SettingsStack.Screen
        name="FollowPregnancy"
        component={FollowPregnancyScreen}
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
  ShareStack: undefined;
  HomeStack: undefined;
  SettingsStack: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  const { user } = useUser();

  if (!user) {
    return <NotLoggedInStackScreen />;
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="ShareStack"
        component={ShareStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="share-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsStack"
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
