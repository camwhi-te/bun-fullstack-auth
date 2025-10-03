import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userQueries, sessionQueries } from '../database';
import type { LoginRequest, RegisterRequest, AuthResponse, ErrorResponse, UserWithPassword } from 'shared';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response<AuthResponse | ErrorResponse>) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = userQueries.findByEmail.get(email) as UserWithPassword | undefined;
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = Date.now().toString();
    userQueries.create.run(userId, email, hashedPassword, name);

    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });

    const sessionId = `session_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    sessionQueries.create.run(sessionId, userId, token, expiresAt);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: userId, email, name },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response<AuthResponse | ErrorResponse>) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = userQueries.findByEmail.get(email) as UserWithPassword | undefined;
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    const sessionId = `session_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    sessionQueries.create.run(sessionId, user.id, token, expiresAt);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      sessionQueries.deleteByToken.run(token);
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
