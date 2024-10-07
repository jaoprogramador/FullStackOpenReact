"# reactPersons" 
# 3.12: Base de datos de línea de comandos
# Crea una base de datos MongoDB basada en la nube para la aplicación de agenda telefónica con MongoDB Atlas.

# Crea un archivo mongo.js en el directorio del proyecto, que se puede usar para agregar entradas a la agenda y para enumerar todas las entradas existentes en la agenda.

# NB: ¡No incluyas la contraseña en el archivo que subes a GitHub!

# La aplicación debería funcionar de la siguiente manera. Utiliza el programa pasando tres argumentos de línea de comando (el primero es la contraseña), por ejemplo:

# node mongo.js yourpassword Anna 040-1234556copy
# Como resultado, la aplicación imprimirá:

# added Anna number 040-1234556 to phonebookcopy
# La nueva entrada a la agenda telefónica se guardará en la base de datos. Ten en cuenta que si el nombre contiene espacios en blanco, debe ir entre comillas:

# node mongo.js yourpassword "Arto Vihavainen" 045-1232456copy
# Si la contraseña es el único parámetro dado al programa, lo que significa que se invoca así:

# node mongo.js yourpasswordcopy
# Entonces el programa debería mostrar todas las entradas en la agenda:

# phonebook:
# Anna 040-1234556
# Arto Vihavainen 045-1232456
# Ada Lovelace 040-1231236
# copy
# Puedes obtener los parámetros de la línea de comandos de la variable process.argv.

# NB: no cierres la conexión en el lugar incorrecto. Por ejemplo, el siguiente código no funcionará:

# Person
#   .find({})
#   .then(persons=> {
#     // ...
#   })

# mongoose.connection.close()copy
# En el código anterior, el comando mongoose.connection.close() se ejecutará inmediatamente después de que se inicie la operación Person.find. Esto significa que la conexión a la base de datos se cerrará inmediatamente y la ejecución nunca llegará al punto en el que finalice la operación Person.find y se llame a la función callback.

# El lugar correcto para cerrar la conexión de la base de datos es al final de la función callback:

# Person
#   .find({})
#   .then(persons=> {
 #    // ...
#     mongoose.connection.close()
#   })copy
# NB: Si defines un modelo con el nombre Person, mongoose nombrará automáticamente la colección asociada como people.

# =======================================================
# =======================================================
# Base de datos de la Agenda Telefónica, paso 1
# Cambia la búsqueda de todas las entradas de la agenda telefónica para que los datos se obtengan desde la base de datos.

# Verifica que el frontend funcione después de que se hayan realizado los cambios.

# En los siguientes ejercicios, escribe todo el código específico de Mongoose en su propio módulo, como hicimos en el capítulo Configuración de la base de datos en su propio módulo.

