# React + Vite
# Documentado en 
# https://fullstackopen.com/es/part1/introduccion_a_react
# instalar un servidor local como si fuese una BD en local mediante un JSON
# creamos el fichero db.jscon
# npm install -g json-server
# npx json-server --port 3001 --watch src/db.json

# instalamos axios, para poder hacer llamadas fetch "promesas" al servidor que es mejor que XHR xml http request
# npm install axios

# istalamos 
# npm install json-server --save-dev
# Nuestra primera tarea es recuperar las notas ya existentes en nuestra aplicación React desde la dirección http://localhost:3001/notes.

# En el proyecto de ejemplo ya aprendimos una manera de obtener datos de un servidor usando JavaScript. El código del ejemplo obtenía los datos mediante XMLHttpRequest, también conocido como solicitud HTTP realizada mediante un objeto XHR. Esta es una técnica introducida en 1999, que todos los navegadores han admitido durante un buen tiempo.

# Ya no se recomienda el uso de XHR, y los navegadores ya admiten ampliamente el método fetch, que se basa en las llamadas promesas (promises), en lugar del modelo impulsado por eventos utilizado por XHR

# 2.12: La Agenda Telefónica paso 7
# Volvamos a nuestra aplicación de agenda telefónica.

# Actualmente, los números que se agregan a la agenda telefónica no se guardan en un servidor backend. Soluciona esta situación.

# 2.13: La Agenda Telefónica paso 8
# Extrae el código que maneja la comunicación con el backend en su propio módulo siguiendo el ejemplo mostrado anteriormente en esta parte del material del curso.

# 2.14: La Agenda Telefónica paso 9
# Permite a los usuarios eliminar entradas de la agenda telefónica. La eliminación se puede # hacer a través de un botón dedicado para cada persona en la lista de la agenda # telefónica. Puedes confirmar la acción del usuario utilizando el método window.confirm:

#  El recurso asociado a una persona en el backend se puede eliminar haciendo una solicitud HTTP DELETE a la URL del recurso. Si estamos eliminando, por ejemplo, a una persona que tiene el id 2, tendríamos que hacer una solicitud HTTP DELETE a la URL localhost:3001/persons/2. No se envía ningún dato con la solicitud.

# Puedes hacer una solicitud HTTP DELETE con la librería axios de la misma manera que hacemos todas las demás solicitudes.

# NB: No puedes usar el nombre delete para una variable porque es una palabra reservada en JavaScript. Por ejemplo, lo siguiente no es posible:

# 2.15*: La Agenda Telefónica paso 10
#  ¿Por qué hay un asterisco en el ejercicio? Consulta aquí para obtener la explicación.

# Cambia la funcionalidad para que si se agrega un número a un usuario que ya existe, el nuevo número reemplace al antiguo. Se recomienda usar el método HTTP PUT para actualizar el número de teléfono.

# Si la información de la persona ya está en la agenda telefónica, la aplicación puede pedirle al usuario que confirme la acción:

# ======================================
# Despliegue de la aplicación a Internet

