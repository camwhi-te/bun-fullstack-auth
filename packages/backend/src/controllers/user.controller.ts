import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { userQueries } from '../database';
import type { User, HelloResponse, ErrorResponse } from 'shared';

export const getMe = async (req: AuthRequest, res: Response<User | ErrorResponse>) => {
  try {
    const user = userQueries.findById.get(String(req.user?.id)) as any;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
