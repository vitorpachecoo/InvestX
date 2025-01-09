async function loadTransactions() {
  try {
    const response = await fetch('http://localhost:3000/transacoes');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const transactions = await response.json();
    
    // Renderiza as transações obtidas da API
    renderTransactions(transactions);
  } catch (error) {
    console.error('Erro ao carregar transações:', error);
    
    // Exibe uma mensagem amigável ao usuário
    const transactionList = document.querySelector('.transaction-list');
    transactionList.innerHTML = `<div class="error">Erro ao carregar transações. Tente novamente mais tarde.</div>`;
  }
}

function renderTransactions(transactions) {
  const transactionList = document.querySelector('.transaction-list');
  transactionList.innerHTML = ''; // Limpa a lista antes de renderizar

  transactions.forEach((transaction) => {
    const transactionItem = document.createElement('div');
    transactionItem.className = 'transaction-item';
    transactionItem.innerHTML = `
      <div>ID: ${transaction.id}</div>
      <div>Descrição: ${transaction.description}</div>
      <div>Valor: R$ ${parseFloat(transaction.amount).toFixed(2)}</div>
    `;
    transactionList.appendChild(transactionItem);
  });
}

// Chama a função para carregar as transações
loadTransactions();
