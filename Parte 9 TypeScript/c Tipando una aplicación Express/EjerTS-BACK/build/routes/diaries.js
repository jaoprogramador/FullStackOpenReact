"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = __importDefault(require("../services/diaryService"));
//import toNewDiaryEntry from '../utils';
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diaryService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const diary = diaryService_1.default.findById(Number(req.params.id));
    if (diary) {
        res.send(diary);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newDiaryEntry = (0, utils_1.toNewDiaryEntry)(req.body);
        const addedDiary = diaryService_1.default.addDiary(newDiaryEntry);
        res.json(addedDiary);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.default = router;
