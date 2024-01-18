import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import getPregnancyData from "../components/CalculatePregnancy";
import weekData from "../data/weeks.json";
import theme from "../theme";

const InfoCard = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Bebis");
  const [showFullText, setShowFullText] = React.useState(false);
  const theme = useTheme();

  const { weekOfPregnancy } = getPregnancyData();
  const currentWeekIndex = weekOfPregnancy - 1;

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setSelectedCategory("Bebis");
      setShowFullText(false);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weekData.length - 1) {
      setSelectedCategory("Bebis");
      setShowFullText(false);
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

    const maxWords = 40;

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
      <View style={styles.topButtonsContainer}>
        <TouchableWithoutFeedback onPress={() => setSelectedCategory("Bebis")}>
          <Text
            style={[
              styles.buttonText,
              selectedCategory === "Bebis" && styles.activeButton,
            ]}
          >
            BEBIS
          </Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setSelectedCategory("Mamma")}>
          <Text
            style={[
              styles.buttonText,
              selectedCategory === "Mamma" && styles.activeButton,
            ]}
          >
            MAMMA
          </Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => setSelectedCategory("Partner")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === "Partner" && styles.activeButton,
            ]}
          >
            PARTNER
          </Text>
        </TouchableWithoutFeedback>
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
    width: "100%",
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "90%",
    marginBottom: 10,
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
  activeButton: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default InfoCard;
