import React from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import Cookies from 'js-cookie';
const linkstyle = {
  textDecoration: "none",
};

function Topbar() {
  const [{ logged, username }, dispatch] = useDataLayerValue();
  function handleLogout() {
    var r = window.confirm("Are You Sure?");
    if (r === true) {
      dispatch({
        type: "SET_LOGGED",
        logged: false,
      });
      Cookies.remove('loggedcookie');
      Cookies.remove('name');
    } else console.log("Can't Logout");
  }
  return (
    <div className="topbar">
      <div className="logo">
        <img
          src="https://cdn.discordapp.com/attachments/752888354076360706/818719631156969502/logobw.png"
          alt="vaxtrail logo"
          className="app-logo"
        />
        <Link to="/" style={linkstyle}>
          <h3 className="brand">VaxTrail</h3>
        </Link>
      </div>
      <div className="tabs">
        {logged && (
          <Link to="/admin" style={linkstyle}>
            <p className="tab-options">HOSPITALS</p>
          </Link>
        )}
        {logged && (
          <Link to="/details" style={linkstyle}>
            <p className="tab-options">REGISTRATIONS</p>
          </Link>
        )}
       {!logged && <Link to="/status" style={linkstyle}>
          <p className="tab-options">STATUS</p>
        </Link>}

        {!logged && <Link to="/hospitals" style={linkstyle}>
          <p className="tab-options">HOSPITALS</p>
        </Link>}
        <Link to="/vaccines" style={linkstyle}>
          <p className="tab-options">VACCINES</p>
        </Link>
        {logged && <p className="tab-options">||</p>}
        {/* {logged ? (
          <Link to="/" style={linkstyle} onClick={handleLogout}>
              <p className="tab-options">{username.toUpperCase()}</p>
          </Link>
        ) : (
          <Link to="/login" style={linkstyle}>
            <p className="tab-options">LOGIN</p>
          </Link>
        )} */}
        {logged && (
          <Link to="/" style={linkstyle} onClick={handleLogout}>
              <p className="tab-options">{username.toUpperCase()}</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Topbar;
