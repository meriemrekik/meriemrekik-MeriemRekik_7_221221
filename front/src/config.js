
var env = process.env.NODE_ENV || 'development'

var config = {
    development: require('./config/development.js').default,
    production: require('./config/production.js').default
}

module.exports = config[env]