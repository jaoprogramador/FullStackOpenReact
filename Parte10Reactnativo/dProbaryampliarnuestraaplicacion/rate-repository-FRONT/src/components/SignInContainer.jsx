import React from 'react';
import { Formik } from 'formik';
import { View, TextInput, Button } from 'react-native';

const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit }) => (
        <View>
          <TextInput
            placeholder="Username"
            onChangeText={handleChange('username')}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
          />
          <Button onPress={handleSubmit} title="Sign In" />
        </View>
      )}
    </Formik>
  );
};

export default SignInContainer;
