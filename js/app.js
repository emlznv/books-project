import { home } from "../controllers/home.js";
import { register, registerPost } from "../controllers/register.js";
import { login, loginPost } from "../controllers/login.js";
import { create, createPost } from "../controllers/books.js";
import { logout } from "../controllers/logout.js";
import { quotes, addQuote, like } from "../controllers/quotes.js";
import { currentlyReading, catalogue, favorites,wantToRead, deleteBook } from "../controllers/books.js";
import { recommendedList, addToRecommended } from "../controllers/books.js";
import { edit, editPost } from "../controllers/books.js";

window.addEventListener("load", function () {
  const app = Sammy("body", function () {
    this.use("Handlebars", "hbs");

    this.userData = {
      username: localStorage.getItem("username") || "",
      userId: localStorage.getItem("userId") || "",
      likedQuotes: []
    };

    this.get("/", home);
    this.get("index.html", home);
    this.get("#/home", home);

    this.get("#/register", register);
    this.post("#/register", (ctx) => { registerPost.call(ctx); });

    this.get("#/login", login);
    this.post("#/login", (ctx) => { loginPost.call(ctx); });

    this.get("#/create", create);
    this.post("#/create", (ctx) => { createPost.call(ctx); });

    this.get("#/logout", logout);

    this.get("#/quotes", quotes);
    this.post("#/add_quote", (ctx) => { addQuote.call(ctx); });

    this.get("#/currently_reading", currentlyReading);
    this.get("#/catalogue", catalogue);

    this.get("#/recommended", recommendedList);
    this.post("#/recommend/:id", (ctx) => { addToRecommended.call(ctx); });

    this.get("#/favorites", favorites);
    this.get("#/to_read", wantToRead);

    this.get("#/edit/:id", edit);
    this.post("#/edit/:id", (ctx) => { editPost.call(ctx); });

    this.post("#/like/:id", (ctx) => { like.call(ctx); });

    this.get("#/delete/:id", deleteBook);
  });

  app.run();
});
