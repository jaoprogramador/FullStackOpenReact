import React from 'react';
//import 'dotenv/config';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import {  View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'; 

/* import { ApolloProvider } from '@apollo/react-hooks'; */
import { ApolloProvider } from '@apollo/client';  
import Constants from 'expo-constants';
import createApolloClient from './src/utils/apolloClient';

import AuthStorage from './src/utils/authStorage';
/* import AuthStorageContext from './src/context/AuthStorageContext'; */

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);



const App = () => {
  

console.log('JAO ',Constants.expoConfig.extra);



  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NativeRouter>
      
          <ApolloProvider client={apolloClient}>
            {/*  <AuthStorageContext.Provider value={authStorage}> */}
                <Main />
              {/* </AuthStorageContext.Provider> */}
            </ApolloProvider> 
          </NativeRouter>
      </View>
  </PaperProvider>
  );
  

  };

export default App;