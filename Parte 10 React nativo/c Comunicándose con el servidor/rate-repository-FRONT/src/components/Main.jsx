import React from 'react';
import Constants from 'expo-constants';
import { Text, StyleSheet, ScrollView ,View } from 'react-native';
/* import RepositoryList from './RepositoryList'; */
import AppBar from '../components/AppBar'; 
import RepositoryList from '../components/RepositoryList';
import ExtraTab1 from '../components/ExtraTab1';
import Welcome from '../components/Welcome';
import { Route, Routes, Switch, Redirect } from 'react-router-native';; 
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  scrollableContent: {
    flexGrow: 1, // Permite que el contenido se expanda
  },


});


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <ScrollView contentContainerStyle={styles.scrollableContent}>
        <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/respositoryList" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/extra1" element={<ExtraTab1 />} />
        <Route path="/extra2" element={<ExtraTab1 />} />
        <Route path="/extra3" element={<ExtraTab1 />} />
      </Routes>
      </ScrollView>
      

    </View>
  );
};

export default Main;