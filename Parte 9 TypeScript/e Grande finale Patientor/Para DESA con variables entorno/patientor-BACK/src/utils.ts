import { NewDiaryEntry,Visibility ,Weather,Gender ,NewPatient } from './types';
import { EntryType, NewEntry } from './types';

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return comment;
  };
  /* const isEntryType = (type: any): type is EntryType => {
    return Object.values(EntryType).includes(type);
  }; */
  
  const toNewEntry = (object: any): NewEntry => {
    const baseEntry = {
      date: parseDate(object.date),
      description: parseString(object.description, 'description'),
      specialist: parseString(object.specialist, 'specialist'),
      diagnosisCodes: object.diagnosisCodes, // Se asume que ya está validado
    };
  
    switch (object.type) {
      case EntryType.Hospital:
        if (!object.discharge || !object.discharge.date || !object.discharge.criteria) {
          throw new Error('Invalid or missing discharge information');
        }
        return {
          ...baseEntry,
          type: EntryType.Hospital,
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseString(object.discharge.criteria, 'discharge criteria'),
          },
        };
  
      case EntryType.HealthCheck:
        return {
          ...baseEntry,
          type: EntryType.HealthCheck,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
  
      case EntryType.OccupationalHealthcare:
        if (!object.employerName) {
          throw new Error('Invalid or missing employer name');
        }
        return {
          ...baseEntry,
          type: EntryType.OccupationalHealthcare,
          employerName: parseString(object.employerName, 'employer name'),
          sickLeave: object.sickLeave
            ? {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate),
              }
            : undefined,
        };
  
      default:
        throw new Error(`Unsupported entry type: ${object.type}`);
    }
  };
  
  const isString = (text: unknown): text is string => {
    return typeof text === 'string';
   }
   const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  // Funciones auxiliares para validar tipos
const parseString = (text: unknown, field: string): string => {
  if (!isString(text)) {
    throw new Error(`Invalid or missing ${field}`);
  }
  return text;
};
const parseHealthCheckRating = (rating: unknown): number => {
  if (typeof rating !== 'number' || rating < 0 || rating > 3) {
    throw new Error('Invalid or missing healthCheckRating');
  }
  return rating;
};

  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };
  const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather)
    }
    return weather;
  };
  /* const isWeather = (str: string): str is Weather => {
    return ['sunny', 'rainy', 'cloudy', 'stormy' ].includes(str);
  }; */
  const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
  };
  const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
  };
  
  const parseVisibility = (visibility: unknown): Visibility => {
    // check !visibility removed:
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect visibility: ' + visibility);
    }
    return visibility;
  };
  // Verificar que un valor es un enum Gender
    const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
  };
  const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
    }
    return gender;
  };
  // Función para analizar y validar campos
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };
  const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date of birth');
    }
    return date;
  };
  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  };
  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  };
  /* const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
      throw new Error('Invalid data');
    }
  
    const newPatient: NewPatient = {
      name: parseName((object as { name: unknown }).name),
      dateOfBirth: parseDateOfBirth((object as { dateOfBirth: unknown }).dateOfBirth),
      ssn: parseSsn((object as { ssn: unknown }).ssn),
      gender: parseGender((object as { gender: unknown }).gender),
      occupation: parseOccupation((object as { occupation: unknown }).occupation),
    };
  
    return newPatient;
  }; */
  
  
// Exportamos toNewDiaryEntry
export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
  }

  if (
      'comment' in object &&
      'date' in object &&
      'weather' in object &&
      'visibility' in object &&
      'specialist' in object // Asegúrate de verificar `specialist`
  ) {
      const newEntry: NewDiaryEntry = {
          weather: parseWeather(object.weather),
          visibility: parseVisibility(object.visibility),
          date: parseDate(object.date),
          description: parseComment(object.comment), // Mapeo correcto de `comment` a `description`
          specialist: parseSpecialist(object.specialist), // Validar y agregar `specialist`
      };

      return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

// Nueva función para validar y parsear `specialist`
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};


// Exportamos toNewPatient
export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid data');
    }

    const newPatient: NewPatient = {
        name: parseName((object as { name: unknown }).name),
        dateOfBirth: parseDateOfBirth((object as { dateOfBirth: unknown }).dateOfBirth),
        ssn: parseSsn((object as { ssn: unknown }).ssn),
        gender: parseGender((object as { gender: unknown }).gender),
        occupation: parseOccupation((object as { occupation: unknown }).occupation),
    };

    return newPatient;
};
export { toNewEntry };
