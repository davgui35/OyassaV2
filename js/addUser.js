// Gestion formulaire + préparation BDD
const newUser = document.getElementById('newUser');
if(newUser != null) {
    newUser.addEventListener('click', () => {
        let existUsers = "";
        let errors = false;
        // Les inputs du formulaire ajout d'une ligne
        const lastname = document.getElementById('lastname');
        const firstname = document.getElementById('firstname');
        const mail = document.getElementById('mail');
        const password = document.getElementById('password');
        const admin = document.getElementById('admin');
        const user = document.getElementById('user');

        // Droits users
        let status = "";
        if(admin.checked) {
            status = "admin";
        }else if(user.checked){
            status = "user";
        }


        // Préparer l'objet pour l'insertion en BDD
        let accountUser = {
            lastname: lastname.value,
            firstname: firstname.value,
            mail: mail.value,
            password: password.value,
            status: status
        };

        console.log("*** debug : ", accountUser);
        var Datastore = require('nedb'),
         db = new Datastore({ filename: 'database/users.db', autoload: true });
         // Find all documents in the collection
         db.find({}, function (err, docs) {
            for (let index = 0; index < docs.length; index++) {
                existUsers = docs[index]; 
                console.log(existUsers);
                if (existUsers.lastname == accountUser.lastname || accountUser.lastname == "") {
                    errors = true;
                    sessionStorage.setItem("lastname", "Ce nom est vide ou existe déjà");
                    document.getElementById("lastNameError").innerText = sessionStorage.getItem("lastname");
                }
                if (existUsers.firstname == accountUser.firstname || accountUser.firstname == ""){
                    errors = true;
                    sessionStorage.setItem("firstname", "Ce prénom est vide ou existe déjà");
                    document.getElementById("firstNameError").innerText = sessionStorage.getItem("firstname");
                }
                if (existUsers.mail == accountUser.mail || accountUser.mail == ""){
                    errors = true;
                    sessionStorage.setItem("mail", "Ce mail est vide ou existe déjà");
                    document.getElementById("mailError").innerText = sessionStorage.getItem("mail");
                }
            }
            if(!errors){
                sessionStorage.removeItem("lastname");
                sessionStorage.removeItem("firstname");
                sessionStorage.removeItem("mail");
                db.insert(accountUser, function (error, newDoc) { 
                    if(error != null){
                        console.log("*** Error = ", error);
                    }
                    document.location.href = "index.html";
                    console.log("*** created = ", newDoc);
                });
            }
        });

    })
}