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
    app.put('/api/operations/update', this.update.bind(this));
    app.delete('/api/operations/delete/:id', this.remove.bind(this));
  }

  async getAll(req, res) {
    try {
      const operations = await this.operationService.getOperations();
      res.status(200).json(operations);
    } catch (e) {
      res.status(400).json({ message: `${e.message}` });
    }
  }

  async getOperation(req, res) {
    try {
      const { id } = req.params;
      const operation = await this.operationService.getRow(id);
      if (operation == null) {
        throw new Error(`Operation with id ${id} doesnt exist.`);
      }
      res.status(200).json(operation);
    } catch (e) {
      res.status(400).json({ Error: `${e.message}` });
    }
  }

  async getBalance(req, res) {
    try {
      const balance = await this.operationService.getDbBalance();
      res.status(200).json(balance);
    } catch (e) {
      res.status(400).json({ Error: `${e.message}` });
    }
  }

  async create(req, res) {
    try {
      const operation = req.body;
      const savedOperation = await this.operationService.save(operation);
      res.status(201).json(savedOperation);
    } catch (e) {
      res.status(400).json({ Error: `${e.message}` });
    }
  }

  async update(req, res) {
    try {
      const operation = req.body;
      const savedOperation = await this.operationService.edit(operation);
      res.status(201).json(savedOperation);
    } catch (e) {
      res.status(400).json({ Error: `${e.message}` });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const operation = await this.operationService.getRow(id);
      if (operation == null) {
        throw new Error(`Operation with id ${id} doesnt exist.`);
      }
      await this.operationService.dbRemove(operation);
      res.status(200).json({ message: `succesfuly deleted row with id ${id}` });
    } catch (e) {
      res.status(400).json({ Error: `${e.message}` });
    }
  }
};
