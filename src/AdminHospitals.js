import React from "react";
import AdminHospital from "./AdminHospital";
import { useDataLayerValue } from "./DataLayer";
import { Link } from "react-router-dom";

const linkstyle = {
  textDecoration: "none",
};
let i = 0;
function AdminHospitals() {
  const [{ allHospitals }] = useDataLayerValue();
  return (
    <div className="hospitals-list">
        <Link to="/feedbacks" style={linkstyle}>
          <button className="feedbackbtn">View Feedbacks</button>
        </Link>
      <div className="forbtn">
        <Link to="/add" style={linkstyle}>
          <button className="addbtn">+</button>
        </Link>
      </div>
      {allHospitals.map(function (x) {
        return (
          <AdminHospital
            key={i++}
            id={x._id}
            type={x.type}
            name={x.name}
            contact={x.contact}
            website={x.website}
            directions={x.directions}
          />
        );
      })}
    </div>
  );
}

export default AdminHospitals;
