import { Router } from 'express';
import { getMe, getHello } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.get('/hello', authMiddleware, getHello);

export default router;
