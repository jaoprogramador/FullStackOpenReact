// src/services/patientService.ts
import patients from "../data/patients";
import { Patient, NewPatient, NonSensitivePatient  } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

/* // Función para agregar un paciente
export const addPatient = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};*/

// Función para obtener todos los pacientes
export const getPatients = (): Patient[] => {
  return patients;
}; 
const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(), // Genera un ID único
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,addPatient,getPatients
};
