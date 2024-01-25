import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import weekData from "../data/weeks.json";
import theme from "../theme";
import { useBaby } from "../context/babyContext";
import { useEffect, useState } from "react";

const InfoCard = () => {
  const theme = useTheme();
  const { pregnancyData } = useBaby();
  const [selectedCategory, setSelectedCategory] = React.useState("Bebis");
  const [currentWeek, setCurrentWeek] = useState(
    pregnancyData?.weekOfPregnancy || 1
  );
  const [showFullText, setShowFullText] = React.useState(false);
  const [selectedData, setSelectedData] = useState(weekData[currentWeek - 1]);

  useEffect(() => {
    // Update the currentWeek and selectedData when pregnancyData changes
    if (pregnancyData) {
      const { weekOfPregnancy } = pregnancyData;
      setCurrentWeek(weekOfPregnancy || 1);
      setSelectedData(weekData[weekOfPregnancy - 1]);
    }
  }, [pregnancyData]);

  // Check if pregnancyData is null or undefined
  if (!pregnancyData) {
    return <Text>Loading...</Text>; // Display a loading state
  }

  const { weekOfPregnancy } = pregnancyData;

  // Check if weekOfPregnancy is null or undefined
  if (!weekOfPregnancy) {
    return <Text>No pregnancy data available.</Text>;
  }

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek((prevWeek) => prevWeek - 1);
      setSelectedCategory("Bebis");
      setSelectedData(weekData[currentWeek - 2]);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < weekData.length) {
      setCurrentWeek((prevWeek) => prevWeek + 1);
      setSelectedCategory("Bebis");
      setSelectedData(weekData[currentWeek]);
    }
  };

  const handleToggleReadMore = () => {
    setShowFullText(!showFullText);
  };

  const renderContent = () => {
    if (!selectedData) {
      return null;
    }

    const getText = (category) => {
      if (!selectedData[category]) {
        return null;
      }

      return selectedData[category];
    };

    const text = getText(selectedCategory);

    if (!text) {
      return null;
    }

    const maxWords = 60;

    const words = text.split(" ");
    const truncatedText = words.slice(0, maxWords).join(" ");

    return (
      <>
        <Text variant="titleLarge" style={styles.title}>
          {selectedData && selectedData[`Rubrik${selectedCategory}`]}
        </Text>
        <Text style={styles.weekText}>{`Vecka ${
          selectedData ? selectedData.week : ""
        }`}</Text>
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

      <Card style={styles.card}>
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
  card: {
    maxWidth: "100%",
    backgroundColor: theme.colors.background,
    marginHorizontal: 15,
  },
  topButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 15,
    textAlign: "center",
  },

  title: {
    fontFamily: "Oswald",
    color: theme.colors.accent,
    marginTop: 15,
  },
  text: {
    fontFamily: "Overpass",
    marginVertical: 10,
  },
  weekText: {
    fontFamily: "Overpass",
    color: theme.colors.accent,
  },
  buttonText: {
    fontFamily: "Oswald",
    color: theme.colors.accent,
    fontSize: 17,
    textAlign: "center",
  },
  activeButton: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

export default InfoCard;
