
import express from 'express';
//import express, { Request, Response } from "express";

//import { Patient ,Entry } from '../models/Patient';
//import { Patient } from "../types";
/* import { Entry } from "../types";

import toNewEntry from "../utils/toNewEntry"; */
import { toNewEntry } from '../utils';


import patientService from "../services/patientService";
const router = express.Router();

// Obtener pacientes sin información sensible
router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await patientService.getPatientById(id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body); // Valida y parsea la entrada
    const updatedPatient = patientService.addEntry(patientId, newEntry); // Agrega la entrada
    res.json(updatedPatient); // Retorna el paciente actualizado
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


// Endpoint para agregar una entrada a un paciente
/* router.post('/:id/entries', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, date, type, diagnosisCodes, ...rest } = req.body;

  try {
    // Buscar al paciente
    const patient = await findPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    // Validar y transformar la entrada
    const newEntry = toNewEntry({ description, date, type, diagnosisCodes, ...rest });

    // Agregar la nueva entrada al paciente
    patient.entries.push(newEntry);
    await patient.save();

    // Responder con la nueva entrada
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Datos inválidos o problema al agregar la entrada' });
  }
}); 
router.post("/:id/entries", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patient = patientService.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const newEntry = toNewEntry(req.body);

    // Generar un ID único para la nueva entrada
    const entryWithId: Entry = {
      ...newEntry,
      id: Math.random().toString(36).substring(7), // Usa una librería como uuid si es necesario
    };

    patient.entries.push(entryWithId);

    return res.status(201).json(entryWithId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding entry:", error.message);
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "An unknown error occurred" });
  }
});*/




// Middleware para encontrar al paciente por ID
/* const findPatientById = async (id: string): Promise<Patient | null> => {
  const patient = await Patient.findById(id);
  return patient;
}; */
export default router;