const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
}, { collection: "Category", timestamps: true });
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;