import React from 'react';
import { Pressable, StyleSheet  } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native'; 

/* const AppBarTab = ({ to, onPress ,label}) => {
  return (
    <Link to={to} component={Pressable} style={styles.tab}>
      <Text style={styles.text}>{label}</Text>
    </Link>
  );
};
 */
const AppBarTab = ({ to, onPress, label }) => {
  if (onPress) {
    // Si hay un onPress, usamos Pressable
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    );
  }

  // Si no hay onPress, usamos Link
  return (
    <Link to={to} style={styles.tab}>
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
