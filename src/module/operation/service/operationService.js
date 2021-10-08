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
    if (operation.id) {
      const oldRecord = this.operationRepository.getRow(operation.id);
      if (operation.type !== oldRecord.type) {
        throw new Error('cant change type field');
      }
    }
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

  async edit(operation) {
    return this.operationRepository.edit(operation);
  }
};
