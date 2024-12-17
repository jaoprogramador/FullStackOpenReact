import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
//import useCurrentUser from '../hooks/useCurrentUser';
import useCurrentUser from '../hooks/useCurrentUser';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { user, loading, fetchMore, refetch } = useCurrentUser(true);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async (id) => {
    try {
      await deleteReview({ variables: { id } });
      refetch(); // Refrescamos la lista después de eliminar
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) {
    return <Text style={styles.message}>Loading...</Text>;
  }

  const reviews = user?.reviews?.edges.map((edge) => edge.node) || [];

  if (reviews.length === 0) {
    return <Text style={styles.message}>You have no reviews.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReviewItem review={item} showRepository onDelete={handleDelete} />
        )}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MyReviews;
