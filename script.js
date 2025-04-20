const myLibrary = [];

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'finished' : 'not read yet';
    this.id = id;
  }

  //toggle read method
  toggleRead() {
    this.read = this.read == 'finished' ? 'not read yet' : 'finished';
    displayBooks(myLibrary);
  }

  static addToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    displayBooks(myLibrary);
  }

  static removeFromLibrary(id) {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == id) {
        myLibrary.splice(i, 1);
      }
    }
  }
}

function displayBooks(library) {
  const displaySection = document.querySelector('main');
  displaySection.innerHTML = '';

  library.forEach((book) => {
    const newCard = document.createElement('div');
    newCard.className = 'book-card';
    newCard.innerHTML = `<h3>${book.title}</h3> <p>by ${book.author}</p> <p>Pages: ${book.pages}</p> <p>Status: ${book.read}</p>`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.textContent = 'remove';
    newCard.append(deleteBtn);
    newCard.dataset.id = book.id;

    deleteBtn.addEventListener('click', () => {
      const bookToBeRemoved = deleteBtn.parentNode;
      bookToBeRemoved.remove();
      Book.removeFromLibrary(bookToBeRemoved.dataset.id);
    });

    const readStatusButton = document.createElement('button');
    readStatusButton.className = 'read-status-button';
    readStatusButton.textContent = 'toggle read';
    newCard.append(readStatusButton);

    readStatusButton.addEventListener('click', () => {
      const bookId = readStatusButton.parentNode.dataset.id;
      const book = myLibrary.find((obj) => obj.id == bookId);
      book.toggleRead();
    });

    displaySection.append(newCard);
  });
}

const newBookDialog = document.querySelector('dialog');

// Open new book dialog button
const newBookButton = document.querySelector('.new-book');
newBookButton.addEventListener('click', () => {
  newBookDialog.showModal();
});

// Add book button
function addBook(event) {
  const form = document.querySelector('form');
  const title = document.querySelector('input[name="title"]').value;
  const author = document.querySelector('input[name="author"]').value;
  const pages = document.querySelector('input[name="pages"]').value;
  const read = document.querySelector('input[type="checkbox"]').checked;

  if (form.checkValidity()) {
    Book.addToLibrary(title, author, pages, read);
    newBookDialog.close();
  }
}

const addBookButton = document.querySelector('.add-book');
addBookButton.addEventListener('click', addBook);
