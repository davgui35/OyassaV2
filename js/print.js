const root = require('path').resolve();
const ticket = document.getElementById('ticket');
const fs = require('fs');
let html = "";

try {
    const data = fs.readFileSync(root+'/database/orders.db', 'utf8')
    let order = JSON.parse(data);
    console.log(order);
    if(order !== "" ) {
        html += `<div class="card border-secondary m-2" style="max-width: 28rem;">
        <div class="card-header d-flex justify-content-between">
            <span>Commande N°${order._id}</span> 
            <span><b>${order.date}</b></span>
        </div>
        <div class="card-body text-secondary">`;

        html += `<ul class="list-group list-group-flush"> `; 
            order.meals.forEach(meal => {
                console.log(meal);
                html += `<li class="list-group-item  d-flex justify-content-between">
                            <span><b>${meal.name}</b></span>
                            <span>${meal.quantity}</span>
                            <span>${meal.price} €</span>
                        </li>`;
            });
        html += `</ul>
            <h5 class="card-title">Le montant est de ${order.sum}</h5>`;
        if(order.comment !== "") {
            html += `<p class="card-text">${order.comment}.</p>`;
        }
            
        html += `</div></div>`;
    }

    ticket.innerHTML = html;

    
} catch (err) {
    console.error(err)
}

