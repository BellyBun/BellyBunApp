import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import getPregnancyData from "../components/CalculatePregnancy";
import theme from "../theme";

const PregnancyProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [daysPregnant, setDaysPregnant] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const {
      formattedStartDate,
      percentageComplete,
      weekOfPregnancy,
      totalDaysPregnant,
    } = getPregnancyData();

    setProgress(percentageComplete);
    setCurrentWeek(weekOfPregnancy);
    setDaysPregnant(totalDaysPregnant);
    setDaysLeft(280 - totalDaysPregnant); // Assuming 280 days pregnancy duration
  }, []);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={180}
        width={7}
        fill={progress}
        dashedBackground={{ width: 2, gap: 5 }}
        rotation={0}
        tintColor="#FAF8F4"
        backgroundColor="#FAF8F4"
        duration={1500}
      >
        {(fill) => (
          <Text style={styles.progressText}>
            {progress.toFixed(1)}%{"\n"}färdigbakad!
          </Text>
        )}
      </AnimatedCircularProgress>

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
