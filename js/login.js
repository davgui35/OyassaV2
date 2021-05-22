// Gestion formulaire + préparation BDD
const btnLogin = document.getElementById('login');
if(btnLogin != null) {
    btnLogin.addEventListener('click', () => {
        let existUsers = "";
        let errors = false;
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
        db.find({}, function (err, docs) {
          for(let index = 0; index < docs.length; index++) {
            existUsers = docs[index];
            if (existUsers.mail != logger.mail) {
              errors = true;
              sessionStorage.setItem("mail", "Ce mail est erroné");
              document.getElementById("mailError").innerText = sessionStorage.getItem("mail");
            }        
            if (existUsers.password != logger.password) {
              sessionStorage.setItem("password", "Ce password est erroné");
              document.getElementById("passwordError").innerText = sessionStorage.getItem("password");
              errors = true;
            }        
           
          }

          if(!errors){
            sessionStorage.clear();
            sessionStorage.setItem("isLogger", existUsers.lastname + " " + existUsers.firstname);
            document.location.href = "index.html";
          }
        });

       
    })
}

