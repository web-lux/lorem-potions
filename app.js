require('dotenv').config();
const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const potionRoutes = require("./routes/potionRoutes");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();

app.use(compression());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

const mongoDB = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.get("/", (req, res) => {
  res.redirect("/categories");
});

app.use("/categories", categoryRoutes);

app.use("/potions", potionRoutes);

app.get("/404", (req, res) => {
  res.render("404", { title: "404 Not Found" });
});

app.use((req, res) => {
  res.redirect("/404");
});

app.listen("3000", () => {
    console.log("Listening to port 3000...")
});