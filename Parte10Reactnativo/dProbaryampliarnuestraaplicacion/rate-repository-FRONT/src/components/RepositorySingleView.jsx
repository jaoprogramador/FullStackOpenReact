import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';

const RepositorySingleView = ({ repository }) => {
  if (!repository) {
    return null;
  }

  const openInGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Button title="Open in GitHub" onPress={openInGitHub} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
});

export default RepositorySingleView;
