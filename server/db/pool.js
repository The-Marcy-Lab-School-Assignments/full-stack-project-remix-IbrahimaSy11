const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// A pool maintains a set of connections to the database that remain open and
// can be dynamically allocated each time we send a query. This is more efficient
// than opening and closing a new connection on every request.
// The pg library reads PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE from the
// environment automatically — no explicit config needed for local development.
// In production, PG_CONNECTION_STRING overrides all of them.
const pool = new Pool(
  process.env.PG_CONNECTION_STRING
    ? { connectionString: process.env.PG_CONNECTION_STRING }
    : {}
);

module.exports = pool;
