import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import {  View } from 'react-native';
import Text from './src/components/Text';
const App = () => {
  return (
 
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   <NativeRouter>
        <Main />;
    </NativeRouter>
  </View>
  );
    {/* <NativeRouter>
        <Main />;
    </NativeRouter> */}

  };

export default App;