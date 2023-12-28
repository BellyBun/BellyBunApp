import * as React from "react";
import { Button, Card, Text, useTheme } from "react-native-paper";
import weekData from "../data/weeks.json";

const InfoCard = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Bebis");
  const theme = useTheme();

  const renderContent = () => {
    const selectedData = weekData[0];

    switch (selectedCategory) {
      case "Bebis":
        return (
          <>
            <Text variant="titleLarge">{`Week ${selectedData.week}: ${selectedData.RubrikBebis}`}</Text>
            <Text variant="bodyMedium">{selectedData.Bebis}</Text>
          </>
        );
      case "Mamma":
        return (
          <>
            <Text variant="titleLarge">{selectedData.RubrikMamma}</Text>
            <Text variant="bodyMedium">{selectedData.Mamma}</Text>
          </>
        );
      case "Partner":
        return (
          <>
            <Text variant="titleLarge">{selectedData.RubrikPartner}</Text>
            <Text variant="bodyMedium">{selectedData.Partner}</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card style={{ width: "95%", backgroundColor: "#FAF8F4" }}>
      <Card.Actions style={{ display: "flex", justifyContent: "center" }}>
        <Button onPress={() => setSelectedCategory("Bebis")}>Bebis</Button>
        <Button onPress={() => setSelectedCategory("Mamma")}>Mamma</Button>
        <Button onPress={() => setSelectedCategory("Partner")}>Partner</Button>
      </Card.Actions>
      <Card.Content>{renderContent()}</Card.Content>

      <Card.Actions>
        <Button>Föregående</Button>
        <Button>Nästa</Button>
      </Card.Actions>
    </Card>
  );
};

export default InfoCard;
