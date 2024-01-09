import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import theme from "../theme";

const PregnancyProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [daysPregnant, setDaysPregnant] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  const currentDate = new Date("2024-01-01");
  const estimatedDueDate = new Date("2024-06-26");

  useEffect(() => {
    const gestationalAgeInWeeks = Math.floor(
      Math.abs(
        (estimatedDueDate.getTime() - currentDate.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      )
    );

    const totalDaysPregnant = Math.floor(
      Math.abs(
        (estimatedDueDate.getTime() - currentDate.getTime()) /
          (24 * 60 * 60 * 1000)
      )
    );

    const remainingDays = Math.floor(
      Math.abs(
        (estimatedDueDate.getTime() - new Date().getTime()) /
          (24 * 60 * 60 * 1000)
      )
    );

    const totalWeeksOfPregnancy = 40;
    const calculatedProgress =
      (gestationalAgeInWeeks / totalWeeksOfPregnancy) * 100;

    const clampedProgress = Math.min(100, Math.max(0, calculatedProgress));

    setProgress(clampedProgress);
    setCurrentWeek(gestationalAgeInWeeks);
    setDaysPregnant(totalDaysPregnant);
    setDaysLeft(remainingDays);
  }, []);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height={2 * radius} width={2 * radius} style={{ marginTop: 140 }}>
        {/* Circle for remaining progress */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 30}
          fill="none"
          stroke={theme.colors.accent}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          transform="rotate(-90, 80, 80)"
        />

        {/* Circle for completed time */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 30}
          fill="none"
          stroke={theme.colors.background}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90, 80, 80)"
        />
      </Svg>
      <Text style={styles.progressText}>
        {progress.toFixed(2)} % {"\n"} av graviditeten är avklarad!
      </Text>

      {/* Three text blocks in a row */}
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>VECKA {currentWeek}</Text>
        <Text style={styles.middleRowText}>DAG {daysPregnant}</Text>
        <Text style={styles.rowText}>BF {daysLeft}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  progressText: {
    textAlign: "center",
    marginBottom: 10,
    color: theme.colors.background,
    fontFamily: "Oswald",
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  rowText: {
    fontFamily: "Oswald",
    color: theme.colors.background,
    fontSize: 18,
  },
  middleRowText: {
    fontFamily: "Oswald",
    color: theme.colors.background,
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default PregnancyProgress;
