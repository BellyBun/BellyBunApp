import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { SettingsStackParamList } from "../RootNavigator";
import { useBaby } from "../context/babyContext";
import { useUser } from "../context/userContext";
import theme from "../theme";

type Props = NativeStackScreenProps<SettingsStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const [isFirstExpanded, setFirstExpanded] = useState(false);
  const [isSecondExpanded, setSecondExpanded] = useState(false);
  const { signout } = useUser();
  const { babies, setActiveBaby, shareFollowBaby } = useBaby();
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("hello world");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

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

      const clickedBaby = babies.find((baby) => baby._id === id);
      if (clickedBaby && clickedBaby.isActive) {
        try {
          // Use shareFollowBaby to get the babyId to share
          const babyCode = await shareFollowBaby(id);
          const babyIdText = `${babyCode}`;

          Alert.alert(
            "Dela kod",
            babyIdText,
            [
              {
                text: "Kopiera",
                onPress: async () => {
                  try {
                    await Clipboard.setStringAsync(babyIdText);
                    // Provide feedback or show the copied text
                    fetchCopiedText();
                  } catch (error) {
                    console.error("Error copying to clipboard:", error);
                  }
                },
              },
              { text: "OK" },
            ],
            { cancelable: true }
          );
        } catch (error) {
          console.error("Error sharing baby code:", error);
        }
      }
    } catch (error) {
      console.error("Error setting active baby:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.title}>
          MITT KONTO
        </Text>

        {/* Graviditeter Accordion */}
        <TouchableOpacity onPress={toggleFirstAccordion} activeOpacity={0.8}>
          <View style={styles.accordionTitleContainer}>
            <Text variant="headlineMedium" style={styles.listTitle}>
              GRAVIDITETER
            </Text>
          </View>
        </TouchableOpacity>
        {isFirstExpanded && babies.length > 0 && (
          <>
            <Text variant="titleLarge" style={styles.smallTitle}>
              VÄLJ BEBIS
            </Text>
            <View>
              {babies.map((baby) => (
                <View key={baby._id} style={styles.babyContainer}>
                  <Button
                    key={baby._id}
                    mode={baby.isActive ? "elevated" : "outlined"}
                  >
                    {baby.nickname}
                  </Button>
                  <TouchableOpacity onPress={() => handleBabyPress(baby._id)}>
                    <View style={styles.shareButtonContainer}>
                      <Ionicons
                        name="share-outline"
                        color={theme.colors.background}
                        size={24}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Inställningar Accordion */}
        <TouchableOpacity onPress={toggleSecondAccordion} activeOpacity={0.8}>
          <View style={styles.accordionTitleContainer}>
            <Text variant="headlineMedium" style={styles.listTitle}>
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
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    paddingTop: "20%",
    width: "100%",
  },

  title: {
    fontFamily: "Oswald",
    color: theme.colors.background,
  },
  smallTitle: {
    fontFamily: "Oswald",
    color: theme.colors.background,
  },
  accordionTitleContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  listTitle: {
    fontFamily: "Oswald",
    width: "100%",
    color: theme.colors.background,
  },
  listButton: {
    marginTop: 5,
    width: 150,
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    position: "absolute",
    bottom: 50,
  },
  shareButton: {
    color: theme.colors.background,
  },
  babyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    color: theme.colors.primary,
  },
  shareButtonContainer: {
    padding: 10,
    marginLeft: 10,
  },
});
