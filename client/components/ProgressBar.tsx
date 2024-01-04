import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Circle, G, Svg } from "react-native-svg";

const CircularProgressBar = ({ radius, progress, progressBarStyles }) => {
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (progress / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  return (
    <Svg height={radius * 2} width={radius * 2}>
      <G rotation="-90" origin={`${radius},${radius}`}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 5} // Adjust the radius and stroke width as needed
          stroke={progressBarStyles.stroke.color}
          strokeWidth={progressBarStyles.stroke.width}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap={progressBarStyles.stroke.lineCap}
          fill="transparent"
        />
      </G>
    </Svg>
  );
};

const PregnancyProgress = () => {
  const [progress, setProgress] = useState(0);

  const currentDate = new Date("2024-01-01");
  const estimatedDueDate = new Date("2024-06-26");

  useEffect(() => {
    const gestationalAgeInWeeks = Math.floor(
      (currentDate.getTime() - estimatedDueDate.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );

    const totalWeeksOfPregnancy = 40;

    const calculatedProgress =
      (gestationalAgeInWeeks / totalWeeksOfPregnancy) * 100;

    const clampedProgress = Math.min(100, Math.max(0, calculatedProgress));

    setProgress(clampedProgress);
  }, []);

  const progressBarStyles = StyleSheet.create({
    stroke: {
      color: "#735751",
      width: 10,
      lineCap: "round",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Pregnancy Progress: {progress.toFixed(2)}%
      </Text>
      <CircularProgressBar
        radius={50}
        progress={progress}
        progressBarStyles={progressBarStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  progressText: {
    textAlign: "center",
    marginBottom: 10,
  },
});

export default PregnancyProgress;
