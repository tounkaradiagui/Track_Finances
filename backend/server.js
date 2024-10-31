const express = require('express');
const dotenv = require('dotenv');
const connectBD = require('./config/dbConnection');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')

// Routes
const authRoutes = require('./routes/userRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const transactionRoutes = require('./routes/transactionRoutes.js');
const budgetRoutes = require('./routes/budgetRoutes.js');
const goalRoutes = require('./routes/goalRoutes.js');

dotenv.config();
connectBD();

// Custom Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

// Built-in middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const APP_URL = process.env.BASE_URL

//Authentication endpoint
app.use('/api/auth', authRoutes);
app.use('/api/auth/user', categoryRoutes);
app.use('/api/auth', transactionRoutes);
app.use('/api/auth/budget', budgetRoutes);
app.use('/api/auth/goals', goalRoutes);

//Pour les requetes des page inexistantes, renvoie la view suivante
app.all('*',(req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views' ,'404.html'))
    } else if (req.accepts('json')){
        res.json({message: 'Page non disponible'})
    } else {
        res.type('txt').send('Page non disponible')
    }
});

// Custom message if backend work as expected
app.get('/', (req, res) => {
    res.send('Le Backend est Prêt');
});

// Connexion à la base de données
mongoose.connection.once('open', () => {
    console.log('App connected to MongoDB')
    //Start the server
    app.listen(PORT, () => {
        console.log(`Le serveur s'exécute sur ${APP_URL}/${PORT}`);
    });
});


