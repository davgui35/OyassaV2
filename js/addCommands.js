const btnChoice = document.querySelectorAll('.btn-choice');
// console.log(btnChoice);

btnChoice.forEach(element => {    
    element.addEventListener('click', (e) =>{
      btnChoice.forEach(element => {element.classList.remove('activeBg')})
      element.classList.toggle('activeBg')
   })
});

