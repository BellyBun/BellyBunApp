import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Formik, useFormikContext } from 'formik'; // Import useFormikContext
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from '../context/userContext';

const validationSchema = Yup.object().shape({
  babyName: Yup.string(),
  dueDate: Yup.date()
    .typeError('Invalid date format')
    .required('Due date is required'),
});

const AddPregnancyScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const { user, addPregnancy } = useAuth();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

//   const handleConfirm = (date: Date) => {
//     setDueDate(date);
//     hideDatePicker();
//   };

  const onSubmit = async (values: {
    babyName: string;
    dueDate: Date;
  }) => {
    try {
      await addPregnancy(
        user?.id || '',
        values.babyName,
        values.dueDate
      );
      console.log('Pregnancy added successfully');
      navigation.navigate('UserInfo');
      // You can navigate or perform additional actions after adding pregnancy
    } catch (error) {
      console.error('Add pregnancy error:', error);
      alert('Failed to add pregnancy. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text variant='displaySmall' style={{ color: theme.colors.background }}>
        Add Pregnancy
      </Text>
      <Formik
        initialValues={{ babyName: '', dueDate: new Date() }}
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
            <TextInput
              label='Baby Name'
              value={values.babyName}
              onBlur={handleBlur('babyName')}
              onChangeText={handleChange('babyName')}
              mode='outlined'
              style={styles.input}
            />
            <TextInput
              label='Due Date (YYYY-MM-DD)'
              value={values.dueDate.toISOString().split('T')[0]}
              onTouchStart={() => {
                showDatePicker();
              }}
              mode='outlined'
              style={styles.input}
              editable={false}
            />

            {errors.dueDate && (
              <Text style={{ color: 'red' }}>{String(errors.dueDate)}</Text>
            )}

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode='date'
              onConfirm={(date: Date) => {
                setFieldValue('dueDate', date);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />

            <Button
              mode='elevated'
              color={theme.colors.background}
              onPress={() => handleSubmit()}
            >
              Add Pregnancy
            </Button>
          </>
        )}
      </Formik>

      <Button mode='elevated' onPress={() => navigation.navigate('Home')}>
        Go to Home
      </Button>
    </View>
  );
};

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

export default AddPregnancyScreen;
