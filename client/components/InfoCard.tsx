import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import weekData from "../data/weeks.json";

const InfoCard = () => {
  return (
    <Card style={{ width: "95%" }}>
      <Card.Content>
        <Text variant="titleLarge">{`Week ${weekData.week}: ${weekData.RubrikBebis}`}</Text>
        <Text variant="bodyMedium">{weekData.Bebis}</Text>
      </Card.Content>

      <Card.Content>
        <Text variant="titleLarge">{weekData.RubrikMamma}</Text>
        <Text variant="bodyMedium">{weekData.Mamma}</Text>
      </Card.Content>

      <Card.Content>
        <Text variant="titleLarge">{weekData.RubrikPartner}</Text>
        <Text variant="bodyMedium">{weekData.Partner}</Text>
      </Card.Content>

      <Card.Actions>
        <Button>Föregående</Button>
        <Button>Nästa</Button>
      </Card.Actions>
    </Card>
  );
};

export default InfoCard;
