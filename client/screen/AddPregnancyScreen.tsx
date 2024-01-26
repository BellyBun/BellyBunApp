import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { RootTabParamList } from "../RootNavigator";
import { useBaby } from "../context/babyContext";
import theme from "../theme";

type Props = NativeStackScreenProps<RootTabParamList>;

const validationSchema = Yup.object().shape({
  babyName: Yup.string().required("Nickname is required"),
  dueDate: Yup.date()
    .typeError("Invalid date format")
    .required("Due date is required"),
});

const AddPregnancyScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { createPregnancy } = useBaby();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onSubmit = async (
    values: { babyName: string; dueDate: Date },
    { resetForm }: FormikHelpers<any>
  ) => {
    try {
      await createPregnancy(values.babyName, values.dueDate);
      navigation.navigate("HomeStack", { screen: "Home" });
    } catch (error) {
      console.error("Add pregnancy error:", error);
      alert("Failed to add pregnancy. Please try again.");
    }
    resetForm();
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={styles.title}>
        Skapa ny graviditet
      </Text>

      <Formik
        initialValues={{ babyName: "", dueDate: new Date() }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <>
            <Text style={styles.text}>Vad vill du kalla din bebis?</Text>
            <TextInput
              placeholder="Smeknamn"
              value={values.babyName}
              onBlur={handleBlur("babyName")}
              onChangeText={handleChange("babyName")}
              mode="outlined"
              style={styles.input}
            />
            <Text style={styles.text}>Ange datum för BF</Text>

            <TextInput
              value={values.dueDate.toISOString().split("T")[0]}
              onTouchStart={() => {
                showDatePicker();
              }}
              mode="outlined"
              style={styles.input}
              editable={false}
            />

            {errors.dueDate && (
              <Text style={{ color: "red" }}>{String(errors.dueDate)}</Text>
            )}

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date: Date) => {
                setFieldValue("dueDate", date);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />

            <Button
              mode="elevated"
              onPress={() => {
                handleSubmit();
              }}
              style={styles.button}
            >
              Skapa
            </Button>
            <Button
              mode="elevated"
              onPress={() =>
                navigation.navigate("SettingsStack", { screen: "Settings" })
              }
              style={styles.button}
            >
              Tillbaka
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
    color: theme.colors.background,
  },
  text: {
    fontFamily: "Overpass",
    fontSize: 15,
    color: theme.colors.background,
    marginBottom: -15,
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

export default AddPregnancyScreen;
