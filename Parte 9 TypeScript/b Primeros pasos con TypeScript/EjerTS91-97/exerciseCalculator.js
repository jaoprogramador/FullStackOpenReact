"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils"); // Usamos la función de validación
var calculateExercises = function (exercises, target) {
    var periodLength = exercises.length;
    var trainingDays = exercises.filter(function (hour) { return hour > 0; }).length;
    var average = exercises.reduce(function (a, b) { return a + b; }, 0) / periodLength;
    var success = average >= target;
    var rating;
    var ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = 'Great job! You\'ve met your target.';
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better.';
    }
    else {
        rating = 1;
        ratingDescription = 'You should try harder!';
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};
// Recoger los argumentos de la línea de comandos
var args = process.argv.slice(2);
if (args.length < 2 || (0, utils_1.isNotNumber)(args[0]) || args.some(utils_1.isNotNumber)) {
    console.log('Please provide a valid target and exercise hours for each day.');
    process.exit(1); // Salimos si los parámetros son incorrectos
}
var target = Number(args[0]);
var exercises = args.slice(1).map(Number);
// Mostrar el resultado en consola
console.log(calculateExercises(exercises, target));
