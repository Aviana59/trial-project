// src/controllers/articleController.js
import prisma from '../prismaClient.js';

// CREATE Article
export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (req.user.role !== 'admin' && req.user.role !== 'creator') {
      return res.status(403).json({ status: false, code: 403, data: 'Access denied' });
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        image,
        userId: req.user.id,
      },
    });

    res.status(201).json({ status: true, code: 201, data: newArticle });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, data: 'Error creating article' });
  }
};

// READ All Articles
export const getArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.status(200).json({ status: true, code: 200, data: articles });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, data: 'Error fetching articles' });
  }
};

// UPDATE Article
export const updateArticle = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const image = req.file ? req.file.path : null;

  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!article) {
      return res.status(404).json({ status: false, code: 404, data: 'Article not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== article.userId) {
      return res.status(403).json({ status: false, code: 403, data: 'Access denied' });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        image: image || article.image,
      },
    });

    res.status(200).json({ status: true, code: 200, data: updatedArticle });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, data: 'Error updating article' });
  }
};

// DELETE Article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!article) {
      return res.status(404).json({ status: false, code: 404, data: 'Article not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== article.userId) {
      return res.status(403).json({ status: false, code: 403, data: 'Access denied' });
    }

    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ status: true, code: 200, data: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, data: 'Error deleting article' });
  }
};
