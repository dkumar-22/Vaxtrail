import React, { useState } from "react";
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
  const [details, setDetails] = useState({
    name: "",
    about: "",
    website: "",
    status: "",
    efficacy: "",
  });
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
      name: details.name,
      about: details.about,
      website: details.website,
      status: details.status,
      efficacy: Number(details.efficacy),
    };
    console.log(obj);
    console.log(typeof obj.longitude);
    axios
      .post("http://localhost:5000/vaccines/add", obj)
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
          Add a Vaccine
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of Vaccine"
            name="name"
            autoComplete="none"
            autoFocus
            value={details.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="about"
            label="About the Vaccine"
            name="about"
            autoComplete="none"
            value={details.about}
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
            id="status"
            label="Vaccine status"
            name="status"
            autoComplete="none"
            value={details.status}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="efficacy"
            label="Enter vaccine efficacy"
            name="efficacy"
            autoComplete="none"
            value={details.efficacy}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Vaccine
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
