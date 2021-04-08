import React from "react";

function Hospital({ type, name, contact, website, directions }) {
  return (
    <div className="hospital-card">
      <div className="hcleft">
        <h1 style={{ paddingBottom: "20px" }}>{name}</h1>
        <p className="detailsp hcd">
          <b>Type: </b>
          {type === "pvt" ? "Private" : "Government"}
        </p>
        <p className="detailsp hcd">
          {" "}
          <b>Contact: </b>
          {contact}
        </p>
        <p className="detailsp hcd">
          {" "}
          <b>Website: </b>
          {website.substring(0,70)}
          <br/>{website.substring(70)}
        </p>
      </div>
      <div className="hcright">
      <a
          className="cancel"
          style={{
            backgroundColor: "#91091e",
            marginTop: "20px",
            color: "white",
          }}
          href={website}
          target="_blank_"
        >
          Go to Website
        </a>
        <a
          className="cancel gd"
          href={directions}
          target="_blank_"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
}

export default Hospital;
