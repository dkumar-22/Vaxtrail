import React from "react";

function Topbar() {
  return (
    <div className="topbar">
      <div className="logo">
        <h3 className="brand">VaccTrack</h3>
      </div>
      <div className="tabs">
          <p>Location</p>
          <p>Hospitals</p>
          <p>Vaccines</p>
          <p>Login</p>
      </div>
    </div>
  );
}

export default Topbar;
