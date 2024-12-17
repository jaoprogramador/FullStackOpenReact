import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
// Definir la mutación GraphQL para agregar el libro


const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name  
        born 
      }
      published
      genres
    }
  }
`;


const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // Hook useMutation para la mutación ADD_BOOK
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      // Limpiar el formulario después de agregar el libro
      setTitle('');
      setAuthor('');
      setPublished('');
      setGenres([]);
      setGenre('');
    },
    onError: (err) => {
      // Puedes manejar el error si lo necesitas
      console.error(err);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    if (!title || !author || !published || genres.length === 0) {
      console.error("All fields must be filled out!");
      return; // Evitar hacer la mutación si falta algún campo.
    }
    
      console.log("title ",title);
      console.log("author ",author);
      console.log("published ",parseInt(published, 10));
      console.log("genres ",genres);
      
    // Ejecutar la mutación ADD_BOOK
    /* addBook({
      variables: {
        title,
        author,
        published: parseInt(published, 10), // Convertir a número
        genres,
      },
    //}).then((data) => console.log("FRONT Book added:", data.addBook));
    }).then((response) => console.log("FRONT Full response:", response)); */
    addBook({
      variables: {
        title,
        author,
        published: parseInt(published, 10),
        genres,
      },
    }).then((response) => {
      if (response.errors) {
        console.error("GraphQL Error:", response.errors);
      } else {
        console.log("FRONT Book added:", response.data.addBook);
      }
    });
    
  };

  const addGenre = () => {
    if (genre && !genres.includes(genre)) {
      setGenres([...genres, genre]);
    }
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="published">Published</label>
          <input
            id="published"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add Genre
          </button>
        </div>
        <div>Genres: {genres.join(', ')}</div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding Book...' : 'Create Book'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Book "{data.addBook.title}" added successfully!</p>}
    </div>
  );
};

export default NewBook;
