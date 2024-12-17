"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = void 0;
// src/services/patientService.ts
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
const getPatients = () => {
    return patients_1.default;
};
exports.getPatients = getPatients;
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getNonSensitivePatients, addPatient, getPatients: exports.getPatients
};
