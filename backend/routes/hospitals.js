const router = require("express").Router();
let Location = require("../models/hospital.model");

let flag = 0,
  long,
  lat;

router.route("/nearby").all((req, res) => {
  if (flag === 0) {
    long = req.body.longitude;
    lat = req.body.latitude;
    flag = 1;
  }
  console.log(long, lat);
  const options = {
    location: {
      $geoWithin: {
        $centerSphere: [[long, lat], 2 / 6378.1],
      },
    },
  };
  Location.find(options).then((data) => {
    res.send(data);
  });
});

module.exports = router;