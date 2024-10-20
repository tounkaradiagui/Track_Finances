const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { log } = require("console");

const Register = async (req, res) => {
  try {
    const { nom, prenom, email, password, confirmPassword, userType } = req.body;

    //Verifier si les champs ne sont pas vide
    if (!nom || !prenom || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    //Verifier si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "Un compte existe avec cette email. Veuillez vous connecter !",
        });
    }

    // Vérifier si le mot de passe et le mot de passe confirmé sont identiques
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }

    //hasher le mot de passe des utilisateurs pour la sécurité de comptes
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nom: nom,
      prenom: prenom,
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await newUser.save();

    res
      .status(200)
      .json({
        message:
          "Félicitations ! Votre compte a été créer avec succès, connectez-vous",
        newUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur de server" });
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
    const { email, password } = req.body;

    if(!email || email === "") {
      return res.status(400).json({ message: "Veuillez entrer votre email" });
    }
    if(!password || password === "") {
      return res.status(400).json({ message: "Veuillez entrer votre mot de passe"});
    }

    // Check if user exist in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Ce compte n'existe pas. Veuillez vous inscrire" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email, nom: user.nom, lastLogin: user.lastLogin }, secretKey, { expiresIn: '7d' });
    res.cookie("Authorization", "Bearer " + token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });


    res.status(200).json({
      message: "Vous êtes connecté",
      token,
      user:{
        _id:user._id,
        email:user.email,
        nom:user.nom,
        prenom:user.prenom,
        lastLogin:user.lastLogin
        // avatar:user.avatar,
      }
    });

  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ message: "Erreur de server" });
  }
};

const UpdateUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { nom, prenom, email } = req.body;

    // Vérifiez si userId est une chaîne valide avant de faire la requête
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { nom, prenom, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Exclure le mot de passe et le type d'utilisateur de la réponse
    const { password, userType, createdAt, ...userResponse } = user.toObject();

    // Inclure updatedAt dans la réponse
    userResponse.updatedAt = user.updatedAt;
    userResponse.lastLogin = user.lastLogin;

    res
      .status(200)
      .json({ message: "Votre profil a été mis à jour", user: userResponse });
  } catch (error) {
    console.log("Erreur: ", error);
    res.status(500).json({ message: "Erreur de server" });
  }
};

const Logout = async (req, res) => {
  try {
    res
      .clearCookie("Authorization")
      .status(201)
      .json({ message: "Vous etes deconnecté ! " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur de server" });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now + 1 * 60 * 60 * 1000; // 1h

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
  } catch (error) {
    console.log("Erreur: ", error);
    res.status(500).json({ message: "Erreur de server" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
};

const DeleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ message: "Votre compte a été supprimé" });
  } catch (error) {
    console.log("Erreur: ", error);
    res.status(500).json({ message: "Erreur de server" });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Vérifiez que l'utilisateur est connecté
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifiez que les mots de passe sont bien des chaînes de caractères
    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string' || typeof confirmNewPassword !== 'string') {
      return res.status(400).json({ message: "Les mots de passe doivent être des chaînes de caractères." });
    }

    // Vérifiez que les champs de mots de passe sont bien renseignés
    if (!oldPassword || oldPassword === "") {
      return res.status(400).json({ message: "L'ancien mot de passe est obligatoire" });
    }
    if (!newPassword || newPassword === "") {
      return res.status(400).json({ message: "Le nouveau mot de passe est obligatoire"});
    }
    if (!confirmNewPassword || confirmNewPassword === "") {
      return res.status(400).json({ message: "La confirmation du nouveau mot de passe est obligatoire"});
    }

    // Vérifiez que les nouveaux mots de passe correspondent
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Les nouveaux mots de passe ne correspondent pas." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "L'ancien mot de passe est incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification du mot de passe :", error);
    res.status(500).json({ message: "Erreur lors de la modification du mot de passe." });
  }
};

const protectedData = (req, res) => {
  try {
    // Vérifier que l'utilisateur est connecté
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Accès refusé. Vous devez être connecté." });
    }

    // Crée les données protégées
    const data = {
      message: 'Voici vos données protégées !',
      userId: req.user.userId, // Utilisateur authentifié
      nom: req.user.nom,
      prenom: req.user.prenom,
      email: req.user.email
    };
    // Envoie les données protégées
    res.json(data);


  } catch (error) {
   console.log(error); 
  }  
};

const getUserById = async (req, res) => {
  try {
    const  userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    return res.status(200).json(user);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Erreur de serveur"});
  }
};

module.exports = {
  Register,
  Login,
  UpdateUserProfile,
  DeleteUserAccount,
  ForgotPassword,
  secretKey,
  Logout,
  ChangePassword,
  ResetPassword,
  protectedData,
  getUserById
};
