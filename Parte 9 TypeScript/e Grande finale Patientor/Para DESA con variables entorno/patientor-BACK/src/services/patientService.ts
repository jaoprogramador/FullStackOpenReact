// src/services/patientService.ts
import patients from "../data/patients";
import { Patient, Entry,NewEntry , NonSensitivePatient  } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    entries,
    occupation,
  }));
};



// Función para obtener todos los pacientes
export const getPatients = (): Patient[] => {
  return patients;
}; 

/* const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),  // Genera un ID único para el nuevo paciente
    ...entry,     // Propaga los datos del nuevo paciente (sin el id)
    entries: []   // Inicializamos el array de entradas vacío
  };

  patients.push(newPatient);  // Agrega el nuevo paciente a la lista
  return newPatient;  // Retorna el paciente recién agregado
}; */

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};
const addEntry = (id: string, entry: NewEntry): Patient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  const newEntry: Entry = {
    ...entry,
    id: uuid()// Genera un ID único para la entrada
  };

  patient.entries.push(newEntry);
  return patient;
};


export default {
  getNonSensitivePatients,/* addPatient */addEntry ,getPatientById
};
