//import 'dotenv/config';
/* import {ApolloClient,InMemoryCache,HttpLink  } from 'apollo-boost'; */
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import Constants from 'expo-constants';


// Crea un enlace HTTP para conectarte al endpoint de GraphQL
const httpLink = new HttpLink({
  uri: 'http://192.168.1.153:4000/graphql', // Reemplaza con tu endpoint
  //uri: Constants.manifest.extra?.apolloUri || 'http://192.168.1.153:4000/graphql',
});

// Crea una instancia de ApolloClient
const createApolloClient = () => {
  return new ApolloClient({
    // Replace the IP address part with your own IP address!
    //uri: 'http://192.168.1.153:4000/graphql',
    link: httpLink, 
    cache: new InMemoryCache()

  });
};

export default createApolloClient;