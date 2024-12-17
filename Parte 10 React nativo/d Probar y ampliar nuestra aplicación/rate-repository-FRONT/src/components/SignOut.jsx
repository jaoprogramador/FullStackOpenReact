import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage'; // Si tienes un hook para manejar el almacenamiento de tokens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await authStorage.removeAccessToken(); // Elimina el token de autenticación
              await apolloClient.resetStore(); // Limpia la caché de Apollo
              navigate('/signin'); // Redirige a la pantalla de inicio de sesión
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Out</Text>
      <Text style={styles.description}>
        Are you sure you want to sign out of your account?
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} color="#d9534f" />
    </View>
  );
};

export default SignOut;
