/* eslint-disable no-restricted-syntax */
const $form = document.querySelector('#my-form');

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
  alert(`created new registry with id ${postData.id}`);
  document.location.href = '/';
}

$form.addEventListener('submit', handleSubmit);
