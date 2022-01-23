
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

// const User = require('../models/user');
const db = require("../db");
const { decodeToken } = require('../middleware/auth');
const User = db.user;
const Op = db.Sequelize.Op;
// Fonction pour s'enregistrer comme utilisateur
exports.signup = (req, res, next) => {
    // on hash le password qui est dans le body
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // On crée un document user avec l'email et son password haché
            const user = {
                email: req.body.email,
                password: hash,
                nom: req.body.nom,
                prenom: req.body.prenom
            };
            // on sauvegarde en base l'utilisateur
            User.create(user).then((userCreated) => res.status(201).json(
                {
                    message: 'Utilisateur créé !',
                    profile: {
                        id: userCreated.id,
                        nom: userCreated.nom,
                        isAdmin: userCreated.isAdmin,
                        prenom: userCreated.prenom,
                        email: userCreated.email,
                    },
                    token: jwt.sign(
                        {
                            id: userCreated.id,
                            nom: userCreated.nom,
                            isAdmin: userCreated.isAdmin,
                            prenom: userCreated.prenom,
                            email: userCreated.email,
                        },
                        config.random_token_secret,
                        { expiresIn: '24h' }
                    )
                }
            )).catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
};


// fonction pour authentifier un utilisateur qui veut se connecter
exports.login = (req, res, next) => {
    // on recherche l'utilisateur par son email
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // si aucun utilisateur n'a cet email alors on retourne une erreur
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            // on compare le mot de passe saisit par l'utilisateur avec le mot de passe hashé de l'utilisateur en base
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // si les mot de passe son différent on retourne une erreure
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // sinon on retourne dans notre réponse un token pour l'utilisateur qui expire dans 24h
                    res.status(200).json({
                        profile: {
                            id: user.id,
                            nom: user.nom,
                            isAdmin: user.isAdmin,
                            prenom: user.prenom,
                            email: user.email,
                        },
                        token: jwt.sign(
                            {
                                id: user.id,
                                isAdmin: user.isAdmin,
                                nom: user.nom,
                                prenom: user.prenom,
                                email: user.email,
                            },
                            config.random_token_secret,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    const userId = decodeToken(req).id;
    const userIsAdmin = decodeToken(req).isAdmin;
    console.log(userId + ' != ' + req.params.id + ' && ' + !userIsAdmin);
    if (userId != req.params.id && !userIsAdmin) {
        res.status(401).json({ message: "Vous n'avez pas le droit de supprimer ce user" })
        return false;
    }
    console.log('try to delete');
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            User.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'User supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getProfileById = function (req, res, next) {
    const id = req.params.id;
    getUserById(id).then((user) => {
        res.status(200).json(user);
    }).catch((error) => {
        res.status(404).json({ message: "user not found" });
    })
}

const getUserById = function (userId) {
    return new Promise((resolve, reject) => {
        return User.findOne({ where: { id: userId }, raw: true }).then((u) => {
            return {
                id: u.id,
                isAdmin: u.isAdmin,
                email: u.email,
                nom: u.nom,
                prenom: u.prenom,
            }
        }).then(value => resolve(value));
    });
}

exports.getUserById = getUserById;