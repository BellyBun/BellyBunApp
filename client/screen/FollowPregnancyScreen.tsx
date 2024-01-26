import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RootTabParamList } from "../RootNavigator";
import { useBaby } from "../context/babyContext";
import theme from "../theme";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

type Props = NativeStackScreenProps<RootTabParamList>;

const validationSchema = Yup.object().shape({
  followBabyCode: Yup.string().required("Vänligen ange en kod"),
});

export default function FollowPregnancyScreen({ navigation }: Props) {
  const { followBaby } = useBaby();

  const onSubmit = async (
    values: { followBabyCode: string },
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      await followBaby(values.followBabyCode);

      navigation.navigate("HomeStack", { screen: "Home" });
    } catch (error) {
      console.error("Error following baby:", error);
      alert("Failed to follow baby. Please try again.");
    }
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Följ graviditet
      </Text>
      <Text style={styles.text}>Ange kod</Text>
      <Formik
        initialValues={{ followBabyCode: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Klistra in kod"
              value={values.followBabyCode}
              onBlur={handleBlur("followBabyCode")}
              onChangeText={handleChange("followBabyCode")}
              mode="outlined"
            />

            <Button
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              Följ graviditet
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontFamily: "Oswald",
    color: theme.colors.background,
  },
  text: {
    fontFamily: "Overpass",
    fontSize: 15,
    color: theme.colors.background,
  },
  input: {
    width: "60%",
    borderRadius: 100,
  },
  button: {
    backgroundColor: theme.colors.background,
    width: 200,
  },
});
