const express = require('express')
const router = express.Router()

const State = require("../models/states")

//index route
router.get("/", async (req, res) => {
    res.json(await State.find({}))
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