let newOrder = window.sessionStorage;
let cardOfCustomer = [];
let card = "";
let quantity = 0;
let sum = 0;
sessionStorage.getItem("priceOrder", 0);
sessionStorage.removeItem('suivant.db');
let customer = {
  lastName: newOrder.lastNameNewCustomer,
  firstName: newOrder.firstNameNewCustomer,
  city: newOrder.cityNewCustomer,
  adress: newOrder.adressNewCustomer,
  postCode: newOrder.postCodeNewCustomer,
  mail: newOrder.mailNewCustomer,
  phone: newOrder.phoneNewCustomer,
};
let ordersForDB = {};

// find Arrays meals
// console.log(Object.keys(newOrder));


for (let index = 0; index < Object.keys(newOrder).length; index++) {
  const element = Object.keys(newOrder)[index];
  if (element.substr(-3, 3) == ".db" && element != "suivant.db") {
    if (Object.values(newOrder)[index] !== "[]") {
      cardOfCustomer.push(Object.values(newOrder)[index]);
    }
  }
}

// Array commands of customer
// console.log(cardOfCustomer);

function addCardOfCustomer() {
  let order = [];
  for (let index = 0; index < cardOfCustomer.length; index++) {
    let elements = cardOfCustomer[index];
    //  changed json on object
    elements = JSON.parse(elements);
    //   console.log(elements);
    elements.forEach((element) => {
      if (element.status != "disabled" && element.quantity != 0) {
        order.push(element);
      }
    });
  }
  order.push({ customer: customer });
  return order;
}

// data commands
let data = addCardOfCustomer();

// Insert in data base
// console.log("*** debug : ", data);

card += `<div class="card" style="width: 21rem;">

        <ul class="list-group list-group-flush ">`;
for (let index = 0; index < data.length; index++) {
  const element = data[index];
  if (element.quantity != undefined && element.price != undefined) {
    let quantity = parseFloat(element.quantity);
    let price = parseFloat(element.price);
    // console.log(parseFloat(element.quantity));
    // console.log(parseFloat(element.price));
    sum += quantity * price;
  }

  sum = Math.round(sum * 100) / 100;
  
  // console.log(sum);
  if (!element.customer) {
    card += `
            <li class="list-group-item d-flex justify-content-around" id="group-element">
              <span><strong>${element.name}</strong></span>
              <span id="plus-${index}"> <img src="../img/plus.svg" alt="en stock" width="20px" onclick="addQuantity(${index})"/> </span>
              <span id="quantity-${index}">${element.quantity}</span>
              <span id="minus-${index}"> <img src="../img/minus.svg" alt="en stock" width="20px" onclick="minusQuantity(${index})"/></span>
              <span id="price-${index}">${element.price}</span>
              <span></span>
            </li>`;
  }
}
card += `<li class="list-group-item d-flex justify-content-between">
        <span><strong>Livraison :</strong></span>`;
        if(sessionStorage.priceDelivery === undefined || sessionStorage.priceDelivery === "") {
          card += `<span style="color:red">Pas de frais de livraison!</span>`;
        }else{
          card += `<span style="font-weight:bold">${sessionStorage.getItem('priceDelivery')} €</span>`;
        }
card += `</li>
        <li class="list-group-item d-flex justify-content-between">`;
        if(sessionStorage.priceDelivery === undefined || sessionStorage.priceDelivery === "") {
          card += `<span><strong>Montant total : </strong></span><span>${sum}  €</span>`;
        }else{
          card += `<span><strong>Montant total : </strong></span><span>${sum + parseInt(sessionStorage.getItem('priceDelivery'))}  €</span>`;
        }
        card += `</li><button type="button" class="btn btn-outline-warning" onclick="actualiser()" id="reloadBtn">Actualiser le panier avant d'imprimer</button>`;
card += `</ul></div>`;

sessionStorage.getItem('sum');
sessionStorage.setItem('sum', sum);
let sum_ticket = sessionStorage.getItem('sum');

const orders = document.getElementById("orders").innerHTML = card;

function addQuantity(index) {
  // console.log(index);
  return document.getElementById("quantity-" + index).innerText++;
}
function minusQuantity(index) {
  // console.log(index);
  if (document.getElementById("quantity-" + index).innerText > 0) {
    return document.getElementById("quantity-" + index).innerText--;
  }
}

