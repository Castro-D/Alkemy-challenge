/* eslint-disable class-methods-use-this */
module.exports = class AbstractOperationRepository {
  constructor() {
    if (new.target === AbstractOperationRepository) {
      throw new Error(
        'An abstract repository cant be instantiated.',
      );
    }
  }

  async save() {
    throw new Error('method not implemented');
  }

  async dbRemove() {
    throw new Error('method not implemented');
  }

  async getRow() {
    throw new Error('method not implemented');
  }

  async getOperations() {
    throw new Error('method not implemented');
  }

  async getDbBalance() {
    throw new Error('method not implemented');
  }
};
