const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const potionRoutes = require("./routes/potionRoutes");

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.redirect("/categories");
});

app.use("/categories", categoryRoutes);

app.use("/potions", potionRoutes);

app.listen("3000", () => {
    console.log("Listening to port 3000...")
});