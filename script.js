document.addEventListener("DOMContentLoaded", function () {
    // Gráfico de linha para resumo mensal
    const ctxSummary = document.getElementById('summaryChart').getContext('2d');
    new Chart(ctxSummary, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Savings',
                data: [3000, 5000, 4000, 7000, 8000, 10000, 9500, 11000, 12000, 15000, 17000, 25000],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#007bff',
                pointRadius: 5,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#666' } },
                y: { grid: { color: 'rgba(0, 0, 0, 0.1)' }, ticks: { beginAtZero: true, color: '#666' } }
            }
        }
    });

    // Gráfico de progresso em formato de rosca
    const ctxProgress = document.getElementById('progressDoughnut').getContext('2d');
    new Chart(ctxProgress, {
        type: 'doughnut',
        data: {
            labels: ['Concluído', 'Restante'],
            datasets: [{
                data: [75, 25],
                backgroundColor: ['#007bff', '#e0e0e0'],
                hoverBackgroundColor: ['#0056b3', '#cccccc'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            cutout: '75%', // Tamanho do círculo interno para o estilo moderno
        }
    });
});


function makeTransaction() {
    const transactionType = document.getElementById("transaction-type").value;
    const recipient = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    if (transactionType === "transferido" && !recipient) {
        alert("Por favor, insira o destinatário para transferência.");
        return;
    }

    // Salvar transação no localStorage
    const newTransaction = {
        type: transactionType.charAt(0).toUpperCase() + transactionType.slice(1),
        recipient: recipient || 'N/A',
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0]
    };

    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    storedTransactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(storedTransactions));

    // Exibir o modal de sucesso
    showModal();

    // Limpar formulário
    document.getElementById("transaction-form").reset();
}

function showModal() {
    const modal = document.getElementById("successModal");
    modal.classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("successModal");
    modal.classList.add("hidden");
}



