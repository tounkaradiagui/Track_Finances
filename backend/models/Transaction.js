const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    budgetId: {type: mongoose.Schema.Types.ObjectId, ref: "Budget"},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    type: {type: String, enum: ["Revenu", "Dépense"]},
    amount: {type: Number},
    description: {type: String},
}, { collection: "Transaction", timestamps:true });
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;