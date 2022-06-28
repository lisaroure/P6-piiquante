const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/User');

const mongoose = require('mongoose');
const app = express();



mongoose.connect('mongodb+srv://piiquante:qBXn3B5M5SCONjNe@cluster0.cdgq4dw.mongodb.net/piiquante?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(helmet());

app.use(express.json());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;