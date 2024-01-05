import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import theme from "../theme";

const PregnancyProgress = () => {
  const [progress, setProgress] = useState(0);

  const currentDate = new Date("2024-01-01");
  const estimatedDueDate = new Date("2024-06-26");

  useEffect(() => {
    const gestationalAgeInWeeks = Math.floor(
      Math.abs(
        (estimatedDueDate.getTime() - currentDate.getTime()) /
          (7 * 24 * 60 * 60 * 1000)
      )
    );

    const totalWeeksOfPregnancy = 40;
    const calculatedProgress =
      (gestationalAgeInWeeks / totalWeeksOfPregnancy) * 100;

    const clampedProgress = Math.min(100, Math.max(0, calculatedProgress));

    setProgress(clampedProgress);
  }, []);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height={2 * radius} width={2 * radius} style={{ marginTop: 60 }}>
        {/* Circle for completed progress */}
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

        {/* Cirkel för avklarad tid */}
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
        {progress.toFixed(2)}% av graviditeten är avklarad!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
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
  },
});

export default PregnancyProgress;
