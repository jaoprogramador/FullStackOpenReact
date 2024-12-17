

/* export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NewPatient = Omit<Patient, 'id'>;
// Tipo omitido para la respuesta sin el campo `ssn`
export type NonSensitivePatient = Omit<Patient, "ssn">;

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }

export interface Diagnose {
    code: string;
    name: string;
    latin?: string; // Campo opcional
  }
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}
  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
  }
  //export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

  export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
  export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  } */
 
    export interface Patient {
      id: string;
      name: string;
      dateOfBirth: string;
      ssn: string;
      gender: Gender;
      occupation: string;
      entries: Entry[];
    }
    
    export interface NewPatient {
      name: string;
      dateOfBirth: string;
      ssn: string;
      gender: Gender;
      occupation: string;
    }
    
    export interface NonSensitivePatient {
      id: string;
      name: string;
      dateOfBirth: string;
      gender: Gender;
      occupation: string;
      entries: Entry[];
    }
    
    export enum Gender {
      Male = "male",
      Female = "female",
      Other = "other"
    }
    /* export interface Entry {
    } */
  
    export interface DiaryEntry {
      id: string;
      date: string;
      description: string;
      specialist: string;
      diagnosisCodes?: string[];  // Opcional, si deseas que pueda tener códigos de diagnóstico
    }
    
    export interface NonSensitiveDiaryEntry {
      id: string;
      date: string;
      description: string;
      specialist: string;
    }
    
    export interface NewDiaryEntry {
      date: string;
      description: string;
      specialist: string;
      diagnosisCodes?: string[];  // Opcional
      weather: Weather;        // Asegúrate de incluir el campo `weather`
      visibility: Visibility;  
    }
    export enum Visibility {
      Great = 'great',
      Good = 'good',
      Ok = 'ok',
      Poor = 'poor',
    }
    
    export enum Weather {
      Sunny = 'sunny',
      Rainy = 'rainy',
      Cloudy = 'cloudy',
      Stormy = 'stormy',
      Windy = 'windy',
    }
    
    export interface Diagnose {
      code: string;
      name: string;
      latin?: string; // Si el campo "latin" es opcional
  }
  export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
  }
  
  export enum EntryType {
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck",
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: number;
  }
  
  export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3,
  }
  
  export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: {
      date: string;
      criteria: string;
    };
  }
  
  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
  
  export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

  export type NewEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>;

