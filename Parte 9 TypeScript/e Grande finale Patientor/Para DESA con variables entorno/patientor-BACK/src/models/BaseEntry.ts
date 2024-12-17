/* export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }
  
  export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  
  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }
  
  interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
  
  type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
  
  // Define Entry sin la propiedad 'id'
  type EntryWithoutId = UnionOmit<Entry, 'id'>;
  
  export type Entry =
    | HealthCheckEntry
    | HospitalEntry
    | OccupationalHealthCareEntry;
   */