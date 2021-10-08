const AbstractOperationRepository = require('../abstractOperationRepo');

module.exports = class OperationRepository extends AbstractOperationRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    super();
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import('../../entity/operation')} operation
   */
  save(operation) {
    let id;
    const isUpdate = operation.id;
    if (isUpdate) {
      id = operation.id;
      const stmt = this.databaseAdapter.prepare(
        `UPDATE operations SET
        concept = ?,
        amount = ?,
        date = ?,
        type = ?
        WHERE id = ?`,
      );
      const params = [
        operation.concept,
        operation.amount,
        operation.date,
        operation.type,
        operation.id,
      ];
      stmt.run(params);
    } else {
      const stmt = this.databaseAdapter.prepare(
        `INSERT INTO operations (
          concept,
          amount,
          date,
          type
        ) VALUES (?, ?, ?, ?)
        `,
      );
      const result = stmt.run(
        operation.concept,
        operation.amount,
        operation.date,
        operation.type,
      );
      id = result.lastInsertRowid;
    }
    return this.getRow(id);
  }

  /**
   * @param {import('../../entity/operation')} operation
   */
  dbRemove(operation) {
    this.databaseAdapter.prepare(
      `DELETE FROM operations WHERE id = ?
      `,
    ).run(operation.id);
  }

  getRow(id) {
    const operation = this.databaseAdapter.prepare(
      `SELECT
        id,
        concept,
        amount,
        date,
        type
      FROM operations WHERE id = ?`,
    ).get(id);
    return operation;
  }

  getOperations() {
    const operations = this.databaseAdapter.prepare(
      `SELECT
        id,
        concept,
        amount,
        date,
        type
      FROM operations`,
    ).all();
    return operations;
  }

  getDbBalance() {
    const balance = this.databaseAdapter.prepare(
      `SELECT
        SUM(amount)
      FROM operations`,
    ).get();
    return balance;
  }
};
