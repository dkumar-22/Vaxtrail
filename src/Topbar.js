import React from "react";
import { Link } from "react-router-dom";

const linkstyle = {
  textDecoration: "none",
};

function Topbar() {
  return (
    <div className="topbar">
      <div className="logo">
        <img
          src="https://cdn.discordapp.com/attachments/752888354076360706/818719631156969502/logobw.png"
          alt="vacctrack logo"
          className="app-logo"
        />
        <Link to="/" style={linkstyle}>
          <h3 className="brand">VaccTrack</h3>
        </Link>
      </div>
      <div className="tabs">
        <p>Status</p>
        <Link to="/hospitals" style={linkstyle}>
          <p>Hospitals</p>
        </Link>
        <p>Vaccines</p>
        <Link to="/login" style={linkstyle}>
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
