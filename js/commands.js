let cardsCommands = document.getElementById('cards-commands');
loadCustomers = function () {
    // Charger la base de données
    let Datastore = require('nedb'),
    db = new Datastore({filename: 'data.db', autoload: true});

    // Récupération le contenu de la BDD (Tous) docs = contenu
    db.find({}, function(error, docs) {
        // console.log("*** Docs = ", docs);
        // Boucle sur les données
        let card = "";  
            docs.forEach((element, index) => {
                card += ` <div class="card m-3" style="width: 18rem;" class="cards">
                            <div class="card-body">
                                <h5 class="card-title">Commande N° ${index+1} : ${element.date}</h5>
                                <p class="card-text">${element.firstname} ${element.lastname}.</p>
                                <p class="card-text">Tel: ${element.phone}</p>
                                <p class="card-text">Adresse: ${element.adress}.</p>
                            </div>
                        </div>`;
                    });
        cardsCommands.innerHTML = card;
    });

}

loadCustomers();
