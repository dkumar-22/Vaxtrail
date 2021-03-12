const router = require("express").Router();
let Location = require("../models/hospital.model");

let flag = 0;
var long = 0,
  lat = 0;
router.route("/nearby").all((req, res) => {
  if (flag === 0) {
    long = req.body.longitude;
    lat = req.body.latitude;
    console.log(req.body);
    flag = 1;
  }

  if (flag === 1) {
    console.log(long, lat);
    const options = {
      location: {
        $geoWithin: {
          $centerSphere: [[long, lat], 1.5 / 6378.1],
        },
      },
    };
    Location.find(options).then((data) => {
      res.send(data);
    });
  }
});

router.route("/nearby/pvt").all((req, res) => {
  console.log(long, lat);
  const options = {
    type: "pvt",
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], 1.5 / 6378.1],
      },
    },
  };
  Location.find(options).then((data) => {
    res.send(data);
  });
});

router.route("/nearby/govt").all((req, res) => {
  console.log(long, lat);
  const options = {
    type: "govt",
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], 1.5 / 6378.1],
      },
    },
  };
  Location.find(options).then((data) => {
    res.send(data);
  });
});

router.route("/govt").get((req, res) => {
  Location.find({ type: "govt" }).then((data) => {
    res.send(data);
  });
});

router.route("/pvt").get((req, res) => {
  Location.find({ type: "pvt" }).then((data) => {
    res.send(data);
  });
});

router.route("/all").get((req, res) => {
  Location.find({}).then((data) => {
    res.send(data);
  });
});

router.route("/delete/:id").delete((req, res) => {
  Location.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const hospital = new Location({
    type: req.body.type,
    name: req.body.name,
    contact: req.body.contact,
    website: req.body.website,
    directions: req.body.directions,
    location: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    },
  });
  hospital
    .save()
    .then(() => res.json("Hospital added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Location.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Location.findById(req.params.id)
    .then((hosp) => {
      hosp.type = req.body.type;
      hosp.name = req.body.name;
      hosp.contact = req.body.contact;
      hosp.website = req.body.website;
      hosp.directions = req.body.directions;
      hosp.location.coordinates[0] = req.body.longitude;
      hosp.location.coordinates[1] = req.body.latitude;
      hosp
        .save()
        .then(() => res.json("Hospital Details updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
