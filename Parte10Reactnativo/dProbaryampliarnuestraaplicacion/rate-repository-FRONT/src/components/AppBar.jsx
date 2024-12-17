import React from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries'; 
//import useSignOut from '../hooks/useSignOut';
import useSignOut from '../hooks/useSignOut';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24292e',
    paddingTop: 40,
    paddingBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },

    
    
  });



const AppBar = () => {
  const { data, loading  } = useQuery(ME); 
  const signOut = useSignOut();

  const handleSignOut = async () => {
    console.log('AppBar:::cerrar sesion')
    try {
      await signOut();
    } catch (e) {
      console.error('Error during sign-out:', e);
    }
  };

  // Si la consulta está cargando, muestra un texto vacío (puedes personalizar este estado si prefieres).
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    );
  }
  const isLoggedIn = !!data?.me; // Verifica si hay un usuario autenticado
  console.log('AppBar:: isLoggedIn',isLoggedIn)
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab to="/" label="Inicio" />
        <AppBarTab to="/respositoryList" label="Repositories" />
        {isLoggedIn && <AppBarTab to="/create-review" label="Create a Review" />}
        {/* {isLoggedIn && <AppBarTab to="/repository/:id/reviews" label="Reviews" />}  */}
        {isLoggedIn && <AppBarTab to="/my-reviews" label="My Reviews" />}
        {!isLoggedIn && <AppBarTab to="/signup" label="Sign Up" />}
        
        <AppBarTab to="/extra1" label="Extra Tab 1" />
        <AppBarTab to="/extra3" label="Extra Tab 3" />
        {isLoggedIn ? (
          <AppBarTab onPress={handleSignOut} label="Sign Out" />
        ) : (
          <AppBarTab to="/signin" label="Sign In" />
        )}
        
       

        
      </ScrollView>
    </View>
    );
  };
  
  export default AppBar;
  
