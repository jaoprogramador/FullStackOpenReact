"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import diaryData from '../data/diaryentries.json'
const diaries_1 = __importDefault(require("../data/diaries"));
//const diaries: DiaryEntry[] = diaryData;
//const diaries: DiaryEntry[] = diaryData as DiaryEntry[];
const getEntries = () => {
    return diaries_1.default;
};
const getNonSensitiveEntries = () => {
    return diaries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
/* const addEntry = (
  date: string, weather: Weather, visibility: Visibility, comment: string
): DiaryEntry => { */
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ id: Math.max(...diaries_1.default.map(d => d.id)) + 1 }, entry);
    console.log('diaryService addDiary', newDiaryEntry);
    diaries_1.default.push(newDiaryEntry);
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
const findById = (id) => {
    const entry = diaries_1.default.find(d => d.id === id);
    return entry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById,
};
