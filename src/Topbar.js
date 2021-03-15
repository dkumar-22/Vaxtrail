import React from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
const linkstyle = {
  textDecoration: "none",
};

function Topbar() {
  const [{ logged }, dispatch] = useDataLayerValue();
  function handleLogout() {
    var r = window.confirm("Are You Sure?");
    if (r === true) {
      dispatch({
        type: "SET_LOGGED",
        logged: false,
      });
    } else console.log("Can't Logout");
  }
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
        {logged && (
          <Link to="/admin" style={linkstyle}>
            <p>Admin</p>
          </Link>
        )}
        <p>Status</p>
        <Link to="/hospitals" style={linkstyle}>
          <p>Hospitals</p>
        </Link>
        <p>Vaccines</p>
        {logged ? (
          <Link to="/" style={linkstyle} onClick={handleLogout}>
            <p>Logout</p>
          </Link>
        ) : (
          <Link to="/login" style={linkstyle}>
            <p>Login</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Topbar;
