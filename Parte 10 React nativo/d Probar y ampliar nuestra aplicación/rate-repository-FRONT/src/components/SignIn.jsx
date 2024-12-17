import React from 'react';
import { Formik } from 'formik';
import { View, Pressable,StatusBar, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import FormikTextInput from './FormikTextInput'; // Asegúrate de implementar este componente.
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que ocupe todo el espacio disponible
    padding: 16, // Espaciado interno uniforme
    backgroundColor: '#fff', // Color de fondo para diferenciar
    marginTop: Constants.statusBarHeight,
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });

  const onSubmit = (values) => {
    console.log('Form values:', values);
    // Aquí puedes añadir la lógica para manejar el inicio de sesión.
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
