import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useDataLayerValue } from "./DataLayer";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddressForm({ details, handleDetails }) {
  const [{ nearbyHospitals }] = useDataLayerValue();
  const [t, st] = useState([]);
  React.useEffect(() => {
    function getTimeStops(start, end) {
      var startTime = moment(start, "HH:mm");
      var endTime = moment(end, "HH:mm");

      if (endTime.isBefore(startTime)) {
        endTime.add(1, "day");
      }

      while (startTime <= endTime) {
        let x = new moment(startTime).format("HH:mm");
        startTime.add(30, "minutes");
        let y = new moment(startTime).format("HH:mm");
        st((prev) => [...prev, { start: x, end: y }]);
        startTime.add(60, "minutes");
      }
    }
    getTimeStops("9:00", "17:00");
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter Your Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="fname"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={details.fname}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lname"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={details.lname}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            value={details.address}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={details.city}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={details.state}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={details.zip}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone number"
            fullWidth
            autoComplete="Phone"
            value={details.phone}
            onChange={handleDetails}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            label="Date Of Birth"
            type="date"
            name="dob"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDetails}
            value={details.dob}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="Email"
            value={details.email}
            onChange={handleDetails}
          />
        </Grid>
        <Grid >
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Hospitals</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleDetails}
              value={details.shospital}
              name="shospital"
            >
              {nearbyHospitals.map((x) => {
                return (
                  <MenuItem value={x}>
                    {x.name +
                      ", " +
                      (x.type === "pvt" ? "Private" : "Government")}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Select A Nearby Hospital</FormHelperText>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
          <input type="file" id="uploadimg" />
          <FormHelperText>Upload Your COVID Report (If Any)</FormHelperText>
        </Grid> */}
        {details.age > 59 ? (
          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              label="Appointment Date And Time"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              onChange={handleDetails}
              name="appointmentDateandTime"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Appointment Date"
                type="date"
                name="appointmentDate"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDetails}
              />
            </Grid>
            <Grid>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Slots</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleDetails}
                  name="slot"
                  value={details.slot}
                >
                  {t.map((x) => {
                    return (
                      <MenuItem value={x}>{x.start + " To " + x.end}</MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Select A Time Slot</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
