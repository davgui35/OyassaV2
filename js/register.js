// Gestion formulaire + préparation BDD
const btnRegister = document.getElementById('register');
if(btnRegister != null) {
    btnRegister.addEventListener('click', () => {
        let existUsers = "";
        let errors = false;
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
         // Find all documents in the collection
         db.find({}, function (err, docs) {
            for (let index = 0; index < docs.length; index++) {
                existUsers = docs[index]; 
                console.log(existUsers);
                if (existUsers.lastname == user.lastname || user.lastname == "") {
                    errors = true;
                    sessionStorage.setItem("lastname", "Ce nom est vide ou existe déjà");
                    document.getElementById("lastNameError").innerText = sessionStorage.getItem("lastname");
                }
                if (existUsers.firstname == user.firstname || user.firstname == ""){
                    errors = true;
                    sessionStorage.setItem("firstname", "Ce prénom est vide ou existe déjà");
                    document.getElementById("firstNameError").innerText = sessionStorage.getItem("firstname");
                }
                if (existUsers.mail == user.mail || user.mail == ""){
                    errors = true;
                    sessionStorage.setItem("mail", "Ce mail est vide ou existe déjà");
                    document.getElementById("mailError").innerText = sessionStorage.getItem("mail");
                }
            }
            if(!errors){
                //remove datas session Storage
                sessionStorage.clear();
                db.insert(user, function (error, newDoc) { 
                    if(error != null){
                        console.log("*** Error = ", error);
                    }
                    document.location.href = "login.html";
                    console.log("*** created = ", newDoc);
                });
            }
        });

    })
}


