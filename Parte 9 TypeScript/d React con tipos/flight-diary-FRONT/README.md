Ejercicio 9.16
Crea una aplicación React con Typescript con configuraciones similares a las de las aplicaciones de esta sección. Obtén los diarios del backend y muéstralos en la pantalla. Haz todo el tipado requerido y asegúrate de que no hay errores de ESlint.

Recuerda mantener abierta la pestaña network. Podría darte una pista importante...

Puedes decidir como las entradas de los diarios son mostradas. Si lo deseas, podrías inspirarte en la figura de abajo. Ten en cuenta que la API del backend no devuelve los comentarios del diario, podrías modificarlo para que también los devuelva en la solicitud GET.

CREAMOS EL PROYECTO e INSTALAMOS AXIOS

  npm create vite@latest flight-diary-FRONT -- --template react-ts
  npm install axios

Ejercicio 9.17
Haz que sea posible agregar nuevas entradas al diario desde el frontend. En este ejercicio puedes saltarte todas las validaciones y asumir que el usuario entra los datos en el formato correcto.

ERROR :
localhost/:1 Access to XMLHttpRequest at 'http://localhost:3000/api/diaries' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
SOLUCION: instalar cors en BACK
  npm install cors

Ejercicio 9.18
Notifica al usuario si la creación de una entrada del diario falla en el backend, muestra también el motivo del fallo.

Por ejemplo, dale un vistazo a esto para ver como puedes estrechar los errores de Axios para que puedas hacerte con el mensaje de error.

Tu solución podría verse así:

Ejercicio 9.19
La adición de una entrada de diario ahora es muy susceptible a errores ya que el usuario puede escribir cualquier cosa en los inputs. La situación debe ser mejorada.

Modifica el input del formulario para que la fecha se defina con un elemento de input de tipo date, y el clima y la visibilidad se definan con radio buttons. Ya hemos utilizado radio buttons en la parte 6, ese material puede ser util o no...

Tu aplicación debería estar bien tipada todo el tiempo, no debería tener ningún error de ESlint y ninguna regla de ESlint debería ser ignorada.

Tu solución podría verse así:




