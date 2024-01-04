import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";

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

  const radius = 90; // set the radius of the circle

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke-dashoffset based on the progress
  const strokeDashoffset = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        {progress.toFixed(2)}% av graviditeten är avklarad!
      </Text>
      <Svg height={2 * radius} width={2 * radius}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 30} // bredden på cirkeln
          fill="none"
          stroke="#735751"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90, 80, 80)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  progressText: {
    textAlign: "center",
    marginBottom: 10,
  },
});

export default PregnancyProgress;
