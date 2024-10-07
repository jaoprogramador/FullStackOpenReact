require('dotenv').config();
const mongoose = require('mongoose');

// Obtener los argumentos de línea de comandos
const password = process.argv[2];
const name = process.argv[3];
const tlf = process.argv[4];
{/*

METODO 1 CONECCTION
====================
// URL de conexión (cambia `<password>` por tu contraseña de MongoDB Atlas)
const url = `mongodb+srv://jaoprogramador:${password}@cluster0.pxu2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

  
// Conectar a MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Definir el esquema de Persona
const personSchema = new mongoose.Schema({
  name: String,
  tlf: String,
});
*/}
{/*

METODO 2 CONECCTION
====================
*/}
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: String,
    tlf: String,
  });
  
// Crear el modelo de Persona
const Person = mongoose.model('Person', personSchema);

// Si solo se proporciona la contraseña, mostrar todas las entradas
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.tlf}`);
    });
    mongoose.connection.close();
  });
// Si se proporcionan nombre y número, agregar una nueva entrada
} else if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    tlf: tlf,
  });

  person.save().then(() => {
    console.log(`added ${name} tlf ${tlf} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Please provide the correct arguments: password [name tlf]');
  mongoose.connection.close();
}
