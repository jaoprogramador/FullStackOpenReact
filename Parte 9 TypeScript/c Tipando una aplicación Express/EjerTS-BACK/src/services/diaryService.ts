//import diaryData from '../data/diaryentries.json'
import diaries from '../data/diaries';
import { NonSensitiveDiaryEntry, DiaryEntry,
   NewDiaryEntry
 } from '../types';



//const diaries: DiaryEntry[] = diaryData;
//const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
  return diaries;
}


const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

/* const addEntry = (
  date: string, weather: Weather, visibility: Visibility, comment: string
): DiaryEntry => { */

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
    
  };
  console.log('diaryService addDiary',newDiaryEntry)
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};
/* const newDiaryEntry = {
  id: Math.max(...diaries.map(d => d.id)) + 1,
  date,
  weather,
  visibility,
  comment,
}

diaries.push(newDiaryEntry);
return newDiaryEntry;
}; */

const findById = (id: number): DiaryEntry | undefined => {

  const entry = diaries.find(d => d.id === id);
  return entry;
};


export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};