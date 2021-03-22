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
  gender
}) {
  if (age > 59) {
    return (
      <div className="user-details">
        <p className="adminrow">
          <b className="adminheading">Registration Date: </b>
          {reg}
        </p>
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
        <p className="adminrow">
          <b className="adminheading">Hospital: </b>
          {hospital}
        </p>
        <p className="adminrow">
          <b className="adminheading">Appointment Date and Time: </b>
          {adt + " "}
        </p>
      </div>
    );
  } else {
    return (
      <div className="user-details">
        <p className="adminrow">
          <b className="adminheading">Registration Date: </b>
          {reg}
        </p>
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
        <p className="adminrow">
          <b className="adminheading">Hospital: </b>
          {hospital}
        </p>
        <p className="adminrow">
          <b className="adminheading">Appointment Date: </b>
          {ad + " "}
        </p>
        <p className="adminrow">
          <b className="adminheading">Slot: </b>
          {slot}
        </p>
      </div>
    );
  }
}

export default AdminDetail;
