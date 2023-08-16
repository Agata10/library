
function Book(img, title, author, pages, read) {
  this.img = img;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createCancelBtn() {
  let cancelBtn = document.createElement("button");
  let cancelImg = document.createElement("img");
  cancelImg.setAttribute("src","./images/close.svg");
  cancelBtn.style.background = "transparent";
  cancelBtn.style.border = "none";
  cancelBtn.style.cursor = "pointer";
  cancelBtn.appendChild(cancelImg);

  return cancelBtn;

}

function createReadBtnStatus() {
  let readStatusbutton = document.createElement('button');
  readStatusbutton.style.padding = "8px 16px";
  readStatusbutton.style.borderRadius = "8px";
  readStatusbutton.style.border = "none";
  readStatusbutton.style.backgroundColor = "#e4cbae";
  readStatusbutton.style.color = "#714410";
  readStatusbutton.style.fontFamily = `"Manrope", "Arial", sans-serif`;
  readStatusbutton.style.fontWeight = "600";
  readStatusbutton.style.fontSize = "0.8rem";
  readStatusbutton.style.cursor = "pointer";
  
  return readStatusbutton;
}

function addBookToLibrary(book) {
  let myLibrary = [];
  myLibrary.push(book);

  let table = document.getElementById("table")
  let tableBody = table.getElementsByTagName("tbody")[0];
  const row = document.createElement("tr");
  

  for (let book of Object.values(myLibrary)) {
    
    for (let key in book) {
      let cell = document.createElement("td");
    
      if(key === "img"){

        let img = document.createElement('img');
        img.setAttribute("src",`${book[key]}`);
        img.style.width = "70px";
        img.style.height = "100px";
        cell.appendChild(img);

      } else if (key === "read") {

        let readBtn = createReadBtnStatus();
        readBtn.innerText = book[key];
        cell.appendChild(readBtn);

        readBtn.addEventListener('click', () => {
          if (readBtn.innerText == "read") {
            readBtn.innerText = "not read";
          } else {
            readBtn.innerText = "read";
          }
        });
    
      } else {
        cell.innerText = book[key];
      }
      row.appendChild(cell);
      tableBody.appendChild(row);
    }

    let lastCell = document.createElement("td");
    let cancelBtn = createCancelBtn();
    lastCell.appendChild(cancelBtn);
    row.appendChild(lastCell);

    cancelBtn.addEventListener("click", function() {
      var row = cancelBtn.parentNode.parentNode; 
      row.parentNode.removeChild(row); 
    });

  }
}

function submitDialogForm() {
  const addBookBtn = document.getElementById("add-button");
  const favDialog = document.getElementById("favDialog");
  const submitForm = favDialog.querySelector("#my-form");
  let urlImg = favDialog.querySelector("#url");
  const bookTitle = favDialog.querySelector("#title");
  const bookAuthor = favDialog.querySelector("#author");
  const bookPages = document.getElementById("pages");
  const bookReadStatus = document.getElementById("read-check");
 
  // "Show the dialog" button opens the <dialog> modally
  addBookBtn.addEventListener("click", () => {
    favDialog.showModal();
  });

  //close dialog when outside click of form
  favDialog.addEventListener('click', (event) => {
    if (event.target === favDialog) {
      favDialog.close();
  } 
});

submitForm.addEventListener("submit", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
      
    if(urlImg.value === ""){
      urlImg.value = "./images/book-half.svg";
    }
    
    if(!bookReadStatus.checked) {
      bookReadStatus.value = "not read"
    } else {
      bookReadStatus.value = "read"
    }

    const newBook = new Book(urlImg.value, bookTitle.value, bookAuthor.value, bookPages.value, bookReadStatus.value);
    addBookToLibrary(newBook);
    console.log(newBook);
    favDialog.close();
  });
}



const book1 = new Book("https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg", "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, "read");
const book2 = new Book("https://m.media-amazon.com/images/I/61Nv1wDO91L._SX281_BO1,204,203,200_.jpg", "Breaking Creed", "Alex Kava", 368, "not read");
addBookToLibrary(book1);
addBookToLibrary(book2);

submitDialogForm();

