import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const RepositoryInfo = ({ repository }) => {
  if (!repository) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repository.fullName}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <Text style={styles.language}>{repository.language}</Text>
      <Text style={styles.stars}>Stars: {repository.stargazersCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
  },
  language: {
    fontSize: 14,
    color: '#888',
  },
  stars: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default RepositoryInfo;
