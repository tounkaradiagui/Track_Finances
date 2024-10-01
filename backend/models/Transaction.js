const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    type: {type: String, enum: ["revenu", "depense"]},
    amount: {type: Number},
    description: {type: String},
}, { collection: "Transaction", timestamps:true });
const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;