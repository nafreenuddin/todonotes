import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import notesRoutes from './routes/notes.js';
import errorHandler from './middlewares/errorHandlers.js';
import notFound from './middlewares/notFound.js';
import pool from './config/db.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/notes', notesRoutes);

app.get('/test-db', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Middleware to handle 404 errors
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
