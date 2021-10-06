const AbstractController = require('../../abstractController');

module.exports = class OperationController extends AbstractController {
  /**
   * @param {import('../service/operationService')} operationService
   */
  constructor(operationService) {
    super();
    this.operationService = operationService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    app.get('/api/operations', this.getAll.bind(this));
    app.get('/api/operations/:id', this.getOperation.bind(this));
    app.get('/api/balance', this.getBalance.bind(this));
    app.post('/api/operations', this.create.bind(this));
    app.get('/api/operations/delete/:id', this.remove.bind(this));
  }

  async getAll(req, res) {
    const operations = await this.operationService.getOperations().catch((e) => console.log(e));
    res.status(200).json(operations);
  }

  async getOperation(req, res) {
    const { id } = req.params;
    const operation = await this.operationService.getRow(id).catch((e) => console.log(e));
    res.status(200).json(operation);
  }

  async getBalance(req, res) {
    const balance = await this.operationService.getDbBalance().catch((e) => console.log(e));
    res.status(200).json(balance);
  }

  async create(req, res) {
    const operation = req.body;
    const savedOperation = await this.operationService.save(operation).catch((e) => console.log(e));
    res.status(201).json(savedOperation);
  }

  async remove(req, res) {
    const { id } = req.params;
    const operation = await this.operationService.getRow(id).catch((e) => console.log(e));
    await this.operationService.dbRemove(operation);
    res.status(200).json({ message: `succesfuly deleted row with id ${id}` });
  }
};
