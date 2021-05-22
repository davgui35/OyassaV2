// Gestion formulaire + préparation BDD
const btnLogin= document.getElementById('login');

if(btnLogin!= null) {
    let user = null;
    btnLogin.addEventListener('click', ()=> {
        let mail = document.getElementById('mail');
        let password = document.getElementById('password');

        let logger = {
            mail: mail.value,
            password: password.value
        }

        var Datastore = require('nedb'),
        db = new Datastore({ filename: './database/users.db', autoload: true});
        // Find all documents in the collection
        db.find({}, function (err, docs) {
            for (let index = 0; index < docs.length; index++) {
              user = docs[index]; 
                if(user.mail == logger.mail && user.password == logger.password) {
                    console.log(user);
                }
            }
        });
    })
}