# Patientor frontend

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.
  - The app should work without a backend, but make sure that the request made to ```/api/ping``` made on startup is successful before continuing.
  - 
- el back tiene este endpoint
  -  http://localhost:3001/api/diaries
-  
INSTALAMOS ICONOS 
  npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

9.23: Patientor, paso 4
Amplía la página de un paciente en el frontend para listar date, description y diagnoseCodes de las entradas del paciente.

Puedes utilizar la misma definición de tipo para una Entry en el frontend. Para estos ejercicios, basta con copiar/pegar las definiciones del backend al frontend.

Tu solución podría verse así:

9.24: Patientor, paso 5
Obtén y agrega diagnósticos al estado de la aplicación desde el endpoint /api/diagnoses. Utiliza los nuevos datos de diagnóstico para mostrar las descripciones de los códigos de diagnóstico del paciente:

9.25: Patientor, paso 6
Amplía la lista de entradas en la página del paciente para incluir los detalles de la entrada, con un nuevo componente que muestra el resto de la información de las entradas de los pacientes, distinguiendo diferentes tipos entre sí.

Podrías utilizar, por ejemplo. Icons o algún otro componente de Material UI para obtener imágenes apropiadas para tu listado.

Debes utilizar un renderizado basado en switch case y una comprobación de tipo exhaustiva para que no se puedan olvidar casos.

Como esto:
9.26: Patientor, paso 7
Hemos establecido que los pacientes pueden tener diferentes clases de entradas. Todavía no tenemos ninguna forma de agregarle entradas a los pacientes en nuestra aplicación, es bastante inútil como registro médico electrónico.

Tu siguiente tarea es agregar un endpoint /api/patients/:id/entries a tu backend, a través del cual puedas hacer un POST para agregar una entrada para un paciente.

Recuerda que tenemos diferentes tipos de entradas en nuestra aplicación, por lo que nuestro backend debe admitir todos esos tipos y verificar que se proporcionen al menos todos los campos obligatorios para cada tipo.

En este ejercicio probablemente tengas que recordar este truco

Podrías asumir que los códigos de diagnóstico son enviados en el formato correcto y utilizar, por ejemplo, el siguiente tipo de parser para extraerlos del body de la solicitud:


9.27: Patientor, paso 8
Ahora que nuestro backend permite agregar entradas, queremos agregar la funcionalidad correspondiente al frontend. En este ejercicio, debes agregar un formulario para agregarle una entrada a un paciente. Un lugar intuitivo para acceder al formulario sería la página del paciente.

En este ejercicio es suficiente admitir un tipo de entrada. Todos los campos del formulario pueden ser simples inputs de texto, por lo que depende del usuario ingresar valores validos.

Tras un envío exitoso, la nueva entrada debe agregarse al paciente correcto y las entradas del paciente en la página del paciente deben actualizarse para contener la nueva entrada.

Tu formulario podría verse así:
Si el usuario ingresa valores inválidos en el formulario y el backend rechaza la adición, muestra un mensaje de error apropiado

9.28: Patientor, paso 9
Amplía tu solución para que admita todos los tipos de entrada

9.29: Patientor, paso 10
Mejora el formulario de creación de entradas para que sea más difícil entrar fechas incorrectas, códigos de diagnóstico y ratings de salud.

Tu formulario mejorado podría verse de esta manera:
Los códigos de diagnóstico ahora se configuran con el elemento de Material UI multiple select y las fechas con el elemento Input con el tipo date.

Envío de ejercicios y obtención de créditos
Los ejercicios de esta parte son enviados a través de el sistema de envío de ejercicios al igual que en las partes anteriores, con la diferencia de que esta vez el envío se realiza en una "instancia del curso" diferente. ¡Recuerda que tienes que terminar al menos 24 ejercicios para aprobar esta parte!

Una vez que hayas completado los ejercicios y quieras obtener los créditos, háznoslo saber a través de el sistema de envío de ejercicios que has completado el curso:

Ten en cuenta que necesitas registrarte a la parte del curso correspondiente para obtener los créditos registrados, lee esto para más información.

Puedes descargar el certificado por completar esta parte clicando en uno de los iconos de las banderas. El icono de la bandera se corresponde con el lenguaje del certificado.