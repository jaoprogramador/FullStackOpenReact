"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import { calculateBMI } from './bmiCalculator';
var app = (0, express_1.default)();
// Endpoint GET "/hello"
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
// Endpoint GET "/bmi" http://localhost:3000/bmi?weight=85&height=182
app.get('/bmi', function (req, res) {
    // Obtener los parámetros de consulta
    var weight = req.query.weight ? Number(req.query.weight) : 0;
    var height = req.query.height ? Number(req.query.height) : 0;
    console.log("Weight: ".concat(weight, ", Height: ").concat(height));
    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    var bmiCategory = calculateBMI(weight, height);
    console.log('RES bmiCategory', bmiCategory);
    return res.json({
        weight: weight,
        height: height,
        bmi: bmiCategory,
    });
});
app.listen(3000, function () {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
// Dummy function para que compile
function calculateBMI(weight, height) {
    var heightInMeters = height / 100;
    var bmi = weight / (Math.pow(heightInMeters, 2));
    if (bmi < 18.5)
        return 'Underweight';
    else if (bmi < 24.9)
        return 'Normal (healthy weight)';
    else if (bmi < 29.9)
        return 'Overweight';
    else
        return 'Obese';
}
