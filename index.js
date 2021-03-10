let myLibrary = [];

const addBookToLibrary = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pageNumber = document.getElementById("page-number").value;
  const status = document.getElementById("status").value;
  const newBook = {
    title: title,
    author: author,
    pageNumber: pageNumber,
    status: status,
  };
  myLibrary.push(newBook);
};

const bookDisplay = () => {
  const library = document.getElementById("library");
  library.textContent = "";

  myLibrary.forEach((obj, i) => {
    library.innerHTML += `<div id="${i}" class="book-display"></div>`;

    const bookContainer = document.getElementById(`${i}`);
    bookContainer.innerHTML += `<div class='num'>${i + 1}</div>`;
    bookContainer.innerHTML += `<div class='title'>${obj.title}</div>`;
    bookContainer.innerHTML += `<div class='author'>${obj.author}</div>`;
    bookContainer.innerHTML += `<div class='pageNumber'>${obj.pageNumber}</div>`;
    bookContainer.innerHTML += `<div class='status'>${obj.status}</div>`;
    bookContainer.innerHTML += `<button class="change-status-button" onClick="statusToggler(${i})">Change status</button>`;
    bookContainer.innerHTML += `<button class="remove-button" onClick="bookRemover(${i})">Remove</button>`;
  });
};

// Make form toggler
const formToggler = () => {
  const form = document.getElementById("form");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
};
const addBookButton = document.getElementById("add-a-book");
addBookButton.addEventListener("click", () => {
  // check whether the library is already hidden or not
  if (document.getElementById("library").style.display === "block") {
    libraryToggler();
  }
  // display the add book form
  formToggler();
});

// Make library toggler
const libraryToggler = () => {
  const library = document.getElementById("library");
  if (library.style.display === "none") {
    library.style.display = "block";
  } else {
    library.style.display = "none";
  }
};
const libraryButton = document.getElementById("library-button");
libraryButton.addEventListener("click", () => {
  // check whether the form is already hidden or not
  if (document.getElementById("form").style.display === "block") {
    formToggler();
  }
  // display the books
  libraryToggler();
});

// Submit form + add book to library
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  bookDisplay();
  alert("Your book has been successfully added.");
});

// Remove book
const bookRemover = (i) => {
  // Remove a book at position i in myLibrary arr
  myLibrary.splice(i, 1);
  // Re-display the library
  bookDisplay();
};

const statusToggler = (i) => {
  // Toggle a book status at position i in myLibrary arr
  const book = myLibrary[i];
  if (book.status === "read") book.status = "not read";
  else book.status = "read";
  // Re-display the library
  bookDisplay();
};

// add myLibrary arr (including all changes) to localStorage before the page unloads
const addToLocalStorage = () => {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
};
window.addEventListener("beforeunload", function (e) {
  // Cancel the event
  e.preventDefault();
  // update to localStorage
  addToLocalStorage();
  // Chrome requires returnValue to be set
  e.returnValue = "";
  console.log("Finished.");
});

// update myLibrary arr from localStorage when the app runs
const getMyLibrary = (() => {
  if (!localStorage.getItem("myLibrary")) addToLocalStorage();
  else {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    bookDisplay();
  }
})();
