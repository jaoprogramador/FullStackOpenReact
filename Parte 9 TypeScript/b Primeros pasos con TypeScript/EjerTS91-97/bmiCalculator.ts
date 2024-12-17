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

  // Función que calcula el IMC (Índice de Masa Corporal)
/* function calculateBmi(heightCm: number, weightKg: number): string {
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


  export function calculateBMI(weight: number, height: number): string {
    console.log('calculateBMI',weight);
    console.log('calculateBMI',height);
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);
  
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
  module.exports = { calculateBMI }; */

  /* import { isNotNumber } from './utils'; // Importamos la función de validación de números

// Función que calcula el IMC
export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightInMeters = heightCm / 100;
  const bmi = weightKg / (heightInMeters ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

// Recoger argumentos de la línea de comandos
const args = process.argv.slice(2); // Ignoramos los primeros dos elementos (node y script)

if (args.length !== 2 || args.some(isNotNumber)) {
  console.log('Please provide valid height and weight arguments.');
  process.exit(1); // Salimos si los parámetros son incorrectos
}

const heightCm = Number(args[0]);
const weightKg = Number(args[1]);

// Mostrar el resultado en consola
console.log(calculateBmi(heightCm, weightKg)); */

export interface BmiResult {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (height: number, weight: number): BmiResult => {
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    throw new Error('Invalid input');
  }

  const bmi = weight / ((height / 100) ** 2); // Calculando el IMC
  let bmiCategory: string;

  if (bmi < 18.5) {
    bmiCategory = 'Underweight (too little weight)';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    bmiCategory = 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = 'Overweight';
  } else {
    bmiCategory = 'Obesity';
  }

  return {
    weight,
    height,
    bmi: bmiCategory,
  };
};


  