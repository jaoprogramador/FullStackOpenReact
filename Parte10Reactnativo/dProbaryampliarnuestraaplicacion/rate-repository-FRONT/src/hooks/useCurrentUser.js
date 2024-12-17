import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, fetchMore, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    if (!data?.me?.reviews?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        includeReviews: true,
      },
    });
  };

  return {
    user: data?.me,
    loading,
    fetchMore: handleFetchMore,
    refetch,
  };
};

export default useCurrentUser;
