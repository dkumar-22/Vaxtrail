import React from "react";
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
import Status from "./Status";
import Details from "./Details";
import AdminDetails from "./AdminDetails";
import VaccinePage from "./VaccinePage";
import AddVaccine from "./AddVaccine";
import EditVaccine from "./EditVaccine"
function Main() {
  const [{ logged }] = useDataLayerValue();
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
          <Route path="/status" exact component={Status} />
          <Route path="/status/:id" exact component={Details} />
          <Route path="/vaccines" exact component={VaccinePage} />
          <Route path="/vaccines/add" exact component={AddVaccine} />
          <Route path="/vaccines/edit/:id" exact component={EditVaccine} />
          <Route path="/edit/:id" children={<EditHospital />} />
          <Route
            path="/admin"
            exact
            component={() =>
              logged ? <AdminHospitals /> : <Redirect to="/" />
            }
          />
          <Route
            path="/details"
            exact
            component={() =>
              logged ? <AdminDetails /> : <Redirect to="/login" />
            }
          />
          <Route component={() => <NotFound />} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
