function openModal() {
    const openModalButton = document.querySelector(".open-button");
    const modal = document.querySelector(".modal-overlay");
    const modalCloseButton = document.querySelector(".close-button");

    openModalButton.addEventListener("click", function () {
        modal.classList.add("open-modal");
        
    });
    modalCloseButton.addEventListener("click", function () {
        modal.classList.remove("open-modal");
    });
    modal.addEventListener("click", function (event) {
        if (event.target === this){
            modal.classList.remove("open-modal");
        }
    });
}
openModal();