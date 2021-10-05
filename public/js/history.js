const $tbody = document.querySelector('tbody');

function getAll() {
  return fetch('/api/operations')
    .then((r) => r.json());
}

async function createRows(fetchCallback) {
  const data = await fetchCallback();
  data.forEach((operation) => {
    const row = document.createElement('tr');
    Object.values(operation).forEach((value) => {
      const cell = document.createElement('td');
      const textNode = document.createTextNode(value);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    const buttons = document.createElement('td');
    const editLink = document.createElement('a');
    const deleteButton = document.createElement('a');

    editLink.addEventListener('click', () => {
      const $modal = document.querySelector('.modal');
      const $concept = document.querySelector('#concept');
      const $id = document.querySelector('#id');
      const $amount = document.querySelector('#amount');
      const $date = document.querySelector('#date');
      const $type = document.querySelector('#type');

      $modal.classList.add('is-active');
      $id.value = operation.id;
      $concept.value = operation.concept;
      $amount.value = operation.amount;
      $date.value = operation.date;
      $type.value = operation.type;
    });

    deleteButton.addEventListener('click', () => {
      fetch(`/api/operations/delete/${operation.id}`)
        .then(() => {
          alert(`removed operation with id ${operation.id}`);
          window.location.reload();
        });
    });
    editLink.innerHTML = 'Edit';
    deleteButton.innerHTML = 'Delete';

    buttons.append(editLink, deleteButton);
    row.appendChild(buttons);
    $tbody.appendChild(row);
  });
}

createRows(getAll);
