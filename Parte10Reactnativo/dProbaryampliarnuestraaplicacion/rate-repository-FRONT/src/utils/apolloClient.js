//import 'dotenv/config';
//import {ApolloClient,InMemoryCache,HttpLink  } from 'apollo-boost'; 
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';

// Obtén la URI desde las constantes del sistema
const uri_graphql = Constants.expoConfig.extra.apolloUri || 'http://localhost:4000/graphql';

// Crea un enlace HTTP para conectarte al endpoint de GraphQL
const httpLink = new HttpLink({
  uri: uri_graphql,
  //uri: 'http://localhost:4000/graphql',
  //uri: 'http://192.168.1.153:4000/graphql', // Reemplaza con tu endpoint
  //uri: Constants.manifest.extra?.apolloUri || 'http://192.168.1.153:4000/graphql',
});

// Crea una instancia de ApolloClient
/* const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    //uri: 'http://192.168.1.153:4000/graphql',
    link: httpLink, 
    cache: new InMemoryCache()

  });
}; */
const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken(); // Obtén el token desde el almacenamiento
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.error('Error al obtener el token de acceso:', e);
      return { headers };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink), // Combina los enlaces
    cache: new InMemoryCache(),
  });
};


export default createApolloClient;