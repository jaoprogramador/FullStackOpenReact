import { isNotNumber } from './utils'; // Usamos la función de validación

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[], target: number): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(hour => hour > 0).length;
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target;
  
  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Great job! You\'ve met your target.';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'You should try harder!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// Recoger los argumentos de la línea de comandos
const args = process.argv.slice(2);

if (args.length < 2 || isNotNumber(args[0]) || args.some(isNotNumber)) {
  console.log('Please provide a valid target and exercise hours for each day.');
  process.exit(1); // Salimos si los parámetros son incorrectos
}

const target = Number(args[0]);
const exercises = args.slice(1).map(Number);

// Mostrar el resultado en consola
console.log(calculateExercises(exercises, target));
