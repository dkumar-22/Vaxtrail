import React from "react";

function Hospital({ type, name, contact, website, directions }) {
  return (
    <div className="hospital-card">
      <h1 style={{paddingBottom:"20px"}}>{name}</h1>
      <h4>Type: </h4>
      <p>{type === "pvt" ? "Private" : "Government"}</p>
      <h4>Contact: </h4><p style={{paddingBottom:"10px"}}>{contact}</p>
      <a className="card-links" href={website} target="_blank_">Go To The Website</a>
      <a className="card-links" href={directions} target="_blank_">Get Directions</a>
    </div>
  );
}

export default Hospital;
