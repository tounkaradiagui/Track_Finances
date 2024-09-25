const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    category: {type: String, required: false},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    remainingAmount: {type: Number, default: function () {return this.amount;}}, //Montant restant à dépenser
    createdAt: {type: Date, default: Date.now}
}, { collection: "Budget" });

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;