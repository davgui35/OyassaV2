const form = document.forms["addCustomer"];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let errors;
  let inputs = this;
  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];
    if (element.type != "submit") {
      if (element.value == "") {
        errors = "Veuillez remplir tous les champs correctement!";
      }
      if (!errors) {
        sessionStorage.setItem(element.name + "NewCustomer", element.value);
      }
    }
  }

  if (errors) {
    e.preventDefault();
    document.getElementById("errors").innerHTML = errors;
    return false;
  } else {
    errors = "";
    sessionStorage.setItem("addCommands", "true");
    sessionStorage.setItem("numberCommands", 1);
    sessionStorage.setItem("workDate", new Date());
    document.location.href = "add-Commands.html";
  }
});
