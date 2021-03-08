import React from "react";
import ProgressBar from "react-animated-progress-bar";
function Vaccines({ value, name }) {
  return (
    <div>
      <ProgressBar
        delay="1000"
        width="230"
        trackWidth="13"
        percentage={value}
      />
      <p className="vaccine-name">{name}</p>
    </div>
  );
}

export default Vaccines;
