const mongoose = require('mongoose');

// Definición del esquema de autor
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  born: {
    type: Number,
  },
  bookCount: {
    type: Number,
    default: 0,
  },
});

// Crear el modelo de autor
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
