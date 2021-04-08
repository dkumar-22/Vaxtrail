import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Redirect } from "react-router";
import { useParams } from "react-router-dom";

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let { id } = useParams();
  console.log(id);
  const [can, setcan] = useState(false);
  const [data, setdata] = useState({});
  const [details, setDetails] = useState({
    bid: id,
    name: "",
    date: "",
    health: "",
    sideEffects: "",
  });
  useEffect(() => {
    async function getDetails() {
      await axios
        .post("http://localhost:5000/registered/status/" + id)
        .then((res) => {
          setdata(res.data)
          if (res.data === "Not Found" || res.data === "") {
            window.alert("Record Not Found!");
            setcan(true);
          } else {
            if (res.data.age > 59) {
              setDetails((prev) => {
                return {
                  ...prev,
                  name: res.data.fname + " " + res.data.lname,
                  date: res.data.appointmentDateandTime.substring(0, 10),
                };
              });
            } else {
              setDetails((prev) => {
                return {
                  ...prev,
                  name: res.data.fname + " " + res.data.lname,
                  date: res.data.appointmentDate,
                };
              });
            }
          }
        })
        .catch((err) => console.log(err));
    }
    getDetails();
  }, [id]);
  console.log(data);
  const [updated, setUpdated] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
        userDetails: data,
        health: details.health,
        sideEffects: details.sideEffects,
        bid:details.bid,
        name:details.name,
        date:details.date
    };
    console.log(obj);
    axios
      .post("http://localhost:5000/feedback/add", obj)
      .then((res) => {
        console.log(res.data);
        setUpdated(true);
      })
      .catch((err) => console.log(err));
  }
  const classes = useStyles();
  if (can) {
    return <Redirect to="/" />;
  }
  if (updated) {
    return <Redirect to="/success" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Your Feedback
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bid"
            label="Booking ID"
            name="bid"
            autoComplete="none"
            autoFocus
            value={details.bid}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of Patient"
            name="name"
            autoComplete="none"
            value={details.name}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="date"
            label="Vaccination Date"
            name="date"
            autoComplete="none"
            value={details.date}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="health"
            label="Health During the 5 Days"
            name="health"
            autoComplete="none"
            value={details.health}
            onChange={handleChange}
            multiline
            rows={4}
            rowsMax={10}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="sideEffects"
            label="Any Side Effects Observed"
            name="sideEffects"
            autoComplete="none"
            value={details.sideEffects}
            onChange={handleChange}
            multiline
            rows={4}
            rowsMax={10}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Feedback
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
