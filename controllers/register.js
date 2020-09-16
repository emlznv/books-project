import { register as registerUser } from "../js/data.js";

export async function register() {
  this.partials = {
    header: await this.load("./templates/common/header.hbs"),
    footer: await this.load("./templates/common/footer.hbs"),
  };

  this.partial("./templates/user/register.hbs", this.app.userData);
}

export async function registerPost() {
  try {
    if (this.params.password !== this.params.repeatPassword) {
      throw new Error("Passwords do not match");
    }
    if (this.params.username.length < 3) {
      throw new Error("Username must be atleast 3 characters long");
    }
    if (this.params.password.length < 6) {
      throw new Error("Password must be atleast 6 characters long");
    }

    const result = await registerUser(
      this.params.username,
      this.params.password
    );

    if (result.hasOwnProperty("errorData")) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }

    this.redirect("#/login");
  } catch (err) {
    console.error(err);
  }
}
