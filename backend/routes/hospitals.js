const router = require("express").Router();
let Location = require("../models/hospital.model");

let flag = 0,
  long,
  lat;

router.route("/nearby").all((req, res) => {
  if (flag === 0) {
    long = req.body.long;
    lat = req.body.lat;
    flag = 1;
  }
  console.log(long, lat);
  const options = {
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], 1 / 6378.1],
      },
    },
  };
  Location.find(options).then((data) => {
    res.send(data);
  });
});

router.route("/nearby/pvt").all((req, res) => {
  console.log(long, lat);
  const options = {
    type:"pvt",
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], 1 / 6378.1],
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
    type:"govt",
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], 1 / 6378.1],
      },
    },
  };
  Location.find(options).then((data) => {
    res.send(data);
  });
});

router.route("/govt").get((req, res) => {
  Location.find({type:"govt"}).then((data) => {
    res.send(data);
  });
});

router.route("/pvt").get((req, res) => {
  Location.find({type:"pvt"}).then((data) => {
    res.send(data);
  });
});

router.route("/all").get((req, res) => {
  Location.find({}).then((data) => {
    res.send(data);
  });
});

module.exports = router;
