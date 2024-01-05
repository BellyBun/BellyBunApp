import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { RootTabParamList } from "../RootNavigator";
import { useState } from "react";
import { useAuth } from "../context/userContext";

type Props = NativeStackScreenProps<RootTabParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const theme = useTheme();
  const [isFirstExpanded, setFirstExpanded] = useState(false);
  const [isSecondExpanded, setSecondExpanded] = useState(false);
  const { signOut } = useAuth();

  const toggleFirstAccordion = () => {
    setFirstExpanded(!isFirstExpanded);
  };

  const toggleSecondAccordion = () => {
    setSecondExpanded(!isSecondExpanded);
  };

  return (
    <SafeAreaView
      style={[styles.safeContainer, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.container}>
        <Text
          variant="displayMedium"
          style={[styles.title, { color: theme.colors.background }]}
        >
          MITT KONTO
        </Text>

        {/* Graviditeter Accordion */}
        <TouchableOpacity onPress={toggleFirstAccordion} activeOpacity={0.8}>
          <View style={styles.accordionTitleContainer}>
            <Text
              variant="headlineMedium"
              style={[styles.listTitle, { color: theme.colors.background }]}
            >
              GRAVIDITETER
            </Text>
          </View>
        </TouchableOpacity>

        {isFirstExpanded && (
          <>
            <Button
              mode="elevated"
              onPress={() => console.log("Button 1 pressed")}
              style={styles.listButton}
            >
              Billie
            </Button>
            <Button
              mode="elevated"
              onPress={() => console.log("Button 2 pressed")}
              style={styles.listButton}
            >
              Hello
            </Button>
          </>
        )}

        {/* Inställningar Accordion */}
        <TouchableOpacity onPress={toggleSecondAccordion} activeOpacity={0.8}>
          <View style={styles.accordionTitleContainer}>
            <Text
              variant="headlineMedium"
              style={[styles.listTitle, { color: theme.colors.background }]}
            >
              INSTÄLLNINGAR
            </Text>
          </View>
        </TouchableOpacity>

        {isSecondExpanded && (
          <>
            <Button
              mode="text"
              onPress={() => {
                signOut;
              }}
              style={styles.listButton}
              textColor={theme.colors.background}
            >
              Logga ut
            </Button>
          </>
        )}

        <Button
          mode="text"
          textColor={theme.colors.background}
          style={styles.button}
          icon="plus"
        >
          Lägg till ny graviditet
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  title: {
    fontFamily: "Oswald",
  },
  accordionTitleContainer: {
    width: "100%",
    paddingVertical: 12,
  },
  listTitle: {
    fontFamily: "Oswald",
    width: "100%",
  },
  listButton: {
    marginTop: 5,
    width: 150,
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 60,
  },
});
