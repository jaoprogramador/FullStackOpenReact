import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useField } from 'formik';
import Text from './Text';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red', // Borde rojo cuando hay error
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <View>
      <TextInput
        style={[styles.input, meta.touched && meta.error && styles.errorInput]} // Aplica borde rojo si hay error
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        {...props}
      />
      {meta.touched && meta.error && (
        <Text style={styles.errorText}>{meta.error}</Text> // Muestra el mensaje de error
      )}
    </View>
  );
};

export default FormikTextInput;
