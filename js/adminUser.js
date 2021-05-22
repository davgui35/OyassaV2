const nameUser = document.getElementById('nameAdminUser');
const adminUser = sessionStorage.isLogger;
nameUser.innerText = ucFirst(adminUser);
console.log(adminUser);


function ucFirst(str) {
    if (str.length > 0) {
      return str[0].toUpperCase() + str.substring(1);
    } else {
      return str;
    }
  }