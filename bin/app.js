const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const apiErr = require("../controllers/errorController");

const router = require("../routes/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(flash());
app.use(morgan("dev"));
app.use(session({ secret: "Rizki", saveUninitialized: true, resave: true }));
app.use(express.static(path.resolve(__dirname, ".././public")));

app.get("/", (req, res) => {
  res.render("landingPage");
});

app.get("/client", (req, res) => {
  res.render("cariMobil");
});

app.get("/login", (req, res) => {
  res.render("Auth/login");
});

app.use(router);

app.use(apiErr.onError);
app.use(apiErr.onLost);

module.exports = app;
