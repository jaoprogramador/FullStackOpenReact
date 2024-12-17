import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
// Formatear números mayores o iguales a 1000
/* const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  }; */
  const formatNumber = (num) => {
    if (num == null) return 'N/A';  // Validar si num es null o undefined
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        marginBottom: 10,
      },
      header: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
      },
      info: {
        flex: 1,
        justifyContent: 'center',
      },
      name: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
      },
      description: {
        color: '#6b6b6b',
        marginBottom: 5,
      },
      language: {
        backgroundColor: '#0366d6',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      },
      stat: {
        alignItems: 'center',
      },
      statValue: {
        fontWeight: 'bold',
        fontSize: 14,
      },
    
});


const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    ownerAvatarUrl,
    stargazersCount,
    forksCount,
    ratingAverage,
    reviewCount
  } = item.node;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.description}>{description || 'No description available'}</Text>
          <Text style={styles.language}>{language || 'No language specified'}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
    </View>
  );

  /* return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
    </View>
  ); */
};

export default RepositoryItem;
