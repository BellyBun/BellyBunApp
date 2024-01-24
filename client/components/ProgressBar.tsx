import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import theme from "../theme";
import { useBaby } from "../context/babyContext";

const PregnancyProgress = () => {
  const { pregnancyData, getBabiesByUser } = useBaby();

  useEffect(() => {
    // Make sure you have the latest pregnancy data when the component mounts
    getBabiesByUser();
  }, []);

  if (!pregnancyData) {
    // Handle the case where pregnancy data is not available yet
    return <Text>Loading...</Text>;
  }

  const { percentageComplete, weekOfPregnancy, totalDaysPregnant } = pregnancyData;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (percentageComplete / 100) * circumference;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={180}
        width={7}
        fill={percentageComplete}
        dashedBackground={{ width: 2, gap: 5 }}
        rotation={0}
        tintColor="#FAF8F4"
        backgroundColor="#FAF8F4"
        duration={1500}
      >
        {(fill) => (
          <Text style={styles.progressText}>
            {percentageComplete.toFixed(1)}%{"\n"}färdigbakad!
          </Text>
        )}
      </AnimatedCircularProgress>

      {/* Three text blocks in a row */}
      <View style={styles.rowContainer}>
        <Text style={styles.rowText}>VECKA {weekOfPregnancy}</Text>
        <Text style={styles.middleRowText}>DAG {totalDaysPregnant}</Text>
        <Text style={styles.rowText}>BF {280 - totalDaysPregnant}</Text>
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
