import { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

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

/* const useRepositories = () => {
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
const useRepositories = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network', // Política de recuperación
    });
  
    // Manejo del estado de carga y errores (opcional)
    if (loading) return { loading };
    if (error) return { error };
  
    // Extraer los repositorios de la consulta
    const repositories = data?.repositories?.edges.map(edge => edge.node);
  
    return { repositories };
  };
  


export default useRepositories;