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
      {details.map(function (x) {
        return (
          <AdminDetail
            key={i++}
            age={x.age}
            reg={x.date}
            ad={x.appointmentDate}
            adt={x.appointmentDateandTime}
            name={x.fname + " " + x.lname}
            dob={x.dob}
            slot={x.slot.start+"-"+x.slot.end}
            email={x.email}
            phone={x.phone}
            address={x.address + ", " + x.city + ", " + x.state + ", " + x.zip}
            hospital={x.shospital.name+", "+((x.shospital.type==="pvt")?"Private":"Government")}
          />
        );
      })}
    </div>
  );
}

export default AdminDetails;
