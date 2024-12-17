import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, 
  split, createHttpLink 
 } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

// Autenticación: Añadir el token en los encabezados
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  };
});

// Configuración de WebSocketLink para suscripciones
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,  // Usar `wss://` para producción con HTTPS
  options: {
    reconnect: true,
  },
});

// Configuración de HTTPLink
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',  
}); 

// Usar 'split' para redirigir las suscripciones al WebSocketLink y las demás operaciones al HTTPLink
const splitLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,  // Enviar suscripciones a WebSocket
  authLink.concat(httpLink)  // Enviar todo lo demás a HTTP
);

// Crear el cliente de Apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,  // Usar splitLink para manejar las suscripciones y las operaciones HTTP
}); 


// Renderizar el componente React con ApolloProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
