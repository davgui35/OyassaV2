const formAddcategories= document.forms['addCategory'];
const drinksChoice = document.getElementById('drinksChoice');
const nameMeal = document.getElementById('nameMeal');
const priceMeal = document.getElementById('priceMeal');
const deleteBtn = document.getElementById('delete');
if(drinksChoice != null){
    drinksChoice.style.display = "none";
}
if(nameMeal != null){
    nameMeal.style.display = "none";
}
if(priceMeal != null){
    priceMeal.style.display = "none";
}
let isValide = false;
let compteur = 0;
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
    }
    else{
        drinksChoice.style.display = "none";
    }
    document.querySelectorAll('.quantity').forEach(element => {
        if(element.checked){
        sessionStorage.setItem("quantity", element.value );
        }
    });

    if(window.sessionStorage.categorie != "drinks" && window.sessionStorage.name !== undefined || window.sessionStorage.categorie == "drinks" && window.sessionStorage.name !== undefined && window.sessionStorage.quantity != undefined 
    ){
        priceMeal.style.display = "block";
    }
    sessionStorage.setItem("price", document.getElementById('price').value );


    if(window.sessionStorage.categorie != '' && window.sessionStorage.name != '' && window.sessionStorage.price != '' && window.sessionStorage.quantity != '' ) {
       isValide = true;
       // Mettre en base de donnée selon la catégorie
       let categorie = window.sessionStorage.categorie;
       let name = window.sessionStorage.name;
       let quantity = window.sessionStorage.quantity;
       let price = window.sessionStorage.price;

       let data = {
           categorie: window.sessionStorage.categorie,
           name: window.sessionStorage.name,
           quantity: window.sessionStorage.quantity,
           price: window.sessionStorage.price
       }
       console.log(data);
    }
});

deleteBtn.addEventListener('click', (e) => {
    window.sessionStorage.categorie = '';
    window.sessionStorage.name = '';
    window.sessionStorage.quantity = '';
    window.sessionStorage.price = '';
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


