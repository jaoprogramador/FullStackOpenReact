/* import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories(); 
  console.log('RepositoryList:::repositories',repositories);
  // Manejo del estado de carga
  if (loading) {
    return <Text>Loading...</Text>;
  }
  // Manejo de error
  if (error) {
    return <Text>Error loading repositories!</Text>;
  }

  // Verificar si no hay repositorios
  if (repositories.length === 0) {
    return <Text>No repositories available</Text>;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id} // Asegúrate de que los elementos tengan una clave única
      renderItem={({ item }) => <RepositoryItem item={item} />} 
    />
  );
};

export default RepositoryList; */
import React, { useState, useCallback } from 'react';
import { FlatList, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import OrderSelector from './OrderSelector';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ListHeader = React.memo(({ searchKeyword, setSearchKeyword, selectedOrder, setSelectedOrder }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        style={styles.searchbar}
      />
      <OrderSelector
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </View>
  );
});

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const [selectedOrder, setSelectedOrder] = useState('latest');

  const orderByMap = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  };

  const { orderBy, orderDirection } = orderByMap[selectedOrder];

  const { repositories, loading, error } = useRepositories({
    searchKeyword: debouncedSearchKeyword,
    orderBy,
    orderDirection,
  });

  const navigate = useNavigate();

  const handlePress = (id) => {
    //navigate(`/repository/${id}`);
    navigate(`/repository/${id}`);
  };

  const memoizedSetSearchKeyword = useCallback((text) => setSearchKeyword(text), []);
  const memoizedSetSelectedOrder = useCallback((order) => setSelectedOrder(order), []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.node.id)}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading repositories!</Text>;
  if (!repositories || repositories.length === 0) return <Text>No repositories available</Text>;
  console.log('repositoryList:::repositories',repositories)
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.node.id}
      renderItem={renderItem}
      ListHeaderComponent={
        <ListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={memoizedSetSearchKeyword}
          selectedOrder={selectedOrder}
          setSelectedOrder={memoizedSetSelectedOrder}
        />
      }
    />
  );
};

export default RepositoryList;


