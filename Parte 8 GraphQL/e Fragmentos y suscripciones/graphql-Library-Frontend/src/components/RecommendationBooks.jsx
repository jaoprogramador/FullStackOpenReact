import { useQuery } from '@apollo/client';
import { GET_BOOKS_BY_GENRE, GET_USER_FAVORITE_GENRE } from '../graphql/queries';

const RecommendationBooks = () => {
  // Obtener el género favorito del usuario
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER_FAVORITE_GENRE);

  // Obtener los libros basados en el género favorito del usuario
  const favoriteGenre = userData?.me?.favoriteGenre;
  
  // Realizar la consulta para obtener los libros por el género favorito
  const { data, loading, error } = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre, // Omitir la consulta si el género favorito no está disponible
  });

  if (userLoading || loading) return <p>Cargando...</p>;
  if (userError || error) return <p>Error: {userError?.message || error?.message}</p>;

  // Si no hay libros recomendados, mostramos un mensaje
  const recommendedBooks = data?.allBooks || [];

  return (
    <div>
      <h2>Libros recomendados</h2>
      <p>Género favorito: {favoriteGenre || 'N/A'}</p>
      
      {recommendedBooks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Año de publicación</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {recommendedBooks.map(book => (
              <tr key={book.id || `${book.title}-${book.published}-${book.author.name}`}>
                <td>{book.title}</td>
                <td>{book.published}</td>
                <td>{book.author.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron libros recomendados para este género.</p>
      )}
    </div>
  );
};

export default RecommendationBooks;
