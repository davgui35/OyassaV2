// Envoie des events au script main.js
const {ipcRenderer} = require('electron');
const ipc = ipcRenderer;

// Gestion formulaire + préparation BDD
const btnRegister = document.getElementById('register');
if(btnRegister != null) {
    btnRegister.addEventListener('click', () => {
        // Les inputs du formulaire ajout d'une ligne
        const lastname = document.getElementById('lastname');
        const firstname = document.getElementById('firstname');
        const mail = document.getElementById('mail');
        const password = document.getElementById('password');
        // Préparer l'objet pour l'insertion en BDD

        let user = {
            lastname: lastname.value,
            firstname: firstname.value,
            mail: mail.value,
            password: password.value
        };

        console.log("*** debug : ", user);
        var Datastore = require('nedb'),
         db = new Datastore({ filename: 'database/users.db', autoload: true });
        db.insert(user, function (error, newDoc) { 
            if(error != null){
                console.log("*** Error = ", error);
            }
            console.log("*** created = ", newDoc);
        });
    })
}