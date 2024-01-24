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
  const [currentWeek, setCurrentWeek] = useState(pregnancyData?.weekOfPregnancy || 1);
  const [showFullText, setShowFullText] = React.useState(false);
  const [selectedData, setSelectedData] = useState(weekData[currentWeek - 1]);

  console.log("Pregnancy Data:", pregnancyData);

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
      setCurrentWeek(prevWeek => prevWeek - 1);
      setSelectedCategory("Bebis");
      setSelectedData(weekData[currentWeek - 2]);
    }
  };
  
  const handleNextWeek = () => {
    if (currentWeek < weekData.length) {
      setCurrentWeek(prevWeek => prevWeek + 1);
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

    const maxWords = 40;

    const words = text.split(" ");
    const truncatedText = words.slice(0, maxWords).join(" ");

    return (
      <>
        <Text variant="titleLarge" style={styles.title}>
          {selectedData && selectedData[`Rubrik${selectedCategory}`]}
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
            <Text>{`Vecka ${selectedData ? selectedData.week : ""}`}</Text>
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
