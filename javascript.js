let myLibrary = [];
let table = document.getElementById("table")
let tableBody = table.getElementsByTagName("tbody")[0];
const book1 = new Book("https://m.media-amazon.com/images/I/71HbYElfY0L._AC_UF1000,1000_QL80_.jpg", "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, "read");
const book2 = new Book("https://m.media-amazon.com/images/I/61Nv1wDO91L._SX281_BO1,204,203,200_.jpg", "Breaking Creed", "Alex Kava", 368, "not read");
myLibrary.push(book1);
myLibrary.push(book2);


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

function addBookToLibrary() {

  for (let book of Object.values(myLibrary)) {
    let countRow = 0;
    const row = document.createElement("tr");

    for (let key in book) {
      let cell = document.createElement("td");
    
      if(key === "img"){
        let img = document.createElement('img');
        img.setAttribute("src",`${book[key]}`);
        img.style.width = "70px";
        img.style.height = "100px";
        cell.appendChild(img);
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
      tableBody.deleteRow(this.getElementsByTagName("tr"));
    });

  }
}
addBookToLibrary();

  