import React from "react";
import VaccineInfo from "./VaccineInfo";
import { useDataLayerValue } from "./DataLayer";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const linkstyle = {
  textDecoration: "none",
};

function VaccinePage() {
  const [{ logged, vaccines }] = useDataLayerValue();
  return (
    <div className="vaccine-page">
      {logged && (
        <div className="vaccine-btn">
          <Link to="/vaccines/add" style={linkstyle}>
            <button className="addbtn">+</button>
          </Link>
        </div>
      )}
      {vaccines.map(function (x) {
        return (
          <VaccineInfo
            key={x._id}
            id={x._id}
            efficacy={x.efficacy}
            name={x.name}
            about={x.about}
            website={x.website}
            status={x.status}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default VaccinePage;
