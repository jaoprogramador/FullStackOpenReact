import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations'; // Asegúrate de tener la mutación definecida
import AuthStorage from '../utils/authStorage'; // El archivo de almacenamiento que creaste

const authStorage = new AuthStorage();

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();
  console.log('HOOK:::INI useSignIn')
  const signIn = async ({ username, password }) => {
    console.log('HOOK:::INI useSignIn.signIn',signIn)
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data?.authorize?.accessToken) {
      await authStorage.setAccessToken(data.authorize.accessToken); // Guarda el token
      await apolloClient.resetStore(); // Restablece la tienda Apollo
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
