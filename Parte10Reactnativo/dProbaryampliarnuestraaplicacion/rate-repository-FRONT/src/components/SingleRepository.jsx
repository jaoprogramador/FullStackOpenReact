import React from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import { GET_REPOSITORY_WITH_REVIEWS } from '../graphql/queries';

const SingleRepository = () => {
  const { id } = useParams();  // Obtienes el ID del repositorio desde los parámetros de la URL
  const { data, loading, error } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);  // Extraemos las reseñas

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  separator: {
    height: 10,
  },
});

export default SingleRepository;
