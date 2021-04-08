const router = require("express").Router();
let User = require("../models/user.model");
const md5 = require("md5");
router.route("/register").post((req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: md5(req.body.password),
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  User.findOne({ email: req.body.email }, (err, rec) => {
    if (err) res.status(400).json("Error: " + err);
    else {
      if (rec.password === md5(req.body.password)) {
        res.json(rec);
      } else res.send("Password Is Wrong!");
    }
  });
});

module.exports = router;
