import { useFonts } from "expo-font";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import weekData from "../data/weeks.json";
import theme from "../theme";

const InfoCard = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Bebis");
  const [currentWeekIndex, setCurrentWeekIndex] = React.useState(0);
  const theme = useTheme();
  const [isLoaded] = useFonts({
    Oswald: require("../assets/fonts/Oswald-Bold.ttf"),
    Overpass: require("../assets/fonts/Overpass-Light.ttf"),
  });
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

  const renderContent = () => {
    const selectedData = weekData[currentWeekIndex];

    switch (selectedCategory) {
      case "Bebis":
        return (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {selectedData.RubrikBebis}
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {selectedData.Bebis}
            </Text>
          </>
        );
      case "Mamma":
        return (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {selectedData.RubrikMamma}
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {selectedData.Mamma}
            </Text>
          </>
        );
      case "Partner":
        return (
          <>
            <Text variant="titleLarge" style={styles.title}>
              {selectedData.RubrikPartner}
            </Text>
            <Text variant="bodyMedium" style={styles.text}>
              {selectedData.Partner}
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card style={{ width: "95%", backgroundColor: "#FAF8F4" }}>
      <View style={styles.centeredButtonsContainer}>
        <Card.Actions>
          <Button
            mode="text"
            onPress={() => setSelectedCategory("Bebis")}
            labelStyle={[
              styles.buttonText,
              selectedCategory === "Bebis" && { color: theme.colors.primary },
            ]}
          >
            BEBIS
          </Button>
          <Button
            mode="text"
            onPress={() => setSelectedCategory("Mamma")}
            labelStyle={[
              styles.buttonText,
              selectedCategory === "Mamma" && { color: theme.colors.primary }, // Set color for selected category
            ]}
          >
            MAMMA
          </Button>
          <Button
            mode="text"
            onPress={() => setSelectedCategory("Partner")}
            labelStyle={[
              styles.buttonText,
              selectedCategory === "Partner" && { color: theme.colors.primary }, // Set color for selected category
            ]}
          >
            PARTNER
          </Button>
        </Card.Actions>
      </View>
      <Card.Content>{renderContent()}</Card.Content>

      <Card.Actions>
        <View style={styles.bottomButtonsContainer}>
          <Button onPress={handlePreviousWeek}>Föregående</Button>
          <Button onPress={handleNextWeek}>Nästa</Button>
        </View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
