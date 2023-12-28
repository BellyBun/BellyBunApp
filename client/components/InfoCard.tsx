import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import weekData from "../data/weeks.json";

const InfoCard = () => {
  return (
    <Card style={{ width: "95%", backgroundColor: "#FAF8F4" }}>
      <Card.Content>
        <Text variant="titleLarge">{`Week ${weekData[0].week}: ${weekData[0].RubrikBebis}`}</Text>
        <Text variant="bodyMedium">{weekData[0].Bebis}</Text>
      </Card.Content>

      <Card.Content>
        <Text variant="titleLarge">{weekData[0].RubrikMamma}</Text>
        <Text variant="bodyMedium">{weekData[0].Mamma}</Text>
      </Card.Content>

      <Card.Content>
        <Text variant="titleLarge">{weekData[0].RubrikPartner}</Text>
        <Text variant="bodyMedium">{weekData[0].Partner}</Text>
      </Card.Content>

      <Card.Actions>
        <Button>Föregående</Button>
        <Button>Nästa</Button>
      </Card.Actions>
    </Card>
  );
};

export default InfoCard;
