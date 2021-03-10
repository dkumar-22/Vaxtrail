import React from "react";

function Body() {

  return (
    <div className="body">
      <div className="body-left">
        <img
          src="https://cdn.discordapp.com/attachments/752888354076360706/818724911807594536/logowb.png"
          alt="main-img"
          className="pic"
        />
      </div>
      <div className="body-right">
        <h1 className="head">
          COVID-19 <br /> VACCINE BOOKING PLATFORM
        </h1>
        <button className="register">REGISTER YOURS</button>
      </div>
    </div>
  );
}

export default Body;
