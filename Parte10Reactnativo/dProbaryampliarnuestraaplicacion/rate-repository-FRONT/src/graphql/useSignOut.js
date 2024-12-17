import { useApolloClient } from '@apollo/client';
import AuthStorage from '../utils/authStorage';

const authStorage = new AuthStorage();

const useSignOut = () => {
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken(); // Elimina el token del almacenamiento
    await apolloClient.resetStore(); // Restablece la tienda de Apollo
  };

  return signOut;
};

export default useSignOut;
