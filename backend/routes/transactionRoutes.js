const express = require('express')
const router = express.Router();
const {getTransactions, createTransaction, updateTransaction, deleteTransaction, getTransactionById} = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/transaction', authMiddleware, createTransaction);
router.get('/transactions', authMiddleware, getTransactions);
router.get('/transaction/show/:id', authMiddleware, getTransactionById);
router.put('/transaction/:transactionId', authMiddleware, updateTransaction);
router.delete('/transaction/:transactionId', authMiddleware, deleteTransaction);

module.exports = router;