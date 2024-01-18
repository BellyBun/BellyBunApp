import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { NotLoggedInStackParamList, RootTabParamList } from "../RootNavigator";
import { useUser } from "../context/userContext";
import theme from "../theme";

type Props = NativeStackScreenProps<NotLoggedInStackParamList, "Login">;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Mejladress är obligatoriskt"),
  password: Yup.string().required("Ange ett lösenord"),
});

export default function LoginScreen({ navigation }: Props) {
  const { login } = useUser();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      // Convert email to lowercase before calling signIn
      const lowerCaseEmail = values.email.toLowerCase();
      await login(lowerCaseEmail, values.password);
      alert("Login successful.");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={{ color: theme.colors.background }}>
        Logga in
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
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
              Inget konto än? Skapa ett{" "}
              <Text
                onPress={() => navigation.navigate("Signup")}
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
              Logga in
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
