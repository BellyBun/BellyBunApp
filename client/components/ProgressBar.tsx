import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import theme from "../theme";
import { useBaby } from "../context/babyContext";

const PregnancyProgress = () => {
  const { pregnancyData, getBabiesByUser, babies } = useBaby();

  useEffect(() => {
    getBabiesByUser();
  }, []);

  if (!pregnancyData) {
    return (
      <View style={styles.loadingBox}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const activeBaby = babies.find((baby) => baby.isActive);

  const { percentageComplete, weekOfPregnancy, totalDaysPregnant } =
    pregnancyData;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (percentageComplete / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoText}>{activeBaby.nickname}</Text>
        <Text style={styles.infoText}>
          {new Date(activeBaby.dueDate).toLocaleDateString()}
        </Text>
      </View>
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
            {percentageComplete.toFixed(0)}%{"\n"}färdigbakad
          </Text>
        )}
      </AnimatedCircularProgress>

      <View style={styles.flexContainer}>
        <View>
          <Text style={styles.title}>Vecka</Text>
          <Text style={styles.text}>{weekOfPregnancy}</Text>
        </View>
        <View>
          <Text style={styles.title}>Dag</Text>
          <Text style={styles.text}>{totalDaysPregnant} av 280</Text>
        </View>
        <View>
          <Text style={styles.title}>BF</Text>
          <Text style={styles.text}>{280 - totalDaysPregnant} dagar </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 380,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },
  infoText: {
    fontFamily: "Oswald",
    color: theme.colors.background,
    fontSize: 14,
    textTransform: "uppercase",
  },
  progressText: {
    textAlign: "center",
    marginBottom: 10,
    color: theme.colors.background,
    fontFamily: "Oswald",
    fontSize: 16,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  loadingBox: {
    height: "110%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontFamily: "Oswald",
    color: theme.colors.background,
    textTransform: "uppercase",
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    fontFamily: "Oswald",
    textAlign: "center",
    color: theme.colors.background,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
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
