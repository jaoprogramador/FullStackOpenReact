import { NewDiaryEntry,Visibility ,Weather,Gender ,NewPatient } from './types';

/* const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
      const newEntry: NewDiaryEntry = {
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility),
        date: parseDate(object.date),
        comment: parseComment(object.comment)
      };
  
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  }; */
const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return comment;
  };
  const isString = (text: unknown): text is string => {
    return typeof text === 'string';
   }
   const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
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

    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date),
            comment: parseComment(object.comment)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
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