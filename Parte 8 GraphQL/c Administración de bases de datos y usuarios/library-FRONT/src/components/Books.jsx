import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';



// eslint-disable-next-line react/prop-types
const Books = ({ show }) => {
  // Verifica si `show` es `false` y evita renderizar si es así.
  if (!show) {
    return null;
  }

  // Ejecuta la consulta para obtener los libros
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.published}</td>
              <td>{book.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;

