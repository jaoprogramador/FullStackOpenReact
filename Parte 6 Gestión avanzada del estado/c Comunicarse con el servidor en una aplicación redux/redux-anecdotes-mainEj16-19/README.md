# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# 6.14 Anécdotas y el Backend, paso 1
Cuando la aplicación se inicie, obtén las anécdotas del backend implementado usando json-server.

Como datos de backend iniciales, puedes usar, por ejemplo, esto.
# Arranca primero el back y luego el front
# 1         json-server --watch db.json --port 3003
# 2         npm run dev

# 6.16 Anécdotas y el Backend, paso 3
# Modifica la inicialización de la store de Redux para que suceda utilizando action creators asíncronos, los cuales son posibles gracias a la librería Redux Thunk.

# 6.17 Anécdotas y el Backend, paso 4
# También modifica la creación de una nueva anécdota para que suceda usando action creators asíncronos, hecho posible por la librería Redux Thunk.

# 6.19 Anécdotas y el Backend, paso 6
# La creación de notificaciones sigue siendo un poco tediosa, ya que hay que realizar dos acciones y utilizar la función setTimeout:

# dispatch(setNotification(`new anecdote '${content}'`))
# setTimeout(() => {
#   dispatch(clearNotification())
# }, 5000)copy
# Crea un action creator, que te permita proveer la notificación de la siguiente manera:

# dispatch(setNotification(`you voted '${anecdote.content}'`, 10))copy
# El primer parámetro es el texto que sera renderizado y el segundo parámetro es el tiempo durante el cual se mostrara la notificación en segundos.

# Implementa el uso de esta notificación mejorada en tu aplicación.

# Ejercicio 6.21
# Implementa la adición de nuevas anécdotas al servidor usando React Query. La aplicación debe renderizar una nueva anécdota por defecto. Ten en cuenta que el contenido de la anécdota debe tener al menos 5 caracteres de longitud, de lo contrario el servidor rechazará la solicitud POST. No tienes que preocuparte por el control de errores ahora.

# Ejercicio 6.22
# Implementa la votación de anécdotas usando nuevamente React Query. La aplicación debe renderizar automáticamente el número aumentado de votos para la anécdota votada.


# HE HECHO HASTA Ejercicio 6.22
# ============================


