const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const toId = mongoose.Types.ObjectId

const State = require("../models/states")
const Capital = require('../models/capitals')


//seed route
router.get("/seed", async (req, res) => {
   States = [
    { state: "Michigan", 
    img: "https://images.all-free-download.com/images/graphiclarge/state_of_michigan_clip_art_18617.jpg"}
  ];
    const newState = await State.create(States);
    res.json({newState});
  });


//get a capital document into a state document
//MI Id: 5f8f5c0edd1cc40017d4fafc
//Lansing Id: 5f8fa81d3e90bf00177c5a4d
router.get("/:stateId/addcapital/:capitalId", async (req, res) => {
    //takes string and turn into objectId
    req.params.capitalId = toId(req.params.capitalId)
    const state = await State.findByIdAndUpdate(req.params.stateId, {capital: req.params.capitalId})
    res.json(state)
})

//index route to return all states and referenced capitals
router.get("/", async (req, res) => {
    res.json(await State.find({}).populate({path: "capital", model: "Capital"}))
})

//create route for state with empty array of capital
router.post("/", async (req, res) => {
  res.json(await State.create(req.body));
});

//update just state
router.put("/:id", async (req, res) => {
  res.json(await State.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//update - add capital to state
router.put("/:stateId/addcapital/:capitalId", async (req, res) => {
    const capital = await Capital.findById(req.params.capitalId)
    const state = await State.findByIdAndUpdate
    (req.params.stateId,
        {$push: {capital: capital.id},
        new: true})
    res.json({status: 200, data: state});
});

//delete route
router.delete("/:id", async (req, res) => {
  res.json(await State.findByIdAndRemove(req.params.id));
});

// EXPORT ROUTER
module.exports = router;