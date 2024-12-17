export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export type HealthCheckEntry = {
  id: string;
  date: string;
  type: "HealthCheck";
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  healthCheckRating: number; // Requerido para HealthCheck
};
export type HospitalEntry = {
  id: string;
  date: string;
  type: "Hospital";
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  discharge: {
    date: string;
    criteria: string;
  }; // Requerido para Hospital
};
export type OccupationalHealthcareEntry = {
  id: string;
  date: string;
  type: "OccupationalHealthcare";
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  employerName: string; // Requerido para OccupationalHealthcare
  sickLeave?: {
    startDate: string;
    endDate: string;
  }; // Opcional
};

/* export interface Entry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
} */
  /* export interface Entry {
    id: string;
    date: string;
    type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' | 'Note';
    description: string;
    diagnosisCodes?: string[];
    healthCheckRating?: number; // Solo para HealthCheck
    discharge?: {
      date: string;
      criteria: string;
    }; // Solo para Hospital
    employerName?: string; // Solo para OccupationalHealthcare 
  }*/
  
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];

}
export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

/* export type PatientFormValues = Omit<Patient, "id" | "entries">; */
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;