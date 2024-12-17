/* import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem'; // Reutiliza este componente
import * as Linking from 'expo-linking';

const RepositoryView = ({ id }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Button
        title="Open in GitHub"
        onPress={() => Linking.openURL(repository.url)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default RepositoryView; */
//PROPUESTA 2
/* import React from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';

const RepositoryView = () => {
    const { id } = useParams();
    console.log('RepositoryView:::id',id);
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
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

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Button
        title="Open in GitHub"
        onPress={() => Linking.openURL(repository.url)}
        color="#0366d6" // Azul similar al de GitHub
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
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
});

export default RepositoryView; */
//PROPUESTA 3
import { FlatList, StyleSheet, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY_WITH_REVIEWS } from '../graphql/queries';
import ReviewItem from './ReviewItem'; 
import RepositoryInfo from './RepositoryInfo'; 

const RepositoryView = () => {
    const { id } = useParams();
    console.log('RepositoryView:::id',id);
  const { data, loading, error } = useQuery(GET_REPOSITORY_WITH_REVIEWS, {
    variables: { id },
    fetchPolicy: 'cache-and-network',

  });
  console.log('RepositoryView:::data',data);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);
  console.log('RepositoryView:::repository',repository);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      contentContainerStyle={styles.listContainer} // Aplica estilos al contenedor de la lista
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
});

export default RepositoryView; 
//PROPUESTA 4
/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReviewList from './ReviewList';

const RepositoryView = ({ route }) => {
  const { id } = route.params; // ID del repositorio recibido como parámetro

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.repositoryInfo}>
        <Text style={styles.title}>Repository Details</Text>
        <Text>ID: {id}</Text>
      </View>
      
      <ReviewList repositoryId={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  repositoryInfo: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RepositoryView; */



