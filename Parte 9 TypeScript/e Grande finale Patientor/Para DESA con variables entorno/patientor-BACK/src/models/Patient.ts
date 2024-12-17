export interface Patient {
    id: number;
    name: string;
    dateOfBirth: string; // Formato YYYY-MM-DD
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
    entries: Entry[];
  }
  export interface Entry {} 