import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = 'authToken'; // Clave para guardar el token en el almacenamiento

class AuthStorage {
  /**
   * Obtiene el token de autenticación almacenado.
   * @returns {Promise<string | null>} El token o `null` si no existe.
   */
  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      return token;
    } catch (error) {
      console.error('Error retrieving access token:', error);
      return null;
    }
  }

  /**
   * Almacena el token de autenticación.
   * @param {string} token - El token a guardar.
   */
  async setAccessToken(token) {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  }

  /**
   * Elimina el token de autenticación.
   */
  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing access token:', error);
    }
  }
}

/**
 * Hook para usar `AuthStorage`.
 * @returns {AuthStorage} Instancia de `AuthStorage`.
 */
const useAuthStorage = () => {
  return new AuthStorage();
};

export default useAuthStorage;