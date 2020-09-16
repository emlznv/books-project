import { createQuote, getQuotes, getQuoteById, likeQuote } from "../js/data.js";

export async function addQuote() {
  try {
    const quote = {
      quote: this.params.quote,
      author: this.params.author,
      creator: localStorage.getItem("username"),
      likes: 0,
      liked: ""
    };

    const result = await createQuote(quote);

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/quotes");
  } catch (err) {
    console.error(err);
  }
}

export async function like() {
  try {
    const quoteId = this.params.id;
    const quoteArr = await getQuoteById(quoteId);
    const quote = quoteArr[0];
    quote.likes++;

    if (quote.liked.includes(this.app.userData.userId)) {
      this.redirect("#/quotes");
      return;
    }

    quote.liked += `${this.app.userData.userId}, `;

    const result = await likeQuote(quoteId, quote);

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/quotes");
  } catch (err) {
    console.error(err);
  }
}

export async function quotes() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  const quotes = await getQuotes();

  quotes.forEach((quote) => {
    if (quote.ownerId === localStorage.getItem("userId")) {
      quote.isCreatorOfQuote = true;
    }
  });
  this.app.userData.quotes = quotes;

  this.partial("./templates/quotes.hbs", this.app.userData);
}
