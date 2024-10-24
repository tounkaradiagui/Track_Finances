const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const Register = async (req, res) => {
  try {
    const { nom, prenom, email, password, confirmPassword, userType } =
      req.body;

    //Verifier si les champs ne sont pas vide
    if (!nom || !prenom || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    //Verifier si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Un compte existe avec cette email. Veuillez vous connecter !",
      });
    }

    // Vérifier si le mot de passe et le mot de passe confirmé sont identiques
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas." });
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

    // Configuration de l'e-mail
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Préparation de l'e-mail HTML
    const mailOptions = {
      to: newUser.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Bienvenue sur FundWise !",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                background-color: #078ECB;
                color: white;
                padding: 10px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              h2 {
                margin: 0;
                padding: 10px 0;
              }
              p {
                font-size: 16px;
                line-height: 1.5;
              }
              .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777;
                text-align: center;
                border-top: 1px solid #e0e0e0;
                padding: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Bienvenue sur FundWise</h2>
              </div>
              <h1>Bonjour ${newUser.prenom} ${newUser.nom},</h1>
                <p>Félicitations ! Votre compte a été créé avec succès. Nous sommes ravis de vous accueillir dans la communauté de FundWise !</p>

              <h2>Pourquoi choisir FundWise ?</h2>
                <ul>
                  <li><strong>Suivi des Revenus et Dépenses :</strong> Enregistrez et visualisez facilement vos flux financiers.</li>
                  <li><strong>Budgétisation :</strong> Créez des budgets personnalisés pour respecter vos limites de dépenses.</li>
                  <li><strong>Analyse des Transactions :</strong> Accédez à des graphiques et rapports sur vos habitudes de dépenses.</li>
                  <li><strong>Rappels de Paiement :</strong> Recevez des notifications pour vos paiements récurrents.</li>
                  <li><strong>Sécurité des Données :</strong> Vos informations sont protégées grâce à des mesures de cryptage avancées.</li>
                </ul>

              <h2>L'importance de notre application</h2>
                <p>Avec FundWise, vous pouvez prendre des décisions financières éclairées et planifier efficacement vos objectifs.</p>

                <h2>Prêt à commencer ?</h2>
                <p>Connectez-vous à votre compte et explorez toutes les fonctionnalités. Si vous avez des questions, contactez notre support contact@fundWise.com.</p>

                <p>Merci d'avoir choisi FundWise !</p>

              <div class="footer">
                <p>Cordialement,<br>L'équipe de support</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({
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

    if (!email || email === "") {
      return res.status(400).json({ message: "Veuillez entrer votre email" });
    }
    if (!password || password === "") {
      return res
        .status(400)
        .json({ message: "Veuillez entrer votre mot de passe" });
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

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        nom: user.nom,
        lastLogin: user.lastLogin,
      },
      secretKey,
      { expiresIn: "7d" }
    );
    res.cookie("Authorization", "Bearer " + token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      message: "Vous êtes connecté",
      token,
      user: {
        _id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        lastLogin: user.lastLogin,
        // avatar:user.avatar,
      },
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
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1h

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
  } catch (error) {
    console.log("Erreur: ", error);
    res.status(500).json({ message: "Erreur de server" });
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
      return res
        .status(401)
        .json({ message: "Accès refusé. Vous devez être connecté." });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifiez que les mots de passe sont bien des chaînes de caractères
    if (
      typeof oldPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmNewPassword !== "string"
    ) {
      return res.status(400).json({
        message: "Les mots de passe doivent être des chaînes de caractères.",
      });
    }

    // Vérifiez que les champs de mots de passe sont bien renseignés
    if (!oldPassword || oldPassword === "") {
      return res
        .status(400)
        .json({ message: "L'ancien mot de passe est obligatoire" });
    }
    if (!newPassword || newPassword === "") {
      return res
        .status(400)
        .json({ message: "Le nouveau mot de passe est obligatoire" });
    }
    if (!confirmNewPassword || confirmNewPassword === "") {
      return res.status(400).json({
        message: "La confirmation du nouveau mot de passe est obligatoire",
      });
    }

    // Vérifiez que les nouveaux mots de passe correspondent
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "Les nouveaux mots de passe ne correspondent pas." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "L'ancien mot de passe est incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification du mot de passe :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du mot de passe." });
  }
};

