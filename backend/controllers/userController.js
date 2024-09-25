const mongoose = require('mongoose')
const User = require('../models/User.js');
const bcrytpjs = require('bcryptjs')

const Register = async (req, res) => {
    try {
        const {nom, prenom, email, password, userType} = req.body;
        
        //Verifier si les champs ne sont pas vide
        if(!nom || !prenom || !email || !password || !userType) {
            return res.status(400).json({message:'Tous les champs sont obligatoires'});
        };

        //Verifier si l'utilisateur existe dans la base de données
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "Un compte existe avec cette email. Veuillez vous connecter !"});
        }

        //hasher le mot de passe des utilisateurs pour la sécurité de comptes
        const hashedPassword = await bcrytpjs.hash(password, 10);

        const newUser = new User({
            nom: nom,
            prenom: prenom,
            email: email,
            password: hashedPassword,
            userType: userType
        });

        await newUser.save();

        res.status(200).json({message: "Félicitations ! Votre compte a été créer avec succès, connectez-vous", newUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erreur de server"});
    }
};

const Login = async (req, res) => {

}

module.exports = {Register, Login}