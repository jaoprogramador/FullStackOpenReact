import { DiaryEntry } from "../types";
//import toNewDiaryEntry from "../utils";
import { toNewDiaryEntry } from '../utils';


const data = [
    {
        id: "1",
        date: "2017-01-01",
        weather: "rainy",
        visibility: "poor",
        comment: "Pretty scary flight, I'm glad I'm alive",
        specialist: "Dr. John Doe"
    },
    {
        id: "2",
        date: "2017-04-01",
        weather: "sunny",
        visibility: "good",
        comment: "Everything went better than expected, I'm learning much",
        specialist: "Dr. Jane Smith"
    },
    {
        id: "3",
        date: "2017-04-15",
        weather: "windy",
        visibility: "good",
        comment: "I'm getting pretty confident although I hit a flock of birds",
        specialist: "Dr. Alice Brown"
    },
    {
        id: "4",
        date: "2017-05-11",
        weather: "cloudy",
        visibility: "good",
        comment: "I almost failed the landing but I survived",
        specialist: "Dr. Bob White"
    }
];


const diaryEntries: DiaryEntry[] = data.map((obj) => {
    const newEntry = toNewDiaryEntry(obj);
    return {
        ...newEntry,
        id: obj.id, // Agrega el ID aquí
    };
});

  
  export default diaryEntries;
