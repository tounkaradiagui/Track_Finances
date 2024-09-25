const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    type: {type: String, enum: ["income", "expense"]},
    amount: {type: Number},
    date: {type: Date},
    description: {type: String},
    createdAt: {type: Date, default: Date.now}
}, { collection: "Transaction" });
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;