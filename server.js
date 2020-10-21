require('dotenv').config()//
// const { PORT = 3000, NODE_ENV = "development" } = process.env;
const {PORT = 4000} = process.env//

const mongoose = require("./db/connection");

//CORS
const cors = require("cors");//

const express = require('express')//
const app = express()//

//OTHER IMPORTS
const morgan = require("morgan");//
const stateRouter = require("./controllers/stateRoutes");
const capitalRouter = require("./controllers/capitalRoutes");

//MIDDLEWARE
// NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(cors())//
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny")); //logging

//Route to test the server is working
app.get("/", (req, res) => {
  res.json({ hello: "Hello World!" });
});//

app.use("/capital", capitalRouter);
app.use("/state", stateRouter);

app.listen(PORT, () => {
    console.log(`express on port ${PORT}`)
})//