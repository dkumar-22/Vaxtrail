import React, { useEffect } from "react";
import "./App.css";
// import Topbar from "./Topbar";
import Body from "./Body";
import Stats from "./Stats";
import News from "./News";
import Footer from "./Footer";
import axios from "axios";
import { useDataLayerValue } from "./DataLayer";
function App() {
  const [{ latitude, longitude }, dispatch] = useDataLayerValue();
  useEffect(() => {
    function showPosition(position) {
      dispatch({
        type: "SET_LATITUDE",
        latitude: position.coords.latitude,
      });
      dispatch({
        type: "SET_LONGITUDE",
        longitude: position.coords.longitude,
      });
    }

    async function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    getLocation();
    axios
      .get("http://localhost:5000/hospitals/all")
      .then((res) => {
        dispatch({
          type: "SET_ALLHOSPITALS",
          allHospitals: res.data,
        });
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/hospitals/govt")
      .then((res) => {
        dispatch({
          type: "SET_GOVTHOSPITALS",
          govtHospitals: res.data,
        });
      })
      .catch((err) => console.log(err));
    if (latitude > 0 && longitude > 0) {
      axios
        .post("http://localhost:5000/hospitals/nearby", {
          lat: latitude,
          long: longitude,
        })
        .then((res) => {
          dispatch({
            type: "SET_NEARBYHOSPITALS",
            nearbyHospitals: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, latitude, longitude]);
  return (
    <div className="App">
      {/* <Topbar /> */}
      <Body />
      <Stats />
      <News />
      <Footer />
    </div>
  );
}

export default App;
