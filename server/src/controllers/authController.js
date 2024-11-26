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
    res.cookie('token', token, {
      httpOnly: true, // Prevent access via JavaScript
      secure: false, // Use HTTPS in production
      sameSite: 'lax', // Helps mitigate CSRF
      maxAge: 60 * 60 * 1000, // 1 hour
    });


    return res.status(200).json({ message: 'Login successful', data: { token, user: { name: user.name, email: user.email, role: user.role } } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error logging in' });
  }
};
