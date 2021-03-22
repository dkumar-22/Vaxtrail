import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDetail from "./AdminDetail";
var i = 0;
function AdminDetails() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/registered/all")
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(details);
  return (
    <div>
    <h1 className="dh">Registered Users</h1>
      {details.map(function (x) {
        return x.slot !== undefined ? (
          <AdminDetail
            key={i++}
            age={x.age}
            gender={x.gender}
            reg={x.date}
            ad={x.appointmentDate}
            name={x.fname + " " + x.lname}
            dob={x.dob}
            slot={x.slot.start + "-" + x.slot.end}
            email={x.email}
            phone={x.phone}
            address={x.address + ", " + x.city + ", " + x.state + ", " + x.zip}
            hospital={
              x.shospital.name +
              ", " +
              (x.shospital.type === "pvt" ? "Private" : "Government")
            }
          />
        ) : (
          <AdminDetail
            key={i++}
            age={x.age}
            reg={x.date}
            gender={x.gender}
            adt={x.appointmentDateandTime.replace("T", " ")}
            name={x.fname + " " + x.lname}
            dob={x.dob}
            email={x.email}
            phone={x.phone}
            address={x.address + ", " + x.city + ", " + x.state + ", " + x.zip}
            hospital={
              x.shospital.name +
              ", " +
              (x.shospital.type === "pvt" ? "Private" : "Government")
            }
          />
        );
      })}
    </div>
  );
}

export default AdminDetails;
