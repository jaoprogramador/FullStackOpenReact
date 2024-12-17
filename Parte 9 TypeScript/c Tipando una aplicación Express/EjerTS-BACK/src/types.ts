//export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

//export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export enum Visibility {
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

  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
  }

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
  }
  
  
  