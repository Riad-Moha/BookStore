//selecting elements


const titre = document.querySelector('#titre');
const auteur = document.querySelector('#auteur');
const isbn = document.querySelector('#isbn');
const form = document.querySelector('.form');
const tBody = document.querySelector('tbody');
form.addEventListener('submit', myFun);
tBody.addEventListener('click', deleteItem);
let livre;

//Call the createTr function to get book array from localStorage
createTr();



// Delete item
function deleteItem(e) {

  e.preventDefault();
  if (e.target.classList.contains('fas')) {
    if(confirm('Vous etes sur?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    }

   
    getBooks();

    

      
    const textToRemove = e.target.parentElement.parentElement.parentElement.innerHTML;
    
    console.log(textToRemove);

    livres.forEach((item, index) => {
      if (item == textToRemove) {
        livres.splice(index, 1);
      }
    })
    localStorage.setItem('livres', JSON.stringify(livres));
    
  };
}

function myFun(e) {
  

  if(titre.value != "" && auteur.value != "" && isbn.value != "" ) {
     

    e.preventDefault();
    const text = `<td>${titre.value}</td><td>${auteur.value}</td><td>${isbn.value}<a href=""><i class="fas fa-trash float-right" aria-hidden="true"></i></a></td>`;

    saveToLocalStorage(text);

    const tr = document.createElement('tr');

    tr.innerHTML = text;

    tBody.appendChild(tr);
    titre.value = "";
    isbn.value = "";
    auteur.value ="";

  } 
  else {
    e.preventDefault();
    const erreur = document.querySelector('.erreur');
    erreur.style.display = "block";
    erreur.innerHTML = "Vous devez laisser aucun champ vide";

    setTimeout(function() {
      erreur.style.display = "none";

    }, 2000);

  }
  
}

// Save to localStorage

function saveToLocalStorage(livre) {


  // Get books from localStorage
  getBooks();

  livres.push(livre);

  localStorage.setItem('livres', JSON.stringify(livres));

}

// Create tr element and append to the table body
function createTr() {
  getBooks();

  livres.forEach( (item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = item;
    tBody.appendChild(tr);
  })
}


// Getting book array from local storage
function getBooks() {
  livres = JSON.parse(localStorage.getItem('livres'));

  if (livres === null) {

    livres = [];

  }

}