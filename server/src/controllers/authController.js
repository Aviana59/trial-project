// src/controllers/authController.js
import prisma from '../prismaClient.js';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js';

export const signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
    });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error logging in' });
  }
};
