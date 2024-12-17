const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // El puerto en el que el servidor escuchará

app.use(cors()); // Permitir CORS
app.use(express.json()); // Parsear JSON en el cuerpo de las solicitudes

// Datos de ejemplo: anécdotas
let anecdotes = [
  { id: 1, content: 'Primera anécdota', votes: 0 },
  { id: 2, content: 'Segunda anécdota', votes: 0 },
];

// Obtener todas las anécdotas
app.get('/anecdotes', (req, res) => {
  res.json(anecdotes);
});

// Manejo de PUT para actualizar anécdotas
app.put('/anecdotes/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedAnecdote = req.body;

  // Actualizar la anécdota
  anecdotes = anecdotes.map(anecdote =>
    anecdote.id === id ? { ...anecdote, ...updatedAnecdote } : anecdote
  );

  res.json(updatedAnecdote);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
