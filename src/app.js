const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const port = 3000;

const db = new Database('./data/database.db', { verbose: console.log });

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
