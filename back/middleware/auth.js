const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.isAuthentified = (req, res, next) => {
    try {
        // on récupère le token dans le header de la requete
        const token = req.headers.authorization.split(' ')[1];
        // on décode le token
        const decodedToken = jwt.verify(token, config.random_token_secret);
        next();
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};


module.exports.isUser = (req, res, next) => {
    try {
        // on récupère le token dans le header de la requete
        const token = req.headers.authorization.split(' ')[1];
        // on décode le token
        const decodedToken = jwt.verify(token, config.random_token_secret);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;

        // Si on est admin alors on est autorisé de presque tout
        if (isAdmin) {
            next();
        } else if (req.body.userId) {
            // si dans le body de notre requete on trouve un userId
            // et que celui ci ne correspond pas à la valeur du token on mes une erreur
            if (req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                next();
            }
        } else if (req.body.publication) {
            const publicationObj = JSON.parse(req.body.publication);
            // si on a un userId dans notre publication et si il corrspond à celui du token on mes next
            if (publicationObj.userId && publicationObj.userId == userId) {
                next();
            } else {
                throw 'Invalid user ID';
            }
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

module.exports.decodeToken = (req) => {
    try {
        // on récupère le token dans le header de la requete
        const token = req.headers.authorization.split(' ')[1];
        // on décode le token
        const decodedToken = jwt.verify(token, config.random_token_secret);
        return decodedToken
    } catch {
        throw 'Invalid Token';
    }
};