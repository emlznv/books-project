function host(endpoint) {
  return `https://api.backendless.com/D6C835FE-21CB-8FD5-FF19-F8D960BAA600/D31991C2-5A51-49AE-9097-77F034FC150F/${endpoint}`;
}

const endpoints = {
  REGISTER: "users/register",
  LOGIN: "users/login",
  LOGOUT: "users/logout",
  CATALOGUE: "data/catalogue",
  RECOMMENDED: "data/recommended",
  QUOTES: "data/quotes",
};

export async function register(username, password) {
  const result = (
    await fetch(host(endpoints.REGISTER), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
  ).json();

  return result;
}

export async function login(username, password) {
  const result = await (
    await fetch(host(endpoints.LOGIN), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password,
      }),
    })
  ).json();

  localStorage.setItem("userToken", result["user-token"]);
  localStorage.setItem("username", result.username);
  localStorage.setItem("userId", result.objectId);

  return result;
}

export async function logout() {
  const token = localStorage.getItem("userToken");
  localStorage.removeItem("userToken");

  const result = fetch(host(endpoints.LOGOUT), {
    headers: {
      "user-token": token,
    },
  });

  return result;
}

export async function create(book) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.CATALOGUE), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify(book),
    })
  ).json();

  return result;
}

export async function createQuote(quote) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.QUOTES), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify(quote),
    })
  ).json();

  return result;
}

export async function likeQuote(id, updatedProps) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.QUOTES + `/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify(updatedProps),
    })
  ).json();

  return result;
}

export async function getQuotes() {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.QUOTES), {
      headers: {
        "user-token": token,
      },
    })
  ).json();

  return result;
}

export async function getQuoteById(quoteId) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.QUOTES + `?where=objectId%3D%27${quoteId}%27`), {
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
    })
  ).json();

  return result;
}

export async function recommendBook(book) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.RECOMMENDED), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify(book),
    })
  ).json();
  
  return result;
}

export async function getBookById(bookId) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(
      host(endpoints.CATALOGUE + `?where=objectId%3D%27${bookId}%27`),
      {
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      }
    )
  ).json();

  return result;
}

export async function getAllBooks() {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.CATALOGUE), {
      headers: {
        "user-token": token,
      },
    })
  ).json();

  return result;
}

export async function getRecommendedById(bookId) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(
      host(endpoints.RECOMMENDED + `?where=objectId%3D%27${bookId}%27`),
      {
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      }
    )
  ).json();

  return result;
}

export async function getRecommended() {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.RECOMMENDED), {
      headers: {
        "user-token": token,
      },
    })
  ).json();

  return result;
}

export async function getBookList(list) {
  const token = localStorage.getItem("userToken");
  const ownerId = localStorage.getItem("userId");

  const result = (
    await fetch(
      host(
        endpoints.CATALOGUE +
          `?where=list%20%3D%20'${list}'%20AND%20ownerId%20%3D%20'${ownerId}'`
      ),
      {
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      }
    )
  ).json();

  return result;
}

export async function editBook(id, updatedProps) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.CATALOGUE + `/${id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify(updatedProps),
    })
  ).json();

  return result;
}

export async function removeBook(id) {
  const token = localStorage.getItem("userToken");

  const result = (
    await fetch(host(endpoints.CATALOGUE + `/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
    })
  ).json();

  return result;
}
