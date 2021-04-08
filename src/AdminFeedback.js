import React from "react";

function AdminFeedback({ bid, name, date, health, sideEffects }) {
  return (
    <div className="grid-item">
      <p className="adminrow frow">
        <b className="adminheading afh">Booking ID: </b>
        {bid}
      </p>
      <p className="adminrow frow">
        <b className="adminheading afh">Name: </b>
        {name}
      </p>
      <p className="adminrow frow">
        <b className="adminheading afh">Vaccinated On: </b>
        {date}
      </p>

      <p className="adminrow frow">
        <b className="adminheading afh">Side Effects: </b>
        {sideEffects}
      </p>
      <p className="adminrow frow">
        <b className="adminheading afh">Health: </b>
        {health}
      </p>
    </div>
  );
}

export default AdminFeedback;
