const express = require('express');
const dotenv = require('dotenv');
const connectBD = require('./config/dbConnection');
const mongoose= require('mongoose');
const authRoutes = require('./models/User.js')
const bodyParser = require('body-parser');
const User = require('./models/User.js');
const bcrytpjs = require('bcryptjs')

dotenv.config();
connectBD();

const app = express();
app.use(express.json());

//Authentication endpoint
// app.use('/api/auth', authRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const APP_URL = process.env.BASE_URL


// Définition d'une route de base faculttatif qui renvoie un message pour tester le serveur
app.get('/', (req, res) => {
    res.send("Le backend est prêt pour la connexion")
});

app.post('/register', async (req, res) => {

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
});

//Pour les requetes des page inexistantes, renvoie la view suivante
// app.all('*',(req, res) => {
//     res.status(404)
//     if(req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views' ,'404.html'))
//     } else if (req.accepts('json')){
//         res.json({message: '404 Not found'})
//     } else {
//         res.type('txt').send('404 Not found')
//     }
// });


// Connexion à la base de données
mongoose.connection.once('open', () => {
    console.log('App connected to MongoDB')
    //Start the server
    app.listen(PORT, () => {
        console.log(`Le serveur s'exécute sur ${APP_URL}/${PORT}`);
    });
});


