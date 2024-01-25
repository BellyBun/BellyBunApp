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
  const [isThirdExpanded, setThirdExpanded] = useState(false);
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
  const toggleThirdAccordion = () => {
    Alert.alert(
      "Logga ut",
      "Är du säker på att du vill logga ut?",
      [
        {
          text: "Avbryt",
          style: "cancel",
        },
        {
          text: "Ja",
          onPress: () => {
            signout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBabyPress = async (id: string) => {
    try {
      await setActiveBaby(id);
      console.log("Updated Babies:", babies);
      console.log(`Button for baby ${id} pressed`);

      const clickedBaby = babies.find((baby) => baby._id === id);
      if (clickedBaby && clickedBaby.isActive) {
        try {
          const babyCode = await shareFollowBaby(clickedBaby._id);
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
            <View style={styles.accordionContent}>
              {babies.map((baby) => (
                <View
                  key={baby._id}
                  style={[styles.babyContainer, { marginBottom: 15 }]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderColor: theme.colors.background,
                      borderWidth: 1,
                      borderRadius: 30,
                      overflow: "hidden",
                      width: "60%",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      key={baby._id}
                      //mode={baby.isActive ? "elevated" : "outlined"}
                      style={{
                        borderColor: theme.colors.primary,

                        backgroundColor: baby.isActive
                          ? theme.colors.primary
                          : theme.colors.primary,
                      }}
                      labelStyle={{
                        color: baby.isActive
                          ? theme.colors.background
                          : theme.colors.background,
                        fontFamily: "Oswald",
                        fontSize: 18,
                        marginLeft: 20,

                        textTransform: "uppercase",
                        textDecorationLine: baby.isActive
                          ? "underline"
                          : "none",
                      }}
                      onPress={() => handleBabyPress(baby._id)}
                    >
                      {baby.nickname}
                    </Button>
                    <TouchableOpacity
                      onPress={() => handleBabyPress(baby._id)}
                      style={{
                        padding: 10,
                        marginLeft: 10,
                        backgroundColor: theme.colors.primary,
                      }}
                    >
                      <Ionicons
                        name="share-outline"
                        color={theme.colors.background}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
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
              style={styles.signOutButton}
              textColor={theme.colors.background}
            >
              Ändra
            </Button>
          </>
        )}
        {/* Logga ut Accordion */}
        <TouchableOpacity onPress={toggleThirdAccordion} activeOpacity={0.8}>
          <View style={styles.accordionTitleContainer}>
            <Text variant="headlineMedium" style={styles.listTitle}>
              LOGGA UT
            </Text>
          </View>
        </TouchableOpacity>

        {isThirdExpanded && (
          <>
            <Button
              mode="text"
              onPress={() => {
                signout();
              }}
              style={styles.signOutButton}
              textColor={theme.colors.background}
            >
              Logga ut
            </Button>
          </>
        )}

        <Button
          mode="text"
          textColor={theme.colors.background}
          style={styles.addPregnancybutton}
          onPress={() => navigation.navigate("AddPregnancy")}
          icon="plus"
          labelStyle={{
            fontFamily: "Oswald",
            fontSize: 15,
            textTransform: "uppercase",
          }}
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
    textDecorationLine: "underline",
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
  accordionContent: {
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: theme.colors.primary, //ta bort färg när klar
  },
  signOutButton: {
    marginTop: 5,
    width: 150,
  },
  addPregnancybutton: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    position: "absolute",
    bottom: 50,
  },
});
