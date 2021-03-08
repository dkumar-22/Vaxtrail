import React, { useState, useEffect } from "react";
import Odometer from "react-odometerjs";
import "./odometer-theme-default.css";
function OdometerStats({ stat, heading }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(stat);
  }, [stat]);
  return (
    <div className="odometerstats">
      <h4>{heading}</h4>
      <Odometer format="d" duration={1000} value={val} />
    </div>
  );
}

export default OdometerStats;
