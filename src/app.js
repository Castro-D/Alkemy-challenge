const express = require('express');

const app = express();
const port = 3000;

const configureDependencyInjection = require('./config/di');
const { initOperationModule } = require('./module/operation/module');
// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const container = configureDependencyInjection();
initOperationModule(app, container);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
