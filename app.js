const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const potionRoutes = require("./routes/potionRoutes");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://weblux:sEExQ5hc0gTV4Xkc@cluster0.oyfxfvu.mongodb.net/lorem_potions?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.get("/", (req, res) => {
    res.redirect("/categories");
});

app.use("/categories", categoryRoutes);

app.use("/potions", potionRoutes);

app.listen("3000", () => {
    console.log("Listening to port 3000...")
});