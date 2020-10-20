const express = require('express')
const router = express.Router()

const State = require("../models/states")


//seed route
router.get("/seed", (req, res) => {
  const States = [
    { state: "Michigan", 
    img: "https://images.all-free-download.com/images/graphiclarge/state_of_michigan_clip_art_18617.jpg"}
   
  ];
  State.create(States, (err, data) => {
    res.json(data);
  });
});


//index route
router.get("/", async (req, res) => {
    res.json(await State.find({}).populate(''))
})

//create route
router.post("/", async (req, res) => {
  res.json(await State.create(req.body));
});

//update route
router.put("/:id", async (req, res) => {
  res.json(await State.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

//delete route
router.delete("/:id", async (req, res) => {
  res.json(await State.findByIdAndRemove(req.params.id));
});

// EXPORT ROUTER
module.exports = router;