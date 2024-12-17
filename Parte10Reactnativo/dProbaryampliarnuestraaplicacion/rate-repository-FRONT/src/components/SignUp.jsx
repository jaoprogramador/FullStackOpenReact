import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CREATE_USER } from '../graphql/mutations'; // Asegúrate de tener esta mutación definida

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(1, 'Username is too short')
    .max(30, 'Username is too long'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password is too long'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = ({ history }) => {
  const [createUser] = useMutation(CREATE_USER); // Asegúrate de tener esta mutación definida

  const handleSubmit = async (values) => {
    try {
      // Llamada a la mutación para crear el usuario
      const response = await createUser({
        variables: {
          username: values.username,
          password: values.password,
        },
      });

      // Iniciar sesión automáticamente después de crear el usuario
      // Aquí asumiríamos que la mutación 'createUser' devuelve el token o usuario
      const { data } = response;

      // Redirigir al usuario después del registro
      history.push('/'); // O a la vista que deseas mostrar después de iniciar sesión
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password confirmation"
              secureTextEntry
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && <Text style={styles.error}>{errors.passwordConfirmation}</Text>}

            <Button title="Sign up" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default SignUp;
