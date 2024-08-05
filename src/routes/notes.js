import express from 'express';
import { saveNote, getNote, deleteNote } from '../controllers/notesControllers.js';

const router = express.Router();

router.post('/save-note', saveNote);
router.get('/get-note', getNote);
router.delete('/delete-note/:id', deleteNote);

export default router;
