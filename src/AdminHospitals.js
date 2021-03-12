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
  const [hospis, setHospis] = React.useState(allHospitals);
  return (
    <div className="hospitals-list">
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
            hospis={hospis}
            setHospis={setHospis}
          />
        );
      })}
    </div>
  );
}

export default AdminHospitals;
