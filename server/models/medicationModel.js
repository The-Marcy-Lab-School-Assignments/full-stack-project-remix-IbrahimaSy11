const pool = require('../db/pool');

// REMIX: renamed from todoModel.js to medicationModel.js
// REMIX: all queries now target the medications table instead of todos
// REMIX: todo_id -> medication_id, title -> name, is_complete -> is_taken
// REMIX: added dosage and frequency as new columns

// Returns all medications for a specific user, ordered by creation time
module.exports.listByUser = async (user_id) => {
  const query = 'SELECT * FROM medications WHERE user_id = $1 ORDER BY medication_id ASC';
  const { rows } = await pool.query(query, [user_id]);
  return rows;
};

// Returns a single medication row (used for ownership checks before update/delete)
module.exports.find = async (medication_id) => {
  const query = 'SELECT * FROM medications WHERE medication_id = $1';
  const { rows } = await pool.query(query, [medication_id]);
  return rows[0] || null;
};

// Creates a new medication. Returns the full medication row.
module.exports.create = async (name, dosage, frequency, user_id) => {
  const query = `
    INSERT INTO medications (name, dosage, frequency, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [name, dosage, frequency, user_id]);
  return rows[0];
};

// Updates is_taken for a medication. Returns the updated row.
module.exports.update = async (medication_id, { is_taken }) => {
  const query = 'UPDATE medications SET is_taken = $1 WHERE medication_id = $2 RETURNING *';
  const { rows } = await pool.query(query, [is_taken, medication_id]);
  return rows[0];
};

// Deletes a medication by id
module.exports.destroy = async (medication_id) => {
  const query = 'DELETE FROM medications WHERE medication_id = $1 RETURNING *';
  const { rows } = await pool.query(query, [medication_id]);
  return rows[0] || null;
};
