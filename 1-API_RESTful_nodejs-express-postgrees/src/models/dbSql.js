require('dotenv').config();
const postgres = require('postgres');
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
});

module.exports = sql