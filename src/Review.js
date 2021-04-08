import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ details, type }) {
  const classes = useStyles();
  const products1 = [
    {
      name: "Corona Vaccine",
      desc: "Corona Vaccine Dose 1",
      price: "₹250",
    },
    {
      name: "Corona Vaccine",
      desc: "Corona Vaccine Dose 2",
      price: "₹250",
    },
  ];
  const products2 = [
    {
      name: "Corona Vaccine",
      desc: "Corona Vaccine Dose 1",
      price: "Free",
    },
    {
      name: "Corona Vaccine",
      desc: "Corona Vaccine Dose 2",
      price: "Free",
    },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {type === "pvt"
          ? products1.map((product) => (
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText primary={product.name} secondary={product.desc} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            ))
          : products2.map((product) => (
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText primary={product.name} secondary={product.desc} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {type === "govt" ? "Free" : "₹500"}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Personal Details
          </Typography>
          <Typography gutterBottom>
            {details.fname + " " + details.lname}
          </Typography>
          <Typography gutterBottom>
            {details.address +
              ", " +
              details.city +
              ", " +
              details.state +
              ", " +
              details.zip}
          </Typography>
          <Typography gutterBottom>{details.phone}</Typography>
          <Typography gutterBottom>{details.email}</Typography>
          <Typography gutterBottom>{"DOB: " + details.dob}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Vaccination Details
          </Typography>
          <Typography gutterBottom>{details.shospital.name}</Typography>
          <Typography gutterBottom>
            {details.age > 59 ? (
              <>
                <Typography gutterBottom>
                  {"Date: " + details.appointmentDateandTime.substring(0, 10)}
                </Typography>
                <Typography gutterBottom>
                  {"Time: " + details.appointmentDateandTime.substring(11)+"  (24H format)"}
                </Typography>
              </>
            ) : (
              <Typography gutterBottom>
                {"Date: " + details.appointmentDate}
                <br />
                {"Slot: " + details.slot.start + "-" + details.slot.end}
              </Typography>
            )}
          </Typography>
          <Typography gutterBottom>
            <a
              className="card-links"
              target="_blank_"
              href={details.shospital.website}
            >
              Go to the Website
            </a>
          </Typography>
          <Typography gutterBottom>
            <a
              className="card-links"
              target="_blank_"
              href={details.shospital.directions}
            >
              View Directions
            </a>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
