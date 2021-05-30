// initialisation des variables et récupération des informations de la commande en cours
let cardsCommands = document.getElementById('cards-commands');
let lastName = (sessionStorage.getItem("lastNameNewCustomer") != null)? sessionStorage.getItem("lastNameNewCustomer"): "";
let firstName = (sessionStorage.getItem("firstNameNewCustomer") != null)? sessionStorage.getItem("firstNameNewCustomer"): "";
let city= (sessionStorage.getItem("cityNewCustomer") != null)? sessionStorage.getItem("cityNewCustomer"): "";
let phone = (sessionStorage.getItem("phoneNewCustomer") != null)? sessionStorage.getItem("phoneNewCustomer"): "";
let postCode = (sessionStorage.getItem("postCodeNewCustomer") != null)? sessionStorage.getItem("postCodeNewCustomer"): "";
let mail = (sessionStorage.getItem("mailNewCustomer") != null)? sessionStorage.getItem("mailNewCustomer"): "";
console.log(lastName, firstName, city, phone, postCode, mail);

// console.log(window.sessionStorage); 
