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
import { useParams } from "react-router-dom";
import { Redirect } from "react-router";

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
  const [updated, setUpdated] = useState(false);
  let { id } = useParams();
  const [details, setDetails] = useState({
    type: "",
    name: "",
    contact: "",
    website: "",
    directions: "",
    longitude: "",
    latitude: "",
  });

  //   console.log("id:", id);

  useEffect(() => {
    axios
      .get("http://localhost:5000/hospitals/" + id)
      .then((res) => {
        setDetails({
          type: res.data.type,
          name: res.data.name,
          contact: res.data.contact,
          website: res.data.website,
          directions: res.data.directions,
          longitude: res.data.location.coordinates[0],
          latitude: res.data.location.coordinates[1],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      type: details.type,
      name: details.name,
      contact: details.contact,
      website: details.website,
      directions: details.directions,
      longitude: parseFloat(details.longitude),
      latitude: parseFloat(details.latitude),
    };
    console.log(obj);
    console.log(typeof obj.longitude);
    axios
      .post("http://localhost:5000/hospitals/update/" + id, obj)
      .then((res) => {
        console.log(res.data);
        setUpdated(true);
      })
      .catch((err) => console.log(err));
  }

  const classes = useStyles();

  if (updated) {
    return <Redirect to="/success" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Hospital Details
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type of Hospital (govt or pvt)"
            name="type"
            autoComplete="none"
            autoFocus
            value={details.type}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of Hospital"
            name="name"
            autoComplete="none"
            value={details.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Contact"
            name="contact"
            autoComplete="none"
            value={details.contact}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="website"
            label="Website"
            name="website"
            autoComplete="none"
            value={details.website}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="directions"
            label="Google Maps Directions Link"
            name="directions"
            autoComplete="none"
            value={details.directions}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="longitude"
            label="Longitude"
            name="longitude"
            autoComplete="none"
            value={details.longitude}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="latitude"
            label="Latitude"
            name="latitude"
            autoComplete="none"
            value={details.latitude}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Hospital Details
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
