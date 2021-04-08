import React from "react";

function AdminDetail({
  ad,
  adt,
  name,
  address,
  phone,
  email,
  slot,
  reg,
  dob,
  age,
  hospital,
  gender,
  id,
}) {
  console.log(adt);
  if (age > 59) {
    return (
      <div className="user-details">
        <div className="dleft">
          <h2 className="d">Personal Details</h2>
          <p className="adminrow">
            <b className="adminheading">Name: </b>
            {name}
          </p>
          <p className="adminrow">
            <b className="adminheading">Gender: </b>
            {gender}
          </p>
          <p className="adminrow">
            <b className="adminheading">DOB: </b>
            {dob}
          </p>
          <p className="adminrow">
            <b className="adminheading">Phone: </b>
            {phone + " "}
          </p>
          <p className="adminrow">
            <b className="adminheading">Email: </b>
            {email}
          </p>
          <p className="adminrow">
            <b className="adminheading">Address: </b>
            {address}
          </p>
        </div>
        <div className="dright">
          <h2 className="d">Other Details</h2>
          <p className="adminrow">
            <b className="adminheading">Booking ID: </b>
            {id}
          </p>
          <p className="adminrow">
            <b className="adminheading">Registered On: </b>
            {reg.substring(0, 25)}
          </p>
          <p className="adminrow">
            <b className="adminheading">Hospital Chosen: </b>
            {hospital}
          </p>
          <p className="adminrow">
            <b className="adminheading">Appointment Date: </b>
            {adt.substring(0, 10)}
          </p>
          <p className="adminrow">
            <b className="adminheading">Appointment Time: </b>
            {adt.substring(11) + "  (*24hr format)"}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="user-details">
        <div className="dleft">
          <h2 className="d">Personal Details</h2>
          <p className="adminrow">
            <b className="adminheading">Name: </b>
            {name}
          </p>
          <p className="adminrow">
            <b className="adminheading">Gender: </b>
            {gender}
          </p>
          <p className="adminrow">
            <b className="adminheading">DOB: </b>
            {dob}
          </p>
          <p className="adminrow">
            <b className="adminheading">Phone: </b>
            {phone + " "}
          </p>
          <p className="adminrow">
            <b className="adminheading">Email: </b>
            {email}
          </p>
          <p className="adminrow">
            <b className="adminheading">Address: </b>
            {address}
          </p>
        </div>
        <div className="dright">
          <h2 className="d">Other Details</h2>
          <p className="adminrow">
            <b className="adminheading">Booking ID: </b>
            {id}
          </p>
          <p className="adminrow">
            <b className="adminheading">Registered On: </b>
            {reg.substring(0, 25)}
          </p>
          <p className="adminrow">
            <b className="adminheading">Hospital Chosen: </b>
            {hospital}
          </p>
          <p className="adminrow">
            <b className="adminheading">Appointment Date: </b>
            {ad + " "}
          </p>
          <p className="adminrow">
            <b className="adminheading">Chosen Slot: </b>
            {slot + " (*24hr format)"}
          </p>
        </div>
      </div>
    );
  }
}

export default AdminDetail;
