let newOrder = window.sessionStorage;
let cardOfCustomer = [];
let card = "";
let sum = 0;
let quantity = 0;
let price = 0;
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
console.log("*** debug : ", data);

card += `<div class="card" style="width: 18rem;">

        <ul class="list-group list-group-flush ">`;
for (let index = 0; index < data.length; index++) {
  const element = data[index];
  if (!element.customer) {
    card += `
            <li class="list-group-item d-flex justify-content-around" id="group-element">
              <span>${element.name}</span>
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
        <span>Livraison : </span>
        <span></span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
        <span>Montant total : </span>
        <span>${sum}€</span>
        </li>`;
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
    let keySession = data[index].categorie + ".db";
    // modify data in session storage
    // console.log(keySession); //starters.db
    let tmpData = JSON.parse(sessionStorage.getItem(keySession));
    // console.log(data[index]._id);
    // check include object in data of session storage
    tmpData.find((v) => v._id === data[index]._id).quantity = quantity;
    // quantity actually
    // console.log(quantity);
    // console.log(data[index]);
    // console.log(tmpData);
    // return the new quantity of the object
    sessionStorage.setItem(keySession, JSON.stringify(tmpData));
  });
}
