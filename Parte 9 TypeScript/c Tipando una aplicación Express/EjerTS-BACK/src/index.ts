import express , { Request, Response }  from 'express';
import cors from "cors";
/* import {  addPatient, getPatients } from './services/patientService'; */
import diaryRouter from './routes/diaries';
import patienceRouter from './routes/patients';
import diagnoseRouter from './routes/diagnose';
 
const app = express();
// Configura CORS para permitir solicitudes desde http://localhost:5173
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

const PORT = 3000;

 app.get('/api/ping', (_req: Request, res: Response) => {
  console.log('someone pinged here');
  res.send('pong');
});
/*
app.get('/api/patients', (_req: Request, res: Response) => {
  res.json(getPatients());
});

//app.post('/api/patients', (req: Request, res: Response): express.Response => {
app.post('/api/patients', (req: Request, res: Response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as Patient;

  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    return res.status(400).json({ error: 'missing fields' });
  }

  const newPatient: Patient = {
    id: getPatients().length + 1,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  const addedPatient = addPatient(newPatient);
  return res.status(201).json(addedPatient);
});  
 */

app.use('/api/diaries', diaryRouter);
 
app.use('/api/patients', patienceRouter);
app.use('/api/diagnose', diagnoseRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
});


app.listen(PORT, () => {
  console.log(`Server running JAO on port ${PORT}`);
});
