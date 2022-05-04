import React, { useEffect } from "react";
import "./App.css";
import Body from "./Body";
import Stats from "./Stats";
import News from "./News";
import Footer from "./Footer";
import axios from "axios";
import { useDataLayerValue } from "./DataLayer";
import Cookies from 'js-cookie';

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
      dispatch({
        type: "SET_LOGGED",
        logged: Cookies.get('loggedcookie'),
      });
      dispatch({
        type: "SET_USER",
        username: Cookies.get('name'),
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
    if (latitude > 0 && longitude > 0) {
      axios
        .post("http://localhost:5000/hospitals/nearby", {
          longitude: longitude,
          latitude: latitude,
        })
        .then((res) => {
          dispatch({
            type: "SET_NEARBYHOSPITALS",
            nearbyHospitals: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
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
      .get("http://localhost:5000/vaccines")
      .then((res) => {
        dispatch({
          type: "SET_VACCINES",
          vaccines: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch, latitude, longitude]);
  return (
    <div className="App">
      <Body />
      <Stats />
      <News />
      <Footer />
    </div>
  );
}

export default App;
