
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Books from './components/Books'
import Authors from './components/Authors'
import Notify from './components/Notify'
import RecommendationBooks from './components/RecommendationBooks'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState("authors");


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (
    <div>
      <div>
      <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("newBook")}>add book</button>
        <button onClick={() => setPage("recomendations")}>recomendations</button>
        <button onClick={logout}>logout</button>
      </div>
      {token ? (
        <div>
          <Notify errorMessage={errorMessage} />
          {/* Renderizamos el componente según el valor de page */}
          {page === "authors" && <Authors show={page === "authors"} />}
          {page === "books" && <Books show={page === "books"} />}
          {page === "newBook" && <NewBook show={page === "newBook"} />}
          {page === "recomendations" && <RecommendationBooks show={page === "recomendations"} />}
          
          
        </div>
      ) : (
        <div>
          <Notify errorMessage={errorMessage} />
          <LoginForm setToken={setToken} setError={notify}/>
        </div>
      )}
    </div>
  )
}
export const updateCache = (cache, query, addedBook) => {
  // Utilizamos el mismo método de filtrado que usaste anteriormente para evitar duplicados
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  // Actualizamos la caché con el nuevo libro
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    };
  });
};

export default App
