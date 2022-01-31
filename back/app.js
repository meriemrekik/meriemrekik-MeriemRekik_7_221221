//importation des packages de express

const express = require('express');
const cors = require('cors');
const config = require('./config');
const rateLimit = require('./middleware/rate-limit');

const app = express();
app.use(express.json());

app.use(cors());


//gestion des principaux chemins de l'API sauces,auth,images
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', rateLimit.bruteForceLimiter);

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const publicationRoutes = require('./routes/publication');
app.use('/api/publication', publicationRoutes);


module.exports = app;