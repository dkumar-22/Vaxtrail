const router = require("express").Router();
let Vaccine = require("../models/vaccine.model");

router.route("/").get((req, res) => {
  Vaccine.find({}).then((data) => {
    res.send(data);
  });
});

router.route("/add").post((req, res) => {
  const vacc = new Vaccine({
    name: req.body.name,
    about: req.body.about,
    website: req.body.website,
    status: req.body.status,
    efficacy: req.body.efficacy,
  });
  vacc
    .save()
    .then(() => res.json("Vaccine added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Vaccine.findByIdAndDelete(req.params.id)
    .then(() => res.json("Vaccine deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Vaccine.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Vaccine.findById(req.params.id)
    .then((hosp) => {
      hosp.name = req.body.name;
      hosp.about = req.body.about;
      hosp.website = req.body.website;
      hosp.status = req.body.status;
      hosp.efficacy = req.body.efficacy;
      hosp
        .save()
        .then(() => res.json("Vaccine Details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
