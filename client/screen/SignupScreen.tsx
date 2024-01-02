import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useAuth } from "../context/userContext";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vänligen ange en giltig mejladress")
    .required("Vänligen ange en mejladress"),
  password: yup
    .string()
    .required("Ange ett lösenord med 8 tecken")
    .min(8, "Lösenordet är för kort. Det behöver minst 8 tecken."),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Du måste acceptera villkoren för att fortsätta"),
});

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation }: Props) {
  const theme = useTheme();
  const { signUp } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      acceptTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signUp(values.email, values.password);
        alert("Registration successfull.");
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant="displaySmall" style={{ color: theme.colors.background }}>
        Skapa ett nytt konto
      </Text>
      <TextInput
        label="Mejladress"
        value={formik.values.email}
        onBlur={formik.handleBlur("email")}
        onChangeText={formik.handleChange("email")}
        mode="outlined"
        style={styles.input}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={{ color: "darkred" }}>{formik.errors.email}</Text>
      )}

      <TextInput
        label="Lösenord"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        mode="outlined"
        secureTextEntry
        textContentType="password"
        style={styles.input}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "darkred" }}>{formik.errors.password}</Text>
      )}

      <Button
        mode="elevated"
        buttonColor={theme.colors.background}
        onPress={(e: GestureResponderEvent) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        Skapa konto
      </Button>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
