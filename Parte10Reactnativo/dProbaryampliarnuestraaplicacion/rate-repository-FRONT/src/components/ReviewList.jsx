/* import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
});

const ReviewItem = ({ review }) => (
  <View style={styles.reviewItem}>
    <Text>Username: {review.user.username}</Text>
    <Text>Rating: {review.rating}</Text>
    <Text>Review: {review.text}</Text>
    <Text>Date: {new Date(review.createdAt).toLocaleDateString()}</Text>
  </View>
);

const ReviewList = ({ repositoryId }) => {
  const { reviews, fetchMore, loading } = useReviews(repositoryId);

  const onEndReached = () => {
    if (!loading) {
      fetchMore();
    }
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5} // Llama cuando queda el 50% de la lista
      ListFooterComponent={loading && <Text>Loading more...</Text>}
    />
  );
};

export default ReviewList; */
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const ReviewList = ({ repositoryId }) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY_REVIEWS, {
    variables: { repositoryId, first: 5 },
    fetchPolicy: 'cache-and-network', // Garantiza datos actualizados
  });

  if (loading) return <Text>Loading reviews...</Text>;

  const reviews = data?.repository.reviews.edges.map(edge => edge.node) || [];
  const { hasNextPage, endCursor } = data?.repository.reviews.pageInfo;

  const handleFetchMore = () => {
    if (!hasNextPage) return;

    fetchMore({
      variables: { after: endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          ...previousResult,
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
      },
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.username}>{item.user.username}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <Text>{item.text}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={handleFetchMore} // Llama a `fetchMore` al llegar al final
      onEndReachedThreshold={0.5} // Ajusta para llamar a `fetchMore` cerca del final
      ListFooterComponent={hasNextPage && <Text>Loading more...</Text>} // Indicador de carga
    />
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rating: {
    color: 'orange',
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
    fontSize: 12,
  },
});

export default ReviewList;
