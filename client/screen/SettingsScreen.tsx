import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SettingsStackParamList } from "../RootNavigator";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { useBaby } from "../context/babyContext";

type Props = NativeStackScreenProps<SettingsStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const theme = useTheme();
  const [isFirstExpanded, setFirstExpanded] = useState(false);
  const [isSecondExpanded, setSecondExpanded] = useState(false);
  const { signout } = useUser();
  const { babies, setActiveBaby } = useBaby();

  const toggleFirstAccordion = () => {
    setFirstExpanded(!isFirstExpanded);
  };

  const toggleSecondAccordion = () => {
    setSecondExpanded(!isSecondExpanded);
  };

  const handleBabyPress = async (id: string) => {
    try {
      await setActiveBaby(id);
      console.log(`Button for baby ${id} pressed`);
    } catch (error) {
      console.error("Error setting active baby:", error);
    }
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

        {isFirstExpanded && babies.length > 0 && (
          <>
            {babies.map((baby) => (
              <Button
                key={baby._id}
                mode={baby.isActive ? "elevated" : "outlined"}
                onPress={() => handleBabyPress(baby._id)}
                style={styles.listButton}
              >
                {baby.nickname}
              </Button>
            ))}
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
                signout();
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
          onPress={() => navigation.navigate("AddPregnancy")}
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
