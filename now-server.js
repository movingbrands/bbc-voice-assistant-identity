const path = require("path");
const protect = require("static-auth");

const username = "beeb";
const password = "movingbrands";

const app = protect(
  "/",
  (user, pass) => user === username && pass === password,
  { directory: path.resolve(__dirname, "./storybook-static") }
);

module.exports = app;
