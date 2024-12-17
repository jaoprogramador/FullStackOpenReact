/* import React from 'react';
import { FlatList, Text, View,Button, Alert,StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { ME_REVIEWS } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import { Linking } from 'react-native';
const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f5f5f5' },
  review: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    color: '#0366d6',
  },
  repository: {
    fontWeight: 'bold',
    color: '#0366d6',
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#0366d6',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
  },
});

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME_REVIEWS, {
    variables: { first: 6 },
    fetchPolicy: 'network-only',
    //fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME_REVIEWS }], // Refresca después de borrar
    awaitRefetchQueries: true, // Espera a que termine la consulta
    onError: (error) => {
      console.error('Error deleting review:', error);
    },

    
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.review}>
          <Text style={styles.repository}>{item.repository.fullName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
          <Text style={styles.createdAt}>
            Created At: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Open Repository"
              onPress={() => Linking.openURL(item.repository.url)}
            />
            <Button
              title="Delete Review"
              onPress={() => handleDelete(item.id)}
              color="red"
            />
          </View>
        </View>
      )}
      ListHeaderComponent={<Text style={styles.header}>My Reviews</Text>}
    />
  );
};

export default MyReviews; */


 
/* import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Button, Alert, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { ME_REVIEWS } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { Linking } from 'react-native';

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f5f5f5' },
  review: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: { fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: '#0366d6' },
  repository: { fontWeight: 'bold', color: '#0366d6', fontSize: 16, marginBottom: 5 },
  rating: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#0366d6',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  reviewText: { fontSize: 14, color: '#333', marginBottom: 10 },
  createdAt: { fontSize: 12, color: '#666', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME_REVIEWS, {
    variables: { first: 6 },
    fetchPolicy: 'network-only', // Asegura obtener siempre los datos actualizados desde la red
  });

  const [reviews, setReviews] = useState([]); // Estado local para las reseñas

  useEffect(() => {
    if (data?.me?.reviews?.edges) {
      // Actualiza las reseñas locales cuando los datos cambien
      setReviews(data.me.reviews.edges.map((edge) => edge.node));
    }
  }, [data]);

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => console.error('Error deleting review:', error),
  });

  const handleDelete = (reviewId) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              // Actualiza las reseñas locales eliminando la reseña borrada
              setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
              // Opcional: Refetch para asegurar datos sincronizados con el servidor
              refetch();
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleFetchMore = () => {
    if (data?.me?.reviews?.pageInfo?.hasNextPage) {
      data.fetchMore({
        variables: { after: data.me.reviews.pageInfo.endCursor },
      });
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.review}>
          <Text style={styles.repository}>{item.repository.fullName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
          <Text style={styles.createdAt}>
            Created At: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Open Repository" onPress={() => Linking.openURL(item.repository.url)} />
            <Button
              title="Delete Review"
              onPress={() => handleDelete(item.id)}
              color="red"
            />
          </View>
        </View>
      )}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Text style={styles.header}>My Reviews</Text>}
    />
  );
};

export default MyReviews;
 */

import React from 'react';
import { FlatList, Text, View,Button, Alert,StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { ME_REVIEWS } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import { Linking } from 'react-native';
const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f5f5f5' },
  review: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    color: '#0366d6',
  },
  repository: {
    fontWeight: 'bold',
    color: '#0366d6',
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#0366d6',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
  },
});

const MyReviews = () => {
  //const navigation = useNavigation(); // Navegación para el botón "View Repository"
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: ME_REVIEWS }], // Refresca la lista de reseñas después de la eliminación
    onError: (error) => {
      console.error('Error deleting review:', error);
    },
  });
  

  const { data, loading, fetchMore } = useQuery(ME_REVIEWS, {
    variables: { first: 6 },
    fetchPolicy: 'cache-and-network',
  });
  console.log('MyReviews:::data',data)
  console.log('MyReviews:::ME_REVIEWS',ME_REVIEWS)
  if (loading) {
    return <Text>Loading...</Text>;
  }

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];
  const pageInfo = data?.me?.reviews?.pageInfo;
  console.log('MyReviews::::reviews',reviews);
  console.log('MyReviews::::pageInfo ',pageInfo);
  
  const handleFetchMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      });
    }
  };
  const handleDelete = async (reviewId) => {
    console.log("MyReviews::::handleDelete",reviewId);
    try {
      const { data } = await deleteReview({
        variables: { id: reviewId },
      });
      if (data.deleteReview) {
        console.log('Review deleted successfully');
        //navigate.navigate('my-reviews');//truco para forzar refresco
        //navigate('my-reviews');//truco para forzar refresco
        //navigate('respositoryList');
        navigate('/respositoryList'); 
      } else {
        console.log('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
    // TODO::: tema pendiente el confirm no salta
    // TODO ::: el borrar sin usar el navigate no renderiza los resultados
    // Mostrar el mensaje de confirmación antes de borrar
    /* Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            console.log('MyReviews::::handleDelete:::onPress');
            try {
              const { data } = await deleteReview({
                variables: { id: reviewId },
              });
              if (data.deleteReview) {
                console.log('Review deleted successfully');
              } else {
                console.log('Failed to delete review');
              }
            } catch (error) {
              console.error('Error deleting review:', error);
            }
          },
        },
      ],
      { cancelable: true }
    ); */
  };
  

  const handleViewRepository = (repositoryId) => {
    navigation.navigate('Repository', { id: repositoryId });
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.review}>
          <Text style={styles.repository}>{item.repository.fullName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviewText}>{item.text}</Text>
          </View>
          <Text style={styles.createdAt}>
            Created At: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <View style={styles.buttonContainer}>
           <Button title="Open Repository" 
            onPress={() => Linking.openURL(item.repository.url)} />
            <Button
              title="Delete Review"
              onPress={() => handleDelete(item.id)} 
              /* onPress={() => handleDelete(reviews.id)}  */
              /* onPress={() => handleDelete(item.id)}  */
              /* onPress={() => handleDelete(item.repository.id)}  */
              color="red"
            />
          </View>
        </View>
      )}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Text style={styles.header}>My Reviews</Text>}
    />
  );
};

export default MyReviews;

