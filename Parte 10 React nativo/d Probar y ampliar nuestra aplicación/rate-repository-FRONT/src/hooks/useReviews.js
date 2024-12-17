import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (repositoryId, first) => {
  const [reviews, setReviews] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  const { data, loading, fetchMore, error } = useQuery(GET_REVIEWS, {
    variables: { repositoryId, first },
    fetchPolicy: 'cache-and-network',
  });

  // Actualiza las revisiones y la información de la página al cargar datos
  useEffect(() => {
    if (data?.repository?.reviews) {
      const { edges, pageInfo } = data.repository.reviews;
      setReviews(edges);
      setPageInfo(pageInfo);
    }
  }, [data]);

  // Función para cargar más revisiones
  const fetchMoreReviews = async () => {
    if (pageInfo?.hasNextPage) {
      const { data: moreData } = await fetchMore({
        variables: { after: pageInfo.endCursor },
      });

      if (moreData?.repository?.reviews) {
        const { edges: newEdges, pageInfo: newPageInfo } = moreData.repository.reviews;
        setReviews((prev) => [...prev, ...newEdges]);
        setPageInfo(newPageInfo);
      }
    }
  };

  return { reviews, loading, error, fetchMoreReviews, pageInfo };
};

export default useReviews;
