/**
 * @typedef {import('../repository/abstractOperationRepo')} AbstractOperationRepository
 */

module.exports = class OperationService {
  /**
   * @param {AbstractOperationRepository} operationRepository
   */
  constructor(operationRepository) {
    this.operationRepository = operationRepository;
  }

  async save(operation) {
    return this.operationRepository.save(operation);
  }

  async dbRemove(operation) {
    return this.operationRepository.dbRemove(operation);
  }

  async getRow(id) {
    return this.operationRepository.getRow(id);
  }

  async getOperations() {
    return this.operationRepository.getOperations();
  }

  async getDbBalance() {
    return this.operationRepository.getDbBalance();
  }
};
