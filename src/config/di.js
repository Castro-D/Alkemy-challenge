const {
  default: DIContainer,
  object,
  get,
  factory,
} = require('rsdi');

const Sqlite3Database = require('better-sqlite3');
const { OperationController, OperationRepository, OperationService } = require('../module/operation/module');

function configureMainDatabaseAdapter() {
  return new Sqlite3Database('./data/database.db', { verbose: console.log });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.add({
    DatabaseAdapter: factory(configureMainDatabaseAdapter),
  });
}

/**
 * @param {DIContainer} container
 */
function addOperationModuleDefinitions(container) {
  container.add({
    OperationController: object(OperationController).construct(get('CarService')),
    OperationService: object(OperationService).construct(get('OperationRepository')),
    OperationRepository: object(OperationRepository).construct(get('DatabaseAdapter')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addOperationModuleDefinitions(container);
  return container;
};
