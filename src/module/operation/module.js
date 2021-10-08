const OperationController = require('./controller/operationController');
const OperationService = require('./service/operationService');
const OperationRepository = require('./repository/sqlite/operationRepo');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
 * @type {OperationController} controller
 */
  const controller = container.get('OperationController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  OperationController,
  OperationRepository,
  OperationService,
};
