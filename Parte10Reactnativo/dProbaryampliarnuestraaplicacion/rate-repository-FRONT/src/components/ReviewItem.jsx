import { View, Text, StyleSheet } from 'react-native';

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review;

  
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.date}>{new Date(createdAt).toLocaleDateString()}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftColumn: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rightColumn: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: '#888',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReviewItem; 
  