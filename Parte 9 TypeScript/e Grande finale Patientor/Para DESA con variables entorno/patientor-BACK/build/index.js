"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
/* import {  addPatient, getPatients } from './services/patientService'; */
const diaries_1 = __importDefault(require("./routes/diaries"));
const patients_1 = __importDefault(require("./routes/patients"));
const diagnose_1 = __importDefault(require("./routes/diagnose"));
const app = (0, express_1.default)();
// Configura CORS para permitir solicitudes desde http://localhost:5173
app.use((0, cors_1.default)({
    origin: "http://localhost:5173"
}));
app.use(express_1.default.json());
const PORT = 3000;
app.get('/api/ping', (_req, res) => {
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
app.use('/api/diaries', diaries_1.default);
app.use('/api/patients', patients_1.default);
app.use('/api/diagnose', diagnose_1.default);
app.use((err, _req, res, _next) => {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
});
app.listen(PORT, () => {
    console.log(`Server running JAO on port ${PORT}`);
});
