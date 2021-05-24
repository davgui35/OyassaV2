const nameUser = document.getElementById('nameUser');
const statusUser = document.getElementById('statusUser');
const onlyUser = document.getElementById('onlyUser');
const wrapperContent = document.getElementById('content-wrapper');
const userLogo = document.getElementById('userLogo');
const addCustomer = document.querySelector('.add-customer');
const newCustomer = document.querySelector('.new-customer');
if(onlyUser != null) {
  onlyUser.style.display = "none";
}

// Cacher la card des ajout de commandes
if(window.sessionStorage.addCommands != undefined && addCustomer != null){
  // console.log(window.sessionStorage.addCommands);
  addCustomer.style.display = "none";
}
if(window.sessionStorage.addCommands && addCustomer == null && newCustomer != null ){
  addCustomer.style.display = "block";
  newCustomer.style.display = "none";
}


const htmlUserLogo = `
<div class="container d-flex justify-content-center mb-5 mt-5" id="onlyUser">
    <img src="../img/logo-Oyassa.svg" width="520px">
</div>`;


// management Status / logg
const adminUser = sessionStorage.isLogger;
const status = sessionStorage.status;
if(statusUser != null){
  statusUser.innerText = "Dashboard " + ucFirst(status);
}
nameUser.innerText = ucFirst(adminUser);
// console.log(adminUser);

// visibility access User status
const userElements = document.querySelectorAll('.no-user');
// console.log(userElements);

// Accessibility 
if(status == "user") {
  userElements.forEach((element) => {
    element.style.display = "none";
  });
  if(onlyUser != null) {
    onlyUser.style.display = "none";
  }
  wrapperContent.classList.add('bg-user-status');
  userLogo.innerHTML = htmlUserLogo;
}

// Upper first letter admin
function ucFirst(str) {
    if (str.length > 0) {
      return str[0].toUpperCase() + str.substring(1);
    } else {
      return str;
    }
  }