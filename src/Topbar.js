import React from "react";

function Topbar() {
  return (
    <div className="topbar">
      <div className="logo">
        <img
          src="https://cdn.discordapp.com/attachments/752888354076360706/818719631156969502/logobw.png"
          alt="vacctrack logo"
          className="app-logo"
        />
        <h3 className="brand">VaccTrack</h3>
      </div>
      <div className="tabs">
        <p>Status</p>
        <p>Hospitals</p>
        <p>Vaccines</p>
        <p>Login</p>
      </div>
    </div>
  );
}

export default Topbar;
