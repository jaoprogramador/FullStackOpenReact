import React from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { useNavigate } from 'react-router-native'; 
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  //const history = useHistory();
    const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(1, 'Username must be at least 1 character')
      .max(30, 'Username cannot exceed 30 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(50, 'Password cannot exceed 50 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // Crear usuario
      const { data } = await createUser({
        variables: { user: { username, password } },
      });

      if (data?.createUser?.username) {
        // Iniciar sesión automáticamente
        await signIn({ username, password });
        //history.push('/repository-list'); // Redirige a la lista de repositorios
        navigate('/respositoryList');
    }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
          />
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <Button title="Sign Up" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
