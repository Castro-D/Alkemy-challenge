const $balance = document.querySelector('#balance');

function fetchBalance() {
  return fetch('/api/balance')
    .then((response) => response.json())
    .then((data) => data['SUM(amount)']);
}

async function setBalance(balanceCallback) {
  const data = await balanceCallback();
  $balance.innerText = data;
}
setBalance(fetchBalance);
