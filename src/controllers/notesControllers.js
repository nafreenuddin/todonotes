import { insertNote, getAllNotes, removeNote } from '../queries/notesQueries.js';

const saveNote = async (req, res, next) => {
  const { title, body } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  if (title.length > 100 || body.length > 500) {
    return res.status(400).json({ message: 'Title should not exceed 100 chars and body 500 chars' });
  }

  try {
    const note = await insertNote(title, body, createdAt, updatedAt);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  try {
    const notes = await getAllNotes();
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeNote(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    next(error);
  }
};

export { saveNote, getNote, deleteNote };
