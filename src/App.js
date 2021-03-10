import React, { useState, useEffect } from "react";
import "./App.css";
import Topbar from "./Topbar";
import Body from "./Body";
import Stats from "./Stats";
import News from "./News";
import Footer from "./Footer";
import axios from "axios";
function App() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    function showPosition(position) {
      setLocation({
        latitude: position.coords.latitude,
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
  }, []);
  if (location.latitude > 0) {
    axios
      .post("http://localhost:5000/hospitals/nearby", location)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="App">
      <Topbar />
      <Body />
      <Stats />
      <News />
      <Footer />
    </div>
  );
}

export default App;
