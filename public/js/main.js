const $balance = document.querySelector('#balance');

function fetchBalance() {
  return fetch('/api/balance')
    .then((response) => response.json())
    .then((data) => data['SUM(amount)']);
}

function getAll() {
  return fetch('/api/operations')
    .then((r) => r.json());
}

async function setBalance(balanceCallback) {
  const data = await balanceCallback();
  $balance.innerText = `$${data}`;
}

async function getLastTen(dataCallback) {
  const data = await dataCallback();
  const slicedData = data.slice(Math.max(data.length - 10, 0));
  return slicedData;
}

async function createTable(dataCallback) {
  const data = await dataCallback(getAll);
  const $tbody = document.querySelector('tbody');

  data.forEach((operation) => {
    const row = document.createElement('tr');
    Object.values(operation).forEach((value) => {
      const cell = document.createElement('td');
      const textNode = document.createTextNode(value);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    $tbody.appendChild(row);
  });
}

setBalance(fetchBalance);
createTable(getLastTen);
