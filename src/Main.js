import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import App from "./App";
import SignIn from "./SignIn";
import Hospitals from "./Hospitals";
import Topbar from "./Topbar";
import Checkout from "./Checkout";
import AdminHospitals from "./AdminHospitals";
import { Redirect } from "react-router";
import { useDataLayerValue } from "./DataLayer";
import NotFound from "./NotFound";
import AddHospital from "./AddHospital";
import EditHospital from "./EditHospital";
import Success from "./Success";
import axios from "axios";
function Main() {
  const [{ logged }] = useDataLayerValue();
  const [{ latitude, longitude }, dispatch] = useDataLayerValue();
  useEffect(() => {
    function showPosition(position) {
      dispatch({
        type: "SET_LATITUDE",
        latitude: position.coords.latitude,
      });
      dispatch({
        type: "SET_LONGITUDE",
        longitude: position.coords.longitude,
      });
    }

    async function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    getLocation();
    if (latitude > 0 && longitude > 0) {
      axios
        .post("http://localhost:5000/hospitals/nearby", {
          longitude: longitude,
          latitude: latitude,
        })
        .then((res) => {
          dispatch({
            type: "SET_NEARBYHOSPITALS",
            nearbyHospitals: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
    axios
      .get("http://localhost:5000/hospitals/all")
      .then((res) => {
        dispatch({
          type: "SET_ALLHOSPITALS",
          allHospitals: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch, latitude, longitude]);
  return (
    <Router>
      <div>
        <Topbar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/add" exact component={AddHospital} />
          <Route path="/hospitals" exact component={Hospitals} />
          <Route path="/register" exact component={Checkout} />
          <Route path="/success" exact component={Success} />
          <Route path="/edit/:id" children={<EditHospital />} />
          <Route
            path="/admin"
            exact
            component={() =>
              logged ? <AdminHospitals /> : <Redirect to="/" />
            }
          />
          <Route component={() => <NotFound />} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
