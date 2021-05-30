// Initialization variable
const formAddcategories= document.forms['addCategory'];
const drinksChoice = document.getElementById('drinksChoice');
const nameMeal = document.getElementById('nameMeal');
const priceMeal = document.getElementById('priceMeal');
const deleteBtn = document.getElementById('delete');
const infoAddMeal = document.getElementById('infoAddMeal');
const mealInput = document.getElementById('meal');
const priceInput = document.getElementById('price');
const drinkInputQuantity = document.getElementById('quantity');
const priceError = document.getElementById('priceError');

let isValide = false;
let counter = 0;
let data = "";

// invisible form to according the step
if(drinksChoice != null){
    drinksChoice.style.display = "none";
}
if(nameMeal != null){
    nameMeal.style.display = "none";
}
if(priceMeal != null){
    priceMeal.style.display = "none";
}
formAddcategories.addEventListener('submit', function(e){
    e.preventDefault();
    
    let errors;
    let inputs = this;
    document.querySelectorAll('.categorie').forEach(element => {
        if(element.checked){
        sessionStorage.setItem("categorie", element.value );
        }
    });
    
    if(window.sessionStorage.categorie !== undefined ){
        if(drinksChoice != null){
            nameMeal.style.display = "block";
        }
    }
    //console.log(document.getElementById('meal').value);
    sessionStorage.setItem("name", document.getElementById('meal').value );
    
    
    if(window.sessionStorage.categorie == "drinks" && window.sessionStorage.name !== undefined ){
        if(drinksChoice != null){
            drinksChoice.style.display = "block";
        }
        document.querySelectorAll('.quantity').forEach(element => {
            if(element.checked){
            sessionStorage.setItem("quantity", element.value );
            }
        });
    }
    else{
        sessionStorage.setItem("quantity", 0 );
        drinksChoice.style.display = "none";
    }

    if(window.sessionStorage.categorie != "drinks" && window.sessionStorage.name !== undefined || window.sessionStorage.categorie == "drinks" && window.sessionStorage.name !== undefined && window.sessionStorage.quantity != undefined 
    ){
        priceMeal.style.display = "block";
    }

    if(!isNaN(document.getElementById('price').value) && document.getElementById('price').value != '') {
        sessionStorage.setItem("price", document.getElementById('price').value );
    }
    else{
        priceError.innerText = 'Vous devez rentrer un nombre !';
    }


    if(window.sessionStorage.categorie != '' && window.sessionStorage.name != '' && window.sessionStorage.price != '') {
       isValide = true;
       // Put in the data base according to catégorie
       let categorie = window.sessionStorage.categorie;
       let name = ucFirst(window.sessionStorage.name);
       let quantity = window.sessionStorage.quantity;
       let price = window.sessionStorage.price;
       let status = "enabled";

       let data = {
           categorie: categorie,
           name: name,
           quantity: quantity,
           price: price,
           status: status
       }
       console.log(data);

       // Insert in data base
       console.log("*** debug : ", data);
       if(data !== ''){
           let filename = 'database/'+data.categorie+'.db';
           // Connexion in data base
           var Datastore = require('nedb'),
           db = new Datastore({ filename: filename, autoload: true });
           db.insert(data, function(err, newDoc){
               sessionStorage.setItem("alertAddMeal", "Votre produit est rajouté !" );
            }) 
        }
            setTimeout(() => {
                infoAddMeal.innerHTML = `<div class="alert alert-success d-flex align-items-center m-3" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg><div>${window.sessionStorage.alertAddMeal}</div></div>`;
            }, 500);
            
            setTimeout(() => {
                infoAddMeal.innerHTML= "";
                text = "";
                // Reset the fields
                mealInput.value = '';
                priceInput.value = '';
                drinkInputQuantity.value = '';
                sessionStorage.removeItem("alertAddMeal", "" );
            }, 1000); 
        }
    });
    


// delete datas 
deleteBtn.addEventListener('click', (e) => {
    sessionStorage.removeItem("categorie", "" );
    sessionStorage.removeItem("name", "" );
    sessionStorage.removeItem("quantity", "" );
    sessionStorage.removeItem("price", "" );
    sessionStorage.removeItem("alertAddMeal", "" );

    if(drinksChoice != null){
        drinksChoice.style.display = "none";
    }
    if(nameMeal != null){
        nameMeal.style.display = "none";
    }
    if(priceMeal != null){
        priceMeal.style.display = "none";
    }
});


function alertHtml(elementHtml, text, type){
    setTimeout(() => {
        elementHtml.innerHTML = `<div class="alert alert-${type} d-flex align-items-center m-3" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg><div>${text}</div></div>`;
    }, 500);
    
    setTimeout(() => {
        elementHtml.innerHTML= "";
        text = "";
        // Reset the fields
        mealInput.value = '';
        priceInput.value = '';
        drinkInputQuantity.value = '';
        sessionStorage.removeItem("alertAddMeal", "" );
    }, 3000);
}