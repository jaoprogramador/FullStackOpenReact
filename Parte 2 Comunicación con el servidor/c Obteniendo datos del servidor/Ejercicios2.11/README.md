# React + Vite
# Documentado en 
# https://fullstackopen.com/es/part1/introduccion_a_react
# instalar un servidor local como si fuese una BD en local mediante un JSON
# creamos el fichero db.jscon
# npm install -g json-server.
# npx json-server --port 3001 --watch src/db.json

# instalamos axios, para poder hacer llamadas fetch "promesas" al servidor que es mejor que XHR xml http request
# npm install axios

# istalamos 
# npm install json-server --save-dev
# Nuestra primera tarea es recuperar las notas ya existentes en nuestra aplicación React desde la dirección http://localhost:3001/notes.

# En el proyecto de ejemplo ya aprendimos una manera de obtener datos de un servidor usando JavaScript. El código del ejemplo obtenía los datos mediante XMLHttpRequest, también conocido como solicitud HTTP realizada mediante un objeto XHR. Esta es una técnica introducida en 1999, que todos los navegadores han admitido durante un buen tiempo.

# Ya no se recomienda el uso de XHR, y los navegadores ya admiten ampliamente el método fetch, que se basa en las llamadas promesas (promises), en lugar del modelo impulsado por eventos utilizado por XHR

# La Agenda Telefónica Paso 6
# ==============================
# Continuamos con el desarrollo de la agenda telefónica. Almacena el estado inicial de la aplicación en el archivo db.json, que debe ubicarse en la raíz del proyecto.
# Modifica la aplicación de modo que el estado inicial de los datos se obtenga del servidor mediante la librería axios. Completa la obtención de los datos con un Effect hook.





