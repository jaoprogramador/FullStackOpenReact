import React from 'react';
import { View, StyleSheet } from 'react-native';
import useReviews from '../hooks/useReviews';
import ReviewList from '../components/ReviewList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const RepositoryScreen = ({ repositoryId }) => {
  const { reviews, loading, error, fetchMoreReviews } = useReviews(repositoryId, 5); // 5 revisiones por página

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <ReviewList
        reviews={reviews}
        onEndReach={fetchMoreReviews} // Llama a `fetchMoreReviews` al llegar al final
      />
    </View>
  );
};

export default RepositoryScreen;
