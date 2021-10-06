const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const port = 3000;

const db = new Database('./data/database.db', { verbose: console.log });

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/**
 * @param {import('express').Response} res
 */
async function getAll(req, res) {
  const operations = await getOperations().catch((e) => console.log(e));
  res.status(200).json(operations);
}

/**
 * @param {import('express').Request} req
 */
async function getOperation(req, res) {
  const { id } = req.params;
  const operation = await getRow(id).catch((e) => console.log(e));
  res.status(200).json(operation);
}

/**
 * @param {import('express').Response} res
 */
async function getBalance(req, res) {
  const balance = await getDbBalance().catch((e) => console.log(e));
  res.status(200).json(balance);
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

async function remove(req, res) {
  const { id } = req.params;
  const operation = await getRow(id).catch((e) => console.log(e));
  await dbRemove(operation);
  res.status(200).json({ message: `succesfuly deleted row with id ${id}` });
}

app.get('/api/operations', getAll);
app.get('/api/operations/:id', getOperation);
app.get('/api/balance', getBalance);
app.post('/api/operations', create);
app.get('/api/operations/delete/:id', remove);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
