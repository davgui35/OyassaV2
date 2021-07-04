// initialisation des variables et récupération des informations de la commande en cours
let currentOrder = {};
let cardsCommands = document.getElementById('cards-commands');
// Objet de récupération de la session
if(sessionStorage !== undefined) {
    let test = sessionStorage;
    currentOrder = {
        addCommands: sessionStorage.getItem('addCommands') !== undefined ? sessionStorage.getItem('addCommands') : null,
        customer: {
            firstNameNewCustomer: sessionStorage.getItem('firstNameNewCustomer') !== undefined ? sessionStorage.getItem('firstNameNewCustomer') : null,
            adressNewCustomer: sessionStorage.getItem('adressNewCustomer') !== undefined ? sessionStorage.getItem('adressNewCustomer') : null,
            postCodeNewCustomer: sessionStorage.getItem('postCodeNewCustomer') !== undefined ? sessionStorage.getItem('postCodeNewCustomer') : null,
            cityNewCustomer: sessionStorage.getItem('cityNewCustomer') !== undefined ? sessionStorage.getItem('cityNewCustomer') : null,
            lastNameNewCustomer: sessionStorage.getItem('lastNameNewCustomer') !== undefined ? sessionStorage.getItem('lastNameNewCustomer') : null,
            mailNewCustomer: sessionStorage.getItem('mailNewCustomer') !== undefined ? sessionStorage.getItem('mailNewCustomer') : null,
            phoneNewCustomer: sessionStorage.getItem('phoneNewCustomer') !== undefined ? sessionStorage.getItem('phoneNewCustomer') : null
        },
        order:{
            accompaniments: sessionStorage.getItem('accompaniments.db') !== undefined ? sessionStorage.getItem('accompaniments.db') : null,
            desserts: sessionStorage.getItem('desserts.db') !== undefined ? sessionStorage.getItem('desserts.db') : null,
            drinks: sessionStorage.getItem('drinks.db') !== undefined ? sessionStorage.getItem('drinks.db') : null,
            grills: sessionStorage.getItem('grills.db') !== undefined ? sessionStorage.getItem('grills.db') : null,
            meals: sessionStorage.getItem('meals.db') !== undefined ? sessionStorage.getItem('meals.db') : null,
            menus: sessionStorage.getItem('menus.db') !== undefined ? sessionStorage.getItem('menus.db') : null,
            sauces: sessionStorage.getItem('sauces.db') !== undefined ? sessionStorage.getItem('sauces.db') : null,
            snacks: sessionStorage.getItem('snacks.db') !== undefined ? sessionStorage.getItem('snacks.db') : null,
            starters: sessionStorage.getItem('starters.db') !== undefined ? sessionStorage.getItem('starters.db') : null,
        },
        price:{
            numberCommands: sessionStorage.getItem('numberCommands') !== undefined ? sessionStorage.getItem('numberCommands') : null,
            sum: sessionStorage.getItem('sum') !== undefined ? sessionStorage.getItem('sum') : null,
            priceDelivery: sessionStorage.getItem('priceDelivery') !== undefined ? sessionStorage.getItem('priceDelivery') : null,
            hoursDelivery: sessionStorage.getItem('hoursDelivery') !== undefined ? sessionStorage.getItem('hoursDelivery') : null
        }

    };

}

// TODOS: Début affichage mais changer les variables par des datas BD
if(currentOrder.addCommands) {
    console.log(currentOrder);
    cardsCommands.innerHTML = `<div class="card" style="width: 18rem;">
                                    <div class="card-body">
                                    <h2 class="card-title"> Commande n° <small>${currentOrder.price.numberCommands}</small></h2>
                                    <h5 class="card-title">${currentOrder.customer.firstNameNewCustomer} ${currentOrder.customer.lastNameNewCustomer}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${currentOrder.customer.phoneNewCustomer}</h6>
                                    <h6 class="card-subtitle mb-2 text-muted">${currentOrder.customer.adressNewCustomer} ${currentOrder.customer.postCodeNewCustomer} ${currentOrder.customer.cityNewCustomer}</h6>
                                    <h6 class="card-subtitle mb-2 text-muted"> Livraison : <strong> ${currentOrder.price.hoursDelivery}</strong> </h6>
                                    <ul>`;
                                    `</ul>
                                    <a href="#" class="card-link">Card link</a>
                                    <a href="#" class="card-link">Another link</a>
                                    </div>
                                    </div>`;
}
                                
// console.log(currentOrder.order);

// Récupération des clés
const datasOrder = Object.entries(currentOrder.order);
let data = [];
let elementOfOrder = [];
let dataCard = [];

// Trie des datas vides et datas remplies
for (let index = 0; index < datasOrder.length; index++) {
    const element = datasOrder[index];
   if(element[1] !== null) {
        data.push(element[1]);
   }
}
// console.log(data);

// récupérer seulement les datas avec une quantité
for (let index = 0; index < data.length; index++) {
    const element = data[index];
    elementOfOrder.push(JSON.parse(element));
}

// console.log(elementOfOrder);
// Récupération de la commande triée
for (let index = 0; index < elementOfOrder.length; index++) {
    const element = elementOfOrder[index];
    for (let index = 0; index < element.length; index++) {
        const meal = element[index];
        if(meal.quantity != 0 && meal.status !== "disabled") {
            meal.name = {
                name: meal.name,
                quantity: meal.quantity,
                price: meal.quantity
            }
            dataCard.push(meal.name);
        }
    }
}

console.log(dataCard);


// TODO: 
// Insertion dans la base de données
// Affichage ensuite


// console.log(window.sessionStorage); 
