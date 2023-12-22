import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
  //termsAccepted: boolean;
};

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

const registerUser = async (data: FormData) => {
  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export default function SignupScreen({ navigation }: Props) {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await registerUser(data);
      console.log("Registration response:", response);

      // Show an alert with the response message
      alert(response.message);

      // Optionally, you can navigate to another screen on successful registration
      if (response.success) {
        navigation.navigate("Home");
      }
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
      <Controller
        control={control}
        name="email"
        rules={{ required: "Mejladress är obligatoriskt" }}
        render={({ field }) => (
          <>
            <TextInput
              label="Mejladress"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={(value) => field.onChange(value)}
              mode="outlined"
              style={styles.input}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "Ange ett lösenord" }}
        render={({ field }) => (
          <>
            <TextInput
              label="Lösenord"
              value={field.value}
              onChangeText={(value) => field.onChange(value)}
              mode="outlined"
              secureTextEntry
              textContentType="password"
              style={styles.input}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      {/* <Checkbox.Item
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
        }}
        color={theme.colors.background}
        label="Acceptera användarvillkor"
      /> */}
      <Button
        mode="elevated"
        buttonColor={theme.colors.background}
        onPress={handleSubmit(onSubmit)}
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
    borderRadius: 10,
  },
});
