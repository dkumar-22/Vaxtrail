import React from "react";

function Body() {
  return (
    <div className="body">
      <div className="body-left">
        <img
          src="https://images.moneycontrol.com/mcnews/images/vaccine-tracker/vaccine-top-img.png"
          alt="main-img"
          className="pic"
        />
      </div>
      <div className="body-right">
        <h1 className="head">
          COVID-19 <br /> Vaccine Booking Platform
        </h1>
        <button className="register">Register Yours</button>
      </div>
    </div>
  );
}

export default Body;
