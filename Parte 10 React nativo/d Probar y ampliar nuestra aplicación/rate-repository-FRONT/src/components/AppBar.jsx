import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import AuthStorage from '../utils/authStorage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_USER); // Consulta para obtener el usuario actual
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();
  console.log("AppBar::::data",data)
  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken(); // Eliminar token
      await apolloClient.resetStore(); // Restablecer la tienda Apollo
    } catch (e) {
      console.error('Error during sign out:', e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab to="/" label="Repositories" />

        {/* Mostrar la pestaña "Create a review" solo si el usuario está autenticado */}
        {data?.me ? (
          <>
            <AppBarTab to="/create-review" label="Create a review" />
            <AppBarTab to="/my-reviews" label="My reviews" />
            <AppBarTab to="/" label="Sign Out" onPress={handleSignOut} />
          </>
        ) : (
          <>
            <AppBarTab to="/signin" label="Sign In" />
            <AppBarTab to="/signup" label="Sign Up" />
          </>
        )}

        {/* Pestañas adicionales, puedes agregar más según sea necesario */}
        <AppBarTab to="/extra1" label="Extra Tab 1" />
        <AppBarTab to="/extra2" label="Extra Tab 2" />
        <AppBarTab to="/extra3" label="Extra Tab 3" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
