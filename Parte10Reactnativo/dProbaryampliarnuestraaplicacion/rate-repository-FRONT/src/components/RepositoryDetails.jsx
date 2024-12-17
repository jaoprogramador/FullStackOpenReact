import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReviewList from './ReviewList';

const RepositoryDetails = ({ repositoryId }) => {
  return (
    <View style={styles.container}>
      <Text>Repository Details</Text>
      <ReviewList repositoryId={repositoryId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default RepositoryDetails;
