"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const bmiCalculator_1 = require("./bmiCalculator");
app.get('/bmi', (req, res) => {
    // Obtener los parámetros de consulta
    /* const weight = req.query.weight;
    const height = req.query.height; */
    const weight = req.query.weight ? Number(req.query.weight) : 0;
    const height = req.query.height ? Number(req.query.height) : 0;
    // Imprimir los parámetros en la consola
    console.log(`Weight: ${weight}, Height: ${height}`);
    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        console.log('MAL', height);
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const bmiCategory = (0, bmiCalculator_1.calculateBMI)(weight, height);
    console.log('RES bmiCategory', bmiCategory);
    return res.json({
        weight,
        height,
        bmi: bmiCategory,
    });
    // Enviar una respuesta al cliente
    //res.send('Parámetros recibidos y registrados en la consola.');
});
// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
