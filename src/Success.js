import React from "react";
import { Link } from "react-router-dom";
const linkstyle = {
  textDecoration: "none",
};

function Success() {
  return (
    <div className="success">
      <h2>Changes Successfull!!</h2>
      <Link to="/" style={linkstyle}>
        <button className="shownearbybtn succ">Back To Homepage</button>
      </Link>
    </div>
  );
}

export default Success;
