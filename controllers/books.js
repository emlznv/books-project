import { create as createBook } from "../js/data.js";
import { getAllBooks, getBookList, getRecommended, recommendBook, getBookById } from "../js/data.js";
import { removeBook, editBook } from "../js/data.js";

export async function create() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  this.partial("./templates/books/create.hbs", this.app.userData);
}

export async function createPost() {
  try {
    const selected = getSelectedOption();

    const book = {
      title: this.params.title,
      author: this.params.author,
      image: this.params.image,
      year: Number(this.params.year),
      genre: this.params.genre,
      list: selected,
    };

    const result = await createBook(book);

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/catalogue");
  } catch (err) {
    console.error(err);
  }
}

function getSelectedOption() {
  let selected = "";
  const selectMenu = document.getElementsByClassName("options")[0];

  Array.from(selectMenu.children).forEach((opt) => {
    if (opt.selected === true) {
      selected = opt.value;
    }
  });

  return selected;
}

export async function currentlyReading() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const currentlyReadingBooks = await getBookList("currently_reading");
  this.app.userData.currentlyReadingBooks = currentlyReadingBooks;

  this.partial("./templates/books/currentlyReading.hbs", this.app.userData);
}

export async function wantToRead() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const toReadBooks = await getBookList("to_read");
  this.app.userData.toReadBooks = toReadBooks;

  this.partial("./templates/books/wantToRead.hbs", this.app.userData);
}

export async function favorites() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const favoriteBooks = await getBookList("favorites");
  this.app.userData.favoriteBooks = favoriteBooks;

  this.partial("./templates/books/favorites.hbs", this.app.userData);
}

export async function recommendedList() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const recommendedBooks = await getRecommended();
  this.app.userData.recommendedBooks = recommendedBooks;

  this.partial("./templates/books/recommended.hbs", this.app.userData);
}

export async function addToRecommended() {
  try {
    const bookById = await getBookById(this.params.id);

    const book = {
      title: bookById[0].title,
      author: bookById[0].author,
      image: bookById[0].image,
      year: Number(bookById[0].year),
      genre: bookById[0].genre,
    };

    const result = await recommendBook(book);

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/recommended");
  } catch (err) {
    console.error(err);
  }
}

export async function catalogue() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const allBooks = await getAllBooks();

  allBooks.forEach((book) => {
    if (book.ownerId === localStorage.getItem("userId")) {
      book.isCreator = true;
    }
  });

  this.app.userData.allBooks = allBooks;

  this.partial("./templates/books/catalogue.hbs", this.app.userData);
}

export async function edit() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const objectId = this.params.id;
  const context = Object.assign({ objectId }, this.app.userData);

  this.partial("./templates/books/edit.hbs", context);
}

export async function editPost() {
  try {
    const selected = getSelectedOption();
    const bookId = this.params.id;

    const updatedBook = {
      title: this.params.title,
      author: this.params.author,
      image: this.params.image,
      year: Number(this.params.year),
      genre: this.params.genre,
      list: selected,
    };

    const result = await editBook(bookId, updatedBook);

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/catalogue");
  } catch (err) {
    console.error(err);
  }
}

export async function deleteBook() {
  const bookId = this.params.id;

  try {
    const result = await removeBook(bookId);

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/catalogue");
  } catch (err) {
    console.error(err);
  }
}
