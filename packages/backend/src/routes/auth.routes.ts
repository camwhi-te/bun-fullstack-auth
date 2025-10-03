import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { login, logout, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;
