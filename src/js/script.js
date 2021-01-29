const Modal = {
    openClose() {
        document.querySelector(".modal-transaction").classList.toggle("active")
    }
}


const transactions = [
    {
        id: 1,
        desription: "Agua",
        value: -10000,
        date: "29/01/2021"
    },
    {
        id: 2,
        desription: "Suellen",
        value: 300012,
        date: "29/01/2021"
    },
    {
        id: 3,
        desription: "Internet",
        value: -10000,
        date: "29/01/2021"
    },
    {
        id: 4,
        desription: "Servico de Streaming",
        value: -10000,
        date: "29/01/2021"
    },
    {
        id: 5,
        desription: "Natan",
        value: 104500,
        date: "30/01/2021"
    },
]


const Transaction = {
    incomes() { //somar as entradas
        //pegar todas as transacoes
        let income = 0 //variavel que recebera os valores
        transactions.forEach((transaction) => { //para cada transacao
            if (transaction.value > 0) { //se ela for maior que 0
                income = income + transaction.value //somar a uma variavel
            }
        })
        return income //retornar a variavel
    },

    expenses() { //somar as saidas
        //pegar todas as transacoes
        let expenses = 0//variavel que recebera os valores
        transactions.forEach((transaction) => { //para cada transacao
            if(transaction.value < 0) { //se ela for menor que 0
                expenses = expenses + transaction.value //somar a uma variavel
            }
        })
        return expenses //retornar a variavel
    },
    
    total() {
        //entradas - saidas
        let total = this.incomes() + this.expenses()
        return total
    }
}

const Dom = {
    transactionsContainer: document.querySelector(".transactions__table, tbody"),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = Dom.innerHTMLTransaction(transaction)
        
        Dom.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const status = transaction.value > 0 ? "income" : "expense"
        const value = Utils.formatCurrency(transaction.value)
        const html = `
            <td class="description">${transaction.desription}</td>
            <td class="${status}">${value}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./src/img/svg/minus.svg" alt="Remover Transação"></td>
        `
        return html
    },
    updateBalance() {
        document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })

        return signal + value 

        //console.log(signal + value)
    }
}


transactions.forEach(function(transaction) {
    Dom.addTransaction(transaction)
})

Dom.updateBalance()