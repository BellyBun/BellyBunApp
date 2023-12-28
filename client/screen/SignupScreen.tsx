import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { RootStackParamList } from "../RootNavigator";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/userContext";

type FormData = {
  email: string;
  password: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation }: Props) {
  const theme = useTheme();
  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signUp(data.email, data.password);
      alert("Registration successfull.");
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
    borderRadius: 100,
  },
});
