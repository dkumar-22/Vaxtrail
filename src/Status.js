import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Footer from "./Footer";
import { Redirect } from "react-router";
function Status() {
  const [text, setText] = useState("");
  const [rval, setrval] = useState(false);
  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setrval(true);
  }

  if (rval) {
    return <Redirect to={"/status/" + text} />;
  }
  const imgarr = [
    "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/1280x720_Main.png?itok=mFBM6Uzr",
    "https://iite.unesco.org/wp-content/uploads/2020/04/iStock-1202707966-800x533.jpg",
    "https://uppsalareports.org/media/baqkbrdy/ur-covid-web-20200414.jpg",
    "https://static.wpb.tam.us.siteprotect.com/var/m_6/69/690/63899/889198-MASK-e4da3.jpeg",
    "https://www.economist.com/sites/default/files/images/print-edition/20200222_IRD001_0.jpg",
  ];

  return (
    <>
      <div className="registration-status">
        <div className="status">
          <h1 className="status-h1">Search for the details.</h1>
          <p className="status-p">
            Just enter the Booking ID <br /> sent to you by mail.
          </p>
          <form onSubmit={handleSubmit} autocomplete="off">
            <div class="searchBox">
              <input
                id="booking"
                class="searchInput"
                type="text"
                placeholder="Enter Booking ID"
                value={text}
                onChange={handleChange}
              />
              <button type="submit" className="btnsubmit">
                <SearchIcon class="searchButton" />
              </button>
            </div>
          </form>
        </div>
        <div className="status-right">
          <img className="status-img" src={imgarr[2]} alt="img" />
        </div>
      </div>
      <div className="status-footer">
        <Footer />
      </div>
    </>
  );
}

export default Status;
