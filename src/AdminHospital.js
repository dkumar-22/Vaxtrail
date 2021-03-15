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
      <div className="admin-hospi">
        <h1 style={{ paddingBottom: "20px" }}>{name}</h1>
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
      <h4>Type: </h4>
      <p>{type === "pvt" ? "Private" : "Government"}</p>
      <h4>Contact: </h4>
      <p style={{ paddingBottom: "10px" }}>{contact}</p>
      <a className="card-links" href={website} target="_blank_">
        Go To The Website
      </a>
      <a className="card-links" href={directions} target="_blank_">
        Get Directions
      </a>
    </div>
  );
}

export default AdminHospital;
