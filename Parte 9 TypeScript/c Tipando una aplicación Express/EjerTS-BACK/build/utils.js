"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.toNewDiaryEntry = void 0;
const types_1 = require("./types");
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
const parseComment = (comment) => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};
const isString = (text) => {
    return typeof text === 'string';
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseWeather = (weather) => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};
/* const isWeather = (str: string): str is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'stormy' ].includes(str);
}; */
const isWeather = (param) => {
    return Object.values(types_1.Weather).map(v => v.toString()).includes(param);
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility).map(v => v.toString()).includes(param);
};
const parseVisibility = (visibility) => {
    // check !visibility removed:
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect visibility: ' + visibility);
    }
    return visibility;
};
// Verificar que un valor es un enum Gender
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
// Función para analizar y validar campos
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
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
const toNewDiaryEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry = {
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date),
            comment: parseComment(object.comment)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
exports.toNewDiaryEntry = toNewDiaryEntry;
// Exportamos toNewPatient
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid data');
    }
    const newPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
