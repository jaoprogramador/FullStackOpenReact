import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { format } from 'date-fns';
import { useHistory } from 'react-router-native';

const ReviewItem = ({ review, showRepository = false, onDelete }) => {
  const history = useHistory();
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const handleViewRepository = () => {
    history.push(`/repository/${review.repository.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(review.id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {showRepository && (
        <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
      )}
      <View style={styles.header}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.username}>{review.user?.username || 'You'}</Text>
          <Text style={styles.createdAt}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.text}>{review.text}</Text>
      <View style={styles.actions}>
        <Button title="View Repository" onPress={handleViewRepository} />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  repositoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0366d6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  info: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  createdAt: {
    fontSize: 14,
    color: '#6b6b6b',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ReviewItem;
