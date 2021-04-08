const router = require("express").Router();
let Feedback = require("../models/feedback.model");
Feedback = Feedback.Feedback;
router.route("/").get((req, res) => {
  Feedback.find({}).then((data) => {
    res.send(data);
  });
});

router.route("/add").post((req, res) => {
  const feed = new Feedback({
    userDetails: req.body.userDetails,
    health: req.body.health,
    sideEffects: req.body.sideEffects,
    name: req.body.name,
    date: req.body.date,
    bid: req.body.bid,
  });
  feed
    .save()
    .then(() => res.json("Feedback added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
