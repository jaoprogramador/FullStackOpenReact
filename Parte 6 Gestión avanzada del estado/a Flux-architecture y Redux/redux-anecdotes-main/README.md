# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# 6.3: Anécdotas, paso 1
# Implementa la funcionalidad para votar anécdotas. La cantidad de votos debe guardarse en una store de Redux.

# 6.4: Anécdotas, paso 2
# Implementa la funcionalidad para agregar nuevas anécdotas.

# Puedes mantener el formulario no controlado, como hicimos antes.

# 6.5: Anécdotas, paso 3
# Asegúrate de que las anécdotas estén ordenadas por número de votos.

# 6.6: Anécdotas, paso 4
# Si aún no lo haz hecho, separa la creación de objetos de acción en funciones action creator y colócalos en el archivo src/reducers/anecdoteReducer.js, así que haz lo que hemos estado haciendo desde el capítulo action creators.

# 6.7: Anécdotas, paso 5
# Separa la creación de nuevas anécdotas en su propio componente llamado AnecdoteForm. Mueve toda la lógica para crear una nueva anécdota en este nuevo componente.

# 6.8: Anécdotas, paso 6
# Separa el renderizado de la lista de anécdotas en su propio componente llamado AnecdoteList. Mueve toda la lógica relacionada con la votación de una anécdota a este nuevo componente.

# Ahora, el componente App debería verse así:

# import AnecdoteForm from './components/AnecdoteForm'
# import AnecdoteList from './components/AnecdoteList'

# const App = () => {
#   return (
#     <div>
#       <h2>Anecdotes</h2>
#       <AnecdoteList />
#       <AnecdoteForm />
#     </div>
#   ) }

# export default App