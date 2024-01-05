import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";

type Props = NativeStackScreenProps<RootStackParamList, "Username">;

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

export default function EnterUserNameScreen({ navigation }: Props) {
  const theme = useTheme();
  const { addUsername, user } = useAuth();

  const onSubmit = async (values: { username: string }) => {
    try {
      // Check if the user is logged in
      if (user) {
        // Update user information with the entered username
        await addUsername(values.username);
        alert("Username successfully added.");
        navigation.navigate("Role");
      } else {
        alert("User not logged in. Please log in first.");
      }
    } catch (error) {
      console.error("Update username error:", error);
      alert("Failed to update username. Please try again.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={{ color: theme.colors.background }}>
        Välkommen!
      </Text>
      <Text variant="titleMedium" style={{ color: theme.colors.background }}>
        Vad heter du?
      </Text>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              label="Namn..."
              value={values.username}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("username")}
              mode="outlined"
              style={styles.input}
            />
            {errors.username && (
              <Text style={{ color: "red" }}>{errors.username}</Text>
            )}

            <Button
              mode="elevated"
              buttonColor={theme.colors.background}
              onPress={() => handleSubmit()}
            >
              Fortsätt
            </Button>
          </>
        )}
      </Formik>

      <Button mode="elevated" onPress={() => navigation.navigate("Home")}>
        Go to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  input: {
    width: "60%",
    borderRadius: 100,
  },
});