const groupElement = document.querySelectorAll("#group-element");

for (let index = 0; index < groupElement.length; index++) {
  const element = groupElement[index];

  element.addEventListener("click", (e) => {
    quantity = document.getElementById("quantity-" + index).innerText;
    price = document.getElementById("price-" + index).innerText;
    sum += price * quantity;
    let keySession = data[index].categorie + ".db";
    // modify data in session storage
    // console.log(keySession); //starters.db
    let tmpData = JSON.parse(sessionStorage.getItem(keySession));
    // console.log(data[index]._id);
    // check include object in data of session storage
    tmpData.find((v) => v._id === data[index]._id).quantity = quantity;
    // quantity actually
    // return the new quantity of the object
    sessionStorage.setItem(keySession, JSON.stringify(tmpData));
  });
}

function actualiser() {
  sessionStorage.setItem("priceOrder", sum);
  sessionStorage.setItem("reloadCard", true);
  sessionStorage.getItem('ordersForDB');
  ordersForDB = JSON.stringify(ordersForDB);
  sessionStorage.setItem('ordersForDB', ordersForDB);
  window.location.reload();
}

/// PARTIE INFOS ///
const deliveryHours = document.getElementById("delivery-hours");
const HoursActually = document.getElementById("hours");
// console.log(deliveryHours);
function horloge() {
  let heure = new Date();
  if (heure.getMinutes() < 10) {
    return "Heure : " + heure.getHours() + ":" + "0" + heure.getMinutes();
  }
  return (heure = "Heure : " + heure.getHours() + ":" + heure.getMinutes());
}

setInterval(() => {
  hours.innerText = horloge();
}, 1000);

function deliveryIn40Minutes() {
  let oldDateObj = new Date();
  let newDateObj = new Date();
  newDateObj.setTime(oldDateObj.getTime() + 30 * 60 * 1000);
  if (newDateObj.getMinutes() < 10) {
    return newDateObj.getHours() + ":" + "0" + newDateObj.getMinutes();
  }
  return newDateObj.getHours() + ":" + newDateObj.getMinutes();
}

deliveryHours.innerHTML = deliveryIn40Minutes();

// Formulaire radio
let form = document.getElementById("form");
// console.log(form);
let priceDelivery = 0;
let meansOfPayment = "CB";

let RDV = document.getElementsByName('RDV');
let pointRDV = document.getElementById("pointRDV").checked;
let adresse = document.getElementById("adresse").checked;
let cleunay = document.getElementById("cleunay").checked;
let grandQuartier = document.getElementById("grandQuartier").checked;
let poterie = document.getElementById("poterie").checked;
let CB = document.getElementById("CB").checked;
let espece = document.getElementById("espece").checked;



// RDV
document.getElementById("pointRDV").addEventListener('change', (e) => {
  document.getElementById('adressCustomer').innerText = "";
  document.getElementById('choice').style.display ="block";
})

document.getElementById("adresse").addEventListener('change', (e) => {
  document.getElementById('adressCustomer').innerText = `Votre adresse: ${customer.adress} ${customer.postCode} ${customer.city} .`;
  switch (customer.postCode) {
    case 35200:
        priceDelivery = 3;
      break;
    case 35700:
        priceDelivery = 3;
      break;
    case 35000:
        priceDelivery = 3;
      break;
    case 35136:
        priceDelivery = 3;
      break;
    case 35760:
        priceDelivery = 6;
      break;
    case 35170:
        priceDelivery = 6;
      break;
    case 35132:
        priceDelivery = 6;
      break;
    case 35650:
        priceDelivery = 6;
      break;
    case 35520:
        priceDelivery = 6;
      break;
  }
  // console.log(priceDelivery);
  sessionStorage.getItem('priceDelivery');
  sessionStorage.setItem('priceDelivery', priceDelivery);
  document.getElementById('choice').style.display ="none";
})

//CHOIX
document.getElementById("cleunay").addEventListener('change', (e) => {
  priceDelivery = 0;
  // console.log(e.target.value);
  sessionStorage.setItem('priceDelivery', priceDelivery);

})

