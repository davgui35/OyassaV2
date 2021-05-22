const btnExit = document.getElementById('btnExit');
btnExit.addEventListener('click', () => {
    sessionStorage.clear();
    document.location.href = "../index.html";
});