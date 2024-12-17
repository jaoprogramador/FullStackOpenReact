import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Linking } from 'react-native';

const RepositoryInfo = ({ repository }) => {
  if (!repository) return null;

  return (
    <View style={styles.container}>
      {/* Imagen del propietario */}
      <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
      
      {/* Información básica */}
      <Text style={styles.name}>{repository.fullName}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <Text style={styles.language}>Language: {repository.language}</Text>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <Stat label="Forks" value={repository.forksCount} />
        <Stat label="Stars" value={repository.stargazersCount} />
        <Stat label="Rating" value={repository.ratingAverage} />
        <Stat label="Reviews" value={repository.reviewCount} />
      </View>

      {/* Botón para abrir el repositorio */}
      <Button title="Open Repository" onPress={() => Linking.openURL(repository.url)} />
    </View>
  );
};

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  language: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});
export default RepositoryInfo;
