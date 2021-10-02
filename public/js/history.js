const $tbody = document.querySelector('tbody');

function getAll() {
  return fetch('/api/operations')
    .then((r) => r.json());
}

async function createRows(fetchCallback) {
  const data = await fetchCallback();
  data.forEach((operation) => {
    const template = `
  <tr>
    <td>${operation.id}</td>
    <td>${operation.concept}</td>
    <td>${operation.amount}</td>
    <td>${operation.date}</td>
    <td>${operation.type}</td>
  </tr>`;
    $tbody.innerHTML += template;
  });
}

createRows(getAll);
