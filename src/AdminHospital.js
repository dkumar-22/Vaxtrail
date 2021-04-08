import React from "react";
import axios from "axios";
import { useDataLayerValue } from "./DataLayer";
import { Link } from "react-router-dom";

const linkstyle = {
  textDecoration: "none",
};

function AdminHospital({ id, type, name, contact, website, directions }) {
  const [{ allHospitals }, dispatch] = useDataLayerValue();
  function Del(id) {
    axios
      .delete("http://localhost:5000/hospitals/delete/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({
      type: "SET_ALLHOSPITALS",
      allHospitals: allHospitals.filter((el) => el._id !== id),
    });
  }

  function remove(id) {
    var r = window.confirm("Are You Sure?");
    if (r === true) Del(id);
    else console.log("Can't Delete");
  }

  return (
    <div className="hospital-card">
      <div className="hcleft">
        <div className="hch1">
          <h1 style={{ paddingBottom: "20px" }}>{name}</h1>
        </div>
        <p className="detailsp hcd">
          <b>Type: </b>
          {type === "pvt" ? "Private" : "Government"}
        </p>
        <p className="detailsp hcd">
          {" "}
          <b>Contact: </b>
          {contact}
        </p>
        <div className="admin-btns">
          <Link to={"/edit/" + id} style={linkstyle}>
            <button className="edit-btn">Edit</button>
          </Link>
          <button
            className="del-btn"
            onClick={() => {
              remove(id);
            }}
          >
            Delete
          </button>
        </div>
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

export default AdminHospital;
