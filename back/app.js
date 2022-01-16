//importation des packages de express

const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const config = require('./config');
const rateLimit = require('./middleware/rate-limit');

const app = express();
app.use(express.json());
/*
app.use((req, res, next) => {
    //qui peut accéder à l'API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
*/
const cors = require('cors');
app.use(cors());


//gestion des principaux chemins de l'API sauces,auth,images
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use('/api', rateLimit.bruteForceLimiter);

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const publicationRoutes = require('./routes/publication');
app.use('/api/publication', publicationRoutes);


module.exports = app;