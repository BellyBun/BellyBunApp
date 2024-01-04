import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import weekData from "../data/weeks.json";
import theme from "../theme";

const InfoCard = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Bebis");
  const [currentWeekIndex, setCurrentWeekIndex] = React.useState(0);
  const [showFullText, setShowFullText] = React.useState(false);
  const theme = useTheme();

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weekData.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const handleToggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  const renderContent = () => {
    const selectedData = weekData[currentWeekIndex];

    const getText = (category) => {
      switch (category) {
        case "Bebis":
          return selectedData.Bebis;
        case "Mamma":
          return selectedData.Mamma;
        case "Partner":
          return selectedData.Partner;
        default:
          return null;
      }
    };

    const text = getText(selectedCategory);

    if (!text) {
      return null;
    }

    const maxWords = 40; // Antal ord som visas innan "Läs mer"

    const words = text.split(" ");
    const truncatedText = words.slice(0, maxWords).join(" ");

    return (
      <>
        <Text variant="titleLarge" style={styles.title}>
          {selectedData[`Rubrik${selectedCategory}`]}
        </Text>
        <Text variant="bodyMedium" style={styles.text}>
          {showFullText ? text : truncatedText}
          {!showFullText && words.length > maxWords && (
            <Text
              style={{ color: theme.colors.primary }}
              onPress={handleToggleReadMore}
            >
              {" Läs mer"}
            </Text>
          )}
          {showFullText && (
            <Text
              style={{ color: theme.colors.primary }}
              onPress={handleToggleReadMore}
            >
              {" Visa mindre"}
            </Text>
          )}
        </Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredButtonsContainer}>
        <Button
          mode="text"
          onPress={() => setSelectedCategory("Bebis")}
          labelStyle={[
            styles.buttonText,
            selectedCategory === "Bebis" && {
              color: theme.colors.primary,
            },
          ]}
        >
          BEBIS
        </Button>
        <Button
          mode="text"
          onPress={() => setSelectedCategory("Mamma")}
          labelStyle={[
            styles.buttonText,
            selectedCategory === "Mamma" && {
              color: theme.colors.primary,
            },
          ]}
        >
          MAMMA
        </Button>
        <Button
          mode="text"
          onPress={() => setSelectedCategory("Partner")}
          labelStyle={[
            styles.buttonText,
            selectedCategory === "Partner" && {
              color: theme.colors.primary,
            },
          ]}
        >
          PARTNER
        </Button>
      </View>

      <Card style={{ width: "95%", backgroundColor: "#FAF8F4" }}>
        <Card.Content>{renderContent()}</Card.Content>

        <Card.Actions>
          <View style={styles.bottomButtonsContainer}>
            <Button onPress={handlePreviousWeek}>Föregående</Button>
            <Button onPress={handleNextWeek}>Nästa</Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontFamily: "Oswald",
    color: theme.colors.accent,
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    fontFamily: "Overpass",
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: "Oswald",
    color: theme.colors.accent,
    fontSize: 17,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default InfoCard;
