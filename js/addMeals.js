const formAddcategories= document.forms['addCategory'];
const drinksChoice = document.getElementById('drinksChoice');
const nameMeal = document.getElementById('nameMeal');
const priceMeal = document.getElementById('priceMeal');
// if(drinksChoice != null){
//     drinksChoice.style.display = "none";
// }
// if(nameMeal != null){
//     nameMeal.style.display = "none";
// }
// if(priceMeal != null){
//     priceMeal.style.display = "none";
// }

let categorie = null;

formAddcategories.addEventListener('submit', function(e){
    e.preventDefault();
    let errors;
    let inputs = this;
    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
        if(element.checked) {
            sessionStorage.setItem("categorie", element.value);
        }
    }
});

