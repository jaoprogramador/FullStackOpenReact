# Añadir el componente LOGIN
# tenemos que tener levantado la parte back con el api :
#       http://localhost:3001/api/notes
# luego tenemos que levantar la parte FRONT
#       http://localhost:5173/




# 7.9: Formateo Automático de Código
# En las partes anteriores, usamos ESLint para asegurarnos de que el código siga las convenciones definidas. Prettier es otra forma de hacer lo mismo. Según la documentación, Prettier es un formateador de código opinado, es decir, Prettier no solo controla el estilo del código sino que también lo formatea de acuerdo con la definición.

# Prettier es fácil de integrar en el editor de código para que cuando se guarde, se formatee automáticamente.

# Integra Prettier en tu aplicación y configúralo para que funcione con tu editor.

# INSTALAR

# npm install --save-dev prettier

# CREAR FICHERO 
# .prettierrc

# INTEGRAR PERTNIER CON ESLINT
# npm install --save-dev eslint-config-prettier eslint-plugin-prettier




# 7.10: Redux, Paso 1
# Refactoriza la aplicación para que utilice Redux para administrar los datos de la notificación.

# 7.11: Redux, Paso 2
# Ten en cuenta que este y los dos ejercicios siguientes son bastante laboriosos pero increíblemente educativos.

# Almacena la información sobre publicaciones de blog en el store de Redux. En este ejercicio basta con que puedas ver los blogs en el backend y crear un nuevo blog.

# Puedes administrar el estado para iniciar sesión y crear nuevas publicaciones de blog utilizando el estado interno de los componentes de React.


# 7.12: Redux, Paso 3
# Amplía tu solución para que sea posible volver a dar me gusta y eliminar un blog.

# 7.13: Redux, Paso 4
# Almacena la información sobre el usuario que inició sesión en el store de Redux.

# Administración de estado: React Query y Context
# Hay dos versiones alternativas para elegir para los ejercicios 7.10-7.13: puedes hacer la administración de estado de la aplicación utilizando Redux o React Query y Context. Si deseas maximizar tu aprendizaje, ¡deberías hacer ambas versiones!

<!-- COMENTARIO DE BLOQUE SHIFT ALT A -->

# 7.10: React Query y Context, paso 1
# Refactoriza la aplicación para usar el hook useReducer para administrar los datos de la notificación.

# 7.11: Redux, Paso 2
# Ten en cuenta que este y los dos ejercicios siguientes son bastante laboriosos pero increíblemente educativos.

# Almacena la información sobre publicaciones de blog en el store de Redux. En este ejercicio basta con que puedas ver los blogs en el backend y crear un nuevo blog.

# Puedes administrar el estado para iniciar sesión y crear nuevas publicaciones de blog utilizando el estado interno de los componentes de React.

# HE CREADO EL COMPONENTE LISTUSERS PERO NO CARGA

# Vistas
# El resto de las tareas son comunes tanto para las versiones de Redux como para la de React Query

# 7.14: Vista de usuarios
# Implementa una vista en la aplicación que muestre toda la información básica relacionada con los usuarios:

# 01/11/2024

# 7.15: Vista de Usuario Individual
# Implementa una vista para usuarios individuales, que muestre todas las publicaciones de blog agregadas por ese usuario:

HE CREADO EL MENUnAV, COMPONENTES RESTANTES DE BLOGS, AJUSTAR LA PANTALLA, SERVICIO PARA LLAMADA Y HET BLOGSBYID
    QUEDA PENDIENTE TESTEAR TODO Y AÑADIR ESTILOS

1 no funciona el like-delete OK
2 no aparece el formBlogs OK
3 navegacion a detalle blogs OK
4 navegación a usuario detalle OK 
5 error al dar al detalle xq faltaba el backController OK
6 poner estilo adecentarlo OK 
7 que sea lo mas parecido a lo que pide el ejercicio OK

8 poner estilo al menubar OK
9 el detalle BLOG peta OK




