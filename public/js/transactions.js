const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {
  transactions: [],
};

document.getElementById("button-logout").addEventListener("click", logout);

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-input").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type = document.querySelector('input[name="type-input"]:checked').value;

  const saldoTotal = getTotal();
  const novoTotal = type === "1" ? saldoTotal + value : saldoTotal - value;

  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  });

  saveData(data);
  e.target.reset();
  myModal.hide();

  getTransactions();

  if (novoTotal < 0) {
    alert(
      "Atenção. Seu saldo após cadastrar essa despesa será negativo, deseja continuar?"
    );
  } else {
    alert("Lançamento adicionado com sucesso.");
  }
});

chechLogged();

function chechLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = 'Entrada';

      if (item.type === "2") {
        type = "Saída";
      }

      transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `;
    });
  }

  document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;
  
    transactions.forEach((item) => {
      if (item.type === "1") {
        total += item.value;
      } else {
        total -= item.value;
      }
    });

    return total;
  }
  
  function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
  }
  

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
