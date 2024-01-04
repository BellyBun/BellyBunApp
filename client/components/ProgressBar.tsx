import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

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
    console.log("Gestational Age (weeks):", gestationalAgeInWeeks);
    console.log("Calculated Progress:", calculatedProgress);

    const clampedProgress = Math.min(100, Math.max(0, calculatedProgress));
    console.log("Clamped Progress:", clampedProgress);

    setProgress(clampedProgress);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Pregnancy Progress: {progress.toFixed(2)}%
      </Text>
      <ProgressBar
        progress={progress / 100}
        color="#735751"
        style={{ height: 10 }}
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
