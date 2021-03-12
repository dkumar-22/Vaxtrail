import React, { useState, useEffect } from "react";
import Hospital from "./Hospital";
import { useDataLayerValue } from "./DataLayer";
import axios from "axios";
let i = 0,
  j = 0;
function Hospitals() {
  const [nearby, showNearby] = useState(false);
  const [
    { nearbyHospitals, allHospitals, latitude, longitude },
    dispatch,
  ] = useDataLayerValue();
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
      .get("http://localhost:5000/hospitals/all")
      .then((res) => {
        dispatch({
          type: "SET_ALLHOSPITALS",
          allHospitals: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch, latitude, longitude]);
  function handleClick() {
    showNearby((prev) => !prev);
  }
  return (
    <div className="hospitals-list">
      <div className="forbtn">
        <button className="shownearbybtn" onClick={handleClick}>
          {nearby ? "Show All Hospitals" : "Show Nearby Hospitals"}
        </button>
      </div>

      {!nearby
        ? allHospitals.map(function (x) {
            return (
              <Hospital
                key={i++}
                type={x.type}
                name={x.name}
                contact={x.contact}
                website={x.website}
                directions={x.directions}
              />
            );
          })
        : nearbyHospitals.map(function (x) {
            return (
              <Hospital
                key={j++}
                type={x.type}
                name={x.name}
                contact={x.contact}
                website={x.website}
                directions={x.directions}
              />
            );
          })}
    </div>
  );
}

export default Hospitals;
