const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nom: {type: String, required:true},
    prenom: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
    role: {type: String, required: false, default: 'user'},
    avatar: {type: String, required: false, default: 'https://www.congres-detergence.com/images/intervenants/photo-avatar-profil.png'},
    userType: { 
        type: String, 
        enum: ["Ouvrier", "Gestionnaire", "Etudiant", "Freelance", "Fonctionnaire", "Commerçant", "Chauffeur"], 
        default: "Freelance", 
        required: false 
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    lastLogin: {type:Date, default: Date.now}
}, 
{collection: "User", timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;