# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# 6.3: crea un filtro y un reducer convinado

# Instala Redux Toolkit
# npm install @reduxjs/toolkit

# 6.10 Mejores Anécdotas, paso 8
# Instala Redux Toolkit en el proyecto. Mueve la creación del store de Redux a su propio archivo store.js y utiliza la función configureStore para crear el store.

# Cambia la definición del filter reducer y sus action creators para usar la función createSlice de Redux Toolkit.

# También, comienza a utilizar Redux DevTools para depurar el estado de la aplicación fácilmente.
# Conclusión:
# Ahora tu proyecto está configurado con Redux Toolkit, el store está movido a un archivo separado (store.js), y el filterReducer utiliza la función createSlice de Redux Toolkit. Además, con Redux DevTools puedes depurar fácilmente el estado de tu aplicación.

# 6.11 Mejores Anécdotas, paso 9
# Cambia también la definición de anecdote reducer y sus action creators para usar la función createSlice de Redux Toolkit.

# Nota de implementación: cuando utilices Redux Toolkit para devolver el estado inicial de las anécdotas, será inmutable, por lo que tendrás que copiarlo para ordenarlas, o te encontraras con el error "TypeError: Cannot assign to read only property". Puedes usar la sintaxis spread para hacer una copia del array. En vez de:

# anecdotes.sort()copy
# Escribe:

# [...anecdotes].sort()




# 6.12 Mejores Anécdotas, paso 10
# La aplicación tiene el esqueleto del componente Notification listo para utilizarlo:

# const Notification = () => {
#   const style = {
#     border: 'solid',
#     padding: 10,
#     borderWidth: 1
#   }
#   return (
#     <div style={style}>
#       render here notification...
#     </div>
#   )# 
# }

# export default Notificationcopy
# Extiende el componente para que muestre el mensaje almacenado en el store de redux, haciendo que el componente tome la siguiente forma:

# import { useSelector } from 'react-redux'

# const Notification = () => {
#   const notification = useSelector(/* something here */)
#   const style = {
 #    border: 'solid',
#     padding: 10,
#     borderWidth: 1
#   }
#   return (
#     <div style={style}>
#       {notification}
#     </div>
#   )
# }copy
# Tendrás que realizar cambios en el reducer existente de la aplicación. Crea un reducer separado para la nueva funcionalidad usando la función createSlice de Redux Toolkit.

# La aplicación no tiene que utilizar el componente Notification completamente en este punto de los ejercicios. Es suficiente con que la aplicación muestre el valor inicial establecido para el mensaje en el notificationReducer.