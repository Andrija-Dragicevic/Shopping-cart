let allTotal = 0;    //ukupna vrijednost i dolje smo je iskoristili da na nju dodajemo total i sabiramo


function addToCart(element) {       //sve vrijeme ce element predstavljati dugme koje se klikne
   let mainEl = element.closest('.single-item');   //nakon klika uzimamo vrijednost iz cijelog diva, i za cijenu i kolicinu i sve
   let price = mainEl.querySelector('.price').innerText;          //uziamo tekst dje pise cijena
   let name = mainEl.querySelector('h3').innerText;              
   let quantity = mainEl.querySelector('input').value;  //uzimamo vrijednost
   let cartItems = document.querySelector('.cart-items');


   if(parseInt(quantity) > 0){

    price = price.substring(1);        //u price pise $10 npr, pa smo morali da maknemo ovo $ da bi mogli da mnozimo brojeve
    price = parseInt(price);              //prebaca string u broj zbog racunanja, i isto to radi i za quantity dolje
    let total = price * parseInt(quantity);
    
    allTotal += total;

    cartItems.innerHTML += `<div class="cart-single-item">
                            <h3>${name}</h3>
                            <p>$${price} x ${quantity} = $<span>${total}</span></p>
                            <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
                            </div>`;

                            
    document.querySelector('.total').innerText = `Total: $${allTotal}`
    element.innerText = 'Dodato';
    element.setAttribute('disabled', 'true');     //ako je kolicina veca od 0, kad se klikne dodaj, dugme mijenja naziv u dodato i postane disabled(sivo)
   } else {
    alert('odaberi kolicinu');
   }
}

//funkcija za uklanjanje proizvoda
//opet nazivamo varijablu isto  mainEl i nista ne uticemo na onu gore,
//jer kad je deklarisemo sa let, mijenjamo je samo unutar funkcije
function removeFromCart(element) {    //element je dugme
    let mainEl = element.closest('.cart-single-item');   //ovdje uzimamo sve sto je u ovoj klasi i dolje brisemo
    let price = mainEl.querySelector('p span').innerText;   //cilja span, koji se nalazi u p elementu, a to nam je ono total, da bi ga posel oduzeli od konacnog total
    price = parseInt(price);
    let name = mainEl.querySelector('h3').innerText;
    let vegetables = document.querySelectorAll('.single-item');

    allTotal -= price;   //odje pravimo da se od allTotal oduzima price, tj cijena pored dugmeta ukloni, i to se oduzima za konacni racun na dnu

    document.querySelector('.total').innerText = `Total: $${allTotal}`;      //ciljamo doljue total i upisujemo mu allTotal
    mainEl.remove(); 

    //pravimo da se prilikom uklanjanja vrijednost inputa vrati na 0, i da opet pise 'Dodaj' a ne 'Dodato'
    vegetables.forEach(function (vege) {          //vege je samo jedna vegetables
        let itemName = vege.querySelector('.si-content h3').innerText;
        if(itemName === name) {
            vege.querySelector('.actions input').value = 0;
            vege.querySelector('.actions button').removeAttribute('disabled');
            vege.querySelector('.actions button').innerText = 'Dodaj';
        }
    })
}