const Router = require("express");
const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database");
const { verifyTokenMiddleware } = require("../middlewares/auth");
const httpStatus = require("http-status");

const router = Router();

router.get("/lastTenTransactions", verifyTokenMiddleware, async (req, res) => {
  const connection = await mysql.createConnection(databaseConfig);
  const user_id = req.user.id;
  const results = await connection.query(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY date LIMIT 10",
    user_id
  );
  connection.end();
  res.json(results[0]);
});

router.get("/transactionsAmount", verifyTokenMiddleware, async (req, res) => {
  const connection = await mysql.createConnection(databaseConfig);
  const user_id = req.user.id;
  const results = await connection.query(
    "SELECT type, amount FROM transactions WHERE user_id = ?",
    user_id
  );
  connection.end();
  res.json(results[0]);
});

router.get(
  "/transactionsByFilters",
  verifyTokenMiddleware,
  async (req, res) => {
    const connection = await mysql.createConnection(databaseConfig);
    req.query.user_id = req.user.id;
    const { user_id, type, category, date } = req.query;
    const query = [];
    const values = [];
    if (user_id) {
      query.push("user_id = ?");
      values.push(user_id);
    }
    if (type) {
      query.push("type = ?");
      values.push(type);
    }
    if (category) {
      query.push("category = ?");
      values.push(category);
    }
    if (date) {
      query.push("date like ?");
      values.push(date);
    }
    const results = await connection.query(
      `SELECT * FROM transactions${` WHERE ${query.join(" AND ")}`}`,
      values
    );
    connection.end();
    res.json(results[0]);
  }
);

router.post("/", verifyTokenMiddleware, async (req, res) => {
  const connection = await mysql.createConnection(databaseConfig);
  const newTransaction = { ...req.body, user_id: req.user.id };
  await connection.query(`INSERT INTO transactions SET ?`, newTransaction);
  connection.end();
  res.status(httpStatus.CREATED).end();
});

router.put("/:transaction_id", verifyTokenMiddleware, async (req, res) => {
  const connection = await mysql.createConnection(databaseConfig);
  await connection.query(
    `UPDATE transactions SET ? WHERE transaction_id = ${req.params.transaction_id}`,
    req.body
  );
  connection.end();
  res.status(201).end();
});

router.delete("/:transaction_id", verifyTokenMiddleware, async (req, res) => {
  const connection = await mysql.createConnection(databaseConfig);
  await connection.query(
    `DELETE FROM transactions WHERE transaction_id = ${req.params.transaction_id}`
  );
  connection.end();
  res.status(201).end();
});

module.exports = router;
