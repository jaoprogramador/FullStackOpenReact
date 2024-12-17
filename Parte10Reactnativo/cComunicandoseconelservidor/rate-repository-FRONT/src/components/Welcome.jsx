import React from 'react';
import { Formik } from 'formik';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});



const Welcome = () => {
  return (
    <View style={styles.container}>      
        <Text style={styles.welcomeText}>Welcome to RATE REPOSITORY</Text>
    </View>
  );
};




export default Welcome;