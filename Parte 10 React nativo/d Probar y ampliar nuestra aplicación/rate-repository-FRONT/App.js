import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import {  View } from 'react-native';
import Text from './src/components/Text';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
/* import dotenv from 'dotenv';
dotenv.config();   */


const apolloClient = createApolloClient();

const App = () => {
  /* console.log('App:::Constants.manifest ',Constants.manifest);
  console.log('App:::Constants.extra ',Constants.extra);
  console.log("('App:::APOLLO_URI:", process.env.APOLLO_URI);
  console.log("('App:::APOLLO_URI:", process.env.ENV); */
  return (
    
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />;
        </ApolloProvider>
    </NativeRouter>
  </View>
  );
    {/* <NativeRouter>
        <Main />;
    </NativeRouter> */}

  };

export default App;