import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
/* import RepositoryList from './RepositoryList'; */
import AppBar from '../components/AppBar'; // Verifica la ruta
import RepositoryList from '../components/RepositoryList';
import { Route, Routes, Switch, Redirect } from 'react-router-native';; 
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8', 
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      
    </View>
  );
};

export default Main;