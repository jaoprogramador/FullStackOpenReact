import React from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    paddingTop: 40,
    paddingBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },

    
    
  });



const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab to="/" label="Repositories" />
        <AppBarTab to="/signin" label="Sign In" />
        <AppBarTab to="/extra1" label="Extra Tab 1" />
        <AppBarTab to="/extra2" label="Extra Tab 2" />
        <AppBarTab to="/extra3" label="Extra Tab 3" />
      </ScrollView>
    </View>
    );
  };
  
  export default AppBar;
  
