const mongoose = require('mongoose')
const User = require('../models/User.js');
const bcrytpjs = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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

// Generate a secret key
const generateSecretKey = () => {
    const secret = crypto.randomBytes(32).toString("hex");
    return secret;
};
  
// Create a secret key
const secretKey = generateSecretKey();

const Login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exist in the database
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Ce compte n'existe pas. Veuillez vous inscrire"});
        }

        const isPasswordValid = await bcrytpjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Mot de passe incorrect"});
        }

        const token = jwt.sign({userId:user._id}, secretKey);  //{expiresIn: '1h'}
        res.status(200).json({message: "Vous êtes connecté", token});

    } catch (error) {
        console.log("Error : ", error);
        res.status(500).json({message: "Erreur de server"});
    }
};

const UpdateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {nom, prenom, email} = req.body;

        // Vérifiez si userId est une chaîne valide avant de faire la requête
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "ID utilisateur invalide" });
        }

        const user = await User.findByIdAndUpdate(userId, {nom, prenom, email}, {new: true});

        if(!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"});
        }

        // Exclure le mot de passe et le type d'utilisateur de la réponse
        const { password, userType, createdAt, ...userResponse } = user.toObject();

        // Inclure updatedAt dans la réponse
        userResponse.updatedAt = user.updatedAt;

        res.status(200).json({ message: "Votre profil a été mis à jour", user: userResponse });
                
    } catch (error) {
        console.log("Erreur: ", error);
        res.status(500).json({message: "Erreur de server"});
    }
};


// const Logout = async (req, res) => {

// }

const ForgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        // Générer un token de réinitialisation
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now + 1 * 60 * 60 * 1000 // 1h

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
    } catch (error) {
        
    }
};

const DeleteUserAccount = async (req, res) => {
    try {
        const  userId = req.params.userId;

        const user = await User.findByIdAndDelete(userId);
        if(!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"});
        }
        res.status(200).json({message: "Votre compte a été supprimé"});
    } catch (error) {
        console.log("Erreur: ", error);
        res.status(500).json({message: "Erreur de server"});
    }
}

module.exports = {Register, Login, UpdateUserProfile, DeleteUserAccount, ForgotPassword}