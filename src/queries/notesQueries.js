import pool from '../config/db.js';

const insertNote = async (title, body, createdAt, updatedAt) => {
  const result = await pool.query(
    'INSERT INTO todonotes (title, body, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, body, createdAt, updatedAt]
  );
  return result.rows[0];
};

const getAllNotes = async () => {
  const result = await pool.query('SELECT * FROM todonotes ORDER BY created_at DESC');
  return result.rows;
};

const removeNote = async (id) => {
  const result = await pool.query('DELETE FROM todonotes WHERE id = $1', [id]);
  return result;
};

export { insertNote, getAllNotes, removeNote };
