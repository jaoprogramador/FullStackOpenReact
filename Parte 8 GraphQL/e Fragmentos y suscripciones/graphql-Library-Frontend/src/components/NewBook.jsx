import React, { useState } from 'react';
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client';
import { GET_BOOKS , ADD_BOOK , BOOK_ADDED  } from '../graphql/queries'
// Definir la mutación GraphQL para agregar el libro


const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');  // Solo almacenamos el nombre del autor
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  
  // Hook useMutation para la mutación ADD_BOOK
  const [addBook, { loading, error, data }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      // Limpiar el formulario después de agregar el libro
      setTitle('');
      setAuthor('');
      setPublished('');
      setGenres([]);
      setGenre('');
    },
    onError: (err) => {
      console.error(err);
    },
    update: (cache, { data: { addBook } }) => {
      // Actualizamos la caché después de agregar el libro
      const existingBooks = cache.readQuery({ query: GET_BOOKS });
      const newBooks = existingBooks ? [...existingBooks.allBooks, addBook] : [addBook];
      
      cache.writeQuery({
        query: GET_BOOKS,
        data: { allBooks: newBooks },
      });
    },
  });

   // Suscripción a los cambios de los libros
   useSubscription(BOOK_ADDED, {
    onError: (error) => {
      console.log('SUBSCRIPTION FRONTERROR',error)
      setError(error.graphQLErrors[0].message)
    },
    onData: ({ data }) => {
      console.log('SUBSCRIPTION FRONT',data)
      const addedBook= data.data.bookAdded
      notify(`${addedBook.name} added`)
      updateCacheWith(addedBook)
      window.alert(`New book added: "${addedBook.title}" by ${addedBook.author.name}`);
    }

  }); 
  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    if (!title || !author || !published || genres.length === 0) {
      console.error("All fields must be filled out!");
      return; // Evitar hacer la mutación si falta algún campo.
    }else{
      console.log('FRONT title',title)
      console.log('FRONT author',author)
      console.log('FRONT published',published)
      console.log('FRONT genres',genres)
      
    }

    // Pasamos el nombre del autor como un objeto { name }
    addBook({
      variables: {
        title,
        author: { name: author },  // Solo pasamos el nombre del autor
        published: parseInt(published, 10),
        genres,
      },
    }).then((response) => {
      if (response.errors) {
        console.error("GraphQL Error:", response.errors);
      } else {
        console.log("Book added:", response.data.addBook);
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
