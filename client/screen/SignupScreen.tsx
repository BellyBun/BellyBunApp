import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../context/userContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NotLoggedInStackParamList } from "../RootNavigator";
import theme from "../theme";

type Props = NativeStackScreenProps<NotLoggedInStackParamList, "Signup">;

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignupScreen({ navigation }: Props) {
  const theme = useTheme();
  const { signup } = useUser();

  const onSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const lowercaseEmail = values.email.toLowerCase();
      await signup(values.username, lowercaseEmail, values.password);
      alert("Registration successful.");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={{ color: theme.colors.background }}>
        Skapa ett nytt konto
      </Text>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              label="Förnamn"
              value={values.username}
              onBlur={handleBlur("username")}
              onChangeText={handleChange("username")}
              mode="outlined"
              style={styles.input}
            />
            {errors.username && (
              <Text style={{ color: "red" }}>{errors.username}</Text>
            )}

            <TextInput
              label="Mejladress"
              value={values.email}
              onBlur={handleBlur("email")}
              onChangeText={handleChange("email")}
              mode="outlined"
              style={styles.input}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}

            <TextInput
              label="Lösenord"
              value={values.password}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              mode="outlined"
              secureTextEntry
              textContentType="password"
              style={styles.input}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
            <Text style={styles.text}>
              Har du redan ett konto? Logga in{" "}
              <Text
                onPress={() => navigation.navigate("Login")}
                style={styles.textButton}
              >
                här
              </Text>
            </Text>

            <Button
              mode="elevated"
              buttonColor={theme.colors.background}
              onPress={() => handleSubmit()}
            >
              Skapa konto
            </Button>
          </>
        )}
      </Formik>
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
  text: {
    color: theme.colors.background,
  },
  textButton: {
    color: theme.colors.background,
    textDecorationLine: "underline",
  },
  input: {
    width: "60%",
    borderRadius: 100,
  },
});
