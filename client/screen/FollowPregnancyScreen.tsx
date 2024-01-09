import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";

type Props = NativeStackScreenProps<RootStackParamList, "AddPregnancy">;

const validationSchema = Yup.object().shape({
  babyName: Yup.string(),
  dueDate: Yup.date()
    .typeError("Invalid date format")
    .required("Due date is required"),
});

const FollowPregnancyScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { user, addPregnancy } = useAuth();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //   const handleConfirm = (date: Date) => {
  //     setDueDate(date);
  //     hideDatePicker();
  //   };

  const onSubmit = async (values: { babyName: string; dueDate: Date }) => {
    try {
      await addPregnancy(user?.id || "", values.babyName, values.dueDate);
      console.log("Pregnancy added successfully");
      navigation.navigate("UserInfo");
      // You can navigate or perform additional actions after adding pregnancy
    } catch (error) {
      console.error("Add pregnancy error:", error);
      alert("Failed to add pregnancy. Please try again.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displayMedium" style={styles.title}>
        Följ graviditet
      </Text>
      <Formik
        initialValues={{ babyName: "", dueDate: new Date() }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,

          values,
        }) => (
          <>
            <TextInput
              label="Ange kod / id"
              value={values.babyName}
              onBlur={handleBlur("babyName")}
              onChangeText={handleChange("babyName")}
              mode="outlined"
              style={styles.input}
            />

            <Button
              mode="elevated"
              color={theme.colors.background}
              onPress={() => navigation.navigate("Home")}
              style={styles.buttonContainer}
            >
              Följ
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  title: {
    fontFamily: "Oswald",
    color: "white",
    textAlign: "center",

    fontSize: 40,
  },

  input: {
    width: "60%",
    borderRadius: 100,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "60%",
  },
});

export default FollowPregnancyScreen;
