import React, { useState, useEffect } from "react";
import axios from "axios";
import OdometerStats from "./OdometerStats";
import Vaccines from "./Vaccines";
import { useDataLayerValue } from "./DataLayer";
function Stats() {
  const [{ vaccines }] = useDataLayerValue();
  const [stats, setStats] = useState({
    active: 0,
    recovered: 0,
    new: 0,
    deaths: 0,
    total: 0,
  });
  useEffect(() => {
    var options = {
      method: "GET",
      url:
        "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true",
    };
    axios
      .request(options)
      .then(function (response) {
        setStats({
          active: response.data.activeCases,
          recovered: response.data.recovered,
          new: response.data.activeCasesNew + response.data.recoveredNew,
          deaths: response.data.deaths,
          total: response.data.totalCases,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="stats">
      <div className="stats-left">
        <h2 className="stats-heading">COVID-19 STATS FOR INDIA</h2>
        <div className="stats-1">
          <OdometerStats stat={stats.recovered} heading="RECOVERED" />
          <OdometerStats stat={stats.deaths} heading="DEATHS" />
          <OdometerStats stat={stats.active} heading="ACTIVE" />
        </div>
        <div className="stats-2">
          <OdometerStats stat={stats.total} heading="TOTAL" />
          <OdometerStats stat={stats.new} heading="TODAY" />
          <OdometerStats stat={90198673} heading="VACCINATED" />
        </div>
      </div>
      <div className="stats-right">
        <h2 className="stats-heading">SOME TOP VACCINES</h2>
        <div className="vacbars">
          {vaccines.map(function (x) {
            return <Vaccines value={x.efficacy} name={x.name} />;
          })}
        </div>
        <p style={{ marginTop: "53px" }}>*As per the reports of WHO</p>
      </div>
    </div>
  );
}

export default Stats;
