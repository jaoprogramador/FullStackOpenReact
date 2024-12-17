import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries'; // Asumiendo que tienes la consulta GraphQL configurada

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = ({ repositoryId }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading repository data</Text>;

  const repository = data.repository;

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
