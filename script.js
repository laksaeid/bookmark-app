"use strict";
const addBook = document.querySelector(".add");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
const submit = document.querySelector(".submit");
const input = document.querySelector(".text-input");
const url = document.querySelector(".url-input");
const userBookmarks = document.querySelector(".container");
const titlePh = document.querySelector(".text-ph");
const urlPh = document.querySelector(".url-ph");

let bookmarks = [];
renderBookmark();
submit.addEventListener("click", (e) => {
  e.preventDefault();

  const clr = modal.querySelectorAll('.errormsg')
  clr.forEach(value => {
    value.remove();
  })
  
  const error = document.createElement("p");
  error.className = "errormsg errormsg1";
  const error2 = document.createElement("p");
  error2.className = "errormsg errormsg2";

  if (input.value === "" || url.value === "") {
    if (input.value === "") {
      error.innerHTML = "this field is required";
      input.after(error);
    }
    if (url.value === "") {
      error2.innerHTML = "this field is required";
      url.after(error2);
    }
  } else {
    const obj = {
      id: Date.now(),
      title: input.value,
      url: url.value,
    };
    bookmarks.push(obj);
    renderBookmark();
  
  }

  input.value = "";
  url.value = "";
});

input.addEventListener("focus", () => {
  titlePh.className = "text-ph1";
});
url.addEventListener("focus", () => {
  urlPh.className = "url-ph1";
});

function renderBookmark() {
  userBookmarks.innerHTML = "";
  bookmarks.forEach((element) => {
    userBookmarks.innerHTML += `<div class="bookmarks" id="${element.id}">
    <img onclick="redirect(this)" src="https://www.google.com/s2/favicons?domain=${element.url}&sz=64">
    <p>${element.title}</p>
    <ion-icon class="remove" onclick="delBook(this)" name="close-outline"></ion-icon>
    </div>`;
  });
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

addBook.addEventListener("click", showModal);

function showModal(e) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
overlay.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

function delBook(btn) {
  const bookmarkId = btn.parentElement.id;
  const newBook = bookmarks.filter((element) => {
    return element.id !== +bookmarkId;
  });
  bookmarks = newBook;
  renderBookmark();
}

const img = document.querySelector("img");
function redirect(img) {
  const bookmarkClicked = img.parentElement.id;
  const temp = bookmarks.find((element) => {
    return +element.id === +bookmarkClicked;
  });
  console.log(temp);
  window.open(`https://${temp.url}`, "_blank");
}
