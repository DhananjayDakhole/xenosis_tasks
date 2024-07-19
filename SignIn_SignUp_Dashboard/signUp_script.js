const modal = document.getElementById("modal");
const modalLink = document.getElementById("modal-link");
const close = document.getElementById("close");

modalLink.onclick = function () {
    modal.style.display = 'block';
    document.body.classList.add('dark-mode');
}

close.onclick = function () {
    modal.style.display = 'none';
    document.body.classList.remove('dark-mode');
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.classList.remove('dark-mode');
    }
}