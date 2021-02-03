const Modal = {
    openClose() {
        document.querySelector(".modal-transaction").classList.toggle("active")
    }
}

//Salvando os dados no localStorage
const Storage = {
    get () {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}


// const transactions = [ // Os dados eram puxados dessa variavel
//     {
//         // id: 1,
//         description: "Agua",
//         value: -10000,
//         date: "29/01/2021"
//     },
//     {
//         // id: 2,
//         description: "Suellen",
//         value: 300012,
//         date: "29/01/2021"
//     },
//     {
//         // id: 3,
//         description: "Internet",
//         value: -10000,
//         date: "29/01/2021"
//     },
//     {
//         // id: 4,
//         description: "Servico de Streaming",
//         value: -10000,
//         date: "29/01/2021"
//     },
//     {
//         // id: 5,
//         description: "Natan",
//         value: 104500,
//         date: "30/01/2021"
//     },
// ]

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() { //somar as entradas
        //pegar todas as transacoes
        let income = 0 //variavel que recebera os valores

        Transaction.all.forEach((transaction) => { //para cada transacao
            if (transaction.value > 0) { //se ela for maior que 0
                income = income + transaction.value //somar a uma variavel
            }
        })

        return income //retornar a variavel
    },

    expenses() { //somar as saidas
        //pegar todas as transacoes
        let expenses = 0//variavel que recebera os valores

        Transaction.all.forEach((transaction) => { //para cada transacao
            if(transaction.value < 0) { //se ela for menor que 0
                expenses = expenses + transaction.value //somar a uma variavel
            }
        })

        return expenses //retornar a variavel
    },
    
    total() { //entradas - saidas
        let total = this.incomes() + this.expenses()
        return total
    }
}

const Dom = {
    transactionsContainer: document.querySelector(".transactions__table, tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')

        tr.innerHTML = Dom.innerHTMLTransaction(transaction, index)

        tr.dataset.index = index
        
        Dom.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const status = transaction.value > 0 ? "income" : "expense"
        const value = Utils.formatCurrency(transaction.value)
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${status}">${value}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./src/img/svg/minus.svg" alt="Remover Transação">
            </td>
        `

        return html
    },

    updateBalance() {
        document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        Dom.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatValor(valor) {
        valor = Number(valor) * 100
        return valor
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })

        return signal + value 

        //console.log(signal + value)
    }
}

const Form = {
    /**
     * 1 - Verificar se todas as informacoes foram preenchidas.
     * 2 - Formatar os dados para salva-los
     * 3 - Apagar os dados do formulario
     * 4 - Fechar modal
     * 5 - Atualizar a aplicacao
     */

    description: document.querySelector("input#description"),
    valor: document.querySelector("input#valor"),
    date: document.querySelector("input#date"),

    getValues() {
        return {
            description: this.description.value,
            value: this.valor.value,
            date: this.date.value
        }
    },

    validateFildes() { // Validacao dos campos
        const { description, value, date } = this.getValues()
        
        if(description.trim() === "" || value.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos!")
        }
    },

    formatValues() {
        let { description, value, date } = this.getValues()

        value = Utils.formatValor(value)

        date = Utils.formatDate(date)

        console.log(value)

        return { description, value, date }
        
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFieldes() {
        this.description.value = ""
        this.valor.value = ""
        this.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            // validar dados do formulario
            this.validateFildes()
            // formatar os dados para Salvar
            const transaction = this.formatValues()
            // salvar
            this.saveTransaction(transaction)
            // apagar os dados do formulario
            this.clearFieldes()
            // fechar modal
            Modal.openClose()
            
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init(){
        Transaction.all.forEach(function(transaction, index) {
            Dom.addTransaction(transaction, index)
        })
        
        Dom.updateBalance()

        Storage.set(Transaction.all)
    },
    reload(){
        Dom.clearTransactions()
        App.init()
    },
}

App.init()

