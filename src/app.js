const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const port = 3000;

const db = new Database('./data/database.db', { verbose: console.log });

// middleware
app.use(express.urlencoded({ extended: true }));

async function getOperations() {
  const operations = db.prepare(
    `SELECT
      id,
      concept,
      amount,
      date,
      type
    FROM operations`,
  ).all();
  return operations;
}

/**
 * @param {import('express').Response} res
 */
async function getAll(req, res) {
  const operations = await getOperations().catch((e) => console.log(e));
  res.status(200).json(operations);
}

async function getRow(id) {
  const operation = db.prepare(
    `SELECT
      id,
      concept,
      amount,
      date,
      type
    FROM operations WHERE id = ?`,
  ).get(id);
  return operation;
}

/**
 * @param {import('express').Request} req
 */
async function getOperation(req, res) {
  const { id } = req.params;
  const operation = await getRow(id).catch((e) => console.log(e));
  res.status(200).json(operation);
}

async function getDbBalance() {
  const balance = db.prepare(
    `SELECT
      SUM(amount)
    FROM operations`,
  ).get();
  return balance;
}

/**
 * @param {import('express').Response} res
 */
async function getBalance(req, res) {
  const balance = await getDbBalance().catch((e) => console.log(e));
  res.status(200).json(balance);
}

/**
  * @param {import('./entity/operation')} operation
  */
async function save(operation) {
  let id;
  const isUpdate = operation.id;
  if (isUpdate) {
    id = operation.id;
    const stmt = db.prepare(
      `UPDATE operations SET
      concept = ?,
      amount = ?,
      date = ?,
      type = ?
      WHERE id = ?`,
    );
    const params = [
      operation.concept,
      operation.amount,
      operation.date,
      operation.type,
      operation.id,
    ];
    stmt.run(params);
  } else {
    const stmt = db.prepare(
      `INSERT INTO operations (
        concept,
        amount,
        date,
        type
      ) VALUES (?, ?, ?, ?)
      `,
    );
    const result = stmt.run(
      operation.concept,
      operation.amount,
      operation.date,
      operation.type,
    );
    id = result.lastInsertRowid;
  }
  return getRow(id);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function create(req, res) {
  const operation = req.body;
  const savedOperation = await save(operation).catch((e) => console.log(e));
  res.status(201).json(savedOperation);
}

async function dbRemove(operation) {
  db.prepare(
    `DELETE FROM operations WHERE id = ?
    `,
  ).run(operation.id);
}

async function remove(req, res) {
  const { id } = req.params;
  const operation = await getRow(id).catch((e) => console.log(e));
  await dbRemove(operation);
  res.status(200).json({ message: `succesfuly deleted row with id ${id}` });
}

app.get('/operations', getAll);
app.get('/operations/:id', getOperation);
app.get('/balance', getBalance);
app.post('/operations', create);
app.get('/operations/delete/:id', remove);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
