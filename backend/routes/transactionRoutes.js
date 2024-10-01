const express = require('express')
const router = express.Router();
const {getTransactions, createTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/transactions', authMiddleware, getTransactions);
router.post('/transaction', authMiddleware, createTransaction);
router.put('/transaction/:transactionId', authMiddleware, updateTransaction);
router.delete('/transaction/:transactionId', authMiddleware, deleteTransaction);

module.exports = router;