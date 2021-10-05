/* eslint-disable no-restricted-syntax */
const $tbody = document.querySelector('tbody');
const $form = document.querySelector('#my-form');
const $modalClose = document.querySelector('.delete');
const $modal = document.querySelector('.modal');

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
          alert(`deleted operation with id ${operation.id}`);
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

async function handleSubmit(e) {
  e.preventDefault();
  const data = new URLSearchParams();
  for (const pair of new FormData($form)) {
    data.append(pair[0], pair[1]);
  }
  const result = await fetch('/api/operations', {
    method: 'post',
    body: data,
  });
  const postData = await result.json();
  alert(`updated registry with id ${postData.id}`);
  document.location.href = '/';
}

$modalClose.addEventListener('click', () => $modal.classList.toggle('is-active'));
$form.addEventListener('submit', handleSubmit);
