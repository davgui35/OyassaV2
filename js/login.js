// Gestion formulaire + préparation BDD
const btnLogin = document.getElementById('login');
if(btnLogin != null) {
    btnLogin.addEventListener('click', () => {
        let existUsers = "";
        // Les inputs du formulaire ajout d'une ligne
        const mail = document.getElementById('mail');
        const password = document.getElementById('password');
        // Préparer l'objet pour l'insertion en BDD

        let logger = {
            mail: mail.value,
            password: password.value
        };

        // console.log("*** debug : ", logger);
        var Datastore = require('nedb'),
        db = new Datastore({ filename: 'database/users.db', autoload: true });
        db.find({mail:logger.mail, password: logger.password}, function (err, docs) {
          existUsers = docs;
          console.log(docs);
          if(docs != "") {
            sessionStorage.clear();
            sessionStorage.setItem("isLogger", existUsers[0].firstname + " " + existUsers[0].lastname);
            sessionStorage.setItem("status", existUsers[0].status);
            document.location.href = "index.html";
          }else{
            sessionStorage.setItem("champ", "Ce champ est vide ou mal rempli");
            document.getElementById("champ").innerText = sessionStorage.getItem("champ");
          }
        });

       
    })
}

