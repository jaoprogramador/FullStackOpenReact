import { gql, useQuery } from '@apollo/client';
/*
const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

 const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch('http://192.168.1.153:5001/api/repositories');
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
}; */
//VERSION UNO DE USEREPOSITORY
/* const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', // Política de recuperación
  });

  // Manejo del estado de carga y errores
  if (loading) return { loading: true, repositories: [] };  // Retorna repositorios vacíos mientras carga
  if (error) return { error, repositories: [] };             // Si hay un error, retorna repositorios vacíos
  console.log('HOOK:::useRepositories',data);
  // Asegúrate de que los datos sean correctos y devuelve el array de repositorios
  const repositories = data?.repositories?.edges?.map(edge => edge.node) || []; 

  return { repositories };
}; */
//VERSION2 DE USERREPOSITORY
//VERSION2 DE GET_REPOSITORIES PARAMETRIZADO POR ORDEN BY DESC O ASC
/* export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
} 

`;
const useRepositories = ({ orderBy = 'CREATED_AT', orderDirection = 'DESC' } = {}) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  });

   // Desestructurar datos correctamente
   const repositories = data?.repositories?.edges.map(edge => edge.node) || [];

   return {
     repositories,
     loading,
     refetch,
     error,
   };
};*/
//VERSION 3
const GET_REPOSITORIES = gql`
  query repositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      node {
        id
        name
        ownerName
        fullName
        reviewCount
        ratingAverage
        forksCount
        stargazersCount
        description
        language
        ownerAvatarUrl

        }
      }
    }
  }
`;

const useRepositories = ({ searchKeyword = '', orderBy = 'CREATED_AT', orderDirection = 'DESC' }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword, orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories?.edges || [],
    loading,
    error,
  };
};



export default useRepositories; 