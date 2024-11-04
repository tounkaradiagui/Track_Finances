const express = require('express')
const router = express.Router();
const {getCategories, addCategory, updateCategory, deleteCategory, showCategory} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/categories', authMiddleware, getCategories);
router.get('/categories/show/:id', authMiddleware, showCategory);
router.post('/category', authMiddleware, addCategory);
router.put('/category/:categoryId', authMiddleware, updateCategory);
router.delete('/category/delete/:categoryId', authMiddleware, deleteCategory);


module.exports = router;