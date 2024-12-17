import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
//import { useHistory } from 'react-router-native'; // Para manejar la navegación
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositories, searchKeyword }) => {
  //const history = useHistory();
  const navigate = useNavigate(); 
  // Filtrar repositorios si hay una palabra clave de búsqueda
  const filteredRepositories = repositories
    ? repositories.filter((repo) =>
        repo.node.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        repo.node.owner.login.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : [];

  const handlePress = (id) => {
    navigate(`/repository/${id}`); 
    //history.push(`/repository/${id}`); // Navegar a la vista del repositorio único
  };

  return (
    <FlatList
      data={filteredRepositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.node.id)}>
          <RepositoryItem item={item.node} />
        </TouchableOpacity>
      )}
    />
  );
};

export default RepositoryList;
