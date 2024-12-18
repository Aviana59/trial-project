// src/routes/authRoutes.js
import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();
// const AuthController = require('../controllers/authController');

// Route for user registration
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

export default router;
