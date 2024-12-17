import React from 'react';
import { Formik } from 'formik';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
//import { useHistory } from 'react-router-native';
import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput'; // Asegúrate de tener este componente implementado.

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  //const history = useHistory();
  const navigate = useNavigate();


  const initialValues = {
    username: 'jaoprogramador',
    password: '12345',
  };

  const onSubmit = (values) => {
    try {
      const data = signIn(values);
      if (data) {
        //history.push('/'); // Redirigir a la vista de lista de repositorios
        navigate('/respositoryList'); 
      }
    } catch (e) {
      console.error('Error during sign-in:', e);
    }
    console.log(values); // Imprime los valores del formulario en la consola.
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema} // Agregamos el esquema de validación
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
