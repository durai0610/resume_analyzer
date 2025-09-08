const { Pool } = require('pg');
const config = require('../config/index.js');

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
  ssl: true
});

// A function to handle queries to the database
const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};