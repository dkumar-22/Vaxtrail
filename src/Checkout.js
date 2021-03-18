import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import axios from "axios";
import { useDataLayerValue } from "./DataLayer";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        VaccTrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Enter Details", "Review Appointment", "Payment Details"];

export default function Checkout() {
  const [{ id }, dispatch] = useDataLayerValue();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    shospital: {},
    dob: "",
    slot: {},
    appointmentDateandTime: "",
    appointmentDate: "",
    age: 0,
  });
  // console.log(details.slot);
  function handleDetails(e) {
    const { name, value } = e.target;
    if (name === "dob") {
      setDetails((prev) => {
        return { ...prev, age: 2021 - Number(value.substr(0, 4)) };
      });
    }
    // console.log(value);
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            details={details}
            setDetails={setDetails}
            handleDetails={handleDetails}
          />
        );
      case 1:
        return <Review details={details} type={details.shospital.type} />;
      case 2:
        return <PaymentForm type={details.shospital.type} />;

      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  React.useEffect(() => {
    // console.log(activeStep);
    if (activeStep === 2) {
      axios
        .post("http://localhost:5000/registered/add", details)
        .then((res) => {
          dispatch({
            type: "SET_ID",
            id: res.data,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [activeStep, details, dispatch]);
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Vaccine Booking
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Vaccine successfully Booked. <br /> Your Booking ID:{" "}
                  <strong>{id}</strong>
                  {"."}
                  <br /> {"Other details will be mailed soon."}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && activeStep !== 2 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1
                      ? "Confirm Vaccine"
                      : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
