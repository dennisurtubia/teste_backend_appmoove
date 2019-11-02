const knex = require('knex');
const config = require('./knexfile');

const developmentConfig = config.development;

const connection = knex(developmentConfig);

module.exports = connection;
