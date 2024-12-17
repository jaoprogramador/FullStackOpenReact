import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES2 } from '../graphql/queries'; // Asegúrate de tener esta consulta
import { Menu, Divider, Button } from 'react-native-paper'; // Menú para la selección
import RepositoryList from '../components/RepositoryList'; // Suponiendo que ya tienes el componente de la lista
import { useDebouncedValue } from 'use-debounce'; // Para debounce en el campo de búsqueda

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
  header: {
    padding: 10,
    backgroundColor: '#24292e',
    color: '#fff',
  },
  menuButton: {
    margin: 10,
  },
  searchBar: {
    height: 40,
    margin: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

const RepositoryListScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [orderBy, setOrderBy] = useState('CREATEDAT'); // Predeterminado: por fecha de creación
  const [orderDirection, setOrderDirection] = useState('DESC'); // Predeterminado: descendente (más reciente primero)
  const [searchKeyword, setSearchKeyword] = useState(''); // Para el filtro de búsqueda
  const [debouncedSearchKeyword] = useDebouncedValue(searchKeyword, 500); // Debounce para evitar peticiones rápidas

  // Consulta para obtener los repositorios con los parámetros de orden y búsqueda
  const { loading, error, data } = useQuery(GET_REPOSITORIES2, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword: debouncedSearchKeyword, // Usamos el término de búsqueda con debounce
    },
  });

  const toggleMenu = () => setMenuVisible(!menuVisible);

  // Manejar el cambio en el orden de los repositorios
  const handleOrderChange = (order) => {
    setMenuVisible(false);
    switch (order) {
      case 'Latest repositories':
        setOrderBy('CREATEDAT');
        setOrderDirection('DESC');
        break;
      case 'Highest rated repositories':
        setOrderBy('RATINGAVERAGE');
        setOrderDirection('DESC');
        break;
      case 'Lowest rated repositories':
        setOrderBy('RATINGAVERAGE');
        setOrderDirection('ASC');
        break;
      default:
        setOrderBy('CREATEDAT');
        setOrderDirection('DESC');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Latest repositories</Text>

        {/* Campo de búsqueda */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search repositories"
          value={searchKeyword}
          onChangeText={setSearchKeyword} // Actualiza la palabra clave con cada cambio
        />

        {/* Botón de orden */}
        <Button style={styles.menuButton} onPress={toggleMenu}>
          Select order
        </Button>

        {/* Menú de selección de orden */}
        <Menu
          visible={menuVisible}
          onDismiss={toggleMenu}
          anchor={<Button onPress={toggleMenu}>Select an item...</Button>}
        >
          <Menu.Item onPress={() => handleOrderChange('Latest repositories')} title="Latest repositories" />
          <Menu.Item onPress={() => handleOrderChange('Highest rated repositories')} title="Highest rated repositories" />
          <Menu.Item onPress={() => handleOrderChange('Lowest rated repositories')} title="Lowest rated repositories" />
          <Divider />
        </Menu>
      </View>

      {/* Mostrar repositorios */}
      <RepositoryList loading={loading} error={error} data={data} />
    </View>
  );
};

export default RepositoryListScreen;
