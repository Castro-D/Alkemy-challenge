module.exports = class Operation {
  constructor({
    concept,
    amount,
    date,
    type,
  }) {
    this.concept = concept;
    this.amount = amount;
    this.date = date;
    this.type = type;
  }
};
