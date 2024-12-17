import React from 'react';
import { Pressable, StyleSheet  } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native'; 

const AppBarTab = ({ to, label }) => {
  return (
    <Link to={to} component={Pressable} style={styles.tab}>
      <Text style={styles.text}>{label}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppBarTab;