document.getElementById("grandQuartier").addEventListener('change', (e) => {
  priceDelivery = 3;
  // console.log(e.target.value);
  sessionStorage.setItem('priceDelivery', priceDelivery);
})

document.getElementById("poterie").addEventListener('change', (e) => {
  priceDelivery = 3;
  // console.log(e.target.value);
  sessionStorage.setItem('priceDelivery', priceDelivery);
})

// Paiement
document.getElementById("CB").addEventListener('change', (e) => {
  // console.log(e.target.value);
  sessionStorage.getItem('meansOfPayment');
  sessionStorage.setItem('meansOfPayment', meansOfPayment);
})

document.getElementById("espece").addEventListener('change', (e) => {
  // console.log(e.target.value);
  sessionStorage.setItem('meansOfPayment', e.target.value);
})


//Commentaires
let tmp_elementTable = [];
let comment = "";
let heure = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let commentaire = document.getElementById("commentaire").value;
  // console.log("commentaire => " + commentaire);
  comment = commentaire;
  sessionStorage.getItem('commentDelivery');
  sessionStorage.setItem('commentDelivery', comment);
  heure = deliveryIn40Minutes();
  sessionStorage.getItem('hoursDelivery');
  sessionStorage.setItem('hoursDelivery', heure);
  // console.log(heure);
  sessionStorage.getItem('validationDelivery');
  sessionStorage.setItem('validationDelivery', true);

  // IS validate
  // console.log(sessionStorage);
  if(sessionStorage.validationDelivery) {
    // console.log('validate');
    let numberCommand = parseInt(sessionStorage.getItem('numberCommands'));
    let workDate = new Date().toLocaleDateString();
    for (let index = 0; index < Object.keys(newOrder).length; index++) {
      const nameTableSession = Object.keys(newOrder)[index];
      if (nameTableSession.substr(-3, 3) == ".db" && nameTableSession != "suivant.db") {
        let tables = JSON.parse(sessionStorage.getItem(nameTableSession));
        tables.forEach( elementTable => {
          if(elementTable.quantity !== "0" && elementTable.status !== "disabled") {
            tmp_elementTable.push(elementTable);            
          }
        })
      }
    }
    console.log(tmp_elementTable);
    ordersForDB = {
      _id: numberCommand,
      date: workDate,
      sum: sum_ticket,
      hoursDelivery: heure,
      comment: comment,
      meals: tmp_elementTable,
    }
    // console.log(ordersForDB);
    // Force print
    if(sessionStorage.validationDelivery && sessionStorage.reloadCard) {
      btnSubmit.style.display = "none";
      // console.log(reloadBtn);
    }
  }
});

// Force print
if(sessionStorage.validationDelivery && sessionStorage.reloadCard) {
  btnSubmit.style.display = "none";
  console.log(reloadBtn);
}


form.addEventListener("reset", (e) => {
  e.preventDefault();
  document.getElementById("cleunay").checked = true;
  document.getElementById("grandQuartier").checked = false;
  document.getElementById("poterie").checked = false;
  document.getElementById("CB").checked = true;
  document.getElementById("espece").checked = false;
  document.getElementById("commentaire").value = "";
  deliveryIn40Minutes();
  sessionStorage.setItem('priceDelivery', "");
  sessionStorage.setItem('meansOfPayment', "");
  sessionStorage.setItem('commentDelivery', "");
  sessionStorage.setItem('hoursDelivery', "");
  sessionStorage.setItem('reloadCard', false);
  sessionStorage.setItem('validationDelivery', false);
  btnSubmit.style.display = "inline-block";
})




function resetAll() {
  let session = Object.keys(newOrder);
  for (let index = 0; index < session.length; index++) {
    const orderCustomer = session[index];
    let saveStatus = ["status", "isLogger", "numberCommands", "workDate" ];
    if(!saveStatus.includes(orderCustomer)) {
      sessionStorage.removeItem(orderCustomer);
    }
  }

}

function validateBD() {
  var Datastore = require('nedb'),
  db = new Datastore({ filename: 'database/orders.db', autoload: true });
  db.insert(JSON.parse(ordersForDB), function (err, newDoc) {  
    console.log(newDoc);
  });
  // resetAll();
}