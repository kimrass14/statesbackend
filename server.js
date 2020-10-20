const express = require('express')
const app = express()

//MONGO CONNECTION
// const mongoose = require("./DB/conn");

//CORS
// const cors = require("cors");
// const corsOptions = require("./configs/cors.js");

//Bringing in Express
// const express = require("express");
// const app = express();

//OTHER IMPORTS
// const morgan = require("morgan");
const stateRouter = require("./controllers/stateRoutes");
const capitalRouter = require("./controllers/capitalRoutes");

////////////
//MIDDLEWARE
////////////
// NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use(morgan("tiny")); //logging

//Route for testing server is working
app.get("/", (req, res) => {
  res.json({ hello: "Hello World!" });
});

app.use("/capital", capitalRouter);
app.use("/state", stateRouter);

require('dotenv').config()
const { PORT = 3000, NODE_ENV = "development" } = process.env;

app.listen(PORT, () => {
    console.log(`express on port ${PORT}`)
})