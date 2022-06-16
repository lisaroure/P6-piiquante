const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://piiquante:qBXn3B5M5SCONjNe@cluster0.cdgq4dw.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;