const protectedData = (req, res) => {
  try {
    // Vérifier que l'utilisateur est connecté
    if (!req.user || !req.user.userId) {
      return res
        .status(401)
        .json({ message: "Accès refusé. Vous devez être connecté." });
    }

    // Crée les données protégées
    const data = {
      message: "Voici vos données protégées !",
      userId: req.user.userId, // Utilisateur authentifié
      nom: req.user.nom,
      prenom: req.user.prenom,
      email: req.user.email,
    };
    // Envoie les données protégées
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur de serveur" });
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  //Create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // Configure the email service: Service used is Gmail
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //  Setup an email template
  const mailOptions = {
    from: "contact@diagui-shop.com",
    to: email,
    subject: "Veuillez vérifier votre adresse email",
    text: `Cliquez sur le lien suivant pour valider votre compte : http://192.168.11.140:${PORT}/verify/${verificationToken}`,
  };

  //  Send the verification link via email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("La vérification de l'adresse email n'a pas pu être envoyée.");
  }
};

// Fonction pour envoyer l'e-mail de réinitialisation
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Cherche l'utilisateur par e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cet e-mail." });
    }

    // Crée un token de réinitialisation
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiresAt = Date.now() + 3600000; // Le token expire dans 1 heure

    await user.save();

    // Prépare l'e-mail après la création du token
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Réinitialisation du mot de passe",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FundWise</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .header {
                    background-color: #078ECB;
                    padding: 20px;
                    text-align: center;
                }
                .header h1 {
                    color: #fff;
                    margin: 0;
                    font-size: 24px;
                }
                .body {
                    padding: 10px;
                }
                .body p {
                    font-size: 18px;
                    margin: 20px 0;
                }
                .footer {
                    background-color: #078ECB;
                    padding: 10px;
                    text-align: center;
                    color: #fff;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>FundWise</h1>
            </div>
            <div class="body">
                <p>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez suivre ce lien pour réinitialiser votre mot de passe : 
                <a href="http://192.168.200.140:5000/api/auth/reset-password/${token}">Réinitialiser le mot de passe</a></p>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet e-mail.</p>
            </div>
            <div class="footer">
                <p>© 2024 FundWise. Tous droits réservés.</p>
            </div>
        </body>
        </html>
      `,
    };

    // Envoie l'e-mail
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Un e-mail de réinitialisation a été envoyé." });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue, veuillez réessayer." });
  }
};

// Cette fonction permet à l'utilisateur de définir un nouveau mot de passe en utilisant le token envoyé par e-mail.
const ResetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  // Vérifiez si les mots de passe correspondent
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // Vérifie si le token est valide
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Le token est invalide ou a expiré." });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Réinitialiser le token et la date d'expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    // Configuration de l'e-mail
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Préparation de l'e-mail
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Confirmation de réinitialisation du mot de passe",
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                background-color: #078ECB;
                color: white;
                padding: 10px;
                text-align: center;
                border-radius: 5px 5px 0 0;
              }
              h2 {
                margin: 0;
                padding: 10px 0;
              }
              p {
                font-size: 16px;
                line-height: 1.5;
              }
              .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #777;
                text-align: center;
                border-top: 1px solid #e0e0e0;
                padding: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>FundWise</h2>
              </div>
              <p>Bonjour,</p>
              <p>Votre mot de passe a été réinitialisé avec succès.</p>
              <p>Si vous n'êtes pas à l'origine de cette action, veuillez contacter notre support. fundwise@gmail.com</p>
              <div class="footer">
                <p>Cordialement,<br>L'équipe de support</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Le mot de passe a été réinitialisé avec succès." });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error
    );
    return res
      .status(500)
      .json({ message: "Une erreur est survenue, veuillez réessayer." });
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
  getUserById,
  requestPasswordReset,
};
