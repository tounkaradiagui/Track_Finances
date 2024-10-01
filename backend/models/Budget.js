const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    period:{type: String, enum: ['mensuel', 'trimestriel', 'semestriel', 'annuel'], default: 'mensuel'},
    description:{type: String},
    amount: {type: Number, default: function () {return this.amount;}}, //Montant restant à dépenser
}, { collection: "Budget", timestamps:true });

const Budget = mongoose.model("Budget", BudgetSchema);
module.exports = Budget;