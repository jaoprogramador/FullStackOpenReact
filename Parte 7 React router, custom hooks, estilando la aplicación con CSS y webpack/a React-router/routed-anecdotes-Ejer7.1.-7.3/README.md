# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


7.1: Anécdotas Enrutadas, paso 1
Agrega React Router a la aplicación para que al hacer clic en los enlaces del componente Menu, se pueda cambiar la vista.

En la raíz de la aplicación, es decir, la ruta /, muestra la lista de anécdotas:
El componente Footer siempre debe estar visible en la parte inferior.

La creación de una nueva anécdota debería ocurrir en la ruta create:

1 instalamos 
    npm install react-router-dom
2 importamos las librerias 
    import {
        BrowserRouter as Router,
        Routes,
        Route,
        Link
        } from 'react-router-dom'
3 ajustar los paths en el menú

    const Menu = () => {
        const padding = {
            paddingRight: 5
        }
        return (
            <div>
            <Link to="/" style={padding}>anecdotes</Link>
            <Link to="/create" style={padding}>create new</Link>
            <Link to="/about" style={padding}>about</Link>
            </div>
        )
        }
4.- envolver el render con el componente Router
        return (
        <Router>
            <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Routes>
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
            </div>
        </Router>
        )
        }

7.2: Anécdotas Enrutadas, paso 2
Implementa una vista para mostrar una sola anécdota:
La navegación a la página que muestra la anécdota única se realiza haciendo clic en el nombre de esa anécdota.

7.3: Anécdotas Enrutadas, paso 3
La funcionalidad predeterminada del formulario de creación es bastante confusa, porque parece que no sucede nada después de crear una nueva anécdota utilizando el formulario.

Mejora la funcionalidad de tal manera que después de crear una nueva anécdota la aplicación pasa automáticamente a mostrar la vista de todas las anécdotas y al usuario se le muestra una notificación informándole de esta creación exitosa durante los próximos cinco segundos:


