const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const port = 3000;

const db = new Database('./data/database.db', { verbose: console.log });

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

app.get('/operations', getAll);
app.get('/operation/:id', getOperation);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
