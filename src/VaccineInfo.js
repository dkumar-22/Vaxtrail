import React from "react";
import ProgressBar from "react-animated-progress-bar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDataLayerValue } from "./DataLayer";
const linkstyle = {
  textDecoration: "none",
};
function VaccineInfo({ name, id, about, website, status, efficacy }) {
  const [{ logged, vaccines }, dispatch] = useDataLayerValue();
  function Del(id) {
    axios
      .delete("http://localhost:5000/vaccines/delete/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch({
      type: "SET_VACCINES",
      vaccines: vaccines.filter((el) => el._id !== id),
    });
  }

  function remove(id) {
    var r = window.confirm("Are You Sure?");
    if (r === true) Del(id);
    else console.log("Can't Delete");
  }
  return (
    <div className="vaccine-info">
      <div className="info-left">
        {logged && (
          <div className="admin-btns-v">
            <Link to={"vaccines/edit/" + id} style={linkstyle}>
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
        )}
        <h1 className="vname">{name}</h1>
        <p className="vabout">{about}</p>
        <p className="vstatus">
          {"*" + status}{" "}
          <a
            className="cancel"
            style={{ backgroundColor: " #00917c" }}
            href={website}
            target="_blank_"
          >
            Website
          </a>
        </p>
      </div>
      <div className="info-right">
        <div className="pb">
          <h3 className="efficacy">Efficacy:</h3>
          <br />

          <ProgressBar
            delay="1000"
            width="230"
            trackWidth="20"
            percentage={efficacy}
            defColor={{
              fair: "orangered",
              good: "#FF0068",
              excellent: "teal",
              poor: "red",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default VaccineInfo;
