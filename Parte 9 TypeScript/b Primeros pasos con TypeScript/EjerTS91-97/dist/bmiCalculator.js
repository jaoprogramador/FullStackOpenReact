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
exports.calculateBMI = calculateBMI;
// Función que calcula el IMC (Índice de Masa Corporal)
function calculateBmi(heightCm, weightKg) {
    // Convertir la altura de centímetros a metros
    const heightM = heightCm / 100;
    // Calcular el IMC: peso (kg) / altura (m)²
    const bmi = weightKg / (heightM * heightM);
    // Determinar el mensaje según el valor del IMC
    if (bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    }
    else {
        return 'Obese';
    }
}
// Recoger los parámetros desde la línea de comandos
const args = process.argv.slice(2); // Ignorar los primeros dos elementos (node y script)
if (args.length !== 2) {
    console.log('Por favor, ingresa la altura en cm y el peso en kg.');
    process.exit(1);
}
const heightCm = Number(args[0]);
const weightKg = Number(args[1]);
// Verificar que los argumentos son números válidos
if (isNaN(heightCm) || isNaN(weightKg)) {
    console.log('Los valores proporcionados no son válidos. Asegúrate de ingresar números.');
    process.exit(1);
}
// Llamar a la función con los parámetros proporcionados
console.log(calculateBmi(heightCm, weightKg));
function calculateBMI(weight, height) {
    console.log('calculateBMI', weight);
    console.log('calculateBMI', height);
    const heightInMeters = height / 100;
    const bmi = weight / (Math.pow(heightInMeters, 2));
    if (bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    }
    else {
        return 'Obese';
    }
}
module.exports = { calculateBMI };
