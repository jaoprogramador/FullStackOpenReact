import { Platform } from 'react-native';

// Usamos AsyncStorage solo en React Native, de lo contrario usamos localStorage para la web.
let AsyncStorage;
if (Platform.OS === 'web') {
  AsyncStorage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
  };
} else {
  // En React Native, usamos @react-native-async-storage/async-storage
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
}

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    console.log("AuthStorage:::getAccessTokenINI","");
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      console.log("AuthStorage:::getAccessTokenINI.token",token);
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async setAccessToken(accessToken) {
    try {
      console.log("AuthStorage:::setAccessTokenINI.accessToken",accessToken);
      await AsyncStorage.setItem(
        `${this.namespace}:accessToken`,
        JSON.stringify(accessToken)
      );
    } catch (error) {
      console.error('Error setting access token:', error);
      throw error;
    }
  }

  async removeAccessToken() {
    try {
      console.log("AuthStorage:::removeAccessToken","");
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    } catch (error) {
      console.error('Error removing access token:', error);
      throw error;
    }
  }
}

export default AuthStorage;
