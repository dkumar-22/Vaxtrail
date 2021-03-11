import React, { useState } from "react";
import Hospital from "./Hospital";
import { useDataLayerValue } from "./DataLayer";
let i = 0,
  j = 0;
function Hospitals() {
  const [nearby, showNearby] = useState(false);
  const [{ nearbyHospitals, allHospitals }] = useDataLayerValue();
  console.log(nearbyHospitals, allHospitals);
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
