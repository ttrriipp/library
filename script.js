const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
}

const bookCard = document.querySelector("main .book-card");

function displayBooks(library) {
  const displaySection = document.querySelector("main");

  library.forEach((book) => {
    const newCard = document.createElement("div");
    newCard.className = "book-card";

    newCard.innerHTML = `<h3>${book.title}</h3> <p>by ${book.author}</p> <p>Pages: ${book.pages}</p> <p>Status: ${book.read}</p> <input type='checkbox'>`;

    displaySection.append(newCard);
  });
}

addBookToLibrary("The Prince", "Niccolo Machiavelli", "169", "not read yet");
addBookToLibrary(
  "Crime and Punishment",
  "Fyodor Dostoevsky",
  "169",
  "not read yet"
);
displayBooks(myLibrary);
