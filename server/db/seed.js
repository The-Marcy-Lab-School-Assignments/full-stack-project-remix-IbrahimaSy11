const bcrypt = require('bcrypt');
const pool = require('./pool');

const SALT_ROUNDS = 8;

const seed = async () => {
  // Drop old tables from previous projects that reference users
  await pool.query('DROP TABLE IF EXISTS rsvps');
  await pool.query('DROP TABLE IF EXISTS events');

  // REMIX: dropping medications instead of todos
  // Drop tables in reverse dependency order (medications references users via FK)
  await pool.query('DROP TABLE IF EXISTS medications');
  await pool.query('DROP TABLE IF EXISTS users');

  // users table is unchanged — same structure as the case study
  await pool.query(`
    CREATE TABLE users (
      user_id       SERIAL PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);

  // REMIX: replaced the todos table with a medications table
  // REMIX: title -> name (medication name e.g. "Metformin")
  // REMIX: added dosage column (e.g. "500mg")
  // REMIX: added frequency column (e.g. "Twice daily")
  // REMIX: is_complete -> is_taken (marks whether the user took it today)
  // REMIX: user_id FK is the same pattern — a user has many medications
  await pool.query(`
    CREATE TABLE medications (
      medication_id  SERIAL PRIMARY KEY,
      name           TEXT NOT NULL,
      dosage         TEXT NOT NULL,
      frequency      TEXT NOT NULL,
      is_taken       BOOLEAN NOT NULL DEFAULT FALSE,
      user_id        INT REFERENCES users(user_id) ON DELETE CASCADE
    )
  `);

  // Hash passwords in parallel — bcrypt is slow by design (CPU-bound hashing)
  // REMIX: changed seed users from alice/bob to ibrahim/testuser
  const [ibrahimHash, testHash] = await Promise.all([
    bcrypt.hash('password123', SALT_ROUNDS),
    bcrypt.hash('password123', SALT_ROUNDS),
  ]);

  // RETURNING captures inserted user_ids so we don't hardcode them
  // REMIX: changed usernames to match our project's seed users
  const { rows: users } = await pool.query(`
    INSERT INTO users (username, password_hash) VALUES
      ('ibrahim',  $1),
      ('testuser', $2)
    RETURNING user_id, username
  `, [ibrahimHash, testHash]);

  const [ibrahim, testuser] = users;

  // REMIX: replaced todo sample data with medication sample data
  // REMIX: each row now has name, dosage, frequency, is_taken instead of title, is_complete
  await pool.query(`
    INSERT INTO medications (name, dosage, frequency, is_taken, user_id) VALUES
      ('Metformin',  '500mg',    'Twice daily', FALSE, $1),
      ('Lisinopril', '10mg',     'Once daily',  FALSE, $1),
      ('Vitamin D',  '2000 IU',  'Daily',       TRUE,  $1),
      ('Ibuprofen',  '200mg',    'As needed',   FALSE, $2),
      ('Melatonin',  '5mg',      'Nightly',     TRUE,  $2),
      ('Zinc',       '50mg',     'Daily',       FALSE, $2)
  `, [ibrahim.user_id, testuser.user_id]);

  return users;
};

seed()
  .then((users) => {
    console.log('Database seeded successfully.');
    console.log(`  Users: ${users.map((u) => u.username).join(', ')}`);
  })
  .catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
  })
  .finally(() => pool.end());