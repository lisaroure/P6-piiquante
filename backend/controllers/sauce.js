// in controllers/stuff.js

const Sauce = require('../models/sauce');

exports.getAllSauces = (req, res, next) => {
    sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error: error }))
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: res.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }))
}

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

