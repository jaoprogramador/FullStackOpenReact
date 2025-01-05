const express = require('express');
const router = express.Router();
const { ReadingList } = require('../models');
const { userExtractor } = require('../middleware/auth'); 
// Ruta para añadir un blog a la lista de lectura
router.post('/', async (req, res) => {
  const { blogId, userId } = req.body;

  try {
    if (!blogId || !userId) {
      return res.status(400).json({ error: 'Faltan blogId o userId' });
    }

    const readingListEntry = await ReadingList.create({ blogId, userId });
    res.status(201).json(readingListEntry);
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir a la lista de lectura', details: error.message });
  }
});

/**
 * PUT /api/readinglists/:id
 * Marca un blog en la lista de lectura como leído.
 */
router.put('/:id', userExtractor, async (req, res) => {
    try {
      const { id } = req.params;
      const { read } = req.body;
  
      // Buscar la entrada en la tabla ReadingList
      const readingListEntry = await ReadingList.findByPk(id);
  
      if (!readingListEntry) {
        return res.status(404).json({ error: 'Entrada de lista de lectura no encontrada' });
      }
  
      // Verificar si el usuario actual es el propietario de la entrada
      if (readingListEntry.userId !== req.user.id) {
        return res.status(403).json({ error: 'No tienes permiso para modificar esta entrada' });
      }
  
      // Actualizar el estado de lectura
      readingListEntry.read = read;
      await readingListEntry.save();
  
      res.json({ message: 'Estado de lectura actualizado', readingListEntry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });
module.exports = router;
