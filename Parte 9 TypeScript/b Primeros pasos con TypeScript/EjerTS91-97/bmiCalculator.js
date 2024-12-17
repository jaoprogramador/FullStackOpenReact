"use strict";
/* // Función que calcula el IMC (Índice de Masa Corporal)
function calculateBmi(heightCm: number, weightKg: number): string {
    // Convertir la altura de centímetros a metros
    const heightM = heightCm / 100;
  
    // Calcular el IMC: peso (kg) / altura (m)²
    const bmi = weightKg / (heightM * heightM);
  
    // Determinar el mensaje según el valor del IMC
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
  
  // Llamar a la función con valores fijos (altura 180 cm, peso 74 kg)
  console.log(calculateBmi(180, 74)); // Debe imprimir "Normal (healthy weight)" */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
var calculateBmi = function (height, weight) {
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        throw new Error('Invalid input');
    }
    var bmi = weight / (Math.pow((height / 100), 2)); // Calculando el IMC
    var bmiCategory;
    if (bmi < 18.5) {
        bmiCategory = 'Underweight (too little weight)';
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        bmiCategory = 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi < 29.9) {
        bmiCategory = 'Overweight';
    }
    else {
        bmiCategory = 'Obesity';
    }
    return {
        weight: weight,
        height: height,
        bmi: bmiCategory,
    };
};
exports.calculateBmi = calculateBmi;
