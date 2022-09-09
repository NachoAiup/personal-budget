const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database");

async function findByEmail(email) {
  const connection = await mysql.createConnection(databaseConfig);
  const results = await connection.query(
    "SELECT * FROM users WHERE email = ?",
    email
  );
  connection.end();
  return results?.[0]?.[0];
}

async function create(user) {
  const connection = await mysql.createConnection(databaseConfig);
  const userToCreate = {
    email: user.email,
    password: user.password,
    name: user.name,
  };
  const results = await connection.query(
    "INSERT INTO users SET ?",
    userToCreate
  );
  connection.end();
  return results[0];
}

module.exports = { findByEmail: findByEmail, create };
