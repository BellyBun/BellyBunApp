import * as React from "react";
import { Card, Paragraph, Title } from "react-native-paper";

const PregnancyCard = ({ weekData, category }) => {
  const week = weekData.Week;
  let title, content;

  switch (category) {
    case "Bebis":
      title = weekData.RubrikBebis;
      content = weekData.Bebis;
      break;
    case "Mamma":
      title = weekData.RubrikMamma;
      content = weekData.Mamma;
      break;
    case "Partner":
      title = weekData.RubrikPartner;
      content = weekData.Partner;
      break;
    default:
      title = "Invalid Category";
      content = "Please provide a valid category";
  }

  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default PregnancyCard;
