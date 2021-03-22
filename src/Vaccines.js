import React from "react";
import ProgressBar from "react-animated-progress-bar";
function Vaccines({ value, name }) {
  return (
    <div>
      <ProgressBar
        delay="1000"
        width="230"
        trackWidth="20"
        percentage={value}
        defColor={{
            fair: 'orangered',
            good: '#FF0068',
            excellent: 'teal',
            poor: 'red',
          }}
      />
      <p className="vaccine-name">{name}</p>
    </div>
  );
}

export default Vaccines;
