const mongoose = require('mongoose');

// Definición del esquema de libro
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  published: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',  // Referencia al modelo de autor
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
});

// Crear el modelo de libro
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
