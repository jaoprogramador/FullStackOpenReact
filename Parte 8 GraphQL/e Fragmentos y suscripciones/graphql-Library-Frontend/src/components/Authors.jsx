
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, UPDATE_AUTHOR } from '../graphql/queries';
import Select from 'react-select';  
const Authors = ({ show }) => {
  /* if (!show) return null; */

  const { loading, error, data } = useQuery(GET_AUTHORS);

  // Definir la mutación y actualizar la caché después de la mutación
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    update: (cache, { data: { updateAuthor } }) => {
      // Leer los datos actuales de la caché
      const { allAuthors } = cache.readQuery({ query: GET_AUTHORS });

      // Actualizar el autor en la caché
      cache.writeQuery({
        query: GET_AUTHORS,
        data: {
          allAuthors: allAuthors.map((author) =>
            author.name === updateAuthor.name
              ? { ...author, born: updateAuthor.born }
              : author
          ),
        },
      });
    },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.allAuthors) {
    return <p>No se encontraron autores.</p>;
  }

  const authorOptions = data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }));

  const handleUpdate = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const born = event.target.born.value;

    updateAuthor({
      variables: { name, born: parseInt(born) }
    })
      .then(response => {
        console.log('Autor actualizado', response);
      })
      .catch(err => {
        console.error('Error al actualizar el autor', err);
      });
  };

  return (
    <div>
      <h2>Autores</h2>
      <table>
        <thead>
          <tr>
            <th>Autor</th>
            <th>Año de nacimiento</th>
            <th>Número de libros</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set Birth Year</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Seleccionar Autor:</label>
          <Select
            id="name"
            name="name"
            options={authorOptions}
            required
          />
        </div>
        <div>
          <label htmlFor="born">Año de nacimiento:</label>
          <input type="text" id="born" name="born" required />
        </div>
        <button type="submit">Actualizar Autor</button>
      </form>
    </div>
  );
};

export default Authors;




