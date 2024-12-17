import express, { Request, Response } from 'express';

import { calculateBMI } from './bmiCalculator';

const app = express();
const port = process.env.PORT || 3000;
// Endpoint GET "/ping"
app.get('/ping', (_req, res) => {
  res.send('pong');
});

// Endpoint GET "/hello2"
app.get('/hello2', (_req, res) => {
  res.send('Hello Full Stack2!');
}); 

// Endpoint GET "/bmi"
/* app.get('/bmi', (req: Request, res: Response) => {
    // Obtener los parámetros weight y height desde la query
    const weight = req.query.weight ? Number(req.query.weight) : NaN;
    const height = req.query.height ? Number(req.query.height) : NaN;
  
    console.log('weight:', weight);
    console.log('height:', height);
  
    // Validar que los parámetros sean números y existan
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  
    // Calcular el índice de masa corporal (IMC) y devolver el resultado
    const bmiCategory = calculateBMI(weight, height);
    return res.json({
      weight,
      height,
      bmi: bmiCategory,
    });
  }); 
  app.get('/bmi', (_req: Request, res: Response) => {

    const { weight, height, op } = _req.body;
    if ( !weight || isNaN(Number(weight) ) ) {
        return res.status(400).send({ error: '...'});
      }
      if ( !height || isNaN(Number(height) ) ) {
        return res.status(400).send({ error: '...'});
      }
    const bmiCategory = calculateBMI(Number(weight), Number(height));
    return res.json({
        weight,
        height,
        bmi: bmiCategory,
      });
  
    });   */
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server JAO running at http://localhost:${port}`);
});
