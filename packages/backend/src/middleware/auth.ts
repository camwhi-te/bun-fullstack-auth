import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sessionQueries } from '../database';
import { User } from 'shared';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const session = sessionQueries.findByToken.get(token) as any;
    
    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string, name: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
