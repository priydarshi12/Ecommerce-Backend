const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs=require("fs");//file-system
require("dotenv").config();

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.log("error in db connection", error));





app.listen(() => console.log());

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limiyt: "2mb" }));
app.use(cors());

//route middleware

fs.readdirSync('./routes').map((r)=>app.use("/api",require("./routes/"+r)));

//decide the port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is live");
});
