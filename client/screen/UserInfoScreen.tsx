import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/userContext';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "../RootNavigator";
import { NativeStackScreenProps } from '@react-navigation/native-stack';



SplashScreen.preventAutoHideAsync();

type Props = NativeStackScreenProps<RootStackParamList, "Home">;



const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  newEmail: Yup.string().email('Invalid email').required('Email is required'),
});

export default function UserInfoScreen({ navigation }: Props) {
  const theme = useTheme();
  const { user, addUserInfo } = useAuth();
  const [isLoaded] = useFonts({
    Oswald: require("../assets/fonts/Oswald-Bold.ttf"),
    Overpass: require("../assets/fonts/Overpass-Light.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render loading state while user data is being fetched
  if (user === null) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Check if the user is logged in
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
        <Text variant="displaySmall" style={{ color: theme.colors.background }}>
          User not logged in
        </Text>
        <Button mode="elevated" onPress={() => navigation.navigate('Home')}>
          Go to Home
        </Button>
      </View>
    );
  }

  const onSubmit = async (values: { userName: string; newEmail: string }) => {
    try {
      const userId = user.id;
      await addUserInfo(userId, values);
      alert('User information updated successfully.');
      // You can navigate or perform additional actions after updating user info
    } catch (error) {
      console.error('User info update error:', error);
      alert('Failed to update user information. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]} onLayout={handleOnLayout}>
      <Text variant="displaySmall" style={{ color: theme.colors.background }}>
        Update User Info
      </Text>
      <Formik
        initialValues={{ userName: user.userName || '', newEmail: user.email || '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <TextInput
              label="Ditt namn"
              value={values.userName}
              onBlur={handleBlur('userName')}
              onChangeText={handleChange('userName')}
              mode="outlined"
              style={styles.input}
            />
            {errors.userName && <Text style={{ color: 'red' }}>{errors.userName}</Text>}

            <TextInput
              label="Ny Email"
              value={values.newEmail}
              onBlur={handleBlur('newEmail')}
              onChangeText={handleChange('newEmail')}
              mode="outlined"
              style={styles.input}
            />
            {errors.newEmail && <Text style={{ color: 'red' }}>{errors.newEmail}</Text>}

            <Button
              mode="elevated"
              buttonColor={theme.colors.background}
              onPress={() => handleSubmit()}
            >
              Update din användar info
            </Button>
          </>
        )}
      </Formik>

      <Button mode="elevated" onPress={() => navigation.navigate('AddPregnancy')}>
        Add Pregnancy
      </Button>

      <Button mode="elevated" onPress={() => navigation.navigate('Home')}>
        Go to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  input: {
    width: '60%',
    borderRadius: 100,
  },
});
