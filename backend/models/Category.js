const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: false},
    createdAt: {type: Date, default: Date.now}
}, { collection: "Category" });
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;