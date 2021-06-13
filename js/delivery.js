let newOrder = window.sessionStorage;
let cardOfCustomer = [];
const orders = document.getElementById("orders");
let card = "";
let sum = 0;
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
  return order;
}

// data commands
let data = addCardOfCustomer();

// Insert in data base
console.log("*** debug : ", data);
if (data !== "" && window.sessionStorage.getItem("addCommands")) {
  let filename = "database/newOrder.db";
  var Datastore = require("nedb"),
    db = new Datastore({ filename: filename, autoload: true });
  db.find({}, function (err, docs) {
    db.count({}, function (err, count) {
      count++;
      if (window.sessionStorage.numberCommands == count) {
        db.insert({ _id: count, customer, data }, function (error, newDoc) {
          if (error != null) {
            console.log("*** Error = ", error);
          }
          console.log("*** created = ", newDoc);
        });
      }
    });
  });

  db.find({}, function (err, docs) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      card = "";
      // console.log(element._id);
      card += `<div id="cards-${element._id}">`;
      for (let index = 0; index < element.data.length; index++) {
        const meals = element.data[index];
        // console.log(meals);
        card += ` <div class="col">
                      <div class="row d-flex justify-content-evenly align-items-center">
                        <div class="col text-center">
                          <h5 class="card-title mt-3"><b>${meals.name}</b></h5>
                        </div>
                        <div class="col d-flex  mt-3">
                          <p class="mr-2"><img src="../img/plus.svg" alt="en stock" width="15px"/></p>
                          <p class="card-text">${meals.quantity}</p>
                          <p class="ml-2"><img src="../img/minus.svg" alt="en stock" width="15px" /></p>
                        </div>
                        <div class="col d-flex  mt-2">
                          <p class="card-text"><b>${meals.price}</b> €</p>
                        </div>
                        <div class="col  mt-2">
                          <p class="card-text d-flex"><b>${
                            meals.price * meals.quantity
                          }</b> €</p>
                        </div>
                      </div>
                  </div>
                  <hr/>`;
        sum += meals.price * meals.quantity;
      }
      card += `</div>`;
      console.log(sum);
      document.getElementById("sum").innerText = sum;
      document.getElementById("orders").innerHTML += card;
    }
  });
}
