import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Consulta GraphQL para obtener el usuario actual
const GET_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

// Consulta GraphQL para obtener los libros por género
const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

const FavoriteBooks = () => {
  // Hook para obtener el género favorito del usuario
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_USER);

  // Obtener el género favorito (asegurarse de que siempre se defina aunque sea `null`)
  const favoriteGenre = userData?.me?.favoriteGenre || null;

  // Hook para obtener los libros del género favorito
  const { data, loading, error } = useQuery(GET_BOOKS_BY_GENRE, {
    skip: !favoriteGenre, // Usar `skip` para evitar ejecutar esta query si no hay género favorito
    variables: { genre: favoriteGenre },
  });

  if (userLoading) return <p>Loading user...</p>;
  if (userError) return <p>Error fetching user: {userError.message}</p>;

  // Mostrar mensaje si no hay género favorito
  if (!favoriteGenre) {
    return <p>No favorite genre found for the user.</p>;
  }

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error fetching books: {error.message}</p>;

  // Mostrar mensaje si no se encuentran libros
  if (!data || data.allBooks.length === 0) {
    return <p>No books found for genre: {favoriteGenre}</p>;
  }

  return (
    <div style={{ margin: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Libros Favoritos</h2>
      <p><strong>Género favorito:</strong> {favoriteGenre}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Título</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Año de publicación</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Autor</th>
          </tr>
        </thead>
        <tbody>
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.title}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.published}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{book.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteBooks;
