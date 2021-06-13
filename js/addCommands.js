// Les boutons de la liste
const btnChoices = document.querySelectorAll(".btn-choices")[0].children;
const cards = document.getElementById("cards");
let fileDatabase, nameFound, categories, affichageCard;

for (let index = 0; index < btnChoices.length; index++) {
  const btn = btnChoices[index];
  btn.addEventListener("click", (e) => {
    for (let index = 0; index < btnChoices.length; index++) {
      const element = btnChoices[index];
      if (element.classList.contains("activeBg")) {
        element.classList.remove("activeBg");
      }
    }
    e.target.classList.toggle("activeBg");
    cards.innerHTML = "";
    // search name file
    fileDatabase = e.target.innerText;
    fileDatabase = fileDatabase.toLowerCase();
    nameFound = searchFileDatabase(fileDatabase);
    let filename = "database/" + nameFound;
    //Meals data base
    var Datastore = require("nedb"),
      db = new Datastore({ filename: filename, autoload: true });
    db.find({}, function (err, cardsCommands) {
      sessionStorage.setItem(nameFound, JSON.stringify(cardsCommands));
      categories = JSON.parse(sessionStorage.getItem(nameFound));
      ShowCards(categories, e);
    });
  });
}

// put card disabled or enabled
function contentStock(index) {
  updateCard(
    "database/" + getFilename(index) + ".db",
    searchFileDatabase(getFilename(index)),
    getIdOnly(index)
  );
}

// Show cards of the category
function ShowCards(categories, e) {
  categories.forEach((element, index) => {
    if (element.status == "disabled" && element.categorie === e.target.id) {
      affichageCard = `<div class="card text-dark bg-light mt-5 mx-3 card-${index}" style="width: 16rem;" id="${element.categorie}-${element._id}">
                                 <div class="card-header text-center " id="header-${index}" onclick="contentStock(${index})">En rupture de stock : <img src="../img/remove.svg" alt="en stock" width="30px" /></div>
                                    <div class="card-body disabled">
                                       <h5 class="card-title" id="title-${index}">${element.name}</h5>
                                       <p class="card-text" id="infos-${index}">${element.price} €</p>
                                       <div class="card-text d-flex justify-content-around align-items-center ">
                                          <img src="../img/plus.svg" alt="en stock" width="30px"/>
                                          <p class="card-text" id="quantity-${index}">${element.quantity}</p>
                                          <img src="../img/minus.svg" alt="en stock" width="30px" />
                                       </div>
                                    </div>
                                 </div>
                            </div>`;
    } else {
      affichageCard = `<div class="card text-dark bg-light mt-5 mx-3 card-${index}" style="width: 16rem;" id="${element.categorie}-${element._id}">
                               <div class="card-header text-center " id="header-${index}" onclick="contentStock(${index})">En stock : <img src="../img/checked.svg" alt="en stock" width="30px" /></div>
                                  <div class="card-body">
                                     <h5 class="card-title" id="title-${index}">${element.name}</h5>
                                     <p class="card-text" id="infos-${index}">${element.price} €</p>
                                     <div class="card-text d-flex justify-content-around align-items-center ">
                                        <img src="../img/plus.svg" alt="en stock" width="30px" onclick="addQuantity(${index})"/>
                                        <p class="card-text" id="quantity-${index}">${element.quantity}</p>
                                        <img src="../img/minus.svg" alt="en stock" width="30px" onclick="minusQuantity(${index})" />
                                     </div>
                                  </div>
                               </div>
                         </div>`;
    }
    cards.innerHTML += affichageCard;
  });
}

// file name for the name of the button
/**
 * @param {*} fileDatabase
 * @param search name of data base
 * @param id of the card
 * @returns
 */
function searchFileDatabase(fileDatabase) {
  switch (fileDatabase) {
    case "entree":
      fileDatabase = "starters.db";
      break;
    case "grillades":
      fileDatabase = "grills.db";
      break;
    case "plats":
      fileDatabase = "meals.db";
      break;
    case "accompagnements":
      fileDatabase = "accompaniments.db";
      break;
    case "boissons":
      fileDatabase = "drinks.db";
      break;
    default:
      fileDatabase = fileDatabase + ".db";
      break;
  }

  return fileDatabase;
}

function addQuantity(index) {
  document.getElementById("quantity-" + index).innerText++;
  let quantity = document.getElementById("quantity-" + index).innerText;
  var Datastore = require("nedb"),
    db = new Datastore({
      filename: "database/" + getFilename(index) + ".db",
      autoload: true,
    });
  db.findOne({ _id: getIdOnly(index) }, function (err, doc) {
    if (doc.quantity) {
      db.update(
        { _id: getIdOnly(index) },
        { $set: { quantity: quantity } },
        { multi: true },
        function (err, numReplaced) {
          db.find({}, function (err, doc) {
            // console.log(doc);
            sessionStorage.setItem(nameFound, JSON.stringify(doc));
          });
        }
      );
    }
  });
}

function minusQuantity(index) {
  if (document.getElementById("quantity-" + index).innerText > 0) {
    document.getElementById("quantity-" + index).innerText--;
    let quantity = document.getElementById("quantity-" + index).innerText;
    var Datastore = require("nedb"),
      db = new Datastore({
        filename: "database/" + getFilename(index) + ".db",
        autoload: true,
      });
    db.findOne({ _id: getIdOnly(index) }, function (err, doc) {
      if (doc.quantity) {
        db.update(
          { _id: getIdOnly(index) },
          { $set: { quantity: quantity } },
          { multi: true },
          function (err, numReplaced) {
            db.find({}, function (err, doc) {
              // console.log(doc);
              sessionStorage.setItem(nameFound, JSON.stringify(doc));
            });
          }
        );
      }
    });
  }
}

function updateCard(fileDatabase, nameFound, id) {
  var Datastore = require("nedb"),
    db = new Datastore({ filename: fileDatabase, autoload: true });
  db.findOne({ _id: id }, function (err, doc) {
    if (doc.status == "enabled") {
      db.update(
        { _id: id },
        { $set: { status: "disabled" } },
        { multi: true },
        function (err, numReplaced) {
          db.find({}, function (err, doc) {
            // console.log(doc);
            sessionStorage.setItem(nameFound, JSON.stringify(doc));
          });
        }
      );
    } else {
      db.update(
        { _id: id },
        { $set: { status: "enabled" } },
        { multi: true },
        function (err, numReplaced) {
          db.find({}, function (err, doc) {
            // console.log(doc);
            sessionStorage.setItem(nameFound, JSON.stringify(doc));
          });
        }
      );
    }
  });
}

// Return id card with table (example : starters-JnlhY6tEsoVcfIKL)
function getIdCard(index) {
  const card = document.getElementsByClassName("card-" + index);
  const idCard = card[0].id;
  return idCard;
}

// Return file name example starters
function getFilename(index) {
  let idCard = getIdCard(index);
  return idCard.split("-")[0];
}

// Return only id
function getIdOnly(index) {
  return getIdCard(index).split("-")[1];
}
