const express = require('express')
const router = express.Router()

const mongoose = require('../db/connection')

const Capital = require("../models/capitals");
const State = require('../models/states');

//seed route
router.get("/seed", (req, res) => {
  const Capitals = [
    { city: "Lansing", 
    population: 118427}
  ];
  Capital.create(Capitals, (err, data) => {
    res.json(data);
  });
});

//index route
router.get("/", async (req, res) => {
    res.json(await Capital.find({}))
})

//create route
router.post("/", async (req, res) => {
  res.json(await Capital.create(req.body));
});

//CREATE CAPITAL AND LINK TO STATE
router.post("/:stateid", async (req, res) => {
    const capital = await Capital.create(req.body)
    //found the state the capital belongs to
    const state = await State.findById(req.params.stateid)
    //pushed id into the blog:
    state.capital.push(capital._id)
    state.save()
    res.json(capital)
});

//update route
router.put("/:id", async (req, res) => {
  res.json(await Capital.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//delete route
router.delete("/:id", async (req, res) => {
  res.json(await Capital.findByIdAndRemove(req.params.id));
});

// EXPORT ROUTER
module.exports = router;