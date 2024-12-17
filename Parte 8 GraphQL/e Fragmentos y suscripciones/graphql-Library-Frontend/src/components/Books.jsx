import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';
import { useState, useEffect } from 'react';

const Books = ({ show }) => {
  // Ejecuta la consulta para obtener los libros
  const { loading, error, data } = useQuery(GET_BOOKS, { fetchPolicy: "cache-and-network" });
  const [selectedGenre, setSelectedGenre] = useState('all genres');

  useEffect(() => {
    console.log("books", data);
    // Agregar un console.log para depurar los datos
    if (data) {
      console.log("Data received from GET_BOOKS:", data);
    }
  }, [data]);

  // Definir los géneros de los botones
  const genres = ['all genres', 'refactoring', 'agile', 'patterns design', 'crime', 'classic'];

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filtrar libros según el género seleccionado
  const filteredBooks = selectedGenre === 'all genres'
    ? data.allBooks
    : data.allBooks.filter(book => book.genres.includes(selectedGenre));

  return (
    <div>
      <h2>Libros</h2>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Año de publicación</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar los libros filtrados */}
          {filteredBooks.map(book => (
            <tr key={book.id || `${book.title}-${book.published}-${book.author.name}`}>
              <td>{book.title}</td>
              <td>{book.published}</td>
              <td>{book.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones para seleccionar el género */}
      <div>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{ fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
