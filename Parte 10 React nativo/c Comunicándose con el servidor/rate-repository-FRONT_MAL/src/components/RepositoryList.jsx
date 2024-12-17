import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  
  //PASO 3
  //=======
  const { repositories } = useRepositories(); 
  console.log('RepositoryList:::repositories',repositories);
  const repositoryNodes = Array.isArray(repositories?.edges) 
    ? repositories.edges.map(edge => edge.node) 
    : [];

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#f9f9f9' }}>
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );


   
};

export default RepositoryList;