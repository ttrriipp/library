const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "finished" : "not read yet";
  this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  displayBooks(myLibrary);
}

function displayBooks(library) {
  const displaySection = document.querySelector("main");
  displaySection.innerHTML = "";

  library.forEach((book) => {
    const newCard = document.createElement("div");
    newCard.className = "book-card";

    newCard.innerHTML = `<h3>${book.title}</h3> <p>by ${book.author}</p> <p>Pages: ${book.pages}</p> <p>Status: ${book.read}</p>`;

    displaySection.append(newCard);
  });
}

const newBookDialog = document.querySelector("dialog");

// Open new book dialog
const newBookButton = document.querySelector(".new-book");
newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", (event) => {
  //get the input values
  event.preventDefault();
  const title = document.querySelector('input[name="title"]').value;
  const author = document.querySelector('input[name="author"]').value;
  const pages = document.querySelector('input[name="pages"]').value;
  const read = document.querySelector('input[type="checkbox"]').checked;

  addBookToLibrary(title, author, pages, read);
  newBookDialog.close();
});
