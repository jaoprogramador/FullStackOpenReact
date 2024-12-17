import express from 'express';
import patientService from "../services/patientService";

import { toNewPatient } from '../utils'; 

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());

})

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
      const newPatient = toNewPatient(req.body);
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
  } catch (error: unknown) {
      res.status(400).send({ error: (error as Error).message });
  }
});




export default router;