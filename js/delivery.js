let newOrder = window.sessionStorage;
let cardOfCustomer = [];
let card = "";
let quantity = 0;
let sum = 0;
sessionStorage.getItem("priceOrder", 0);
let customer = {
  lastName: newOrder.lastNameNewCustomer,
  firstName: newOrder.firstNameNewCustomer,
  city: newOrder.cityNewCustomer,
  adress: newOrder.adressNewCustomer,
  postCode: newOrder.postCodeNewCustomer,
  mail: newOrder.mailNewCustomer,
  phone: newOrder.phoneNewCustomer,
};

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
    // console.log(element.quantity);
    // console.log(element.price);
    sum += parseInt(element.quantity) * parseInt(element.price);
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
card += `
        <li class="list-group-item">
        <span><strong>Livraison :</strong></span>
        <span></span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
        <span><strong>Montant total : </strong></span>
        <span>${sum}€</span>
        </li>
        <button type="button" class="btn btn-outline-warning" onclick="window.location.reload()">Actualiser le panier</button>`;
card += `</ul></div>`;

document.getElementById("orders").innerHTML = card;

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
  window.location.reload();
}

/// PARTIE INFOS ///
const deliveryHours = document.getElementById("delivery-hours");
const HoursActually = document.getElementById("hours");
console.log(deliveryHours);
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

deliveryHours.innerText = deliveryIn40Minutes();

// Formulaire radio
let form = document.getElementById("form");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let pointRDV = document.getElementById("pointRDV").checked;
  let adresse = document.getElementById("adresse").checked;
  console.log("adresse=> " + adresse, "pointRDV=> " + pointRDV);
  let cleunay = document.getElementById("cleunay").checked;
  let grandQuartier = document.getElementById("grandQuartier").checked;
  let poterie = document.getElementById("poterie").checked;
  console.log(
    "cleunay=> " + cleunay,
    "grandQuartier=> " + grandQuartier,
    "poterie=> " + poterie
  );
  let CB = document.getElementById("CB").checked;
  let espece = document.getElementById("espece").checked;
  console.log("CB=> " + CB, "espece=> " + espece);
  let commentaire = document.getElementById("commentaire").value;
  console.log("commentaire=> " + commentaire);
  const heure = deliveryIn40Minutes();
  console.log(heure);
});
