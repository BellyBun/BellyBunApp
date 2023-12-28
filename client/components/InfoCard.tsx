import { useFonts } from "expo-font";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import weekData from "../data/weeks.json";
import theme from "../theme";

const InfoCard = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Bebis");
  const theme = useTheme();
  const [isLoaded] = useFonts({
    Oswald: require("../assets/fonts/Oswald-Bold.ttf"),
    Overpass: require("../assets/fonts/Overpass-Light.ttf"),
  });

  const renderContent = () => {
    const selectedData = weekData[0];

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
      <Card.Actions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          mode="text"
          onPress={() => setSelectedCategory("Bebis")}
          labelStyle={styles.buttonText}
        >
          BEBIS
        </Button>
        <Button
          mode="text"
          onPress={() => setSelectedCategory("Mamma")}
          labelStyle={styles.buttonText}
        >
          MAMMA
        </Button>
        <Button
          mode="text"
          onPress={() => setSelectedCategory("Partner")}
          labelStyle={styles.buttonText}
        >
          PARTNER
        </Button>
      </Card.Actions>
      <Card.Content>{renderContent()}</Card.Content>

      <Card.Actions>
        <Button>Föregående</Button>
        <Button>Nästa</Button>
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
});

export default InfoCard;
