import { useApolloClient } from '@apollo/client';
import AuthStorage from '../utils/authStorage';
import { useNavigate } from 'react-router-native';
const useSignOut = () => {
  console.log('HOOK::: useSignOut')
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken(); // Elimina el token del almacenamiento
      await apolloClient.resetStore(); // Restablece la tienda Apollo
      navigate('/respositoryList'); 
    } catch (e) {
      console.error('HOOK::: useSignOut ERROR during sign-out:', e);
    }
  };

  return signOut;
};

export default useSignOut;
