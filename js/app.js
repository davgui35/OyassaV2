// Envoie des events au script main.js
const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;


const reduceBtn = document.getElementById("reduceBtn");
const sizeBtn = document.getElementById("sizeBtn");
const closeBtn = document.getElementById("closeBtn");

reduceBtn.addEventListener('click', ()=> {
    // Envoie de l'instruction au main
    ipc.send("reduceApp")
});

sizeBtn.addEventListener('click', ()=> {
    // Envoie de l'instruction au main
    ipc.send("sizeApp")
});

closeBtn.addEventListener('click', ()=> {
    // Envoie de l'instruction au main
    ipc.send("closeApp")
});


// Gestion formulaire + préparation BDD
const btnAddCustomer = document.getElementById('btnSave');
if(btnAddCustomer != null) {
    btnAddCustomer.addEventListener('click', () => {
        // Les inputs du formulaire ajout d'une ligne
        const dateValue = document.getElementById('date');
        const lastname = document.getElementById('lastname');
        const firstname = document.getElementById('firstname');
        const phone = document.getElementById('phone');
        const mail = document.getElementById('mail');
        const adress = document.getElementById('adress');
        // Préparer l'objet pour l'insertion en BDD

        let customer = {
            date: dateValue.value,
            lastname: lastname.value,
            firstname: firstname.value,
            phone: phone.value,
            mail: mail.value,
            adress: adress.value
        };

        // console.log("*** debug : ", customer);
        ipc.send("addCustomerToDb", customer);
    })
}

// Upper first letter admin
function ucFirst(str) {
    if (str.length > 0) {
      return str[0].toUpperCase() + str.substring(1);
    } else {
      return str;
    }
  }