/* import express, { Request, Response } from 'express';
//import { calculateBMI } from './bmiCalculator';
import { calculateBmi, BmiResult } from './bmiCalculator';  
const app = express();
// Endpoint GET "/hello"
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
  }); 
// Endpoint GET "/bmi" http://localhost:3000/bmi?weight=85&height=182
app.get('/bmi', (req: Request, res: Response) => {
    // Obtener los parámetros de consulta
    const weight = req.query.weight ? Number(req.query.weight) : 0;
    const height = req.query.height ? Number(req.query.height) : 0;

    console.log(`Weight: ${weight}, Height: ${height}`);

    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmiCategory = calculateBMI(weight, height);
    console.log('RES bmiCategory', bmiCategory);
    return res.json({
        weight,
        height,
        bmi: bmiCategory,
    });
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});

// Dummy function para que compile
function calculateBMI(weight: number, height: number): string {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);

    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 24.9) return 'Normal (healthy weight)';
    else if (bmi < 29.9) return 'Overweight';
    else return 'Obese';
} */
 
    import express, { Request, Response } from 'express';
    import { calculateBmi, BmiResult } from './bmiCalculator'; // Importamos la función de bmiCalculator
    import { calculateExercises } from './exerciseCalculatorv2';

    const app = express();
    const PORT = 3002;
    
    app.use(express.json()); 

    // Endpoint para calcular el IMC
    app.get('/bmi', (req: Request, res: Response) => {
      const height = Number(req.query.height);
      const weight = Number(req.query.weight);
    
      // Validación de los parámetros
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        return res.status(400).json({ error: 'malformatted parameters' });
      }
    
      try {
        const result: BmiResult = calculateBmi(height, weight);
        return res.json(result);
      } catch (error) {
        return res.status(400).json({ error: 'malformatted parameters' });
      }
    });

    // Endpoint POST para la calculadora de ejercicios
app.post('/exercises', (req: Request, res: Response) => {
    // Verificamos que el cuerpo de la solicitud tenga los parámetros correctos
    const { daily_exercises, target }: { daily_exercises: number[], target: number } = req.body;
  
    if (!daily_exercises || !target) {
      return res.status(400).json({ error: 'parameters missing' });
    }
  
    if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  
    // Calculamos los resultados
    const result = calculateExercises(daily_exercises, target);
  
    // Devolvemos el resultado
    return res.json(result);
  });
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    