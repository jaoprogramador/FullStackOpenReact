# React + Vite
# Documentado en 
# https://fullstackopen.com/es/part1/introduccion_a_react
# 3.19*: Base de datos de la Agenda Telefónica, paso 7
# Amplía la validación para que el nombre almacenado en la base de datos tenga al menos tres caracteres de longitud.

# Expande el frontend para que muestre algún tipo de mensaje de error cuando ocurra un error de validación. El manejo de errores se puede implementar agregando un bloque catch como se muestra a continuación:

# personService
#     .create({ ... })
#     .then(createdPerson => {
#       // ...
 #    })
#     .catch(error => {
#       // está es la forma de acceder al mensaje de error
#       console.log(error.response.data.error)
#     })copy
# Puedes mostrar el mensaje de error predeterminado devuelto por Mongoose, aunque no son muy legibles:






