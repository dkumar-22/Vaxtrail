import React, { useState, useEffect } from "react";
import Hospital from "./Hospital";
import { useDataLayerValue } from "./DataLayer";
import axios from "axios";
let i = 0,
  j = 0;
function Hospitals() {
  const [nearby, showNearby] = useState(false);
  const [{ nearbyHospitals, allHospitals }, dispatch] = useDataLayerValue();
  useEffect(() => {
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

    axios
      .get("http://localhost:5000/hospitals/pvt")
      .then((res) => {
        dispatch({
          type: "SET_PVTHOSPITALS",
          pvtHospitals: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
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
