// src/routes/articleRoutes.js
import express from 'express';
import { verifyToken } from '../utils/auth.js';
import { checkRole } from '../middleware/checkRole.js';
import { createArticle, getArticles, updateArticle, deleteArticle } from '../controllers/articleController.js';

const router = express.Router();

// Public route for all users to view articles
router.get('/', getArticles);

// Routes protected by token and role-based access
router.post('/', verifyToken, checkRole(['admin', 'creator']), createArticle);
router.put('/:id', verifyToken, checkRole(['admin', 'creator']), updateArticle);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteArticle);

export default router;
