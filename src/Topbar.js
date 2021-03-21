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
            <p className="tab-options">ADMIN</p>
          </Link>
        )}
        {logged && (
          <Link to="/details" style={linkstyle}>
            <p className="tab-options">REGISTRATIONS</p>
          </Link>
        )}
        <Link to="/status" style={linkstyle}>
          <p className="tab-options">STATUS</p>
        </Link>

        <Link to="/hospitals" style={linkstyle}>
          <p className="tab-options">HOSPITALS</p>
        </Link>
        <p className="tab-options">VACCINES</p>
        {logged ? (
          <Link to="/" style={linkstyle} onClick={handleLogout}>
            <p className="tab-options">LOGOUT</p>
          </Link>
        ) : (
          <Link to="/login" style={linkstyle}>
            <p className="tab-options">LOGIN</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Topbar;
