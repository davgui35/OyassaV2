
/** File => addCommands.js
 * // file name for the name of the button
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
      case "suivant":
        break;
      default:
        fileDatabase = fileDatabase + ".db";
        break;
    }
  
    return fileDatabase;
  }
  
  /** File => addCommands.js
   * @param {*} index 
   */
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
  
  /** File => addCommands.js
   * @param {*} index 
   */
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
  
  /** UpdateCard
   * // file name for the name of the button
   * @param {*} fileDatabase 
   * @param {*} nameFound 
   * @param {*} id 
   */
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