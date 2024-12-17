import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (repositoryId, first = 5) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: { repositoryId, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    if (!data?.repository.reviews.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    reviews: data?.repository.reviews.edges.map((edge) => edge.node) || [],
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
