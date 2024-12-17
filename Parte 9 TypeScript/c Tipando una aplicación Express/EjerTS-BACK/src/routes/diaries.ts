
import express from 'express';
import diaryService from '../services/diaryService';
//import toNewDiaryEntry from '../utils';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
})



router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
      const newDiaryEntry = toNewDiaryEntry(req.body);
      const addedDiary = diaryService.addDiary(newDiaryEntry);
      res.json(addedDiary);
  } catch (error: unknown) {
      res.status(400).send({ error: (error as Error).message });
  }
});

export default router;