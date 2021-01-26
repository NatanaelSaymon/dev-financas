const Modal = {
    
    open() {
        //Abrir modal
        //Adicionar classe active ao modal
        document.querySelector(".modal-transaction").classList.add("active")
    },

    close() {
        //Fechar modal
        //remover a classe active do modal
        document.querySelector(".modal-transaction").classList.remove("active")
    }
}