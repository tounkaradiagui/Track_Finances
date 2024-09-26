const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nom: {type: String, required:true},
    prenom: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required: true},
    userType: {type: String, enum: ["ouvrier", "gestionnaire", "etudiant", "freelance", "fonctionnaire", "commerçant", "chauffeur"], required: true},
    // createdAt: {type: Date, default: Date.now}
}, 
{collection: "User", timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;