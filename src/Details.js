import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Details() {
  const [det, sedet] = useState({});
  const [hospi, sethospi] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [website, setwebsite] = useState("");
  const [dir, setdir] = useState("");
  let { id } = useParams();
  useEffect(() => {
    async function getDetails() {
      await axios
        .post("http://localhost:5000/registered/status/" + id)
        .then((res) => {
          sedet(res.data);
          sethospi(res.data.shospital.name);
          setstart(res.data.slot.start);
          setend(res.data.slot.end);
          setdir(res.data.shospital.directions);
          setwebsite(res.data.shospital.website);
        })
        .catch((err) => console.log(err));
    }
    getDetails();
  }, [id]);
  // console.log(det);
  // console.log(hospi);
  return (
    <div className="details-bg">
      <div className="details">
        <div className="banner">
          <h2>USER DETAILS: </h2>
        </div>
        <p>
          <b>Name: </b>
          {det.fname + " " + det.lname}
        </p>
        <p>
          <b>Registered on: </b>
          {det.date}
        </p>
        <p>
          <b>Date of birth: </b>
          {det.dob}
        </p>
        <p>
          <b>Address: </b>
          <a
            className="cancel"
            style={{ backgroundColor: " #301b3f" }}
            href={website}
            target="_blank_"
          >
            View Website
          </a>
          {det.address + ", " + det.city + ", " + det.state + ", " + det.zip}
        </p>
        <p>
          <b>Phone: </b>
          {det.phone}
        </p>
        <p>
          <b>Email: </b>
          <a
            className="cancel"
            style={{ backgroundColor: " #151515" }}
            href={dir}
            target="_blank_"
          >
            Get Directions
          </a>
          {det.email}
        </p>
        <p>
          <b>Name of the hospital: </b>
          {hospi}
        </p>
        <button className="cancel" style={{ backgroundColor: " #387c6d" }}>
          Cancel Appointment
        </button>
        {det.age > 59 ? (
          <p>
            <b>Appointment Date and Time: </b>
            {det.appointmentDateandTime}
          </p>
        ) : (
          <p>
            <b>Appointment Date: </b>
            {det.appointmentDate}
            <br />
            <p className="start">
              <b>Chosen Slot: </b>
              {start + "-" + end}
            </p>
          </p>
        )}
        <br />
        <p className="disc">*Time is in 24H format</p>
        <img
          src="https://images.moneycontrol.com/mcnews/images/vaccine-tracker/vaccine-top-img.png"
          alt=""
          className="vaccine-img"
        />
      </div>
    </div>
  );
}

export default Details;
