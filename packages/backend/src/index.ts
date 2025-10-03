import express, { Request, Response } from 'express';
import cors from 'cors';
import { initializeDatabase } from './database';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

initializeDatabase();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`backend server running on http://localhost:${PORT}`);
});
