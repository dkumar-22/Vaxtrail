import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
const linkstyle = {
  textDecoration: "none",
};

function Details() {
  const [det, sedet] = useState({});
  const [hospi, sethospi] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [website, setwebsite] = useState("");
  const [can, setcan] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [canbtn, setcanbtn] = useState(false);
  const [dir, setdir] = useState("");
  let { id } = useParams();

  function handleClick() {
    let r = window.confirm("The Appointment will be Cancelled");
    if (r === true) {
      window.alert("Appointment Cancelled");
      axios
        .post("http://localhost:5000/registered/delete/" + id, {
          email: det.email,
          phone: det.phone,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setcan(true);
    }
  }
  useEffect(() => {
    async function getDetails() {
      await axios
        .post("http://localhost:5000/registered/status/" + id)
        .then((res) => {
          console.log(res.data);
          if (res.data === "Not Found" || res.data === "") {
            window.alert("Record Not Found!");
            setcan(true);
          } else {
            sedet(res.data);
            sethospi(res.data.shospital.name);
            setstart(res.data.slot.start);
            setend(res.data.slot.end);
            setdir(res.data.shospital.directions);
            setwebsite(res.data.shospital.website);
          }
        })
        .catch((err) => console.log(err));
    }
    getDetails();
    let x;
    if (det.age > 59) {
      x = new Date(det.appointmentDateandTime);
    } else {
      x = new Date(det.appointmentDate);
    }

    const date = new Date();
    const diffTime = date - x;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 5) setFeedback(true);
    if (diffDays >= 0) setcanbtn(true);
    console.log(feedback);
  }, [id, det.appointmentDateandTime, det.appointmentDate, det.age, feedback]);

  if (can) {
    return <Redirect to="/" />;
  }
  // console.log(det);
  // console.log(hospi);
  return (
    <div className="details-bg">
      <div className="details">
        {/* <div className="banner">
          <h2>USER DETAILS: </h2>
        </div> */}
        <p className="detailsp">
          <b>Name: </b>
          {det.fname + " " + det.lname}
        </p>
        <p className="detailsp">
          <b>Gender: </b>
          {det.gender}
        </p>
        {feedback && (
          <Link to={"/feedback/" + id} style={linkstyle}>
            <button
              className="cancel"
              style={{ backgroundColor: " #822659" }}
              href={dir}
              target="_blank_"
            >
              Feedback
            </button>
          </Link>
        )}
        <p className="detailsp">
          <b>Registered on: </b>
          {det.date}
        </p>
        <p className="detailsp">
          <b>Date of birth: </b>
          {det.dob}
        </p>
        <p className="detailsp">
          <b>Address: </b>
          {<a
            className="cancel"
            style={{ backgroundColor: " #301b3f" }}
            href={website}
            target="_blank_"
          >
            View Website
          </a>}
          {det.address + ", " + det.city + ", " + det.state + ", " + det.zip}
        </p>
        <p className="detailsp">
          <b>Phone: </b>
          {det.phone}
        </p>
        <p className="detailsp">
          <b>Email: </b>
          {<a
            className="cancel"
            style={{ backgroundColor: " #151515" }}
            href={dir}
            target="_blank_"
          >
            Get Directions
          </a>}
          {det.email}
        </p>
        <p className="detailsp">
          <b>Name of the hospital: </b>
          {hospi}
        </p>
        {!canbtn && (
          <button
            onClick={handleClick}
            className="cancel"
            style={{ backgroundColor: " #387c6d" }}
          >
            Cancel Appointment
          </button>
        )}
        {det.age > 59 ? (
          <p className="detailsp">
            <b>Appointment Date and Time: </b>
            {det.appointmentDateandTime.replace("T", " ")}
          </p>
        ) : (
          <p className="detailsp">
            <b>Appointment Date: </b>
            {det.appointmentDate}
            <br />
            <p className="detailsp start">
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
